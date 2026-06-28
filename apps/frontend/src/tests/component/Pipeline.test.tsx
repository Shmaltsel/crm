import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Pipeline from "../../components/school-profile/Pipeline";

const STAGES = [
  { id: 1, key: "BASE", name: "Новий заклад" },
  { id: 2, key: "FIRST_CONTACT", name: "Знайомство" },
  { id: 3, key: "DATE_CONFIRMED", name: "Підтвердження дати" },
];

describe("Pipeline", () => {
  it("відображає всі етапи", () => {
    render(
      <Pipeline
        currentStageIndex={0}
        currentEvent={{ id: "e1", status: "BASE" }}
        onPipelineClick={vi.fn()}
        stages={STAGES}
      />,
    );
    expect(screen.getByText("Новий заклад")).toBeInTheDocument();
    expect(screen.getByText("Знайомство")).toBeInTheDocument();
  });

  it("викликає onPipelineClick для наступного етапу", () => {
    const onClick = vi.fn();
    render(
      <Pipeline
        currentStageIndex={0}
        currentEvent={{ id: "e1", status: "BASE" }}
        onPipelineClick={onClick}
        stages={STAGES}
      />,
    );
    fireEvent.click(screen.getByText("2"));
    expect(onClick).toHaveBeenCalledWith(2);
  });

  it("не викликає onClick для недоступного етапу", () => {
    const onClick = vi.fn();
    render(
      <Pipeline
        currentStageIndex={0}
        currentEvent={{ id: "e1", status: "BASE" }}
        onPipelineClick={onClick}
        stages={STAGES}
      />,
    );
    fireEvent.click(screen.getByText("3"));
    expect(onClick).not.toHaveBeenCalled();
  });
});
