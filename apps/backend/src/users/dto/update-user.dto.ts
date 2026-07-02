import {
  IsString,
  IsEmail,
  IsOptional,
  MinLength,
  IsEnum,
  Matches,
} from 'class-validator';
import { UserRole } from '@prisma/client';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  fullName?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  @MinLength(8, { message: 'Пароль має містити щонайменше 8 символів' })
  @Matches(/^(?=.*[a-zA-Z])(?=.*\d).+$/, {
    message: 'Пароль має містити хоча б одну літеру та одну цифру',
  })
  password?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;

  @IsOptional()
  @IsString()
  cityId?: string;

  @IsOptional()
  @IsString()
  telegramId?: string;

  @IsOptional()
  @IsString()
  car?: string;
}
