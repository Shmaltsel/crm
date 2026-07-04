import { IsDateString, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateDayOffDto {
  @ApiProperty({ example: '2026-07-10' })
  @IsDateString()
  date: string;

  @ApiPropertyOptional({
    description:
      'Заповнюється менеджером/адміном для призначення вихідного співробітнику',
  })
  @IsOptional()
  @IsString()
  userId?: string;
}
