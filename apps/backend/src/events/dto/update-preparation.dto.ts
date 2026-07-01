import { IsEnum, IsIn } from 'class-validator';
import { PreparationStatus } from '@prisma/client';

const PREPARATION_FIELDS = [
  'assignCrew',
  'bookEquipment',
  'prepareDocs',
  'prepareMaterials',
  'remindSchool',
] as const;

export class UpdatePreparationDto {
  @IsIn(PREPARATION_FIELDS)
  field: (typeof PREPARATION_FIELDS)[number];

  @IsEnum(PreparationStatus)
  status: PreparationStatus;
}
