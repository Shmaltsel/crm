import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAll() {
    return this.usersService.getAllUsers();
  }

  // Шлях для генерації адміна: http://localhost:3000/users/seed
  @Get('seed')
  seedAdmin() {
    return this.usersService.seedAdmin();
  }
}
