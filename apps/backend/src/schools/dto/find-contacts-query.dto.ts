import { IsOptional, IsString, MinLength } from 'class-validator';

export class FindContactsQueryDto {
  @IsOptional()
  @IsString()
  @MinLength(1)
  q?: string;

  @IsOptional()
  @IsString()
  city?: string;
}
