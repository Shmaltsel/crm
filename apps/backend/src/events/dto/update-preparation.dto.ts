import { IsString, IsNotEmpty } from 'class-validator';

export class UpdatePreparationDto {
  @IsString()
  @IsNotEmpty()
  field: string;

  @IsString()
  @IsNotEmpty()
  status: string;
}
