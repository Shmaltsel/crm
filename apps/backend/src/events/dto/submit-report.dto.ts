export class SubmitReportDto {
  announcementDone: boolean;
  materialShown: boolean;

  childrenCount: number;
  classesCount: number;
  privilegedCount: number;
  showingsCount: number;

  totalSum: number;
  schoolSum: number;

  expenses: any[];

  remainderSum: number;

  rating?: number;
}
