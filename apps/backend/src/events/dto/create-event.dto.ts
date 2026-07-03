import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateEventDto {
  @ApiProperty({
    example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    description: 'ID міста',
  })
  @IsString()
  @IsNotEmpty()
  cityId: string;

  @ApiProperty({
    example: 'f9e8d7c6-b5a4-3210-fedc-ba9876543210',
    description: 'ID школи',
  })
  @IsString()
  @IsNotEmpty()
  schoolId: string;

  @ApiProperty({ example: 'Голографічне шоу «Космос»' })
  @IsString()
  @IsNotEmpty()
  project: string;

  @ApiProperty({
    example: '2026-09-15',
    description: 'Дата у форматі YYYY-MM-DD',
  })
  @IsString()
  @IsNotEmpty()
  date: string;

  @ApiPropertyOptional({ example: '14:30' })
  @IsOptional()
  @IsString()
  time?: string;

  @ApiPropertyOptional({ example: 120, minimum: 0 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  childrenPlanned?: number;

  @ApiPropertyOptional({ example: 15000, minimum: 0 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  price?: number;

  @ApiPropertyOptional({ example: 'card', enum: ['cash', 'card', 'invoice'] })
  @IsOptional()
  @IsString()
  paymentMethod?: string;

  @ApiPropertyOptional({ example: 'м. Львів, вул. Шевченка 10' })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiPropertyOptional({ example: 'Олена Ковальчук' })
  @IsOptional()
  @IsString()
  contactPerson?: string;

  @ApiPropertyOptional({ example: '+380671234567' })
  @IsOptional()
  @IsString()
  contactPhone?: string;

  @ApiPropertyOptional({ example: 'Проєктор, генератор туману' })
  @IsOptional()
  @IsString()
  equipment?: string;

  @ApiPropertyOptional({ example: 'Голографічне шоу «Динозаври»' })
  @IsOptional()
  @IsString()
  nextProject?: string;

  @ApiPropertyOptional({
    example: 'a1b2c3d4-...',
    description: 'ID відповідального менеджера',
  })
  @IsOptional()
  @IsString()
  responsibleId?: string;
}
