import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ConfirmDialog } from "../../components/ui/ConfirmDialog";

describe("ConfirmDialog", () => {
  it("не рендериться, якщо isOpen=false", () => {
    render(
      <ConfirmDialog
        isOpen={false}
        title="Видалити"
        message="Справді?"
        onConfirm={vi.fn()}
        onCancel={vi.fn()}
      />,
    );
    expect(screen.queryByText("Видалити")).not.toBeInTheDocument();
    expect(screen.queryByText("Справді?")).not.toBeInTheDocument();
  });

  it("рендериться, коли isOpen=true", () => {
    render(
      <ConfirmDialog
        isOpen={true}
        title="Видалити"
        message="Справді?"
        onConfirm={vi.fn()}
        onCancel={vi.fn()}
      />,
    );
    expect(screen.getByText("Видалити")).toBeInTheDocument();
    expect(screen.getByText("Справді?")).toBeInTheDocument();
  });

  it("кнопка Підтвердити викликає onConfirm", () => {
    const onConfirm = vi.fn();
    render(
      <ConfirmDialog
        isOpen={true}
        title="Видалити"
        message="Справді?"
        onConfirm={onConfirm}
        onCancel={vi.fn()}
      />,
    );
    fireEvent.click(screen.getByText("Підтвердити"));
    expect(onConfirm).toHaveBeenCalledTimes(1);
  });

  it("кнопка Скасувати викликає onCancel", () => {
    const onCancel = vi.fn();
    render(
      <ConfirmDialog
        isOpen={true}
        title="Видалити"
        message="Справді?"
        onConfirm={vi.fn()}
        onCancel={onCancel}
      />,
    );
    fireEvent.click(screen.getByText("Скасувати"));
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it("клік на backdrop викликає onCancel", () => {
    const onCancel = vi.fn();
    const { container } = render(
      <ConfirmDialog
        isOpen={true}
        title="Видалити"
        message="Справді?"
        onConfirm={vi.fn()}
        onCancel={onCancel}
      />,
    );
    const backdrop = container.querySelector(".fixed.inset-0")!;
    fireEvent.click(backdrop);
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it("клік всередині модалки не викликає onCancel", () => {
    const onCancel = vi.fn();
    render(
      <ConfirmDialog
        isOpen={true}
        title="Видалити"
        message="Справді?"
        onConfirm={vi.fn()}
        onCancel={onCancel}
      />,
    );
    fireEvent.click(screen.getByText("Видалити"));
    expect(onCancel).not.toHaveBeenCalled();
  });

  it("показує іконку Trash2 для variant=danger", () => {
    const { container } = render(
      <ConfirmDialog
        isOpen={true}
        title="Видалити"
        message="Справді?"
        variant="danger"
        onConfirm={vi.fn()}
        onCancel={vi.fn()}
      />,
    );
    expect(container.innerHTML).toContain("lucide-trash2");
  });

  it("показує іконку AlertTriangle для variant=warning", () => {
    const { container } = render(
      <ConfirmDialog
        isOpen={true}
        title="Увага"
        message="Перевірте дані"
        variant="warning"
        onConfirm={vi.fn()}
        onCancel={vi.fn()}
      />,
    );
    expect(container.innerHTML).toContain("lucide-triangle-alert");
  });

  it("використовує confirmLabel за замовчуванням", () => {
    render(
      <ConfirmDialog
        isOpen={true}
        title="Видалити"
        message="Справді?"
        onConfirm={vi.fn()}
        onCancel={vi.fn()}
      />,
    );
    expect(screen.getByText("Підтвердити")).toBeInTheDocument();
  });

  it("використовує кастомний confirmLabel", () => {
    render(
      <ConfirmDialog
        isOpen={true}
        title="Видалити"
        message="Справді?"
        confirmLabel="Так, видалити"
        onConfirm={vi.fn()}
        onCancel={vi.fn()}
      />,
    );
    expect(screen.getByText("Так, видалити")).toBeInTheDocument();
  });
});
