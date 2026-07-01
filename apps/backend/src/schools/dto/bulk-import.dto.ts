import { IsString, IsNotEmpty, IsOptional, IsIn } from 'class-validator';

export class BulkImportDto {
  @IsString()
  @IsNotEmpty()
  cityId: string;

  @IsOptional()
  @IsIn(['Школа', 'Садочок'])
  type?: 'Школа' | 'Садочок';
}
