import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAll() {
    return this.usersService.getAllUsers();
  }

  // Шлях для генерації адміна
  @Get('seed')
  seedAdmin() {
    return this.usersService.seedAdmin();
  }

  // Новий шлях для генерації Васі
  @Get('seed-vasya')
  seedVasya() {
    return this.usersService.seedVasya();
  }
}