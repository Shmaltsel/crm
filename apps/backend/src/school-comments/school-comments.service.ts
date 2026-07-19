import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import type { JwtUser } from '../auth/interfaces/jwt-user.interface';
import type { CommentType } from '@prisma/client';

@Injectable()
export class SchoolCommentsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    schoolId: string,
    type: CommentType,
    text: string,
    user: JwtUser,
  ) {
    const school = await this.prisma.school.findUnique({
      where: { id: schoolId },
    });
    if (!school) throw new NotFoundException('school.notFound');

    return this.prisma.schoolComment.create({
      data: { schoolId, authorId: user.sub, type, text },
      include: { author: { select: { id: true, name: true, role: true } } },
    });
  }

  async findAll(schoolId: string, type?: CommentType, page = 1, take = 20, role?: string) {
    if (role === 'HOST' || role === 'DRIVER') {
      return { items: [], total: 0, page, take, pageCount: 0 };
    }
    const where: Record<string, unknown> = { schoolId, deletedAt: null };
    if (type) where.type = type;

    const [items, total] = await Promise.all([
      this.prisma.schoolComment.findMany({
        where,
        include: { author: { select: { id: true, name: true, role: true } } },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * take,
        take,
      }),
      this.prisma.schoolComment.count({ where }),
    ]);

    return { items, total, page, take, pageCount: Math.ceil(total / take) };
  }

  async softDelete(id: string, user: JwtUser) {
    if (user.role !== 'SUPERADMIN' && user.role !== 'OWNER') {
      throw new ForbiddenException('comments.notAllowed');
    }
    const comment = await this.prisma.schoolComment.findUnique({
      where: { id },
    });
    if (!comment) throw new NotFoundException('comment.notFound');

    return this.prisma.schoolComment.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
