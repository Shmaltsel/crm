import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsDateString,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateIssueDto {
  @ApiProperty({ example: 'a1b2c3d4-...' })
  @IsString()
  @IsNotEmpty()
  eventId: string;

  @ApiProperty({ example: 'Ліцей №5' })
  @IsString()
  @IsNotEmpty()
  schoolName: string;

  @ApiProperty({ example: 'Голографічне шоу «Космос»' })
  @IsString()
  @IsNotEmpty()
  eventName: string;

  @ApiProperty({ example: 'Не вистачає проєктора' })
  @IsString()
  @IsNotEmpty()
  message: string;

  @ApiProperty({ example: 'a1b2c3d4-...' })
  @IsString()
  @IsNotEmpty()
  cityId: string;

  @ApiPropertyOptional({ example: '2026-09-20' })
  @IsOptional()
  @IsDateString()
  deadline?: string;

  @ApiPropertyOptional({ example: 'a1b2c3d4-...' })
  @IsOptional()
  @IsString()
  assignedUserId?: string;

  @ApiPropertyOptional({ example: 'Марія Демчук' })
  @IsOptional()
  @IsString()
  assignedUserName?: string;
}
