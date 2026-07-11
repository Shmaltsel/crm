import { Injectable, NotFoundException } from '@nestjs/common';
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
      select: { employeeId: true },
    });
    if (!record) throw new NotFoundException('salary.notFound');

    await tx.salaryRecord.update({
      where: { id: salaryRecordId },
      data: {
        amount: new Prisma.Decimal(finalAmount),
        status: 'PAID',
        paidAt: new Date(),
        paidBy: paidByUserId,
      },
    });

    await tx.user.update({
      where: { id: record.employeeId },
      data: { balance: { increment: new Prisma.Decimal(finalAmount) } },
    });
  }
}
