import { describe, it, expect } from "vitest";
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
  it("рендерить назву СВІТЛО ЗНАНЬ", () => {
    render(<MobileTopNav />, { wrapper: Wrapper });
    expect(screen.getByText("СВІТЛО ЗНАНЬ")).toBeTruthy();
  });

  it("рендерить назву міста", () => {
    render(<MobileTopNav />, { wrapper: Wrapper });
    const cityTexts = screen.getAllByText(/.+/);
    expect(cityTexts.length).toBeGreaterThanOrEqual(2);
  });

  it("не містить клікабельних посилань", () => {
    render(<MobileTopNav />, { wrapper: Wrapper });
    const links = screen.queryAllByRole("link");
    expect(links.length).toBe(0);
  });
});
