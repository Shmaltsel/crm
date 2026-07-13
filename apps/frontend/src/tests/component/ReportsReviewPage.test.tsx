import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import ReportsReviewPage from "../../features/reports/pages/ReportsReviewPage";

const mockApprove = vi.fn();

vi.mock("../../hooks/useReports", () => ({
  useSubmittedReports: () => ({
    data: [
      {
        id: "r-1",
        status: "SUBMITTED",
        eventId: "ev-1",
        childrenCount: 95,
        classesCount: 3,
        privilegedCount: 10,
        showingsCount: 2,
        totalSum: 9800,
        schoolSum: 1200,
        remainderSum: 8600,
        rating: 9,
        expenseItems: [],
        salaryRecords: [
          { id: "s1", employee: { name: "Ведучий" }, amount: 1500 },
          { id: "s2", employee: { name: "Водій" }, amount: 1000 },
        ],
        event: {
          project: "Голограма",
          date: "2026-07-01T10:00:00Z",
          contactPerson: "Директор",
          address: "вул. Тестова",
          crew: {
            host: { name: "Ведучий" },
            driver: { name: "Водій" },
          },
          city: { name: "Львів" },
          school: { name: "Школа №1", type: "Школа" },
        },
      },
    ],
    isLoading: false,
  }),
  useApproveReport: () => ({ mutate: mockApprove, isPending: false }),
  useRejectReport: () => ({ mutate: vi.fn(), isPending: false }),
}));

vi.mock("../../hooks/useSalary", () => ({
  useCreateSalary: () => ({ mutate: vi.fn(), isPending: false }),
}));

vi.mock("../../hooks/useEmployees", () => ({
  useUsers: () => ({ data: [] }),
}));

vi.mock("../../hooks/useDayOffRequests", () => ({
  useDayOffRequests: () => ({ data: [], isLoading: false }),
  useApproveDayOffRequest: () => ({ mutate: vi.fn(), isPending: false }),
  useRejectDayOffRequest: () => ({ mutate: vi.fn(), isPending: false }),
}));

vi.mock("../../context/AuthContext", () => ({
  useAuth: () => ({
    user: { id: "u-1", name: "Manager", role: "MANAGER", cityId: "city-1" },
  }),
}));

vi.mock("../../utils/roles", () => ({
  hasRole: (role: string, allowed: string[]) => allowed.includes(role),
}));

describe("ReportsReviewPage", () => {
  beforeEach(() => {
    mockApprove.mockClear();
  });

  it("відкриває звіт і показує редаговані поля зарплат", () => {
    render(<ReportsReviewPage />);
    fireEvent.click(screen.getByText("Школа №1"));
    expect(screen.getByText("Зарплати (редаговано менеджером)")).toBeInTheDocument();
    const inputs = screen.getAllByDisplayValue("1500");
    expect(inputs.length).toBeGreaterThan(0);
  });

  it("викликає approve з відредагованою сумою, а не з дефолтною", () => {
    render(<ReportsReviewPage />);
    fireEvent.click(screen.getByText("Школа №1"));

    const input = screen.getAllByDisplayValue("1500")[0] as HTMLInputElement;
    fireEvent.change(input, { target: { value: "999" } });

    fireEvent.click(screen.getByText("Затвердити"));

    expect(mockApprove).toHaveBeenCalledTimes(1);
    expect(mockApprove).toHaveBeenCalledWith(
      {
        id: "r-1",
        salaries: expect.arrayContaining([
          { id: "s1", amount: 999 },
          { id: "s2", amount: 1000 },
        ]),
      },
      expect.objectContaining({ onError: expect.any(Function) }),
    );
  });

  it("блокує затвердження при сумі поза діапазоном (0)", () => {
    render(<ReportsReviewPage />);
    fireEvent.click(screen.getByText("Школа №1"));

    const input = screen.getAllByDisplayValue("1500")[0] as HTMLInputElement;
    fireEvent.change(input, { target: { value: "0" } });

    const button = screen.getByText("Затвердити") as HTMLButtonElement;
    expect(button).toBeDisabled();
  });
});
