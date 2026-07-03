import { IsString, IsNotEmpty, IsOptional, IsIn } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class BulkImportDto {
  @ApiProperty({ example: 'a1b2c3d4-...' })
  @IsString()
  @IsNotEmpty()
  cityId: string;

  @ApiPropertyOptional({ example: 'Школа', enum: ['Школа', 'Садочок'] })
  @IsOptional()
  @IsIn(['Школа', 'Садочок'])
  type?: 'Школа' | 'Садочок';
}
