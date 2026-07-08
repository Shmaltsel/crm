import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class MarkPaidDto {
  @ApiProperty({ description: 'Коментар при виплаті', required: false })
  @IsOptional()
  @IsString()
  comment?: string;
}
