import { IsString, IsNotEmpty } from 'class-validator';

export class AssignCrewDto {
  @IsString()
  @IsNotEmpty()
  crewId: string;
}
