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
];

const dayOff: DayOff = {
  id: "d-host-1",
  userId: "u-host",
  date: "2026-07-10",
  user: { id: "u-host", name: "Ведучий 1", role: "HOST", cityId: "city-1" },
};

describe("Smoke: Day-off flow", () => {
  it("відкривається і показує форматовану дату", () => {
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

  it("клік по працівнику без існуючого вихідного викликає onToggle", () => {
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
});
