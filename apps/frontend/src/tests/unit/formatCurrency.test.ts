import { describe, it, expect } from "vitest";
import { formatCurrency } from "../../utils/formatCurrency";

describe("formatCurrency", () => {
  it("форматує ціле число з розділювачем тисяч (uk-UA)", () => {
    expect(formatCurrency(10000)).toBe("10\u00A0000");
  });

  it("округлює дробові суми вгору/вниз коректно", () => {
    expect(formatCurrency(9999.6)).toBe("10\u00A0000");
    expect(formatCurrency(9999.4)).toBe("9\u00A0999");
  });

  it("повертає 0 для undefined", () => {
    expect(formatCurrency(undefined)).toBe("0");
  });

  it("повертає 0 для null", () => {
    expect(formatCurrency(null)).toBe("0");
  });

  it("повертає 0 для NaN", () => {
    expect(formatCurrency(NaN)).toBe("0");
  });

  it("коректно форматує 0", () => {
    expect(formatCurrency(0)).toBe("0");
  });

  it("не ламається на дуже великих сумах", () => {
    expect(formatCurrency(12345678)).toBe("12\u00A0345\u00A0678");
  });

  it("від'ємні суми форматуються з мінусом", () => {
    expect(formatCurrency(-500)).toBe("-500");
  });
});
