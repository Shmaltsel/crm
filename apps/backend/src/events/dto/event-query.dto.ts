import { PageOptionsDto } from '../../common/dto/page-options.dto';
import { IsOptional, IsString } from 'class-validator';

export class EventQueryDto extends PageOptionsDto {
  @IsString()
  @IsOptional()
  dateFrom?: string;

  @IsString()
  @IsOptional()
  dateTo?: string;
}
