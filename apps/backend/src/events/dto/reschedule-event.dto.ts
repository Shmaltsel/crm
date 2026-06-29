import { IsString, IsNotEmpty } from 'class-validator';

export class RescheduleEventDto {
  @IsString()
  @IsNotEmpty()
  date: string;

  @IsString()
  @IsNotEmpty()
  time: string;
}
