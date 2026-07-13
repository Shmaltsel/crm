import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { TelegramService } from '../telegram/telegram.service';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable()
export class IssuesService {
  constructor(
    private prisma: PrismaService,
    private telegramService: TelegramService,
    private notificationsService: NotificationsService,
  ) {}

  async create(data: {
    eventId: string;
    schoolName: string;
    eventName: string;
    message: string;
    cityId: string;
    deadline?: string;
    assignedUserId?: string;
    assignedUserName?: string;
  }) {
    const issue = await this.prisma.issueReport.create({
      data: {
        eventId: data.eventId,
        schoolName: data.schoolName,
        eventName: data.eventName,
        message: data.message,
        cityId: data.cityId,
        deadline: data.deadline ? new Date(data.deadline) : null,
        assignedUserId: data.assignedUserId || null,
        assignedUserName: data.assignedUserName || null,
      },
    });

    const event = await this.prisma.event.findUnique({
      where: { id: data.eventId },
      include: {
        crew: {
          include: {
            host: { select: { name: true, telegramId: true } },
            driver: { select: { name: true, telegramId: true } },
          },
        },
      },
    });

    const formatMember = (user: {
      name: string;
      telegramId: string | null;
    }) => {
      if (!user.telegramId) return user.name;
      const clean = user.telegramId.replace(/^@/, '');
      return /^\d+$/.test(clean) ? user.name : `@${clean} (${user.name})`;
    };

    const crewMembers: string[] = [];
    if (event?.crew?.host)
      crewMembers.push(`🎙️ Ведучий: ${formatMember(event.crew.host)}`);
    if (event?.crew?.driver)
      crewMembers.push(`🚗 Водій: ${formatMember(event.crew.driver)}`);

    const city = await this.prisma.city.findUnique({
      where: { id: data.cityId },
      include: { users: { where: { role: 'MANAGER' }, take: 1 } },
    });

    let assigneeChatId: string | null = null;
    if (data.assignedUserId) {
      const assignee = await this.prisma.user.findUnique({
        where: { id: data.assignedUserId },
        select: { telegramChatId: true, telegramId: true },
      });
      assigneeChatId =
        assignee?.telegramChatId ||
        (assignee?.telegramId && /^\d+$/.test(assignee.telegramId)
          ? assignee.telegramId
          : null);
    }

    const deadlineStr = data.deadline
      ? `\n⏰ <b>Дедлайн:</b> ${new Date(data.deadline).toLocaleDateString('uk-UA')}`
      : '';

    const assigneeStr = data.assignedUserName
      ? `\n👤 <b>Відповідальний:</b> ${data.assignedUserName}`
      : '';

    const manager = city?.users?.[0];
    const managerChatId =
      manager?.telegramChatId ||
      (manager?.telegramId && /^\d+$/.test(manager.telegramId)
        ? manager.telegramId
        : null);

    const text =
      `🚨 <b>Нова проблема!</b>\n\n` +
      `🏫 <b>Заклад:</b> ${data.schoolName}\n` +
      `📅 <b>Подія:</b> ${data.eventName}\n\n` +
      `💬 <b>Повідомлення:</b>\n${data.message}` +
      deadlineStr +
      assigneeStr +
      (crewMembers.length > 0
        ? `\n\n👥 <b>Екіпаж:</b>\n${crewMembers.join('\n')}`
        : '') +
      `\n\n<i>Деталі у CRM: <a href="https://app.svitlo-znan.app">Посилання</a></i>`;

    if (managerChatId)
      await this.telegramService.sendMessage(managerChatId, text);

    if (assigneeChatId && assigneeChatId !== managerChatId) {
      await this.telegramService.sendMessage(assigneeChatId, text);
    }

    const notificationPayload = {
      issueId: issue.id,
      schoolName: data.schoolName,
      eventName: data.eventName,
      message: data.message,
    };
    if (manager?.id) {
      this.notificationsService
        .create(manager.id, 'ISSUE_CREATED', notificationPayload)
        .catch(() => {});
    }
    if (data.assignedUserId) {
      this.notificationsService
        .create(data.assignedUserId, 'ISSUE_CREATED', notificationPayload)
        .catch(() => {});
    }

    // Telegram OWNER + SUPERADMIN
    this.notificationsService
      .getAdminIds()
      .then((adminIds) => {
        this.notificationsService.sendTelegramToUsers(
          adminIds,
          'ISSUE_CREATED',
          {
            schoolName: data.schoolName,
            eventName: data.eventName,
            message: data.message,
            deadline: data.deadline,
            assigneeName: data.assignedUserName,
          },
        );
      })
      .catch(() => {});

    return issue;
  }

  async findByCityId(cityId: string) {
    return this.prisma.issueReport.findMany({
      where: {
        cityId,
        status: { not: 'Виконано' },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async updateStatus(id: string, status: string) {
    return this.prisma.issueReport.update({
      where: { id },
      data: { status },
    });
  }
}
