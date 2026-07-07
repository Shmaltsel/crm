import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import DayOffModal from "../../components/calendar/DayOffModal";
import type { DayOff } from "../../hooks/useDaysOff";

function makeDate() {
  return new Date(2026, 6, 10);
}

const staff = [
  { id: "u-host", name: "Ведучий 1", role: "HOST" },
  { id: "u-driver", name: "Водій 1", role: "DRIVER" },
  { id: "u-other", name: "Інший 1", role: "OTHER" },
];

const dayOff: DayOff = {
  id: "d-host-1",
  userId: "u-host",
  date: "2026-07-10",
  user: { id: "u-host", name: "Ведучий 1", role: "HOST", cityId: "city-1" },
};

describe("DayOffModal", () => {
  it("не рендериться, якщо isOpen=false", () => {
    render(
      <DayOffModal
        isOpen={false}
        onClose={vi.fn()}
        date={makeDate()}
        staff={staff}
        dayOffs={[dayOff]}
        onToggle={vi.fn()}
      />,
    );

    expect(screen.queryByText(/Оберіть співробітника/)).not.toBeInTheDocument();
  });

  it("не рендериться, якщо date=null", () => {
    render(
      <DayOffModal
        isOpen={true}
        onClose={vi.fn()}
        date={null}
        staff={staff}
        dayOffs={[dayOff]}
        onToggle={vi.fn()}
      />,
    );

    expect(screen.queryByText(/Оберіть співробітника/)).not.toBeInTheDocument();
  });

  it("рендериться в document.body через portal і показує форматовану дату", () => {
    const date = makeDate();
    const expectedDate = date.toLocaleDateString("uk-UA", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });

    render(
      <DayOffModal
        isOpen={true}
        onClose={vi.fn()}
        date={date}
        staff={staff}
        dayOffs={[dayOff]}
        onToggle={vi.fn()}
      />,
    );

    expect(document.body).toContainElement(
      screen.getByText(`Вихідний на ${expectedDate}`),
    );
  });

  it("кнопка закриття викликає onClose", () => {
    const onClose = vi.fn();

    render(
      <DayOffModal
        isOpen={true}
        onClose={onClose}
        date={makeDate()}
        staff={staff}
        dayOffs={[dayOff]}
        onToggle={vi.fn()}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: "Закрити" }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("для порожнього staff показує повідомлення про відсутність співробітників", () => {
    render(
      <DayOffModal
        isOpen={true}
        onClose={vi.fn()}
        date={makeDate()}
        staff={[]}
        dayOffs={[]}
        onToggle={vi.fn()}
      />,
    );

    expect(
      screen.getByText("Немає співробітників у цьому місті"),
    ).toBeInTheDocument();
  });

  it("рендерить іконки ролей HOST/DRIVER і fallback для невідомої ролі", () => {
    render(
      <DayOffModal
        isOpen={true}
        onClose={vi.fn()}
        date={makeDate()}
        staff={staff}
        dayOffs={[]}
        onToggle={vi.fn()}
      />,
    );

    expect(screen.getByText("🎙️")).toBeInTheDocument();
    expect(screen.getByText("🚗")).toBeInTheDocument();
    expect(screen.getByText("👤")).toBeInTheDocument();
  });

  it("для existing dayOff показує статус 'Вихідний ✕', інакше 'Призначити'", () => {
    render(
      <DayOffModal
        isOpen={true}
        onClose={vi.fn()}
        date={makeDate()}
        staff={staff}
        dayOffs={[dayOff]}
        onToggle={vi.fn()}
      />,
    );

    expect(screen.getByText("Вихідний ✕")).toBeInTheDocument();
    expect(screen.getAllByText("Призначити").length).toBeGreaterThan(0);
  });

  it("клік по staff без existing викликає onToggle(userId, undefined)", () => {
    const onToggle = vi.fn();

    render(
      <DayOffModal
        isOpen={true}
        onClose={vi.fn()}
        date={makeDate()}
        staff={staff}
        dayOffs={[dayOff]}
        onToggle={onToggle}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: /Водій 1/ }));
    expect(onToggle).toHaveBeenCalledWith("u-driver", undefined);
  });

  it("клік по staff з existing викликає onToggle(userId, existingId)", () => {
    const onToggle = vi.fn();

    render(
      <DayOffModal
        isOpen={true}
        onClose={vi.fn()}
        date={makeDate()}
        staff={staff}
        dayOffs={[dayOff]}
        onToggle={onToggle}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: /Ведучий 1/ }));
    expect(onToggle).toHaveBeenCalledWith("u-host", "d-host-1");
  });

  it("якщо у dayOffs дубль по userId — бере перший знайдений", () => {
    const onToggle = vi.fn();
    const duplicate: DayOff[] = [
      dayOff,
      { ...dayOff, id: "d-host-2" },
    ];

    render(
      <DayOffModal
        isOpen={true}
        onClose={vi.fn()}
        date={makeDate()}
        staff={staff}
        dayOffs={duplicate}
        onToggle={onToggle}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: /Ведучий 1/ }));
    expect(onToggle).toHaveBeenCalledWith("u-host", "d-host-1");
  });

  it("шукає existing dayOff лише за userId (дата ігнорується — upstream вже відфільтрував)", () => {
    const dayOffOtherDate: DayOff = {
      ...dayOff,
      id: "d-date-mismatch",
      date: "1999-01-01",
    };

    render(
      <DayOffModal
        isOpen={true}
        onClose={vi.fn()}
        date={makeDate()}
        staff={staff}
        dayOffs={[dayOffOtherDate]}
        onToggle={vi.fn()}
      />,
    );

    expect(screen.getByText("Вихідний ✕")).toBeInTheDocument();
  });
});
