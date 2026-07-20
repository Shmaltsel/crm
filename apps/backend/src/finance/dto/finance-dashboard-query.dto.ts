import { IsOptional, IsString, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class FinanceDashboardQueryDto {
  @IsOptional()
  @IsString()
  period?: string;

  @IsOptional()
  @IsString()
  cityId?: string;

  @IsOptional()
  @IsString()
  project?: string;

  @IsOptional()
  @IsString()
  minimal?: string;

  @IsOptional()
  @IsString()
  granularity?: 'month' | 'day' | 'auto';

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  bucketCount?: number;

  @IsOptional()
  @IsString()
  dateFrom?: string;

  @IsOptional()
  @IsString()
  dateTo?: string;
}
