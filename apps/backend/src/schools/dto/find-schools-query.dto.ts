import { IsOptional, IsString, MinLength, IsIn } from 'class-validator';

export class FindSchoolsQueryDto {
  @IsOptional()
  @IsString()
  @MinLength(2)
  q?: string;

  @IsOptional()
  @IsIn(['Школа', 'Садочок'])
  type?: 'Школа' | 'Садочок';
}
