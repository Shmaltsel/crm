import {
  IsString,
  IsNumber,
  IsArray,
  IsOptional,
  Min,
  Max,
  ValidateNested,
  MinLength,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSalaryItemDto {
  @ApiProperty({ description: 'ID працівника' })
  @IsString()
  employeeId: string;

  @ApiProperty({ description: 'Сума нарахування' })
  @IsNumber()
  @Min(1)
  @Max(99999)
  @Type(() => Number)
  amount: number;

  @ApiProperty({ description: 'Коментар', required: false })
  @IsOptional()
  @IsString()
  comment?: string;
}

export class CreateSalaryDto {
  @ApiProperty({ description: 'ID звіту (Approved)' })
  @IsString()
  reportId: string;

  @ApiProperty({ type: [CreateSalaryItemDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateSalaryItemDto)
  items: CreateSalaryItemDto[];
}
