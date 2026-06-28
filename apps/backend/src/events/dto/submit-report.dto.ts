export class SubmitReportDto {
  announcementDone: boolean;
  materialShown: boolean;

  childrenCount: number;
  classesCount: number;
  privilegedCount: number;
  showingsCount: number;

  totalSum: number;
  schoolSum: number;

  expenses: Array<{
    category?: string;
    name?: string;
    amount: number;
  }>;

  remainderSum: number;

  rating?: number;

  salaries: Array<{
    userId: string;
    name: string;
    amount: number;
    role?: string;
  }>;
}
