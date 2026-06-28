import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { SchoolCard } from "../../components/schools/SchoolMobileList";

const STAGES = [
  { key: "BASE", name: "Новий заклад" },
  { key: "FIRST_CONTACT", name: "Знайомство" },
];

const mockSchool = {
  id: "school-1",
  name: "Школа №1",
  director: "Іван Петренко",
  phone: "0671234567",
  events: [{ status: "BASE" }],
};

describe("SchoolCard", () => {
  it("відображає назву школи", () => {
    render(
      <MemoryRouter>
        <SchoolCard
          school={mockSchool}
          onDelete={vi.fn()}
          stages={STAGES}
          index={0}
        />
      </MemoryRouter>,
    );
    expect(screen.getByText("Школа №1")).toBeInTheDocument();
  });

  it("відображає директора", () => {
    render(
      <MemoryRouter>
        <SchoolCard
          school={mockSchool}
          onDelete={vi.fn()}
          stages={STAGES}
          index={0}
        />
      </MemoryRouter>,
    );
    expect(screen.getByText(/Іван Петренко/)).toBeInTheDocument();
  });

  it("відображає поточний етап", () => {
    render(
      <MemoryRouter>
        <SchoolCard
          school={mockSchool}
          onDelete={vi.fn()}
          stages={STAGES}
          index={0}
        />
      </MemoryRouter>,
    );
    expect(screen.getByText("Новий заклад")).toBeInTheDocument();
  });

  it("викликає onDelete при натисканні", () => {
    const onDelete = vi.fn();
    render(
      <MemoryRouter>
        <SchoolCard
          school={mockSchool}
          onDelete={onDelete}
          stages={STAGES}
          index={0}
        />
      </MemoryRouter>,
    );
    fireEvent.click(screen.getByText("🗑"));
    expect(onDelete).toHaveBeenCalledWith(
      expect.any(Object),
      "school-1",
      "Школа №1",
    );
  });

  it("не показує етап якщо подій немає", () => {
    render(
      <MemoryRouter>
        <SchoolCard
          school={{ ...mockSchool, events: [] }}
          onDelete={vi.fn()}
          stages={STAGES}
          index={0}
        />
      </MemoryRouter>,
    );
    expect(screen.queryByText("Новий заклад")).not.toBeInTheDocument();
  });

  it("показує телефон якщо є", () => {
    render(
      <MemoryRouter>
        <SchoolCard
          school={mockSchool}
          onDelete={vi.fn()}
          stages={STAGES}
          index={0}
        />
      </MemoryRouter>,
    );
    expect(screen.getByText(/0671234567/)).toBeInTheDocument();
  });
});
