import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import CompletedEventModal from "../../components/school-profile/CompletedEventModal";
import type { Event } from "../../types";

describe("CompletedEventModal", () => {
  it("не кидає виняток при event=null та isOpen=false", () => {
    const onClose = vi.fn();
    expect(() =>
      render(
        <CompletedEventModal isOpen={false} onClose={onClose} event={null} />,
      ),
    ).not.toThrow();
    expect(screen.queryByText(/Звіт:/)).not.toBeInTheDocument();
  });

  it("не кидає виняток при event=null та isOpen=true", () => {
    const onClose = vi.fn();
    expect(() =>
      render(
        <CompletedEventModal isOpen={true} onClose={onClose} event={null} />,
      ),
    ).not.toThrow();
  });

  it("рендерить фінансові блоки для завершеної події зі звітом", () => {
    const fullEvent = {
      id: "ev-1",
      project: "Голограма для школи",
      date: "2026-07-01T10:00:00Z",
      report: {
        childrenCount: 95,
        classesCount: 3,
        privilegedCount: 10,
        showingsCount: 2,
        rating: 9,
        totalSum: 9800,
        schoolSum: 1200,
        remainderSum: 8600,
        expenseItems: [{ id: "e1", name: "Транспорт", category: "Інше", amount: 500 }],
        salaryRecords: [
          { id: "s1", employee: { name: "Ведучий" }, amount: 1500 },
        ],
      },
    } as unknown as Event;

    render(
      <CompletedEventModal
        isOpen={true}
        onClose={vi.fn()}
        event={fullEvent}
      />,
    );

    expect(screen.getByText("Звіт: Голограма для школи")).toBeInTheDocument();
    expect(screen.getByText("💰 Фінанси")).toBeInTheDocument();
    expect(screen.getByText("👥 Зарплати")).toBeInTheDocument();
    expect(screen.getAllByText(/грн/).length).toBeGreaterThan(0);
  });
});
