import { IsString, IsNotEmpty, IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({ example: 'Реквізит' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ enum: ['INVENTORY', 'EXPENSE'] })
  @IsString()
  @IsIn(['INVENTORY', 'EXPENSE'])
  type: 'INVENTORY' | 'EXPENSE';
}
