import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAll() {
    return this.usersService.getAllUsers();
  }

  @Post()
  create(@Body() body: any) {
    return this.usersService.createUser(body);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.usersService.updateUser(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }

  @Get('seed')
  seedAdmin() {
    return this.usersService.seedAdmin();
  }

  @Get('seed-vasya')
  seedVasya() {
    return this.usersService.seedVasya();
  }
}
