import { describe, it, expect, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useDebounce } from "../../hooks/useDebounce";

describe("useDebounce", () => {
  it("повертає початкове значення одразу", () => {
    const { result } = renderHook(() => useDebounce("hello", 500));
    expect(result.current).toBe("hello");
  });

  it("оновлює debouncedValue після затримки", async () => {
    vi.useFakeTimers();
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 500),
      { initialProps: { value: "a" } },
    );

    expect(result.current).toBe("a");

    rerender({ value: "b" });
    expect(result.current).toBe("a");

    act(() => vi.advanceTimersByTime(500));
    expect(result.current).toBe("b");

    vi.useRealTimers();
  });

  it("скидає таймер при повторному виклику до завершення затримки", () => {
    vi.useFakeTimers();
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 500),
      { initialProps: { value: "a" } },
    );

    rerender({ value: "b" });
    act(() => vi.advanceTimersByTime(300));
    rerender({ value: "c" });
    act(() => vi.advanceTimersByTime(300));
    expect(result.current).toBe("a");

    act(() => vi.advanceTimersByTime(200));
    expect(result.current).toBe("c");

    vi.useRealTimers();
  });

  it("працює з числовими значеннями", () => {
    vi.useFakeTimers();
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 100),
      { initialProps: { value: 0 } },
    );

    rerender({ value: 42 });
    act(() => vi.advanceTimersByTime(100));
    expect(result.current).toBe(42);

    vi.useRealTimers();
  });

  it("працює з delay=0", () => {
    vi.useFakeTimers();
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 0),
      { initialProps: { value: "x" } },
    );

    rerender({ value: "y" });
    act(() => vi.advanceTimersByTime(0));
    expect(result.current).toBe("y");

    vi.useRealTimers();
  });
});
