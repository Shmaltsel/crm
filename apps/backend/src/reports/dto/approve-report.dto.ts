import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class SalaryApprovalItemDto {
  @ApiProperty({ description: 'ID запису нарахування' })
  @IsString()
  id: string;

  @ApiProperty({ description: 'Фінальна сума виплати' })
  @IsNumber()
  @Min(1)
  @Max(99999)
  @Type(() => Number)
  amount: number;
}

export class ApproveReportDto {
  @ApiProperty({
    description: 'Фінальні суми нарахувань (відредаговані менеджером)',
    type: [SalaryApprovalItemDto],
    required: false,
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SalaryApprovalItemDto)
  salaries?: SalaryApprovalItemDto[];
}
