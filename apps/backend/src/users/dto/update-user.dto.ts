import {
  IsString,
  IsEmail,
  IsOptional,
  MinLength,
  IsIn,
} from 'class-validator';

const ROLES = ['SUPERADMIN', 'MANAGER', 'HOST', 'DRIVER'];

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  fullName?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  @MinLength(6)
  password?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsIn(ROLES)
  role?: string;

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
