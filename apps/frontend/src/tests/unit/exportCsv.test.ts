import { describe, it, expect, vi, beforeEach } from "vitest";
import { exportCsv } from "../../utils/exportCsv";

let capturedBlob: Blob | undefined;
const revokeObjectURL = vi.fn();

beforeEach(() => {
  vi.restoreAllMocks();
  capturedBlob = undefined;
  revokeObjectURL.mockClear();
  vi.stubGlobal("URL", {
    createObjectURL: vi.fn((blob: Blob) => {
      capturedBlob = blob;
      return "blob:mock";
    }),
    revokeObjectURL,
  });
});

describe("exportCsv", () => {
  it("нічого не робить для порожнього масиву", () => {
    exportCsv([]);
    expect(capturedBlob).toBeUndefined();
  });

  it("створює Blob з заголовками", async () => {
    exportCsv([{ name: "Test" }]);
    expect(capturedBlob).toBeDefined();
    expect(capturedBlob!.type).toBe("text/csv;charset=utf-8;bom=true");
    const text = await capturedBlob!.text();
    expect(text).toContain("name");
    expect(text).toMatch(/Test/);
  });

  it("генерує правильний CSV для простих даних", async () => {
    exportCsv([{ name: "Test", city: "Lviv" }]);
    const text = await capturedBlob!.text();
    expect(text).toContain("name,city");
    expect(text).toContain("Test,Lviv");
  });

  it("екранує коми, лапки та перенесення рядків", async () => {
    exportCsv([
      { name: "Smith, John", note: 'he said "hi"', desc: "line1\nline2" },
    ]);
    const text = await capturedBlob!.text();
    expect(text).toContain('"Smith, John"');
    expect(text).toContain('"he said ""hi"""');
    expect(text).toContain('"line1\nline2"');
  });

  it("додає елемент <a> в document.body і клікає", () => {
    const clickSpy = vi.fn();
    const origCreate = Element.prototype.cloneNode.name
      ? document.createElement
      : document.createElement;
    const realCreate = document.createElement.bind(document);
    vi.spyOn(document, "createElement").mockImplementation((tag) => {
      const el = realCreate(tag);
      el.click = clickSpy;
      return el;
    });
    const appendSpy = vi.spyOn(document.body, "appendChild");
    const removeSpy = vi.spyOn(document.body, "removeChild");

    exportCsv([{ col: "val" }]);

    expect(capturedBlob).toBeDefined();
    expect(appendSpy).toHaveBeenCalled();
    expect(removeSpy).toHaveBeenCalled();
    expect(clickSpy).toHaveBeenCalled();
    expect(appendSpy.mock.calls[0][0]).toBe(removeSpy.mock.calls[0][0]);
  });

  it("встановлює filename на <a>.download", () => {
    let anchor: HTMLAnchorElement | undefined;
    const realCreate = document.createElement.bind(document);
    vi.spyOn(document, "createElement").mockImplementation((tag) => {
      const el = realCreate(tag) as HTMLAnchorElement;
      anchor = el;
      return el;
    });

    exportCsv([{ col: "val" }], "my-report.csv");
    expect(anchor?.download).toBe("my-report.csv");
  });

  it("використовує дефолтний filename export.csv", () => {
    let anchor: HTMLAnchorElement | undefined;
    const realCreate = document.createElement.bind(document);
    vi.spyOn(document, "createElement").mockImplementation((tag) => {
      const el = realCreate(tag) as HTMLAnchorElement;
      anchor = el;
      return el;
    });

    exportCsv([{ col: "val" }]);
    expect(anchor?.download).toBe("export.csv");
  });

  it("викликає URL.revokeObjectURL після кліка", () => {
    const realCreate = document.createElement.bind(document);
    vi.spyOn(document, "createElement").mockImplementation((tag) => {
      return realCreate(tag);
    });

    exportCsv([{ col: "val" }]);
    expect(revokeObjectURL).toHaveBeenCalledWith("blob:mock");
  });

  it("порожні значення замінює на порожній рядок", async () => {
    exportCsv([
      { name: "Test", city: undefined as any, note: undefined as any },
    ]);
    const text = await capturedBlob!.text();
    expect(text).toContain("Test,,");
  });
});
