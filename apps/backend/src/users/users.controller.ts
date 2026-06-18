import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAll() {
    return this.usersService.getAllUsers();
  }

  // Шлях для генерації адміна: https://crm-57qd.onrender.com/users/seed
  @Get('seed')
  seedAdmin() {
    return this.usersService.seedAdmin();
  }
}
