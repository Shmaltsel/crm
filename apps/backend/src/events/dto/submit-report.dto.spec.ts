import 'reflect-metadata';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { SubmitReportDto } from './submit-report.dto';

const validPayload = {
  announcementDone: true,
  materialShown: true,
  childrenCount: 100,
  classesCount: 4,
  privilegedCount: 5,
  showingsCount: 2,
  totalSum: 10000,
  schoolSum: 2000,
  remainderSum: 8000,
  rating: 5,
  expenses: [],
  salaries: [],
};

describe('SubmitReportDto', () => {
  it('проходить валідацію з коректними даними', async () => {
    const dto = plainToInstance(SubmitReportDto, validPayload);
    const errors = await validate(dto);
    expect(errors).toHaveLength(0);
  });

  it.each([
    'totalSum',
    'schoolSum',
    'childrenCount',
    'classesCount',
    'privilegedCount',
    'showingsCount',
  ])("відхиляє від'ємне значення поля %s", async (field) => {
    const dto = plainToInstance(SubmitReportDto, {
      ...validPayload,
      [field]: -1,
    });
    const errors = await validate(dto);
    expect(errors.some((e) => e.property === field)).toBe(true);
  });

  it("дозволяє remainderSum бути від'ємним (немає @Min обмеження в DTO)", async () => {
    const dto = plainToInstance(SubmitReportDto, {
      ...validPayload,
      remainderSum: -500,
    });
    const errors = await validate(dto);
    expect(errors.some((e) => e.property === 'remainderSum')).toBe(false);
  });

  it('відхиляє rating більше 10', async () => {
    const dto = plainToInstance(SubmitReportDto, {
      ...validPayload,
      rating: 11,
    });
    const errors = await validate(dto);
    expect(errors.some((e) => e.property === 'rating')).toBe(true);
  });

  it('rating є опціональним', async () => {
    const { rating, ...rest } = validPayload;
    const dto = plainToInstance(SubmitReportDto, rest);
    const errors = await validate(dto);
    expect(errors).toHaveLength(0);
  });

  it('трансформує рядкові числа в number через @Type(() => Number)', async () => {
    const dto = plainToInstance(SubmitReportDto, {
      ...validPayload,
      totalSum: '10000' as unknown as number,
    });
    expect(typeof dto.totalSum).toBe('number');
    expect(dto.totalSum).toBe(10000);
  });

  it('відхиляє expense item без amount', async () => {
    const dto = plainToInstance(SubmitReportDto, {
      ...validPayload,
      expenses: [{ category: 'Транспорт', name: 'Пальне' }],
    });
    const errors = await validate(dto);
    expect(errors.some((e) => e.property === 'expenses')).toBe(true);
  });

  it("відхиляє від'ємну суму витрати (вкладена валідація ExpenseItemDto)", async () => {
    const dto = plainToInstance(SubmitReportDto, {
      ...validPayload,
      expenses: [{ category: 'Транспорт', name: 'Пальне', amount: -100 }],
    });
    const errors = await validate(dto);
    expect(errors.some((e) => e.property === 'expenses')).toBe(true);
  });

  it('відхиляє salary item без userId', async () => {
    const dto = plainToInstance(SubmitReportDto, {
      ...validPayload,
      salaries: [{ name: 'Іван', amount: 500 }],
    });
    const errors = await validate(dto);
    expect(errors.some((e) => e.property === 'salaries')).toBe(true);
  });
});
