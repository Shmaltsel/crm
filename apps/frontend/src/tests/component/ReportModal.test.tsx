import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import ReportModal from "../../components/school-profile/modals/ReportModal";

describe("ReportModal", () => {
  const mockOnClose = vi.fn();
  const mockOnSave = vi.fn();
  const defaultProps = {
    isOpen: true,
    onClose: mockOnClose,
    onSave: mockOnSave,
    schoolName: "Школа №1",
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderModal = (props = {}) =>
    render(<ReportModal {...defaultProps} {...props} />);

  const findInputByLabel = (label: string): HTMLInputElement => {
    const labelEl = screen.getByText(label);
    const row = labelEl.closest(".flex")!;
    return row.querySelector('input[type="number"]')!;
  };

  it("не рендерить вміст коли isOpen=false", () => {
    renderModal({ isOpen: false });
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("рендерить форму коли isOpen=true", () => {
    renderModal();
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Звіт по події")).toBeInTheDocument();
    expect(screen.getByText("Загальна виручка")).toBeInTheDocument();
    expect(screen.getByText("Зберегти звіт")).toBeInTheDocument();
  });

  it("відображає назву школи", () => {
    renderModal({ schoolName: "Тестова школа" });
    expect(screen.getByText("Тестова школа")).toBeInTheDocument();
  });

  it("оновлює фінансові розрахунки при зміні totalSum", () => {
    renderModal();
    const totalSumInput = findInputByLabel("Загальна виручка");
    fireEvent.change(totalSumInput, { target: { value: "10000" } });
    const remainderEl = screen.getByText("Залишок (80%)").closest(".flex")!;
    expect(remainderEl.textContent).toMatch(/8[\s\u00A0]000/);
  });

  it("додавання витрати зменшує залишок", () => {
    renderModal();
    const totalSumInput = findInputByLabel("Загальна виручка");
    fireEvent.change(totalSumInput, { target: { value: "10000" } });
    fireEvent.change(screen.getByPlaceholderText("Назва витрати"), {
      target: { value: "Пальне" },
    });
    fireEvent.change(screen.getByPlaceholderText("грн"), {
      target: { value: "1000" },
    });
    fireEvent.click(screen.getByText("+"));
    const remainderEl = screen.getByText("Залишок (80%)").closest(".flex")!;
    expect(remainderEl.textContent).toMatch(/7[\s\u00A0]000/);
  });

  it("видалення витрати повертає залишок", () => {
    renderModal();
    const totalSumInput = findInputByLabel("Загальна виручка");
    fireEvent.change(totalSumInput, { target: { value: "10000" } });
    fireEvent.change(screen.getByPlaceholderText("Назва витрати"), {
      target: { value: "Пальне" },
    });
    fireEvent.change(screen.getByPlaceholderText("грн"), {
      target: { value: "1000" },
    });
    fireEvent.click(screen.getByText("+"));
    const removeButtons = screen.getAllByText("✕");
    fireEvent.click(removeButtons[1]);
    const remainderEl = screen.getByText("Залишок (80%)").closest(".flex")!;
    expect(remainderEl.textContent).toMatch(/8[\s\u00A0]000/);
  });

  it("onSave повертає коректні дані з усіма полями", () => {
    renderModal();
    const totalSumInput = findInputByLabel("Загальна виручка");
    fireEvent.change(totalSumInput, { target: { value: "20000" } });

    fireEvent.change(screen.getByPlaceholderText("Назва витрати"), {
      target: { value: "Пальне" },
    });
    fireEvent.change(screen.getByPlaceholderText("грн"), {
      target: { value: "500" },
    });
    fireEvent.click(screen.getByText("+"));

    fireEvent.click(screen.getByText("Зберегти звіт"));

    expect(mockOnSave).toHaveBeenCalledTimes(1);
    const data = mockOnSave.mock.calls[0][0];
    expect(data.totalSum).toBe(20000);
    expect(data.schoolSum).toBe(4000);
    expect(data.remainderSum).toBe(15500);
    expect(data.childrenCount).toBe(0);
    expect(data.expenses).toEqual([{ name: "Пальне", amount: 500 }]);
  });

  it("кнопка 'Скасувати' викликає onClose", () => {
    renderModal();
    fireEvent.click(screen.getByText("Скасувати"));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("кнопка закриття (✕) викликає onClose", () => {
    renderModal();
    fireEvent.click(screen.getByRole("button", { name: "Закрити" }));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("Escape закриває модал", () => {
    renderModal();
    fireEvent.keyDown(document, { key: "Escape" });
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
