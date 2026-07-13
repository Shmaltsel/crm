import { IsDateString, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateDayOffRequestDto {
  @ApiProperty({ example: '2026-07-15' })
  @IsDateString()
  date: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  reason?: string;

  @ApiPropertyOptional({
    description:
      'Заповнюється менеджером/адміном для створення запиту від імені співробітника',
  })
  @IsOptional()
  @IsString()
  userId?: string;
}
