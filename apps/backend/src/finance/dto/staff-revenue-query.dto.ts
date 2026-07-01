import { IsOptional, IsString } from 'class-validator';

export class StaffRevenueQueryDto {
  @IsOptional()
  @IsString()
  period?: string;

  @IsOptional()
  @IsString()
  cityId?: string;
}
