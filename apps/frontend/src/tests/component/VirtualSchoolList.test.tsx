import { render, screen } from "@testing-library/react";
import VirtualSchoolList from "../../components/VirtualSchoolList";
import type { School } from "../../types";
import { vi } from "vitest";

vi.mock("@tanstack/react-virtual", () => ({
  useVirtualizer: () => ({
    getVirtualItems: () => [
      { index: 0, start: 0, size: 50, key: "0" },
      { index: 1, start: 50, size: 50, key: "1" },
    ],
    getTotalSize: () => 100,
  }),
}));

describe("VirtualSchoolList", () => {
  it("renders a list of items using renderItem", () => {
    const schools: School[] = [
      { id: "1", name: "School 1", cityId: "c1", type: "Школа" } as School,
      { id: "2", name: "School 2", cityId: "c1", type: "Школа" } as School,
    ];

    render(
      <VirtualSchoolList
        schools={schools}
        renderItem={(school) => <div data-testid="school-item">{school.name}</div>}
      />
    );

    const items = screen.getAllByTestId("school-item");
    expect(items.length).toBe(2);
    expect(screen.getByText("School 1")).toBeInTheDocument();
    expect(screen.getByText("School 2")).toBeInTheDocument();
  });
});
