import { IsDateString, IsNumber, IsPositive, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMileageReportDto {
  @ApiProperty({ example: '2026-07-26' })
  @IsDateString()
  date: string;

  @ApiProperty({ example: 120 })
  @IsNumber()
  @Min(1)
  km: number;

  @ApiProperty({ example: 720 })
  @IsNumber()
  @IsPositive()
  fuel: number;

  @ApiProperty({ example: 480 })
  @IsNumber()
  @IsPositive()
  depreciation: number;

  @ApiProperty({ example: 1200 })
  @IsNumber()
  @IsPositive()
  totalAmount: number;
}
