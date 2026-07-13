import { IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class ReviewDayOffRequestDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  managerNote?: string;
}
