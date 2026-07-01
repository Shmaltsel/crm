import { IsOptional, IsString } from 'class-validator';

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
}
