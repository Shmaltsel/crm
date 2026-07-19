import { IsString, IsNumber, IsNotEmpty, IsPositive, IsOptional, IsDateString, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateManualExpenseDto {
  @ApiProperty({ example: 'Транспорт' })
  @IsString()
  @IsNotEmpty()
  category: string;

  @ApiPropertyOptional({ example: 'Бензин для поїздки' })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({ example: 'Оплата пального за липень' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: 1500.0 })
  @IsNumber()
  @IsPositive()
  amount: number;

  @ApiProperty({ example: '2026-07-18' })
  @IsDateString()
  date: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  cityId?: string;

  @ApiPropertyOptional({ description: 'Base64 data URL фото (чек)' })
  @IsString()
  @IsOptional()
  @MaxLength(5_000_000)
  photoUrl?: string;
}
