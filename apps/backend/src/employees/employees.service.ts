import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class EmployeesService {
  async create(data: { fullName: string; phone: string; email: string; city: string; role: string }) {
  return prisma.employee.create({ data });
  }

  async findAll() {
    return prisma.employee.findMany({
      orderBy: [{ role: 'asc' }, { fullName: 'asc' }],
    });
  }

  async update(id: string, data: any) {
    const { id: _id, createdAt, ...updateData } = data;
    return prisma.employee.update({ where: { id }, data: updateData });
  }

  async remove(id: string) {
    return prisma.employee.delete({ where: { id } });
  }
}
