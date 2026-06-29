import { IsString, IsNumber, IsNotEmpty, IsPositive } from 'class-validator';

export class CreateExpenseItemDto {
  @IsString()
  @IsNotEmpty()
  category: string;

  @IsNumber()
  @IsPositive() // Гарантує, що сума витрат буде > 0
  amount: number;

  @IsString()
  @IsNotEmpty()
  reportId: string;
}
