import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  IsArray,
  ValidateNested,
  Min,
  Max,
} from 'class-validator';
import { Type } from 'class-transformer';

class ExpenseItemDto {
  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsNumber()
  @Min(0)
  @Type(() => Number)
  amount: number;
}

class SalaryRecordDto {
  @IsString()
  userId: string;

  @IsString()
  name: string;

  @IsNumber()
  @Min(0)
  @Type(() => Number)
  amount: number;

  @IsOptional()
  @IsString()
  role?: string;
}

export class CreateReportDto {
  @IsString()
  eventId: string;

  @IsOptional()
  @IsBoolean()
  announcementDone?: boolean;

  @IsOptional()
  @IsBoolean()
  materialShown?: boolean;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  childrenCount?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  classesCount?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  privilegedCount?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  showingsCount?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  totalSum?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  schoolSum?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  remainderSum?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(5)
  @Type(() => Number)
  rating?: number;

  @IsOptional()
  @IsBoolean()
  directorSatisfied?: boolean;

  @IsOptional()
  @IsBoolean()
  teachersSatisfied?: boolean;

  @IsOptional()
  @IsBoolean()
  hadIssues?: boolean;

  @IsOptional()
  @IsString()
  comment?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ExpenseItemDto)
  expenses?: ExpenseItemDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SalaryRecordDto)
  salaries?: SalaryRecordDto[];
}
