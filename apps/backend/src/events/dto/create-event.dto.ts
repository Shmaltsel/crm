export class CreateEventDto {
  cityId: string;
  schoolId: string;

  project: string;

  date: string;
  time?: string;

  childrenPlanned?: number;

  price?: number;

  paymentMethod?: string;

  address?: string;

  contactPerson?: string;

  contactPhone?: string;

  equipment?: string;

  nextProject?: string;

  responsibleId?: string;
}
