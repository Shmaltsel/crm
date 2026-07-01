import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateCrewDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  hostId?: string;

  @IsOptional()
  @IsString()
  driverId?: string;
}
