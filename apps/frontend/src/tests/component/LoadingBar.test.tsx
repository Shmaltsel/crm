import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { LoadingBar } from "../../components/ui/LoadingBar";

describe("LoadingBar", () => {
  it("рендериться, коли isLoading=true", () => {
    const { container } = render(<LoadingBar isLoading={true} />);
    expect(container.querySelector(".fixed.top-0")).toBeInTheDocument();
  });

  it("не рендериться, коли isLoading=false", () => {
    const { container } = render(<LoadingBar isLoading={false} />);
    expect(container.querySelector(".fixed.top-0")).not.toBeInTheDocument();
  });

  it("має правильні CSS-класи для позиціонування", () => {
    const { container } = render(<LoadingBar isLoading={true} />);
    const bar = container.querySelector(".fixed.top-0")!;
    expect(bar).toHaveClass("left-0", "right-0", "z-[60]", "h-0.5");
  });
});
