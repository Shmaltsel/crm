import { Controller, Get, Post, Body, Patch, Delete, Param } from '@nestjs/common';
import { EmployeesService } from './employees.service';

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Post()
  create(@Body() body: { fullName: string; phone: string; email: string; city: string; role: string }) {
    return this.employeesService.create(body);
  }

  @Get()
  findAll() {
    return this.employeesService.findAll();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.employeesService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeesService.remove(id);
  }
}
