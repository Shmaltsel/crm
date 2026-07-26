import { IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class ReviewMileageReportDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  managerNote?: string;
}
