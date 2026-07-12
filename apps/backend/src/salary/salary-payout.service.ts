import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class SalaryPayoutService {
  async payout(
    tx: Prisma.TransactionClient,
    salaryRecordId: string,
    finalAmount: number,
    paidByUserId: string,
  ): Promise<void> {
    const record = await tx.salaryRecord.findUnique({
      where: { id: salaryRecordId },
      select: { employeeId: true, amount: true, status: true },
    });
    if (!record) throw new NotFoundException('salary.notFound');
    if (record.status !== 'PENDING') {
      throw new BadRequestException('salary.alreadyPaid');
    }

    await tx.salaryRecord.update({
      where: { id: salaryRecordId },
      data: {
        status: 'PAID',
        paidAt: new Date(),
        paidBy: paidByUserId,
      },
    });

    await tx.user.update({
      where: { id: record.employeeId },
      data: { balance: { increment: record.amount } },
    });
  }
}
