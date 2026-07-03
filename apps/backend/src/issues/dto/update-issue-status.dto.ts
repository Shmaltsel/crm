import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateIssueStatusDto {
  @ApiProperty({ example: 'Вирішено' })
  @IsString()
  @IsNotEmpty()
  status: string;
}
