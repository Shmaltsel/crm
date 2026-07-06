import { IsString, IsNotEmpty, IsOptional, IsIn } from 'class-validator';

const EVENT_STATUSES = ['BASE', 'FIRST_CONTACT', 'INTERESTED', 'PRE_APPROVAL', 'DATE_CONFIRMED', 'PREPARATION', 'IN_PROGRESS', 'DONE', 'REPORT', 'RE_SALE'] as const;

export class UpdateStatusDto {
  @IsString()
  @IsNotEmpty()
  @IsIn(EVENT_STATUSES)
  status: string;

  @IsString()
  @IsNotEmpty()
  actionName: string;

  @IsOptional()
  @IsString()
  comment?: string;
}
