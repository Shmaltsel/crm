import { IsString, IsNotEmpty, IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

const ISSUE_STATUSES = ['Планується', 'Виконується', 'Виконано'] as const;

export class UpdateIssueStatusDto {
  @ApiProperty({ example: 'Виконано' })
  @IsString()
  @IsNotEmpty()
  @IsIn(ISSUE_STATUSES)
  status: string;
}
