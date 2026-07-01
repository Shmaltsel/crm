import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateSchoolDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsString()
  @IsNotEmpty()
  cityId: string;

  @IsOptional()
  @IsString()
  sourceUrl?: string;
}
