import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import MobileTopNav from "../../components/MobileTopNav";
import { AuthProvider } from "../../context/AuthContext";
import { CityProvider } from "../../context/CityContext";
import type { ReactNode } from "react";

function Wrapper({ children }: { children: ReactNode }) {
  return (
    <MemoryRouter initialEntries={["/schools"]}>
      <AuthProvider>
        <CityProvider>{children}</CityProvider>
      </AuthProvider>
    </MemoryRouter>
  );
}

describe("MobileTopNav", () => {
  it("рендерить логотип СВІТЛО ЗНАНЬ", () => {
    render(<MobileTopNav />, { wrapper: Wrapper });
    expect(screen.getByText("СВІТЛО ЗНАНЬ")).toBeTruthy();
  });

  it("рендерить іконки навігації", () => {
    render(<MobileTopNav />, { wrapper: Wrapper });
    const links = screen.getAllByRole("link");
    expect(links.length).toBeGreaterThanOrEqual(4);
  });

  it("активна вкладка має клас bg-blue-600", () => {
    render(<MobileTopNav />, { wrapper: Wrapper });
    const links = screen.getAllByLabelText("Школи");
    expect(links.length).toBeGreaterThanOrEqual(1);
    for (const link of links) {
      expect(link.className).toContain("bg-blue-600");
    }
  });
});
