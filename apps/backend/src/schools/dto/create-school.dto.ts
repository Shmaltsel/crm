import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateSchoolDto {
  @ApiProperty({ example: 'Ліцей №5' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'school', enum: ['school', 'kindergarten'] })
  @IsString()
  @IsNotEmpty()
  type: string;

  @ApiProperty({ example: 'a1b2c3d4-...' })
  @IsString()
  @IsNotEmpty()
  cityId: string;

  @ApiPropertyOptional({ example: 'https://example.com/school-page' })
  @IsOptional()
  @IsString()
  sourceUrl?: string;

  @ApiPropertyOptional({ example: 'Іваненко Іван Іванович' })
  @IsOptional()
  @IsString()
  director?: string;

  @ApiPropertyOptional({ example: '+380501234567' })
  @IsOptional()
  @IsString()
  phone?: string;
}
