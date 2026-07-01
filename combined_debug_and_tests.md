# Файли для дебагу рендерингу та тестування Guard/Controller

### `apps/frontend/src/components/school-profile/EventsTable.tsx`

```typescript


import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import type { Event } from '../../types';

interface EventsTableProps {
  events: Event[];
  selectedEventId: string | null;
  onEventSelect: (id: string) => void;
  onDeleteSuccess: () => void;
}

export default function EventsTable({ events, selectedEventId, onEventSelect, onDeleteSuccess }: EventsTableProps) {
  
  const handleDelete = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (!window.confirm('Видалити цю подію?')) return;
    
    try {
      await axios.delete(`https://crm-57qd.onrender.com/events/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      onDeleteSuccess();
    } catch (error) {
      console.error('Помилка видалення:', error);
    }
  };

  if (events.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden mt-2 w-full">
      <div className="p-4 sm:p-6 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
        <h3 className="font-bold text-slate-800">Всі події ({events.length})</h3>
      </div>

      {/* Картки — мобільний вигляд */}
      <div className="md:hidden divide-y divide-slate-50">
        <AnimatePresence initial={false}>
        {events.map((ev, i) => (
          <motion.div
            key={ev.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2, delay: i * 0.04 }}
            onClick={() => onEventSelect(ev.id)}
            className={`flex items-center justify-between gap-3 p-4 transition-colors cursor-pointer ${selectedEventId === ev.id ? 'bg-blue-50/50' : 'active:bg-slate-50'}`}
          >
            <div className="min-w-0">
              <p className="font-medium text-slate-800">{ev.project}</p>
              <p className="text-xs text-slate-500 mt-0.5">{new Date(ev.date).toLocaleDateString()}</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="font-medium text-sm text-slate-700">{ev.price} грн</span>
              <button
                onClick={(e) => handleDelete(e, ev.id)}
                className="text-red-500 active:text-red-700 p-2"
              >
                🗑
              </button>
            </div>
          </motion.div>
        ))}
        </AnimatePresence>
      </div>

      {/* Таблиця — десктоп */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="bg-white border-b border-slate-100 text-slate-500">
              <th className="p-4">Дата</th>
              <th className="p-4">Проєкт</th>
              <th className="p-4">Вартість</th>
              <th className="p-4 text-center">Дія</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence initial={false}>
            {events.map((ev, i) => (
              <motion.tr
                key={ev.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18, delay: i * 0.03 }}
                onClick={() => onEventSelect(ev.id)}
                className={`border-b transition-colors cursor-pointer ${selectedEventId === ev.id ? 'bg-blue-50/50' : 'hover:bg-slate-50'}`}
              >
                <td className="p-4 font-medium">{new Date(ev.date).toLocaleDateString()}</td>
                <td className="p-4">{ev.project}</td>
                <td className="p-4">{ev.price} грн</td>
                <td className="p-4 text-center">
                  <button 
                    onClick={(e) => handleDelete(e, ev.id)}
                    className="text-red-500 hover:text-red-700 p-2"
                  >
                    🗑
                  </button>
                </td>
              </motion.tr>
            ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </div>
  );
}



```

---

### `apps/frontend/src/tests/component/SchoolCard.test.tsx`

```typescript
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

```

---

### `apps/frontend/src/components/schools/SchoolMobileList.tsx`

```typescript
import React from "react";
import { useNavigate } from "react-router-dom";
import type { School, PipelineStage } from "../../types";

interface Props {
  schools: School[];
  searchQuery: string;
  onDelete: (e: React.MouseEvent, id: string, name: string) => void;
  stages: PipelineStage[];
}

interface SchoolCardProps {
  school: School;
  onDelete: (e: React.MouseEvent, id: string, name: string) => void;
  stages: PipelineStage[];
  index?: number;
}

export const SchoolCard = React.memo(({ school, onDelete, stages, index = 0 }: SchoolCardProps) => {
  const navigate = useNavigate();
  const latestEvent = school.events?.[0];
  const stage = latestEvent
    ? stages.find((s) => s.key === latestEvent.status)
    : null;

  return (
    <div
      className="school-row-enter bg-white rounded-2xl border border-slate-100 p-4 shadow-sm transition-all hover:shadow-md hover:border-blue-200 cursor-pointer active:scale-[0.99]"
      style={{ animationDelay: `${Math.min(index * 40, 400)}ms`, animationFillMode: "both" }}
      onClick={() => navigate(`/schools/${school.id}`)}
    >
      <div className="flex items-start justify-between gap-2">
        <p className="font-semibold text-slate-800 leading-snug text-sm line-clamp-2 flex-1">
          {school.name}
        </p>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(e, school.id, school.name);
          }}
          className="text-slate-300 hover:text-red-500 hover:bg-red-50 transition-all p-2 rounded-lg"
        >
          🗑
        </button>
      </div>
      <div className="flex items-center justify-between gap-2 mt-2">
        {school.phone ? (
          <a
            href={`tel:${school.phone}`}
            onClick={(e) => e.stopPropagation()}
            className="text-xs text-blue-600 font-medium truncate"
          >
            📞 {school.director || school.phone}
          </a>
        ) : (
          <span className="text-xs text-slate-500 truncate">
            👤 {school.director || "Контакт не вказано"}
          </span>
        )}
        {stage && (
          <span className="text-[10px] px-2 py-0.5 bg-blue-50 text-blue-600 rounded-full font-medium border border-blue-100">
            {stage.name}
          </span>
        )}
      </div>
    </div>
  );
});

SchoolCard.displayName = "SchoolCard";

export default function SchoolMobileList({
  schools,
  searchQuery,
  onDelete,
  stages,
}: Props) {
  return (
    <>
      <style>{`
        @keyframes schoolRowIn {
          from { opacity: 0; transform: translateX(-14px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .school-row-enter {
          animation: schoolRowIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          opacity: 0;
        }
      `}</style>
      <div className="md:hidden flex-1 overflow-y-auto flex flex-col gap-3 pb-24 px-1 custom-scrollbar">
        {schools.map((school, index) => (
          <SchoolCard key={school.id} school={school} index={index} onDelete={onDelete} stages={stages} />
        ))}

        {schools.length === 0 && (
          <div className="text-center py-10 text-slate-400">
            <p>
              {searchQuery
                ? `Нічого не знайдено за «${searchQuery}»`
                : "Шкіл ще немає"}
            </p>
          </div>
        )}
      </div>
    </>
  );
}

```

---

### `apps/frontend/src/hooks/useSchools.ts`

```typescript
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../config/api";

const h = () => ({ Authorization: `Bearer ${localStorage.getItem("token")}` });

export function useSchoolsList() {
  return useQuery({
    queryKey: ["schools"],
    queryFn: () =>
      api.get("/schools?minimal=true", { headers: h() }).then(r => r.data),
    staleTime: 2 * 60 * 1000,
  });
}

export function useCreateSchool() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (form: any) =>
      api.post("/schools", { ...form, type: "Школа" }, { headers: h() }).then(r => r.data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["schools"] }),
  });
}

export function useDeleteSchool() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      api.delete(`/schools/${id}`, { headers: h() }).then(r => r.data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["schools"] }),
  });
}

export function useBulkImport() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ cityId, type }: { cityId: string; type: string }) =>
      api.post("/schools/bulk-import", { cityId, type }, {
        headers: h(),
        timeout: 120000,
      }).then(r => r.data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["schools"] }),
  });
}
```

---

### `apps/frontend/src/tests/unit/hooks/useSchools.test.ts`

```typescript
import { describe, it, expect, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createElement } from "react";

vi.mock("../../../hooks/useSchools", () => ({
  useSchoolsList: vi.fn(() => ({
    data: [
      {
        id: "school-1",
        name: "Школа №1",
        type: "Школа",
        cityId: "city-1",
        childrenCount: 300,
        events: [],
      },
      {
        id: "school-2",
        name: "Школа №5",
        type: "Школа",
        cityId: "city-1",
        childrenCount: 100,
        events: [],
      },
    ],
    isLoading: false,
    isSuccess: true,
  })),
}));

import { useSchoolsList } from "../../../hooks/useSchools";

const makeWrapper = () => {
  const qc = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return ({ children }: { children: React.ReactNode }) =>
    createElement(QueryClientProvider, { client: qc, children });
};

describe("useSchoolsList", () => {
  it("повертає список шкіл", async () => {
    const { result } = renderHook(() => useSchoolsList(), {
      wrapper: makeWrapper(),
    });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toHaveLength(2);
    expect(result.current.data?.[0].name).toBe("Школа №1");
  });

  it("isLoading на початку", () => {
    const { result } = renderHook(() => useSchoolsList(), {
      wrapper: makeWrapper(),
    });
    expect(result.current.isLoading).toBe(true);
  });
});

```

---

### `apps/frontend/src/components/schools/schoolUtils.ts`

```typescript
import type { School } from "../../types";

const PLANNED_STAGES = ["BASE", "FIRST_CONTACT", "DATE_CONFIRMED"];
const IN_PROGRESS_STAGES = ["PREPARATION", "IN_PROGRESS", "DONE", "REPORT"];

export function classifySchool(
  school: School,
): "new" | "planned" | "inProgress" | "done" {
  const events = (school.events || []).filter(
    (e) => e.status !== "RE_SALE",
  );
  if (events.length === 0) {
    return (school.events || []).some((e) => e.status === "RE_SALE")
      ? "done"
      : "new";
  }
  const latest = events[events.length - 1];
  if (PLANNED_STAGES.includes(latest.status)) return "planned";
  if (IN_PROGRESS_STAGES.includes(latest.status)) return "inProgress";
  if (latest.status === "RE_SALE") return "done";
  return "new";
}

export function classifySize(
  school: School,
  schoolType: "Школа" | "Садочок" = "Школа",
): "small" | "medium" | "large" {
  const count = school.childrenCount ?? 0;
  if (schoolType === "Садочок") {
    if (count < 50) return "small";
    if (count < 100) return "medium";
    return "large";
  }
  if (count < 500) return "small";
  if (count < 900) return "medium";
  return "large";
}

```

---

### `apps/frontend/src/tests/unit/hooks/useSchoolsFilter.test.ts`

```typescript
import { describe, it, expect, vi } from "vitest";
import { renderHook } from "@testing-library/react";

vi.mock("../../../hooks/useSchools", () => ({
  useSchoolsList: vi.fn(() => ({
    data: [
      {
        id: "s-1",
        name: "Школа №1",
        type: "Школа",
        cityId: "city-1",
        childrenCount: 300,
        events: [],
      },
      {
        id: "s-2",
        name: "Школа №5",
        type: "Школа",
        cityId: "city-1",
        childrenCount: 100,
        events: [{ status: "FIRST_CONTACT" }],
      },
      {
        id: "s-3",
        name: "Садочок №1",
        type: "Садочок",
        cityId: "city-1",
        childrenCount: 60,
        events: [],
      },
      {
        id: "s-4",
        name: "Школа №10",
        type: "Школа",
        cityId: "city-2",
        childrenCount: 800,
        events: [{ status: "IN_PROGRESS" }],
      },
    ],
    isLoading: false,
    isSuccess: true,
  })),
}));

vi.mock("../../../components/schools/schoolUtils", () => ({
  classifySchool: (s: any) => {
    if (!s.events?.length) return "new";
    const status = s.events[0].status;
    if (["FIRST_CONTACT", "DATE_CONFIRMED"].includes(status)) return "planned";
    if (["IN_PROGRESS", "PREPARATION"].includes(status)) return "inProgress";
    return "new";
  },
  classifySize: (s: any, type: string) => {
    const count = s.childrenCount ?? 0;
    if (type === "Садочок") {
      if (count < 50) return "small";
      if (count < 100) return "medium";
      return "large";
    }
    if (count < 500) return "small";
    if (count < 900) return "medium";
    return "large";
  },
}));

import { useSchoolsList } from "../../../hooks/useSchools";
import {
  classifySchool,
  classifySize,
} from "../../../components/schools/schoolUtils";

function filterSchools(
  schools: any[],
  {
    cityId,
    type,
    activeFilter,
    sizeFilter,
    search,
  }: {
    cityId?: string;
    type?: string;
    activeFilter?: string | null;
    sizeFilter?: string | null;
    search?: string;
  },
) {
  return schools.filter((s) => {
    if (cityId && s.cityId !== cityId) return false;
    if (type && s.type !== type) return false;
    if (activeFilter && classifySchool(s) !== activeFilter) return false;
    if (sizeFilter && classifySize(s, s.type) !== sizeFilter) return false;
    if (search) {
      const q = search.toLowerCase();
      return s.name?.toLowerCase().includes(q);
    }
    return true;
  });
}

describe("Фільтрація шкіл", () => {
  it("без фільтрів повертає всі школи", () => {
    const { result } = renderHook(() => useSchoolsList());
    const filtered = filterSchools(result.current.data!, {});
    expect(filtered).toHaveLength(4);
  });

  it("фільтр по cityId", () => {
    const { result } = renderHook(() => useSchoolsList());
    const filtered = filterSchools(result.current.data!, { cityId: "city-1" });
    expect(filtered).toHaveLength(3);
    expect(filtered.every((s) => s.cityId === "city-1")).toBe(true);
  });

  it("фільтр по type=Школа", () => {
    const { result } = renderHook(() => useSchoolsList());
    const filtered = filterSchools(result.current.data!, { type: "Школа" });
    expect(filtered).toHaveLength(3);
    expect(filtered.every((s) => s.type === "Школа")).toBe(true);
  });

  it("фільтр activeFilter=new — тільки нові", () => {
    const { result } = renderHook(() => useSchoolsList());
    const filtered = filterSchools(result.current.data!, {
      activeFilter: "new",
    });
    expect(filtered).toHaveLength(2);
  });

  it("фільтр activeFilter=planned", () => {
    const { result } = renderHook(() => useSchoolsList());
    const filtered = filterSchools(result.current.data!, {
      activeFilter: "planned",
    });
    expect(filtered).toHaveLength(1);
    expect(filtered[0].id).toBe("s-2");
  });

  it("фільтр activeFilter=inProgress", () => {
    const { result } = renderHook(() => useSchoolsList());
    const filtered = filterSchools(result.current.data!, {
      activeFilter: "inProgress",
    });
    expect(filtered).toHaveLength(1);
    expect(filtered[0].id).toBe("s-4");
  });

  it("фільтр sizeFilter=small для шкіл (< 500)", () => {
    const { result } = renderHook(() => useSchoolsList());
    const filtered = filterSchools(result.current.data!, {
      type: "Школа",
      sizeFilter: "small",
    });
    expect(filtered.every((s) => s.childrenCount < 500)).toBe(true);
  });

  it("фільтр sizeFilter=medium для шкіл (500-900)", () => {
    const { result } = renderHook(() => useSchoolsList());
    const filtered = filterSchools(result.current.data!, {
      type: "Школа",
      sizeFilter: "medium",
    });
    expect(filtered).toHaveLength(1);
    expect(filtered[0].id).toBe("s-4");
  });

  it("пошук по назві", () => {
    const { result } = renderHook(() => useSchoolsList());
    const filtered = filterSchools(result.current.data!, {
      search: "Школа №1",
    });
    expect(filtered).toHaveLength(1);
    expect(filtered[0].id).toBe("s-1");
  });

  it("пошук нечутливий до регістру", () => {
    const { result } = renderHook(() => useSchoolsList());
    const filtered = filterSchools(result.current.data!, {
      search: "школа №5",
    });
    expect(filtered).toHaveLength(1);
  });

  it("комбінований фільтр: city + type + activeFilter", () => {
    const { result } = renderHook(() => useSchoolsList());
    const filtered = filterSchools(result.current.data!, {
      cityId: "city-1",
      type: "Школа",
      activeFilter: "planned",
    });
    expect(filtered).toHaveLength(1);
    expect(filtered[0].id).toBe("s-2");
  });

  it("пошук без результатів повертає порожній масив", () => {
    const { result } = renderHook(() => useSchoolsList());
    const filtered = filterSchools(result.current.data!, {
      search: "xyznonsense",
    });
    expect(filtered).toHaveLength(0);
  });
});

```

---

### `apps/backend/src/auth/auth.guard.ts`

```typescript
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    
    if (!token) throw new UnauthorizedException('Токен не знайдено');

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET || 'super-secret-key-for-dev',
      });
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException('Недійсний токен');
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
```

---

### `apps/backend/src/users/users.controller.spec.ts`

```typescript
import { Test } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';

describe('UsersController', () => {
  it('should be defined', async () => {
    const module = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        { provide: UsersService, useValue: {} },
        { provide: AuthGuard, useValue: { canActivate: () => true } },
        { provide: RolesGuard, useValue: { canActivate: () => true } },
      ],
    }).compile();
    expect(module.get(UsersController)).toBeDefined();
  });
});

```

---

### `apps/backend/src/schools/schools.controller.spec.ts`

```typescript
import { Test } from '@nestjs/testing';
import { SchoolsController } from './schools.controller';
import { SchoolsService } from './schools.service';
import { ParserService } from './parser.service';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';

describe('SchoolsController', () => {
  it('should be defined', async () => {
    const module = await Test.createTestingModule({
      controllers: [SchoolsController],
      providers: [
        { provide: SchoolsService, useValue: {} },
        { provide: ParserService, useValue: {} },
        { provide: AuthGuard, useValue: { canActivate: () => true } },
        { provide: RolesGuard, useValue: { canActivate: () => true } },
      ],
    }).compile();
    expect(module.get(SchoolsController)).toBeDefined();
  });
});

```

---

### `apps/backend/src/auth/auth.controller.spec.ts`

```typescript
import { Test } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  it('should be defined', async () => {
    const module = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: { login: jest.fn() } }],
    }).compile();
    expect(module.get(AuthController)).toBeDefined();
  });
});

```

---

