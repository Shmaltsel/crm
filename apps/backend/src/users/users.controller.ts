import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiCookieAuth } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('Users')
@ApiCookieAuth('access_token')
@Controller('users')
@UseGuards(AuthGuard, RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Список усіх користувачів' })
  @Get()
  @Roles('SUPERADMIN', 'OWNER', 'MANAGER')
  getAll() {
    return this.usersService.getAllUsers();
  }

  @ApiOperation({ summary: 'Створити користувача' })
  @Post()
  @Roles('SUPERADMIN')
  create(@Body() body: CreateUserDto) {
    return this.usersService.createUser(body);
  }

  @ApiOperation({ summary: 'Оновити користувача' })
  @Patch(':id')
  @Roles('SUPERADMIN')
  update(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.usersService.updateUser(id, body);
  }

  @ApiOperation({ summary: 'Видалити користувача' })
  @Delete(':id')
  @Roles('SUPERADMIN')
  remove(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }
}
