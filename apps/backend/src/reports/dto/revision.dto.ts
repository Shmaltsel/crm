import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RevisionDto {
  @ApiProperty({
    description: 'Коментар при поверненні на доопрацювання або відхиленні',
  })
  @IsString()
  @MinLength(1)
  comment: string;
}
