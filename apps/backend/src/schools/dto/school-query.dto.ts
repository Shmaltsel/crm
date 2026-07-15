import { IsOptional, IsIn, IsString } from 'class-validator';
import { PageOptionsDto } from '../../common/dto/page-options.dto';

export class SchoolQueryDto extends PageOptionsDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsString()
  cityId?: string;

  @IsOptional()
  @IsIn(['Школа', 'Садочок'])
  type?: 'Школа' | 'Садочок';

  @IsOptional()
  @IsIn(['new', 'planned', 'inProgress', 'done'])
  stage?: 'new' | 'planned' | 'inProgress' | 'done';

  @IsOptional()
  @IsIn(['small', 'medium', 'large'])
  size?: 'small' | 'medium' | 'large';
}
