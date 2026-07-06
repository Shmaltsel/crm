# FILE: apps/frontend/playwright.config.ts

```
import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  retries: 1,
  reporter: [["html", { outputFolder: "playwright-report", open: "never" }], ["list"]],
  use: {
    baseURL: "http://localhost:5173",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },
  webServer: {
    command: "npm run dev",
    url: "http://localhost:5173",
    reuseExistingServer: !process.env.CI,
  },
});

```

# FILE: apps/frontend/postcss.config.js

```


export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}



```

# FILE: apps/frontend/README.md

```
# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

```

# FILE: apps/frontend/src/App.tsx

```
import React, { useState, Suspense, lazy } from "react";

function lazyWithRetry(factory: () => Promise<any>) {
  return lazy(async () => {
    try {
      return await factory();
    } catch (err) {
      const key = "chunk-reload-ts";
      const last = Number(sessionStorage.getItem(key) || 0);
      if (Date.now() - last > 10000) {
        sessionStorage.setItem(key, String(Date.now()));
        window.location.reload();
        return new Promise(() => {});
      }
      throw err;
    }
  });
}
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Layout from "./components/Layout";
import { CityProvider } from "./context/CityContext";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { api } from "./config/api";

import ProtectedRoute from "./components/ProtectedRoute";
import ErrorBoundary from "./components/ErrorBoundary";
import { SkeletonCard } from "./components/ui/Skeleton";

const Login = lazyWithRetry(() => import("./pages/Login"));
const NotFound = lazyWithRetry(() => import("./pages/NotFound"));
const CityProfile = lazyWithRetry(() => import("./pages/CityProfile"));
const EventReport = lazyWithRetry(() => import("./pages/EventReport"));

const Cities = lazyWithRetry(() => import("./pages/Cities"));
const Schools = lazyWithRetry(() => import("./pages/Schools"));
const SchoolProfile = lazyWithRetry(() => import("./pages/SchoolProfile"));
const Employees = lazyWithRetry(() => import("./pages/Employees"));
const Finance = lazyWithRetry(() => import("./pages/Finance"));
const CalendarView = lazyWithRetry(() => import("./pages/CalendarView"));
const Dashboard = lazyWithRetry(() => import("./pages/Dashboard"));
const Kindergartens = lazyWithRetry(() => import("./pages/Kindergartens"));

const PageLoader = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4 md:p-8">
    <SkeletonCard />
    <SkeletonCard />
    <SkeletonCard />
  </div>
);

function AppRoutes() {
  const { user, loading, setUser } = useAuth();
  const isAuthenticated = !!user;

  const handleLogin = (loggedInUser: any) => {
    setUser(loggedInUser);
  };

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
    } catch (e) {
      console.error("Logout error", e);
    }

    setUser(null);
    window.location.replace("/login");
  };

  if (loading) return <PageLoader />;

  return (
    <CityProvider>
      <Routes>
        <Route
          path="/login"
          element={
            !isAuthenticated ? (
              <Login onLogin={handleLogin} />
            ) : (
              <Navigate to="/dashboard" replace />
            )
          }
        />

        {/* Захищені маршрути (Layout відображає бокове меню) */}
        <Route
          path="/"
          element={
            isAuthenticated ? <Layout /> : <Navigate to="/login" replace />
          }
        >
          <Route index element={<Navigate to="/dashboard" replace />} />

          {/* Обгортаємо всі вкладені маршрути в Suspense. 
              Коли React намагається відрендерити "ліниву" сторінку, він показує fallback (PageLoader), 
              поки завантажується файл з сервера.
            */}
          <Route
            path="cities"
            element={
              <ProtectedRoute allowedRoles={["SUPERADMIN"]}>
                <Suspense fallback={<PageLoader />}>
                  <Cities />
                </Suspense>
              </ProtectedRoute>
            }
          />

          <Route
            path="schools"
            element={
              <Suspense fallback={<PageLoader />}>
                <Schools />
              </Suspense>
            }
          />

          <Route
            path="schools/:id"
            element={
              <Suspense fallback={<PageLoader />}>
                <SchoolProfile />
              </Suspense>
            }
          />

          <Route
            path="employees"
            element={
              <ProtectedRoute allowedRoles={["SUPERADMIN"]}>
                <Suspense fallback={<PageLoader />}>
                  <Employees />
                </Suspense>
              </ProtectedRoute>
            }
          />

          <Route
            path="finance"
            element={
              <Suspense fallback={<PageLoader />}>
                <Finance />
              </Suspense>
            }
          />

          <Route
            path="calendar"
            element={
              <Suspense fallback={<PageLoader />}>
                <CalendarView />
              </Suspense>
            }
          />
          <Route
            path="dashboard"
            element={
              <ProtectedRoute allowedRoles={["SUPERADMIN", "MANAGER"]}>
                <Suspense fallback={<PageLoader />}>
                  <Dashboard />
                </Suspense>
              </ProtectedRoute>
            }
          />

          <Route
            path="kindergartens"
            element={
              <Suspense fallback={<PageLoader />}>
                <Kindergartens />
              </Suspense>
            }
          />

          <Route
            path="cities/:id"
            element={
              <Suspense fallback={<PageLoader />}>
                <CityProfile />
              </Suspense>
            }
          />

          <Route
            path="events/:id/report"
            element={
              <Suspense fallback={<PageLoader />}>
                <EventReport />
              </Suspense>
            }
          />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </CityProvider>
  );
}
export default function App() {
  return (
    <ErrorBoundary>
      <Router>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </Router>
    </ErrorBoundary>
  );
}

```

# FILE: apps/frontend/src/components/AddressLink.tsx

```
interface AddressLinkProps {
  address?: string | null;
  className?: string;
}

export default function AddressLink({ address, className }: AddressLinkProps) {
  if (!address) return <span className="text-slate-400">—</span>;

  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    address,
  )}`;

  return (
    <a
      href={mapsUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => e.stopPropagation()}
      title="Відкрити в Google Maps"
      className={`group inline-flex items-center gap-1.5 text-slate-700 hover:text-blue-600 transition-colors ${
        className ?? ""
      }`}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        className="w-3.5 h-3.5 shrink-0 text-slate-400 group-hover:text-blue-500 transition-colors"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
        />
      </svg>
      <span className="underline decoration-transparent group-hover:decoration-blue-300 decoration-1 underline-offset-2 transition-all">
        {address}
      </span>
    </a>
  );
}

```

# FILE: apps/frontend/src/components/calendar/DayOffModal.tsx

```
import { createPortal } from "react-dom";
import { useEffect, useRef } from "react";
import type { DayOff } from "../../hooks/useDaysOff";

interface StaffUser {
  id: string;
  name: string;
  role: string;
}

interface DayOffModalProps {
  isOpen: boolean;
  onClose: () => void;
  date: Date | null;
  staff: StaffUser[];
  dayOffs: DayOff[];
  onToggle: (userId: string, existingId?: string) => void;
}

const ROLE_ICON: Record<string, string> = {
  HOST: "🎙️",
  DRIVER: "🚗",
};

export default function DayOffModal({
  isOpen,
  onClose,
  date,
  staff,
  dayOffs,
  onToggle,
}: DayOffModalProps) {
  const headingId = 'dayoff-modal-heading';
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) closeRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  if (!isOpen || !date) return null;

  const dateStr = date.toLocaleDateString("uk-UA", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={headingId}
      className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[9999] flex items-center justify-center p-4 opacity-0"
      style={{ animation: "fadeIn 0.2s ease-out forwards" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes modalScale {
          from { opacity: 0; transform: scale(0.95) translateY(15px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
      <div
        className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden opacity-0"
        style={{ animation: "modalScale 0.3s ease-out forwards" }}
      >
        <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <div>
            <h3 id={headingId} className="text-lg font-bold text-slate-800">
              Вихідний на {dateStr}
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Оберіть співробітника
            </p>
          </div>
          <button ref={closeRef} onClick={onClose} aria-label="Закрити" className="text-slate-400 hover:text-slate-600 text-xl leading-none p-2 -mr-2 transition-colors">
            ✕
          </button>
        </div>

        <div className="p-4 max-h-[60vh] overflow-y-auto">
          {staff.length === 0 ? (
            <p className="text-center text-slate-400 py-6 text-sm">
              Немає співробітників у цьому місті
            </p>
          ) : (
            <div className="space-y-2">
              {staff.map((s) => {
                const existing = dayOffs.find((d) => d.userId === s.id);
                const isOff = !!existing;
                return (
                  <button
                    key={s.id}
                    onClick={() => onToggle(s.id, existing?.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all text-left ${
                      isOff
                        ? "border-rose-200 bg-rose-50"
                        : "border-slate-200 hover:border-blue-300 hover:bg-blue-50/30"
                    }`}
                  >
                    <span className="flex items-center gap-2 font-medium text-slate-800">
                      <span>{ROLE_ICON[s.role] || "👤"}</span>
                      {s.name}
                    </span>
                    <span
                      className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                        isOff
                          ? "bg-rose-100 text-rose-600"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {isOff ? "Вихідний ✕" : "Призначити"}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}

```

# FILE: apps/frontend/src/components/cities/CityDesktopGrid.tsx

```
import { useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import type { City } from "../../types";
import OptimizedImage from "../ui/OptimizedImage";

const CITY_PHOTOS: Record<string, string> = {
  Львів:
    "https://static4.depositphotos.com/1027798/376/i/450/depositphotos_3763579-stock-photo-lviv-lvov-ukraine.jpg",

  Київ: "https://st.depositphotos.com/58719516/51188/i/450/depositphotos_511888226-stock-photo-kyiv-central-square-buildings-landscape.jpg",

  Харків:
    "https://st.depositphotos.com/67336120/56801/i/950/depositphotos_568018044-stock-photo-kharkiv-ukraine-spring-2021-panoramic.jpg",

  Одеса:
    "https://st3.depositphotos.com/3644443/16721/i/450/depositphotos_167218870-stock-photo-aerial-view-opera-and-ballet.jpg",

  Дніпро:
    "https://st4.depositphotos.com/1005991/20622/i/450/depositphotos_206223052-stock-photo-dnepropetrovsk-beautiful-city-landscape-dnepr.jpg",

  Запоріжжя:
    "https://st4.depositphotos.com/2955305/41468/i/950/depositphotos_414689920-stock-photo-zaporozhye-ukraine-2020-theater-square.jpg",

  "Івано-Франківськ":
    "https://st3.depositphotos.com/7149852/15888/i/450/depositphotos_158883576-stock-photo-the-center-of-historic-european.jpg",

  Чернівці:
    "https://st3.depositphotos.com/6179956/16823/i/450/depositphotos_168238240-stock-photo-chernivtsi-ukraine-april-2017-residence.jpg",

  Тернопіль:
    "https://st.depositphotos.com/3651191/51255/i/450/depositphotos_512553730-stock-photo-colorful-autumn-view-flying-drone.jpg",

  Ужгород:
    "https://st2.depositphotos.com/2954445/42446/i/950/depositphotos_424466430-stock-photo-view-city-mountain-uzhhorod-castle.jpg",

  Миколаїв:
    "https://korabelov.info/wp-content/uploads/2023/02/752638-780x470.jpg.webp",

  Вінниця:
    "https://st5.depositphotos.com/10859846/83141/i/950/depositphotos_831410524-stock-photo-aerial-view-cremona-italy-highlighting.jpg",

  Херсон:
    "https://st2.depositphotos.com/28888872/48293/i/450/depositphotos_482930928-stock-photo-aerial-view-of-the-kherson.jpg",

  Полтава:
    "https://st4.depositphotos.com/8109164/38951/i/450/depositphotos_389510792-stock-photo-aerial-view-on-holy-dormition.jpg",

  Чернігів:
    "https://st2.depositphotos.com/1642129/6819/i/450/depositphotos_68194491-stock-photo-chernihivs-railway-station-is-looking.jpg",

  Черкаси:
    "https://st4.depositphotos.com/6259690/24892/i/450/depositphotos_248928436-stock-photo-scenic-cityscape-of-cherkasy-ukraine.jpg",

  Суми: "https://st3.depositphotos.com/29384342/33416/i/450/depositphotos_334165806-stock-photo-scenic-view-christmas-decorations.jpg",

  Житомир:
    "https://st4.depositphotos.com/1315434/22548/i/950/depositphotos_225486326-stock-photo-aerial-view-zhytomyr-city-ukraine.jpg",

  Хмельницький:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMF4ElBw0lBXcW--rvqPYk5ZTM7PXi-A6qxxw9UAwhmg&s=10",

  Рівне:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVEqOaKt-xPQssGp6LtVdqPkKmNMeK1BkDf9HwkF0_qw&s=10",

  Кропивницький:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToTY417WfgkTzzu3LZ2o_3MOpWeP4D2ueot6GV80VQPA&s=10",

  Луцьк:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRWzzd6fMVMUDsaUHZITW7-U8MS-FpM70v2DjBnoYRoQ&s=10",
};
const DEFAULT_PHOTO =
  "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600&q=80&auto=format";

function CityCard({
  city,
  index,
  isSelected,
  onSelect,
}: {
  city: City;
  index: number;
  isSelected: boolean;
  onSelect: () => void;
}) {
  const navigate = useNavigate();
  const imgRef = useRef<HTMLImageElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const img = imgRef.current;
    if (!img) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 8;
    img.style.transform = `scale(1.08) translate(${x}px, ${y}px)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    const img = imgRef.current;
    if (!img) return;
    img.style.transform = "scale(1) translate(0, 0)";
  }, []);

  return (
    <div
      style={{
        animationDelay: `${index * 60}ms`,
        animationFillMode: "both",
      }}
      className={`
        city-card-enter
        bg-white rounded-2xl shadow-sm border overflow-hidden group
        transition-[transform,box-shadow] duration-300 ease-out
        hover:-translate-y-1.5 hover:scale-[1.02] hover:shadow-xl
        ${
          isSelected
            ? "border-blue-500 ring-4 ring-blue-500/20 shadow-md"
            : "border-slate-100 hover:border-blue-200"
        }
      `}
    >
      {/* Фото з паралаксом і градієнтом Netflix-стилю */}
      <div
        className="h-44 overflow-hidden relative"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <img
          ref={imgRef}
          src={CITY_PHOTOS[city.name] || DEFAULT_PHOTO}
          alt={city.name}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover transition-transform duration-300 ease-out"
          onError={(e) => {
            (e.target as HTMLImageElement).src = DEFAULT_PHOTO;
          }}
        />

        {/* Темний градієнт знизу — назва міста чітко читається */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

        {/* Назва міста поверх градієнта */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h2 className="text-white text-xl font-bold drop-shadow-sm leading-tight">
            {city.name}
          </h2>
        </div>

        {/* Чекмарк якщо місто обрано */}
        {isSelected && (
          <div className="check-enter absolute top-3 right-3 bg-blue-500 text-white p-1.5 rounded-full shadow-lg">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        )}
      </div>

      {/* Контент картки */}
      <div className="p-5">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-medium text-green-600 bg-green-50 px-2.5 py-1 rounded-full border border-green-100">
            Активне
          </span>
        </div>

        <div className="flex items-center gap-2 mb-4 text-sm text-slate-600">
          <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xs font-bold shrink-0">
            {city.manager?.name?.charAt(0) ?? "?"}
          </div>
          <span>
            Менеджер:{" "}
            <span className="font-medium">{city.manager?.name ?? "—"}</span>
          </span>
        </div>

        <div className="space-y-2 text-sm border-t border-slate-50 pt-3">
          <div className="flex justify-between text-slate-500">
            <span>Заплановано подій:</span>
            <span className="font-semibold text-slate-800">
              {city.plannedEvents ?? 0}
            </span>
          </div>
        </div>

        <div className="flex gap-2 mt-4 pt-3 border-t border-slate-50">
          <button
            onClick={onSelect}
            className={`flex-1 text-sm font-medium py-2 rounded-lg transition-all duration-200 ${
              isSelected
                ? "bg-blue-50 text-blue-700 border border-blue-200 scale-[0.98]"
                : "bg-blue-600 hover:bg-blue-700 text-white hover:scale-[1.02]"
            }`}
          >
            <span className="inline-flex items-center gap-1.5 transition-all duration-200">
              {isSelected ? "✓ Обрано" : "Вибрати"}
            </span>
          </button>
          <button
            onClick={() => navigate(`/cities/${city.id}`)}
            className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 text-sm rounded-lg transition-colors"
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
}

interface CityDesktopGridProps {
  cities: City[];
  selectedCity: City | null;
  onSelectCity: (city: { id: string; name: string }) => void;
}

export default function CityDesktopGrid({
  cities,
  selectedCity,
  onSelectCity,
}: CityDesktopGridProps) {
  return (
    <>
      {}
      <style>{`
        @keyframes cityCardIn {
          from { opacity: 0; transform: translateY(20px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        .city-card-enter {
          animation: cityCardIn 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        @keyframes checkIn {
          from { opacity: 0; transform: scale(0.4) rotate(-20deg); }
          to   { opacity: 1; transform: scale(1) rotate(0deg); }
        }
        .check-enter {
          animation: checkIn 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>

      <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cities.map((city: City, index: number) => (
          <CityCard
            key={city.id}
            city={city}
            index={index}
            isSelected={selectedCity?.id === city.id}
            onSelect={() => onSelectCity({ id: city.id, name: city.name })}
          />
        ))}
      </div>
    </>
  );
}

```

# FILE: apps/frontend/src/components/cities/CityMobileHeader.tsx

```
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../config/api";
import type { City, IssueReport } from "../../types";

interface Props {
  selectedCity: City | null;
  cities: City[];
}

const STATUSES = ["Планується", "Виконується", "Виконано"];

const STATUS_STYLES: Record<string, string> = {
  Планується: "bg-amber-50 text-amber-700 border-amber-200",
  Виконується: "bg-blue-50 text-blue-700 border-blue-200",
  Виконано: "bg-emerald-50 text-emerald-700 border-emerald-200",
};

function getNextStatus(current: string) {
  const idx = STATUSES.indexOf(current);
  return STATUSES[(idx + 1) % STATUSES.length];
}

const CITY_ICONS: Record<string, string> = {
  Львів: "🦁",
  Київ: "🏰",
  Харків: "⚙️",
  Одеса: "⚓",
  Дніпро: "🌊",
  Запоріжжя: "⚡",
  "Івано-Франківськ": "⛰️",
  Чернівці: "🏛️",
  Тернопіль: "⛵",
  Ужгород: "🌸",
  Миколаїв: "🚢",
  Вінниця: "⛲",
  Херсон: "🍉",
  Полтава: "🥟",
  Чернігів: "⛪",
  Черкаси: "🌳",
  Суми: "🎪",
  Житомир: "🚀",
  Хмельницький: "🛍️",
  Рівне: "💎",
  Кропивницький: "🎭",
  Луцьк: "🏰",
};
const DEFAULT_CITY_ICON = "🏙️";

export default function CityMobileHeader({ selectedCity, cities }: Props) {
  const navigate = useNavigate();
  const [issues, setIssues] = useState<IssueReport[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isListExiting, setIsListExiting] = useState(false);
  const [exitingIssueId, setExitingIssueId] = useState<string | null>(null);
  const [issuesVisible, setIssuesVisible] = useState(false);
  const [issuesExiting, setIssuesExiting] = useState(false);

  useEffect(() => {
    if (!selectedCity?.id) {
      setIssues([]);
      return;
    }
    api
      .get(`/issues?cityId=${selectedCity.id}`)
      .then((res) => {
        const filtered = res.data.filter((i: IssueReport) => i.status !== "Виконано");
        setIssues(filtered);
        if (filtered.length > 0) {
          setIssuesExiting(false);
          setIssuesVisible(true);
        } else {
          setIssuesExiting(true);
          setTimeout(() => {
            setIssuesVisible(false);
            setIssuesExiting(false);
          }, 300);
        }
      })
      .catch(console.error);
  }, [selectedCity?.id]);

  const handleStatusToggle = async (issue: IssueReport) => {
    const nextStatus = getNextStatus(issue.status);

    if (nextStatus === "Виконано") {
      setExitingIssueId(issue.id);
      setTimeout(() => {
        setIssues((prev) => {
          const next = prev.filter((i) => i.id !== issue.id);
          if (next.length === 0) {
            setIsExpanded(false);
            setIssuesExiting(true);
            setTimeout(() => {
              setIssuesVisible(false);
              setIssuesExiting(false);
            }, 300);
          }
          return next;
        });
        setExitingIssueId(null);
      }, 400);
    } else {
      setIssues((prev) =>
        prev.map((i) => (i.id === issue.id ? { ...i, status: nextStatus } : i)),
      );
    }

    api
      .patch(`/issues/${issue.id}/status`, { status: nextStatus })
      .catch((e) => {
        console.error(e);
        setIssues((prev) =>
          prev.map((i) =>
            i.id === issue.id ? { ...i, status: issue.status } : i,
          ),
        );
      });
  };

  const currentCityData = cities?.find((c: City) => c.id === selectedCity?.id);
  const totalEvents =
    (currentCityData?.plannedEvents || 0) +
    (currentCityData?.completedEvents || 0);
  const schoolsCount = currentCityData?.schoolsCount || 0;

  return (
    <div className="md:hidden flex flex-col gap-4 mb-4">
      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideUp {
          from { opacity: 1; transform: translateY(0); max-height: 200px; }
          to { opacity: 0; transform: translateY(-8px); max-height: 0; }
        }
        @keyframes expandDown {
          from { opacity: 0; transform: translateY(-6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes cityNameChange {
          0% { opacity: 1; transform: translateY(0); }
          40% { opacity: 0; transform: translateY(-6px); }
          60% { opacity: 0; transform: translateY(6px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .city-name-change {
          animation: cityNameChange 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .issues-enter {
          animation: slideDown 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
        }
        .issues-exit {
          animation: slideUp 0.3s ease-in forwards;
          overflow: hidden;
        }
        .expand-enter {
          animation: expandDown 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
        }
        @keyframes collapseUp {
          from { opacity: 1; transform: translateY(0); }
          to { opacity: 0; transform: translateY(-8px); }
        }
        .expand-exit {
          animation: collapseUp 0.22s ease-in forwards;
        }
        @keyframes statusFlash {
          0% { transform: scale(1); }
          40% { transform: scale(0.95); opacity: 0.7; }
          100% { transform: scale(1); opacity: 1; }
        }
        .status-flash {
          animation: statusFlash 0.2s ease-out;
        }
      `}</style>

      {/* Сповіщення про проблему з розгортанням */}
      {issuesVisible && (
        <div
          className={`bg-[#FFF4F4] border border-red-100 rounded-2xl p-4 flex flex-col gap-3 shadow-sm ${issuesExiting ? "issues-exit" : "issues-enter"}`}
        >
          <div
            className="flex items-center gap-4 cursor-pointer"
            onClick={() => {
              if (isExpanded) {
                setIsListExiting(true);
                setTimeout(() => {
                  setIsExpanded(false);
                  setIsListExiting(false);
                }, 250);
              } else {
                setIsExpanded(true);
              }
            }}
          >
            <div className="w-10 h-10 bg-red-100 text-red-500 rounded-full flex items-center justify-center shrink-0 text-xl shadow-sm">
              🔔
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-slate-800 text-sm">
                {issues.length} активн
                {issues.length === 1
                  ? "а проблема"
                  : issues.length < 5
                    ? "і проблеми"
                    : "их проблем"}
              </p>
              {!isExpanded && (
                <p className="text-xs text-slate-600 truncate mt-0.5">
                  {issues[0]?.schoolName}
                </p>
              )}
            </div>
            <button
              className="text-slate-400 hover:text-slate-600 text-2xl font-light transition-transform duration-300"
              style={{
                transform: isExpanded ? "rotate(90deg)" : "rotate(0deg)",
              }}
            >
              ›
            </button>
          </div>

          {/* Розгорнутий список проблем */}
          {isExpanded && (
            <div
              className={`flex flex-col gap-3 mt-2 pt-3 border-t border-red-100/50 ${isListExiting ? "expand-exit" : "expand-enter"}`}
            >
              {issues.map((issue) => {
                const isExiting = exitingIssueId === issue.id;
                return (
                  <div
                    key={issue.id}
                    className={`bg-white rounded-2xl p-4 border border-red-100 shadow-sm relative transition-all duration-400 ease-in-out transform origin-top ${
                      isExiting
                        ? "opacity-0 scale-95 h-0 overflow-hidden !p-0 border-0"
                        : "opacity-100 scale-100"
                    }`}
                  >
                    <p className="text-[11px] text-slate-400 mb-1">
                      {new Date(issue.createdAt).toLocaleDateString("uk-UA", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                    <p className="font-bold text-slate-800 text-sm">
                      {issue.schoolName}
                    </p>
                    <p className="text-[11px] text-slate-500 mb-3">
                      {issue.eventName}
                    </p>

                    <p className="text-sm text-slate-700 bg-slate-50 rounded-xl p-3 italic leading-relaxed border border-slate-100 mb-3">
                      "{issue.message}"
                    </p>

                    <button
                      onClick={() => handleStatusToggle(issue)}
                      key={issue.status}
                      className={`status-flash w-full text-xs font-bold px-3 py-2.5 rounded-lg border transition-colors text-left flex items-center gap-1.5 ${STATUS_STYLES[issue.status] || STATUS_STYLES["Планується"]}`}
                    >
                      <span className="text-[10px]">●</span> {issue.status}{" "}
                      <span className="font-normal opacity-70">
                        → натисни щоб змінити
                      </span>
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Поточне місто */}
      {selectedCity?.id && (
        <div className="bg-white border border-blue-50 rounded-2xl p-4 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">
              Поточне місто
            </span>
            <span className="bg-emerald-50 text-emerald-600 px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center gap-1.5">
              ✓ Активне місто
            </span>
          </div>

          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-50 text-blue-600 flex items-center justify-center rounded-full text-lg city-name-change">
              {CITY_ICONS[selectedCity.name] || DEFAULT_CITY_ICON}
            </div>
            <h2
              key={selectedCity.id}
              className="text-2xl font-bold text-slate-800 city-name-change"
            >
              {selectedCity.name}
            </h2>
          </div>

          <div className="flex items-center justify-between text-xs font-medium gap-2">
            <div className="flex items-center gap-1.5 text-slate-600 bg-slate-50 px-2.5 py-2 rounded-xl">
              <span className="text-blue-500 text-sm">📅</span> {totalEvents}{" "}
              подій
            </div>
            <div className="flex items-center gap-1.5 text-slate-600 bg-slate-50 px-2.5 py-2 rounded-xl">
              <span className="text-blue-500 text-sm">🏫</span> {schoolsCount}{" "}
              шкіл
            </div>
            <div className="flex items-center gap-1.5 text-rose-600 bg-rose-50 px-2.5 py-2 rounded-xl">
              <span className="text-sm">⚠️</span> {issues.length} проблем
            </div>
            {/* <button 
              onClick={() => navigate(`/cities/${selectedCity.id}`)} 
              className="w-10 h-10 flex items-center justify-center bg-white border border-slate-200 rounded-xl text-blue-600 shadow-sm shrink-0"
            >
              →
            </button> */}
          </div>
        </div>
      )}
    </div>
  );
}

```

# FILE: apps/frontend/src/components/cities/CityMobileList.tsx

```
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import type { City } from "../../types";

const CITY_ICONS: Record<string, string> = {
  Львів: "🦁",
  Київ: "🏰",
  Харків: "⚙️",
  Одеса: "⚓",
  Дніпро: "🌊",
  Запоріжжя: "⚡",
  "Івано-Франківськ": "⛰️",
  Чернівці: "🏛️",
  Тернопіль: "⛵",
  Ужгород: "🌸",
  Миколаїв: "🚢",
  Вінниця: "⛲",
  Херсон: "🍉",
  Полтава: "🥟",
  Чернігів: "⛪",
  Черкаси: "🌳",
  Суми: "🎪",
  Житомир: "🚀",
  Хмельницький: "🛍️",
  Рівне: "💎",
  Кропивницький: "🎭",
  Луцьк: "🏰",
};
const DEFAULT_CITY_ICON = "🏙️";

const ICON_COLORS = [
  "bg-purple-50",
  "bg-amber-50",
  "bg-teal-50",
  "bg-rose-50",
  "bg-sky-50",
];

interface CityMobileListProps {
  cities: City[];
  selectedCity: City | null;
  onSelectCity: (city: { id: string; name: string }) => void;
}

export default function CityMobileList({
  cities,
  selectedCity,
  onSelectCity,
}: CityMobileListProps) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"ACTIVE" | "ALL" | "ARCHIVED">(
    "ACTIVE",
  );

  const [tabKey, setTabKey] = useState(0);

  const filteredCities = useMemo(() => {
    return cities.filter((c: City) => {
      const hasEvents = (c.plannedEvents || 0) + (c.completedEvents || 0) > 0;
      if (activeTab === "ACTIVE") return hasEvents;
      if (activeTab === "ARCHIVED") return !hasEvents;
      return true;
    });
  }, [cities, activeTab]);

  return (
    <>
      {/* Stagger анімація для мобільних рядків */}
      <style>{`
        @keyframes cityRowIn {
          from { opacity: 0; transform: translateX(-14px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .city-row-enter {
          animation: cityRowIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          animation-fill-mode: both;
        }
        @keyframes tabSlideIn {
          from { opacity: 0; transform: translateY(4px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes dotPop {
          from { transform: scale(0); }
          to   { transform: scale(1); }
        }
        .dot-pop {
          animation: dotPop 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>

      <div className="md:hidden flex flex-col gap-4 mb-24">
        {/* Вкладки */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide mt-1">
          {["Активні", "Усі", "Архівні"].map((tab) => {
            const tabKey =
              tab === "Активні" ? "ACTIVE" : tab === "Усі" ? "ALL" : "ARCHIVED";
            const isActive = activeTab === tabKey;
            return (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tabKey as typeof activeTab);
                  setTabKey((k) => k + 1);
                }}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 flex items-center gap-1.5 active:scale-95 ${
                  isActive
                    ? "bg-blue-50 text-blue-600 border border-blue-100 shadow-sm"
                    : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                }`}
              >
                {isActive && (
                  <span className="dot-pop w-1.5 h-1.5 rounded-full bg-blue-600" />
                )}
                {tab}
              </button>
            );
          })}
        </div>

        {/* Список */}
        <div
          key={tabKey}
          className="flex flex-col bg-white rounded-[24px] shadow-sm border border-slate-100 overflow-hidden"
        >
          {filteredCities.map((city: City, index: number) => {
            const iconStyle = ICON_COLORS[index % ICON_COLORS.length];
            const totalEvents =
              (city.plannedEvents || 0) + (city.completedEvents || 0);
            const isSelected = selectedCity?.id === city.id;

            return (
              <div
                key={city.id}
                style={{ animationDelay: `${index * 50}ms` }}
                className={`
                  city-row-enter
                  flex items-center p-4 border-b border-slate-50
                  transition-[background-color,transform] duration-150
                  active:scale-[0.99] active:bg-slate-50
                  ${isSelected ? "bg-blue-50/30" : ""}
                `}
                onClick={() => onSelectCity({ id: city.id, name: city.name })}
              >
                {/* Іконка */}
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 text-xl shrink-0 ${ICON_COLORS[index % ICON_COLORS.length]}`}
                >
                  {CITY_ICONS[city.name] || DEFAULT_CITY_ICON}
                </div>

                {/* Текст */}
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-slate-800 text-base">
                    {city.name}
                  </p>
                  <p className="text-xs font-medium text-slate-400 mt-0.5">
                    {totalEvents} подій • {city.schoolsCount || 0} шкіл
                  </p>
                </div>

                {/* Стрілка переходу */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/cities/${city.id}`);
                  }}
                  className="p-3 text-slate-400 hover:text-blue-600 text-2xl font-light leading-none transition-colors"
                >
                  ›
                </button>
              </div>
            );
          })}

          {filteredCities.length === 0 && (
            <div className="p-8 text-center text-slate-400 font-medium">
              Міст не знайдено
            </div>
          )}
        </div>
      </div>
    </>
  );
}

```

# FILE: apps/frontend/src/components/city-profile/CityAnalytics.tsx

```
import { useMemo, useState } from 'react';
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  PieChart, Pie, Cell,
} from 'recharts';

interface CityAnalyticsProps {
  events: any[];
}

const PALETTE = ['#2563eb', '#10b981', '#06b6d4', '#f59e0b', '#8b5cf6', '#f43f5e', '#84cc16', '#6366f1', '#0ea5e9', '#ec4899', '#14b8a6', '#a855f7'];

const UA_MONTHS = ['Січ', 'Лют', 'Бер', 'Квіт', 'Трав', 'Черв', 'Лип', 'Серп', 'Вер', 'Жовт', 'Лист', 'Груд'];
const DATE_FMT = new Intl.DateTimeFormat('uk-UA', { day: '2-digit', month: '2-digit', year: 'numeric' });

function toMonthKey(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
}

function monthLabel(key: string) {
  const [y, m] = key.split('-').map(Number);
  return `${UA_MONTHS[m - 1]} ${String(y).slice(-2)}`;
}

function fmt(n: number) {
  return new Intl.NumberFormat('uk-UA').format(Math.round(n || 0));
}

function toInputDate(d: Date) {
  return d.toISOString().slice(0, 10);
}

export default function CityAnalytics({ events }: CityAnalyticsProps) {
  const today = useMemo(() => new Date(), []);

  const [from, setFrom] = useState(() => toInputDate(new Date(today.getFullYear(), today.getMonth() - 5, 1)));
  const [to, setTo] = useState(() => toInputDate(today));
  const [isOpen, setIsOpen] = useState(false);
  const [draftFrom, setDraftFrom] = useState(from);
  const [draftTo, setDraftTo] = useState(to);

  const applyPreset = (months: number | null, mode?: 'year' | 'all') => {
    const t = new Date();
    let f: Date;
    if (mode === 'year') f = new Date(t.getFullYear(), 0, 1);
    else if (mode === 'all') f = new Date(2000, 0, 1);
    else f = new Date(t.getFullYear(), t.getMonth() - (months! - 1), 1);
    setDraftFrom(toInputDate(f));
    setDraftTo(toInputDate(t));
  };

  const applyRange = () => {
    setFrom(draftFrom);
    setTo(draftTo);
    setIsOpen(false);
  };

  const filtered = useMemo(() => {
    const fromD = new Date(from);
    const toD = new Date(to);
    toD.setHours(23, 59, 59, 999);
    return (events || []).filter(ev => {
      const d = new Date(ev.date);
      return d >= fromD && d <= toD;
    });
  }, [events, from, to]);

  const monthly = useMemo(() => {
    const map = new Map<string, { revenue: number; profit: number; children: number; count: number }>();
    const fromD = new Date(from);
    const toD = new Date(to);
    const cursor = new Date(fromD.getFullYear(), fromD.getMonth(), 1);
    const last = new Date(toD.getFullYear(), toD.getMonth(), 1);
    let guard = 0;
    while (cursor <= last && guard < 240) {
      map.set(toMonthKey(cursor), { revenue: 0, profit: 0, children: 0, count: 0 });
      cursor.setMonth(cursor.getMonth() + 1);
      guard += 1;
    }
    filtered.forEach(ev => {
      const key = toMonthKey(new Date(ev.date));
      const bucket = map.get(key) || { revenue: 0, profit: 0, children: 0, count: 0 };
      bucket.revenue += ev.report?.totalSum || ev.price || 0;
      bucket.profit += ev.report?.remainderSum || 0;
      bucket.children += ev.report?.childrenCount || ev.childrenPlanned || 0;
      bucket.count += 1;
      map.set(key, bucket);
    });
    return Array.from(map.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, v]) => ({ key, label: monthLabel(key), ...v }));
  }, [filtered, from, to]);

  const totalRevenue = filtered.reduce((s, ev) => s + (ev.report?.totalSum || ev.price || 0), 0);
  const totalProfit = filtered.reduce((s, ev) => s + (ev.report?.remainderSum || 0), 0);
  const totalChildren = filtered.reduce((s, ev) => s + (ev.report?.childrenCount || ev.childrenPlanned || 0), 0);
  const totalCount = filtered.length;

  const pieData = monthly.filter(m => m.count > 0);
  const pieTotal = pieData.reduce((s, m) => s + m.count, 0);
  const hasRevenue = monthly.some(m => m.revenue > 0);

  const exportCsv = () => {
    const header = 'Місяць;Виручка;Прибуток;Подій;Дітей\n';
    const rows = monthly.map(m => `${m.label};${m.revenue};${m.profit};${m.count};${m.children}`).join('\n');
    const blob = new Blob(['\uFEFF' + header + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `analytics_${from}_${to}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const rangeLabel = `${DATE_FMT.format(new Date(from))} – ${DATE_FMT.format(new Date(to))}`;

  return (
    <div className="flex flex-col gap-6">
      {/* Контроли */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h3 className="font-bold text-slate-800 text-lg">Аналітика по місяцях</h3>
          <p className="text-sm text-slate-400 mt-0.5">На основі завершених подій закладу</p>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative flex-1 sm:flex-none">
            <button
              onClick={() => { setDraftFrom(from); setDraftTo(to); setIsOpen(v => !v); }}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-xs sm:text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
            >
              📅 <span className="truncate">{rangeLabel}</span> <span className="text-slate-400">⌄</span>
            </button>

            {isOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
                <div className="absolute right-0 top-full mt-2 z-20 bg-white rounded-xl shadow-lg border border-slate-100 p-4 w-72">
                  <div className="flex flex-wrap gap-2 mb-4">
                    <button onClick={() => applyPreset(3)} className="px-3 py-1.5 rounded-full text-xs bg-slate-100 hover:bg-slate-200 font-medium transition-colors">3 міс.</button>
                    <button onClick={() => applyPreset(6)} className="px-3 py-1.5 rounded-full text-xs bg-slate-100 hover:bg-slate-200 font-medium transition-colors">6 міс.</button>
                    <button onClick={() => applyPreset(12)} className="px-3 py-1.5 rounded-full text-xs bg-slate-100 hover:bg-slate-200 font-medium transition-colors">12 міс.</button>
                    <button onClick={() => applyPreset(null, 'year')} className="px-3 py-1.5 rounded-full text-xs bg-slate-100 hover:bg-slate-200 font-medium transition-colors">Цей рік</button>
                    <button onClick={() => applyPreset(null, 'all')} className="px-3 py-1.5 rounded-full text-xs bg-slate-100 hover:bg-slate-200 font-medium transition-colors">Весь час</button>
                  </div>
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div>
                      <label className="block text-xs text-slate-500 mb-1">Від</label>
                      <input type="date" value={draftFrom} onChange={e => setDraftFrom(e.target.value)} className="w-full p-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-blue-400" />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-500 mb-1">До</label>
                      <input type="date" value={draftTo} onChange={e => setDraftTo(e.target.value)} className="w-full p-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-blue-400" />
                    </div>
                  </div>
                  <button onClick={applyRange} className="w-full bg-blue-600 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                    Застосувати
                  </button>
                </div>
              </>
            )}
          </div>

          <button
            onClick={exportCsv}
            className="shrink-0 flex items-center gap-1.5 px-4 py-2.5 bg-blue-50 text-blue-600 rounded-lg text-xs sm:text-sm font-medium hover:bg-blue-100 transition-colors"
          >
            ⬇ <span className="hidden sm:inline">Експорт</span>
          </button>
        </div>
      </div>

      {/* Загальна інформація */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 sm:p-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-5">
          <Stat label="Загальна виручка" value={`${fmt(totalRevenue)} грн`} />
          <Stat label="Загальний прибуток" value={`${fmt(totalProfit)} грн`} />
          <Stat label="Проведено подій" value={totalCount} />
          <Stat label="Охоплено дітей" value={fmt(totalChildren)} />
        </div>
      </div>

      {/* Графіки */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Виручка по місяцях */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 sm:p-6">
          <h4 className="font-bold text-slate-800 mb-4">Виручка по місяцях</h4>
          {!hasRevenue ? (
            <EmptyChart />
          ) : (
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={monthly} margin={{ top: 24, right: 8, left: 0, bottom: 0 }}>
                <CartesianGrid vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="label" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={{ stroke: '#e2e8f0' }} tickLine={false} interval={monthly.length > 8 ? 1 : 0} />
                <YAxis
                  tick={{ fontSize: 11, fill: '#64748b' }}
                  axisLine={false}
                  tickLine={false}
                  width={46}
                  tickFormatter={(v: number) => (v >= 1000 ? `${Math.round(v / 1000)}k` : `${v}`)}
                />
                <Tooltip
                  cursor={{ fill: '#f8fafc' }}
                  formatter={(v: number) => [`${fmt(v)} грн`, 'Виручка']}
                  contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0', fontSize: 12 }}
                />
                <Bar dataKey="revenue" fill="#2563eb" radius={[8, 8, 0, 0]} maxBarSize={48} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Проведено подій по місяцях */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 sm:p-6">
          <h4 className="font-bold text-slate-800 mb-4">Проведено подій по місяцях</h4>
          {pieData.length === 0 ? (
            <EmptyChart />
          ) : (
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="relative w-44 h-44 shrink-0">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={pieData} dataKey="count" nameKey="label" innerRadius={52} outerRadius={78} paddingAngle={2} strokeWidth={0}>
                      {pieData.map((_, i) => <Cell key={i} fill={PALETTE[i % PALETTE.length]} />)}
                    </Pie>
                    <Tooltip formatter={(v: number, n: string) => [`${v} подій`, n]} contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0', fontSize: 12 }} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-xs text-slate-400">Всього</span>
                  <span className="text-xl font-bold text-slate-800">{pieTotal}</span>
                </div>
              </div>
              <ul className="flex-1 flex flex-col gap-2 text-sm w-full min-w-0">
                {pieData.map((m, i) => (
                  <li key={m.key} className="flex items-center gap-2 min-w-0">
                    <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: PALETTE[i % PALETTE.length] }} />
                    <span className="text-slate-600 truncate flex-1">{m.label}</span>
                    <span className="font-medium text-slate-800 shrink-0">{m.count} ({Math.round((m.count / pieTotal) * 100)}%)</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="min-w-0">
      <p className="text-xs text-slate-400 font-medium mb-1.5 truncate">{label}</p>
      <p className="text-lg sm:text-2xl font-bold text-slate-800 truncate">{value}</p>
    </div>
  );
}

function EmptyChart() {
  return (
    <div className="h-[280px] flex flex-col items-center justify-center text-slate-300">
      <span className="text-3xl mb-2">📊</span>
      <span className="text-sm text-slate-400">Немає даних за цей період</span>
    </div>
  );
}
```

# FILE: apps/frontend/src/components/dashboard/ActivityFeed.tsx

```
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ROLE_INITIALS: Record<string, string> = {
  MANAGER:    'М',
  SUPERADMIN: 'А',
  DRIVER:     'В',
  HOST:       'В',
};

const ROLE_COLORS: Record<string, string> = {
  MANAGER:    'bg-blue-50 text-blue-700',
  SUPERADMIN: 'bg-purple-50 text-purple-700',
  DRIVER:     'bg-emerald-50 text-emerald-700',
  HOST:       'bg-violet-50 text-violet-700',
};

function getInitials(name: string): string {
  const parts = name.trim().split(' ');
  if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  return name.slice(0, 2).toUpperCase();
}

function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' });
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  if (d.toDateString() === today.toDateString()) return 'сьогодні';
  if (d.toDateString() === yesterday.toDateString()) return 'вчора';
  return d.toLocaleDateString('uk-UA', { day: 'numeric', month: 'long' });
}

interface ActivityItem {
  id:         string;
  userName:   string;
  role:       string;
  action:     string;
  comment:    string | null;
  createdAt:  string;
  schoolId:   string | null;
  schoolName: string | null;
  eventId:    string | null;
}

interface Group {
  key:       string;
  userName:  string;
  role:      string;
  schoolId:  string | null;
  schoolName: string | null;
  actions:   { id: string; action: string; comment: string | null; createdAt: string }[];
}

function groupItems(items: ActivityItem[]): Group[] {
  const groups: Group[] = [];

  for (const item of items) {
    const last = groups[groups.length - 1];
    const sameUser   = last?.userName  === item.userName;
    const sameSchool = last?.schoolId  === item.schoolId; 

    if (last && sameUser && sameSchool) {
      last.actions.push({ id: item.id, action: item.action, comment: item.comment, createdAt: item.createdAt });
    } else {
      groups.push({
        key:        item.id,
        userName:   item.userName,
        role:       item.role,
        schoolId:   item.schoolId,
        schoolName: item.schoolName,
        actions:    [{ id: item.id, action: item.action, comment: item.comment, createdAt: item.createdAt }],
      });
    }
  }

  return groups;
}

const COLLAPSED_COUNT = 2;

interface Props {
  items: ActivityItem[];
}

export default function ActivityFeed({ items }: Props) {
  const navigate  = useNavigate();
  const [expanded, setExpanded] = useState(false);

  const groups   = groupItems(items);
  const visible  = expanded ? groups : groups.slice(0, COLLAPSED_COUNT);
  const hasMore  = groups.length > COLLAPSED_COUNT;

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 flex flex-col">

      {/* Хедер */}
      <div className="flex justify-between items-center mb-3">
        <p className="text-sm font-semibold text-slate-800">Активність команди</p>
        <span className="text-xs text-slate-400">{formatDate(items[0]?.createdAt ?? new Date().toISOString())}</span>
      </div>

      {items.length === 0 ? (
        <div className="py-6 text-center text-slate-400 text-sm">
          Сьогодні активності ще немає
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-1">
            {visible.map((group) => {
              const avatarColor = ROLE_COLORS[group.role] ?? 'bg-slate-100 text-slate-600';
              const shownActions = group.actions.slice(-3);
              const hiddenCount  = group.actions.length - shownActions.length;
              const lastTime     = formatTime(group.actions[group.actions.length - 1].createdAt);

              return (
                <div key={group.key} className="flex items-start gap-3 py-2 px-2 -mx-1 rounded-xl hover:bg-slate-50/60 transition-colors">

                  {/* Аватар */}
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold shrink-0 mt-0.5 ${avatarColor}`}>
                    {getInitials(group.userName)}
                  </div>

                  {/* Контент */}
                  <div className="min-w-0 flex-1">

                    {/* Ім'я + школа */}
                    <p className="text-xs font-semibold text-slate-800 leading-tight">
                      {group.userName}
                      {group.schoolName && (
                        <>
                          {' · '}
                          <button
                            onClick={() => group.schoolId && navigate(`/schools/${group.schoolId}`)}
                            className="text-blue-600 hover:underline font-medium"
                          >
                            {group.schoolName}
                          </button>
                        </>
                      )}
                    </p>

                    {/* Дії */}
                    <div className="mt-1 flex flex-col gap-0.5">
                      {hiddenCount > 0 && (
                        <p className="text-xs text-slate-400 italic">+{hiddenCount} раніше</p>
                      )}
                      {shownActions.map((a) => (
                        <p key={a.id} className="text-xs text-slate-500 leading-snug">
                          — {a.action.replace(/\.$/, '')}
                          {a.comment && (
                            <span className="text-slate-400 italic"> «{a.comment}»</span>
                          )}
                        </p>
                      ))}
                    </div>
                  </div>

                  {/* Час останньої дії */}
                  <span className="text-xs text-slate-400 shrink-0 pt-0.5">{lastTime}</span>

                </div>
              );
            })}
          </div>

          {/* Кнопка згорнути/розгорнути */}
          {hasMore && (
            <button
              onClick={() => setExpanded(v => !v)}
              className="mt-3 pt-3 border-t border-slate-50 text-xs text-blue-600 hover:underline text-center w-full"
            >
              {expanded
                ? '↑ Згорнути'
                : `↓ Показати ще ${groups.length - COLLAPSED_COUNT}`}
            </button>
          )}
        </>
      )}

    </div>
  );
}
```

# FILE: apps/frontend/src/components/dashboard/CitiesTable.tsx

```
import { useNavigate } from 'react-router-dom';

function fmt(n: number): string {
  return new Intl.NumberFormat('uk-UA').format(Math.round(n));
}

function plural(n: number, one: string, few: string, many: string): string {
  const mod10  = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return one;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return few;
  return many;
}

interface CityRow {
  cityId:       string;
  cityName:     string;
  schoolsCount: number;
  activeEvents: number;
  monthRevenue: number;
}

interface Props {
  rows: CityRow[];
}

export default function CitiesTable({ rows }: Props) {
  const navigate = useNavigate();

  const totals = rows.reduce(
    (acc, r) => {
      acc.schools  += r.schoolsCount;
      acc.events   += r.activeEvents;
      acc.revenue  += r.monthRevenue;
      return acc;
    },
    { schools: 0, events: 0, revenue: 0 },
  );

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4">
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-md bg-purple-50 flex items-center justify-center">
            <span className="text-xs">🗺️</span>
          </div>
          <p className="text-sm font-semibold text-slate-800">Стан по містах</p>
        </div>
        <button
          onClick={() => navigate('/cities')}
          className="text-xs text-blue-600 hover:underline"
        >
          Переглянути всі
        </button>
      </div>

      <div className="overflow-x-auto -mx-4 px-4">
        <table className="w-full text-left border-collapse min-w-[380px]">
          <thead>
            <tr className="border-b border-slate-100">
              <th className="pb-2 text-xs font-medium text-slate-400 pr-3">Місто</th>
              <th className="pb-2 text-xs font-medium text-slate-400 text-right pr-3">Шкіл</th>
              <th className="pb-2 text-xs font-medium text-slate-400 text-right pr-3">Активних подій</th>
              <th className="pb-2 text-xs font-medium text-slate-400 text-right">Виручка місяця</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={row.cityId}
                onClick={() => navigate(`/cities/${row.cityId}`)}
                className="border-b border-slate-50 cursor-pointer hover:bg-slate-50/60 transition-colors"
              >
                <td className="py-2.5 pr-3">
                  <span className="text-sm font-medium text-slate-800">
                    {row.cityName}
                  </span>
                </td>
                <td className="py-2.5 pr-3 text-right">
                  <span className="text-sm text-slate-600">{row.schoolsCount}</span>
                </td>
                <td className="py-2.5 pr-3 text-right">
                  {row.activeEvents > 0 ? (
                    <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full font-medium">
                      {row.activeEvents}
                    </span>
                  ) : (
                    <span className="text-sm text-slate-300">—</span>
                  )}
                </td>
                <td className="py-2.5 text-right">
                  {row.monthRevenue > 0 ? (
                    <span className="text-sm font-semibold text-slate-800">
                      {fmt(row.monthRevenue)} грн
                    </span>
                  ) : (
                    <span className="text-sm text-slate-300">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
          {/* Підсумок */}
          <tfoot>
            <tr className="border-t border-slate-200">
              <td className="pt-2.5 text-xs font-semibold text-slate-500">
                Усього
              </td>
              <td className="pt-2.5 text-right text-xs font-semibold text-slate-600">
                {totals.schools}
              </td>
              <td className="pt-2.5 text-right text-xs font-semibold text-slate-600">
                {totals.events}
              </td>
              <td className="pt-2.5 text-right text-xs font-semibold text-blue-700">
                {fmt(totals.revenue)} грн
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      <p className="text-xs text-slate-400 mt-3 pt-3 border-t border-slate-50">
        {rows.length} {plural(rows.length, 'місто', 'міста', 'міст')} · виручка за поточний місяць
      </p>
    </div>
  );
}

```

# FILE: apps/frontend/src/components/dashboard/FunnelBar.tsx

```
import { useNavigate } from 'react-router-dom';

const PIPELINE_STAGES = [
  { key: 'BASE',           name: 'База',             icon: '🏫', color: 'text-slate-600',   bg: 'bg-slate-100',   bar: 'bg-slate-400'   },
  { key: 'FIRST_CONTACT',  name: 'Перший контакт',   icon: '📞', color: 'text-blue-700',    bg: 'bg-blue-50',     bar: 'bg-blue-500'    },
  { key: 'INTERESTED',     name: 'Зацікавлені',      icon: '⭐', color: 'text-amber-700',   bg: 'bg-amber-50',    bar: 'bg-amber-400'   },
  { key: 'DATE_CONFIRMED', name: 'Підтверджено дату',icon: '📅', color: 'text-purple-700',  bg: 'bg-purple-50',   bar: 'bg-purple-500'  },
  { key: 'PREPARATION',    name: 'Підготовка',       icon: '⚙️', color: 'text-orange-700',  bg: 'bg-orange-50',   bar: 'bg-orange-400'  },
  { key: 'DONE',           name: 'Проведено',        icon: '✅', color: 'text-emerald-700', bg: 'bg-emerald-50',  bar: 'bg-emerald-500' },
];

interface Props {
  funnel: Record<string, number>;
}

export default function FunnelBar({ funnel }: Props) {
  const navigate = useNavigate();

  const base  = funnel['BASE'] ?? 0;
  const done  = funnel['DONE'] ?? 0;
  const progress = base > 0 ? Math.round((done / base) * 100) : 0;

  const counts = PIPELINE_STAGES.map(s => funnel[s.key] ?? 0);
  const maxCount = Math.max(...counts, 1);

  return (
    <div>
      <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-3">
        Воронка роботи зі школами
      </p>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4">

        {/* Прогрес по місту */}
        <div className="mb-4">
          <div className="flex justify-between items-baseline mb-1.5">
            <span className="text-xs text-slate-500">Прогрес по місту</span>
            <span className="text-sm font-bold text-slate-800">{progress}%</span>
          </div>
          <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-500 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            {done} з {base} шкіл дійшли до проведення події
          </p>
        </div>

        {/* Стадії */}
        <div className="flex flex-col gap-2">
          {PIPELINE_STAGES.map((stage) => {
            const count    = funnel[stage.key] ?? 0;
            const barWidth = Math.round((count / maxCount) * 100);

            return (
              <button
                key={stage.key}
                onClick={() => navigate('/schools')}
                className="flex items-center gap-3 group w-full text-left"
              >
                {/* Іконка */}
                <div className={`w-6 h-6 rounded-md ${stage.bg} flex items-center justify-center text-xs shrink-0`}>
                  {stage.icon}
                </div>

                {/* Назва */}
                <span className="text-xs text-slate-600 w-36 shrink-0 truncate group-hover:text-slate-900 transition-colors">
                  {stage.name}
                </span>

                {/* Бар */}
                <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${stage.bar}`}
                    style={{ width: `${barWidth}%` }}
                  />
                </div>

                {/* Кількість */}
                <span className={`text-xs font-bold w-6 text-right shrink-0 ${stage.color}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

      </div>
    </div>
  );
}
```

# FILE: apps/frontend/src/components/dashboard/MonthlyKpi.tsx

```
import { useNavigate } from 'react-router-dom';

function fmt(n: number): string {
  return new Intl.NumberFormat('uk-UA').format(Math.round(n));
}

interface MonthlyKpi {
  revenue:  number;
  profit:   number;
  children: number;
  count:    number;
}

interface Props {
  kpi: MonthlyKpi;
}

const UA_MONTHS = [
  'січень','лютий','березень','квітень','травень','червень',
  'липень','серпень','вересень','жовтень','листопад','грудень',
];

export default function MonthlyKpi({ kpi }: Props) {
  const navigate = useNavigate();
  const now = new Date();
  const monthLabel = UA_MONTHS[now.getMonth()];
  const yearLabel  = now.getFullYear();

  const margin = kpi.revenue > 0
    ? Math.round((kpi.profit / kpi.revenue) * 100)
    : 0;

  const tiles = [
    {
      label: 'Виручка',
      value: `${fmt(kpi.revenue)} грн`,
      sub:   kpi.count > 0 ? `${kpi.count} ${kpi.count === 1 ? 'подія' : kpi.count < 5 ? 'події' : 'подій'}` : 'Подій ще немає',
      icon:  '💰',
      color: 'text-blue-700',
      bg:    'bg-blue-50',
    },
    {
      label: 'Прибуток',
      value: `${fmt(kpi.profit)} грн`,
      sub:   `Маржа ${margin}%`,
      icon:  '📈',
      color: 'text-emerald-700',
      bg:    'bg-emerald-50',
    },
    {
      label: 'Дітей охоплено',
      value: fmt(kpi.children),
      sub:   kpi.count > 0 && kpi.children > 0
        ? `~${Math.round(kpi.children / kpi.count)} на подію`
        : '—',
      icon:  '👦',
      color: 'text-purple-700',
      bg:    'bg-purple-50',
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4">
      <div className="flex justify-between items-center mb-3">
        <p className="text-sm font-semibold text-slate-800">
          Фінанси —{' '}
          <span className="font-normal text-slate-500 capitalize">
            {monthLabel} {yearLabel}
          </span>
        </p>
        <button
          onClick={() => navigate('/finance')}
          className="text-xs text-blue-600 hover:underline shrink-0"
        >
          Детальніше
        </button>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {tiles.map((tile) => (
          <div
            key={tile.label}
            className={`rounded-xl p-3 ${tile.bg}`}
          >
            <div className="flex items-center gap-1.5 mb-2">
              <span className="text-base">{tile.icon}</span>
              <span className={`text-xs font-medium ${tile.color}`}>
                {tile.label}
              </span>
            </div>
            <p className={`text-lg font-bold leading-none ${tile.color}`}>
              {tile.value}
            </p>
            <p className="text-xs text-slate-400 mt-1">{tile.sub}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

```

# FILE: apps/frontend/src/components/dashboard/StaleSchools.tsx

```
import { useNavigate } from "react-router-dom";

const STAGE_LABELS: Record<string, string> = {
  BASE: "База",
  FIRST_CONTACT: "Перший контакт",
  INTERESTED: "Зацікавлені",
  PRE_APPROVAL: "Попереднє погодження",
  DATE_CONFIRMED: "Підтвердження дати",
  PREPARATION: "Підготовка",
  IN_PROGRESS: "Подія в роботі",
};

interface Tier {
  label: string;
  emoji: string;
  min: number;
  max: number;
  dot: string;
  badge: string;
  bar: string;
  row: string;
}

const TIERS: Tier[] = [
  {
    label: "Критично",
    emoji: "🔴",
    min: 21,
    max: Infinity,
    dot: "bg-red-500",
    badge: "bg-red-100 text-red-700 border border-red-200",
    bar: "bg-red-500",
    row: "hover:bg-red-50/40",
  },
  {
    label: "Небезпечно",
    emoji: "🟠",
    min: 14,
    max: 20,
    dot: "bg-orange-400",
    badge: "bg-orange-100 text-orange-700 border border-orange-200",
    bar: "bg-orange-400",
    row: "hover:bg-orange-50/40",
  },
  {
    label: "Увага",
    emoji: "🟡",
    min: 7,
    max: 13,
    dot: "bg-amber-400",
    badge: "bg-amber-100 text-amber-700 border border-amber-200",
    bar: "bg-amber-400",
    row: "hover:bg-amber-50/30",
  },
];

function getTier(days: number): Tier {
  return TIERS.find((t) => days >= t.min && days <= t.max) ?? TIERS[2];
}

function barWidth(days: number): number {
  return Math.min(100, Math.round((days / 30) * 100));
}

interface StaleSchool {
  id: string;
  name: string;
  status: string | null;
  daysStale: number | null;
}

interface Props {
  schools: StaleSchool[];
}

export default function StaleSchools({ schools }: Props) {
  const navigate = useNavigate();

  const sorted = [...schools].sort(
    (a, b) => (b.daysStale ?? 0) - (a.daysStale ?? 0),
  );

  const criticalCount = schools.filter((s) => (s.daysStale ?? 0) >= 21).length;

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 flex flex-col">
      {/* Хедер */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-md bg-amber-50 flex items-center justify-center">
            <span className="text-xs">⚠️</span>
          </div>
          <p className="text-sm font-semibold text-slate-800">
            Потребують уваги
          </p>
          {criticalCount > 0 && (
            <span className="text-xs font-bold px-1.5 py-0.5 rounded-full bg-red-500 text-white leading-none">
              {criticalCount}
            </span>
          )}
        </div>
        <button
          onClick={() => navigate("/schools")}
          className="text-xs text-blue-600 hover:underline shrink-0"
        >
          Переглянути всі
        </button>
      </div>

      {schools.length === 0 ? (
        <div className="py-6 text-center">
          <p className="text-2xl mb-1">✅</p>
          <p className="text-sm text-slate-400">Усі школи активні</p>
        </div>
      ) : (
        <div className="flex flex-col gap-1">
          {sorted.map((school) => {
            const days = school.daysStale ?? 0;
            const tier = getTier(days);
            const stageLabel = school.status
              ? (STAGE_LABELS[school.status] ?? school.status)
              : "—";
            const width = barWidth(days);

            return (
              <div
                key={school.id}
                onClick={() => navigate(`/schools/${school.id}`)}
                className={`group relative flex items-center gap-3 py-2.5 px-2 -mx-1 rounded-xl cursor-pointer transition-colors ${tier.row}`}
              >
                {/* Кольорова крапка-індикатор */}
                <div className={`w-2 h-2 rounded-full shrink-0 ${tier.dot}`} />

                {/* Назва + стадія + прогрес-бар */}
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-slate-800 truncate leading-tight">
                    {school.name}
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5 mb-1.5">
                    {stageLabel}
                  </p>

                  {/* Heat bar */}
                  <div className="h-1 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${tier.bar}`}
                      style={{ width: `${width}%` }}
                    />
                  </div>
                </div>

                {/* Badge з днями */}
                <span
                  className={`text-xs font-bold px-2 py-0.5 rounded-full shrink-0 ${tier.badge}`}
                >
                  {days} дн
                </span>
              </div>
            );
          })}
        </div>
      )}

      {/* Футер — легенда тирів */}
      {schools.length > 0 && (
        <div className="flex items-center gap-3 mt-4 pt-3 border-t border-slate-50">
          {TIERS.map((t) => {
            const count = schools.filter(
              (s) => (s.daysStale ?? 0) >= t.min && (s.daysStale ?? 0) <= t.max,
            ).length;
            if (count === 0) return null;
            return (
              <span
                key={t.label}
                className="flex items-center gap-1 text-xs text-slate-400"
              >
                {t.emoji}{" "}
                <span className="font-medium text-slate-600">{count}</span>{" "}
                {t.label.toLowerCase()}
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
}

```

# FILE: apps/frontend/src/components/dashboard/TodayEvents.tsx

```
import { useNavigate } from "react-router-dom";

interface CrewMember {
  id: string;
  name: string;
}

interface Crew {
  id: string;
  name?: string;
  host?: CrewMember | null;
  driver?: CrewMember | null;
}

interface School {
  id: string;
  name: string;
}

interface TodayEvent {
  id: string;
  time?: string | null;
  project: string;
  school?: School | null;
  crew?: Crew | null;
}

interface Props {
  events: TodayEvent[];
}

function plural(n: number): string {
  if (n % 10 === 1 && n % 100 !== 11) return "подія";
  if (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20))
    return "події";
  return "подій";
}

export default function TodayEvents({ events }: Props) {
  const navigate = useNavigate();

  const dateLabel = new Date().toLocaleDateString("uk-UA", {
    day: "numeric",
    month: "long",
    weekday: "long",
  });

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 flex flex-col">
      {/* Хедер */}
      <div className="flex justify-between items-start mb-3">
        <div>
          <p className="text-sm font-semibold text-slate-800">
            Сьогоднішні події
          </p>
          <p className="text-xs text-slate-400 mt-0.5 capitalize">
            {dateLabel}
          </p>
        </div>
        <button
          onClick={() => navigate("/calendar")}
          className="text-xs text-blue-600 hover:underline shrink-0"
        >
          Календар
        </button>
      </div>

      {events.length === 0 ? (
        <div className="py-6 text-center text-slate-400 text-sm">
          Сьогодні подій немає
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {events.map((ev) => {
            const hasCrew = !!ev.crew;
            const crewLabel = ev.crew?.name ?? ev.crew?.host?.name ?? null;

            return (
              <div
                key={ev.id}
                className={`rounded-xl border p-3 flex flex-col gap-2.5 ${
                  hasCrew
                    ? "border-slate-100 bg-white"
                    : "border-amber-200 bg-amber-50/40"
                }`}
              >
                {/* Час + проєкт в один рядок */}
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-slate-800 tabular-nums shrink-0">
                    {ev.time ?? "—:——"}
                  </span>
                  <span className="text-xs text-slate-400 truncate">
                    {ev.project}
                  </span>
                </div>

                {/* Назва школи — дозволяємо переноситись, не обрізаємо */}
                <p className="text-sm font-semibold text-slate-700 leading-snug line-clamp-2">
                  {ev.school?.name ?? "—"}
                </p>

                {/* Статус екіпажу + кнопка в один рядок */}
                <div className="flex items-center justify-between gap-2">
                  {hasCrew ? (
                    <span className="text-[11px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full font-medium shrink-0">
                      ✅ {crewLabel ?? "Екіпаж призначено"}
                    </span>
                  ) : (
                    <span className="text-[11px] text-amber-700 bg-amber-100 border border-amber-200 px-2 py-0.5 rounded-full font-medium shrink-0">
                      ⚠️ Немає екіпажу
                    </span>
                  )}

                  <button
                    onClick={() =>
                      ev.school && navigate(`/schools/${ev.school.id}`)
                    }
                    className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors shrink-0 ${
                      hasCrew
                        ? "bg-slate-100 text-slate-700 hover:bg-slate-200"
                        : "bg-white border border-amber-400 text-amber-700 hover:bg-amber-50"
                    }`}
                  >
                    {hasCrew ? "Відкрити →" : "Призначити →"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <p className="text-xs text-slate-400 mt-3 pt-3 border-t border-slate-50">
        Усього на сьогодні: {events.length} {plural(events.length)}
      </p>
    </div>
  );
}

```

# FILE: apps/frontend/src/components/dashboard/UpcomingEvents.tsx

```
import { useNavigate } from 'react-router-dom';

const UA_WEEKDAYS = ['нд', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'];
const UA_MONTHS_SHORT = ['січ', 'лют', 'бер', 'квіт', 'трав', 'черв', 'лип', 'серп', 'вер', 'жовт', 'лист', 'груд'];

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  const day = d.getDate();
  const month = UA_MONTHS_SHORT[d.getMonth()];
  const weekday = UA_WEEKDAYS[d.getDay()];
  return `${day} ${month}, ${weekday}`;
}

interface Crew {
  id: string;
  name?: string;
  host?: { id: string; name: string } | null;
}

interface UpcomingEvent {
  id: string;
  date: string;
  time?: string | null;
  project: string;
  school?: { id: string; name: string } | null;
  city?: { id: string; name: string } | null;
  crew?: Crew | null;
}

interface Props {
  events: UpcomingEvent[];
}

export default function UpcomingEvents({ events }: Props) {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 flex flex-col">
      <div className="flex justify-between items-center mb-3">
        <p className="text-sm font-semibold text-slate-800">Найближчі події (5 днів)</p>
        <button
          onClick={() => navigate('/calendar')}
          className="text-xs text-blue-600 hover:underline shrink-0"
        >
          Перейти до календаря
        </button>
      </div>

      {events.length === 0 ? (
        <div className="py-6 text-center text-slate-400 text-sm">
          Найближчими днями подій немає
        </div>
      ) : (
        <div className="flex flex-col divide-y divide-slate-50">
          {events.map((ev) => {
            const crewName = ev.crew?.name ?? (ev.crew?.host?.name ?? null);

            return (
              <div
                key={ev.id}
                onClick={() => ev.school && navigate(`/schools/${ev.school.id}`)}
                className="flex items-center gap-3 py-2.5 cursor-pointer hover:bg-slate-50/60 rounded-lg px-1 -mx-1 transition-colors"
              >
                <div className="shrink-0 text-right w-24">
                  <p className="text-xs font-medium text-slate-600">
                    {formatDate(ev.date)}
                  </p>
                  <p className="text-xs text-slate-400">{ev.time ?? '—:——'}</p>
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-slate-800 truncate">
                    {ev.school?.name ?? '—'}
                  </p>
                  <p className="text-xs text-slate-400 truncate">{ev.project}</p>
                </div>

                {crewName && (
                  <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full border border-blue-100 shrink-0">
                    {crewName}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

```

# FILE: apps/frontend/src/components/ErrorBoundary.tsx

```
import React from "react";
import * as Sentry from "@sentry/react";

interface Props {
  children: React.ReactNode;
}
interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends React.Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    Sentry.captureException(error, { extra: { componentStack: info.componentStack } });
  }

  handleReload = () => {
    window.location.href = "/";
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
          <div className="max-w-md w-full bg-white rounded-[24px] shadow-sm border border-slate-100 p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-rose-50 flex items-center justify-center mx-auto mb-4 text-3xl">
              ⚠️
            </div>
            <h1 className="text-xl font-bold text-slate-800 mb-2">
              Щось пішло не так
            </h1>
            <p className="text-sm text-slate-500 mb-6">
              Сталася неочікувана помилка. Спробуйте оновити сторінку — якщо
              проблема повториться, зверніться до адміністратора.
            </p>
            <button
              onClick={this.handleReload}
              className="px-5 py-2.5 rounded-full bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 transition-colors active:scale-95"
            >
              На головну
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

```

# FILE: apps/frontend/src/components/finance/FinanceCharts.tsx

```
import React, { useMemo, memo } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";
import type {
  FinanceDashboardData,
  MonthlyFinance,
  FinanceByProject,
  FinanceByCategory,
  FinanceTopSchool,
  FinanceEventItem,
} from "../../types";

const PALETTE = [
  "#3b82f6",
  "#10b981",
  "#f59e0b",
  "#8b5cf6",
  "#ec4899",
  "#06b6d4",
];
const PIE_COLORS = [
  "#3b82f6",
  "#8b5cf6",
  "#ec4899",
  "#f43f5e",
  "#f59e0b",
  "#10b981",
  "#0ea5e9",
];

const fmt = (n: number) =>
  new Intl.NumberFormat("uk-UA").format(Math.round(n || 0));


interface KpiCardProps {
  title: string;
  value: number;
  color: string;
  bg: string;
  icon: React.ReactNode;
  subtitle?: string;
}

const KpiCard = memo(function KpiCard({
  title,
  value,
  color,
  bg,
  icon,
  subtitle,
}: KpiCardProps) {
  return (
    <div className="bg-white rounded-[24px] p-5 border border-slate-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow duration-300">
      <div className="flex justify-between items-start mb-4">
        <p className="text-xs sm:text-sm font-semibold text-slate-500 leading-tight pr-2">
          {title}
        </p>
        <div
          className={`w-10 h-10 shrink-0 rounded-2xl flex items-center justify-center text-xl shadow-sm ${bg}`}
        >
          {icon}
        </div>
      </div>
      <div>
        <p
          className={`text-xl sm:text-2xl md:text-3xl font-black tracking-tight ${color}`}
        >
          {fmt(value)}{" "}
          <span className="text-sm font-bold text-slate-400 opacity-60">
            грн
          </span>
        </p>
        {subtitle && (
          <p className="text-[11px] sm:text-xs text-slate-400 mt-1.5 font-medium">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
});

const EmptyState = memo(function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[150px] text-slate-400">
      <span className="text-3xl mb-3 opacity-50">📂</span>
      <span className="text-sm font-medium">Немає даних за цей період</span>
    </div>
  );
});

const EventTable = memo(function EventTable({
  events,
  positive,
}: {
  events: FinanceEventItem[];
  positive: boolean;
}) {
  if (!events || !events.length) return <EmptyState />;
  return (
    <table className="w-full text-sm min-w-[300px]">
      <thead>
        <tr className="text-slate-400 text-xs uppercase border-b border-slate-50">
          <th className="text-left pb-3 font-semibold tracking-wider">Дата</th>
          <th className="text-left pb-3 font-semibold tracking-wider">
            Заклад
          </th>
          <th className="text-right pb-3 font-semibold tracking-wider">
            Прибуток
          </th>
        </tr>
      </thead>
      <tbody>
        {events.map((e: FinanceEventItem, i: number) => (
          <tr
            key={i}
            className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors"
          >
            <td className="py-3 text-slate-500 whitespace-nowrap">
              {new Date(e.date).toLocaleDateString("uk-UA", {
                day: "2-digit",
                month: "2-digit",
              })}
            </td>
            <td className="py-3 font-medium text-slate-700 truncate max-w-[120px] sm:max-w-[200px] pr-2">
              {e.school}
            </td>
            <td
              className={`py-3 text-right font-bold whitespace-nowrap ${
                positive ? "text-emerald-600" : "text-rose-500"
              }`}
            >
              {fmt(e.profit)} грн
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
});

interface TooltipPayload {
  name?: string;
  value?: number;
  color?: string;
}

const CustomTooltip = memo(function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: TooltipPayload[];
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white/90 backdrop-blur-md border border-slate-100 p-4 rounded-2xl shadow-xl text-sm min-w-[160px]">
      <p className="font-bold text-slate-800 mb-3 border-b border-slate-100 pb-2">
        {label}
      </p>
      {payload.map((entry: TooltipPayload, index: number) => (
        <div
          key={index}
          className="flex items-center justify-between gap-4 mb-1.5 last:mb-0"
        >
          <div className="flex items-center gap-2">
            <div
              className="w-2.5 h-2.5 rounded-full shadow-sm"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-slate-500">{entry.name}:</span>
          </div>
          <span className="font-bold text-slate-800">
            {fmt(entry.value)} грн
          </span>
        </div>
      ))}
    </div>
  );
});


const RevenueChart = memo(function RevenueChart({
  monthly,
}: {
  monthly: MonthlyFinance[];
}) {
  if (!monthly?.length) return <EmptyState />;
  const data = monthly.slice(-12);
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={data}
        margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.25} />
            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#10b981" stopOpacity={0.25} />
            <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid
          strokeDasharray="3 3"
          vertical={false}
          stroke="#f1f5f9"
        />
        <XAxis
          dataKey="month"
          tick={{ fontSize: 12, fill: "#64748b" }}
          axisLine={false}
          tickLine={false}
          dy={10}
          minTickGap={20}
        />
        <YAxis
          tickFormatter={(v) => (v >= 1000 ? `${Math.round(v / 1000)}k` : v)}
          tick={{ fontSize: 12, fill: "#64748b" }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip
          content={<CustomTooltip />}
          cursor={{ stroke: "#cbd5e1", strokeWidth: 1, strokeDasharray: "4 4" }}
        />
        <Area
          type="monotone"
          name="Виручка"
          dataKey="revenue"
          stroke="#3b82f6"
          strokeWidth={3}
          fill="url(#colorRevenue)"
          activeDot={{ r: 6, strokeWidth: 0, fill: "#3b82f6" }}
          isAnimationActive={false}
        />
        <Area
          type="monotone"
          name="Прибуток"
          dataKey="profit"
          stroke="#10b981"
          strokeWidth={3}
          fill="url(#colorProfit)"
          activeDot={{ r: 6, strokeWidth: 0, fill: "#10b981" }}
          isAnimationActive={false}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
});

const ProjectPieChart = memo(function ProjectPieChart({
  byProject,
  projectTotals,
}: {
  byProject: FinanceByProject[];
  projectTotals: { total: number; percents: number[] };
}) {
  if (!byProject?.length) return <EmptyState />;
  return (
    <>
      <div className="h-[200px] md:h-[220px] w-full relative mb-6 shrink-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={byProject}
              dataKey="value"
              nameKey="name"
              innerRadius={60}
              outerRadius={85}
              paddingAngle={3}
              stroke="none"
              isAnimationActive={false}
            >
              {byProject.map((_: FinanceByProject, index: number) => (
                <Cell
                  key={`cell-${index}`}
                  fill={PIE_COLORS[index % PIE_COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="flex-1 overflow-y-auto space-y-3 pr-2">
        {byProject.map((item: FinanceByProject, idx: number) => (
          <div key={idx} className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-3 min-w-0 pr-2">
              <div
                className="w-3 h-3 rounded-full shrink-0"
                style={{ backgroundColor: PIE_COLORS[idx % PIE_COLORS.length] }}
              />
              <span className="text-slate-600 truncate font-medium">
                {item.name}
              </span>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <span className="text-xs text-slate-400 font-medium w-8 text-right">
                {projectTotals.percents[idx]}%
              </span>
              <span className="font-bold text-slate-800 w-20 text-right">
                {fmt(item.value)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
});

const ExpenseChart = memo(function ExpenseChart({
  byExpenseCategory,
}: {
  byExpenseCategory: FinanceByCategory[];
}) {
  if (!byExpenseCategory?.length) return <EmptyState />;
  return (
    <div className="h-[280px] w-full min-w-[300px] -ml-4">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={byExpenseCategory}
          layout="vertical"
          margin={{ top: 0, right: 20, left: 30, bottom: 0 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            horizontal={true}
            vertical={false}
            stroke="#f1f5f9"
          />
          <XAxis type="number" hide />
          <YAxis
            dataKey="name"
            type="category"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: "#475569", fontWeight: 500 }}
            width={120}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "#f8fafc" }} />
          <Bar
            dataKey="value"
            name="Сума"
            fill="#f43f5e"
            radius={[0, 8, 8, 0]}
            barSize={20}
            isAnimationActive={false}
          >
            {byExpenseCategory.map((_: FinanceByCategory, idx: number) => (
              <Cell key={`cell-${idx}`} fill={PALETTE[idx % PALETTE.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
});

const TopSchools = memo(function TopSchools({
  topSchools,
}: {
  topSchools: FinanceTopSchool[];
}) {
  if (!topSchools?.length) return <EmptyState />;
  const maxRev = topSchools[0].revenue;
  return (
    <div className="space-y-5">
      {topSchools.map((school: FinanceTopSchool, idx: number) => {
        const percent = Math.max((school.revenue / maxRev) * 100, 2);
        return (
          <div key={idx} className="relative">
            <div className="flex justify-between items-end mb-2 text-sm">
              <div className="flex items-center gap-2 min-w-0 pr-4">
                <span className="font-bold text-slate-400 w-4">{idx + 1}.</span>
                <span className="font-bold text-slate-700 truncate">
                  {school.name}
                </span>
              </div>
              <span className="font-bold text-emerald-600 shrink-0 bg-emerald-50 px-2 py-0.5 rounded-md">
                {fmt(school.revenue)} грн
              </span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div
                className="bg-blue-500 h-full rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${percent}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
});


interface Props {
  data: FinanceDashboardData;
  period: string;
  setPeriod: (v: string) => void;
  projectFilter: string;
  setProjectFilter: (v: string) => void;
  selectedCity: { id: string; name: string };
}


export default memo(function FinanceCharts({
  data,
  period,
  setPeriod,
  projectFilter,
  setProjectFilter,
  selectedCity,
}: Props) {
  const {
    kpi,
    monthly,
    byProject,
    byExpenseCategory,
    topSchools,
    topEvents,
    worstEvents,
    expectedRevenue,
    filters,
  } = data;

  const projectTotals = useMemo(() => {
    const total =
      byProject?.reduce((sum: number, p: FinanceByProject) => sum + p.value, 0) ?? 0;
    const percents = (byProject ?? []).map((item: FinanceByProject) =>
      total > 0 ? Math.round((item.value / total) * 100) : 0,
    );
    return { total, percents };
  }, [byProject]);

  return (
    <div className="p-4 md:p-8 bg-slate-50 min-h-screen font-sans overflow-x-hidden">
      {/* Шапка та фільтри */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800 tracking-tight">
            Фінанси
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Аналітика доходів та витрат{" "}
            {selectedCity.id ? (
              <span className="font-medium text-blue-600">
                {selectedCity.name}
              </span>
            ) : (
              "по всіх містах"
            )}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="bg-white border border-slate-200 text-slate-700 text-sm font-medium rounded-xl px-4 py-2.5 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 shadow-sm transition-all appearance-none cursor-pointer pr-8"
          >
            <option value="all">За весь час</option>
            <option value="year">Цей рік</option>
            <option value="quarter">Цей квартал</option>
            <option value="month">Цей місяць</option>
          </select>

          <select
            value={projectFilter}
            onChange={(e) => setProjectFilter(e.target.value)}
            className="bg-white border border-slate-200 text-slate-700 text-sm font-medium rounded-xl px-4 py-2.5 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 shadow-sm transition-all appearance-none cursor-pointer pr-8"
          >
            <option value="">Всі проєкти</option>
            {filters?.projects?.map((p: string) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* KPI Картки */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-8">
        <KpiCard
          title="Загальна виручка"
          value={kpi.totalRevenue}
          color="text-blue-600"
          bg="bg-blue-50"
          icon="💰"
        />
        <KpiCard
          title="Чистий прибуток"
          value={kpi.totalProfit}
          color="text-emerald-600"
          bg="bg-emerald-50"
          icon="📈"
        />
        <KpiCard
          title="Витрати"
          value={kpi.totalExpenses}
          color="text-rose-600"
          bg="bg-rose-50"
          icon="📉"
        />
        <KpiCard
          title="Очікувана виручка"
          value={expectedRevenue}
          color="text-amber-500"
          bg="bg-amber-50"
          icon="⏳"
          subtitle="Із запланованих подій"
        />
      </div>

      {/* Верхній ряд графіків */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-[24px] shadow-sm border border-slate-100 p-5 md:p-7 xl:col-span-2">
          <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center text-lg">
              📊
            </span>
            Динаміка виручки та прибутку
          </h3>
          <div className="h-[280px] md:h-[320px] w-full -ml-4 sm:ml-0">
            <RevenueChart monthly={monthly} />
          </div>
        </div>

        <div className="bg-white rounded-[24px] shadow-sm border border-slate-100 p-5 md:p-7 flex flex-col">
          <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center text-lg">
              🎯
            </span>
            Доходи за проєктами
          </h3>
          <ProjectPieChart
            byProject={byProject}
            projectTotals={projectTotals}
          />
        </div>
      </div>

      {/* Нижній ряд */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-[24px] shadow-sm border border-slate-100 p-5 md:p-7 overflow-x-auto">
          <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center text-lg">
              💳
            </span>
            Статті витрат
          </h3>
          <ExpenseChart byExpenseCategory={byExpenseCategory} />
        </div>

        <div className="bg-white rounded-[24px] shadow-sm border border-slate-100 p-5 md:p-7">
          <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center text-lg">
              🏫
            </span>
            Топ-5 найприбутковіших закладів
          </h3>
          <TopSchools topSchools={topSchools} />
        </div>
      </div>

      {/* Найкращі і найгірші події */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-[24px] shadow-sm border border-slate-100 p-5 md:p-7 overflow-x-auto">
          <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center text-lg">
              🏆
            </span>
            Найприбутковіші події
          </h3>
          <EventTable events={topEvents} positive={true} />
        </div>
        <div className="bg-white rounded-[24px] shadow-sm border border-slate-100 p-5 md:p-7 overflow-x-auto">
          <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center text-lg">
              ⚠️
            </span>
            Найменш прибуткові події
          </h3>
          <EventTable events={worstEvents} positive={false} />
        </div>
      </div>
    </div>
  );
});

```

# FILE: apps/frontend/src/components/finance/StaffFinanceView.tsx

```
import { useState, useEffect, useMemo, memo } from "react";
import { api } from "../../config/api";

const fmt = (n: number) =>
  new Intl.NumberFormat("uk-UA").format(Math.round(n || 0));

const PERIOD_LABELS: Record<string, string> = {
  year: "Цей рік",
  quarter: "Цей квартал",
  month: "Цей місяць",
  all: "За весь час",
};

interface Props {
  myBalance: number | null;
  selectedCity: any;
}


const BalanceCard = memo(function BalanceCard({
  myBalance,
}: {
  myBalance: number | null;
}) {
  return (
    <div className="flex items-center justify-center py-10">
      <div className="bg-white rounded-[24px] border border-slate-100 shadow-sm p-10 text-center max-w-sm w-full">
        <div className="w-16 h-16 bg-blue-50 rounded-[20px] flex items-center justify-center text-3xl mx-auto mb-4">
          💰
        </div>
        <p className="text-sm text-slate-400 mb-2">Ваш баланс</p>
        <p className="text-4xl font-black text-blue-600 tracking-tight">
          {myBalance !== null ? fmt(myBalance) : "—"}
          <span className="text-lg font-bold text-slate-400 ml-1">грн</span>
        </p>
        <p className="text-xs text-slate-400 mt-4">
          Сума нарахованих зарплат за всі події
        </p>
      </div>
    </div>
  );
});

interface StaffMemberProps {
  member: any;
  index: number;
  maxRevenue: number;
}

const StaffMemberRow = memo(function StaffMemberRow({
  member,
  index,
  maxRevenue,
}: StaffMemberProps) {
  const pct = Math.round((member.revenue / maxRevenue) * 100);
  const isTop = index === 0;
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-2">
          <span
            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
              isTop
                ? "bg-amber-100 text-amber-700"
                : "bg-slate-100 text-slate-500"
            }`}
          >
            {index + 1}
          </span>
          <span className="text-sm font-semibold text-slate-800">
            {member.name}
          </span>
          {isTop && (
            <span className="text-xs bg-amber-50 text-amber-600 border border-amber-200 px-2 py-0.5 rounded-full">
              🏆 Топ
            </span>
          )}
        </div>
        <div className="text-right">
          <p className="text-sm font-bold text-slate-800">
            {fmt(member.revenue)} грн
          </p>
          <p className="text-xs text-slate-400">{member.eventsCount} подій</p>
        </div>
      </div>
      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${
            isTop ? "bg-amber-400" : "bg-blue-400"
          }`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
});


export default memo(function StaffFinanceView({
  myBalance,
  selectedCity,
}: Props) {
  const [tab, setTab] = useState<"balance" | "revenue">("balance");
  const [period, setPeriod] = useState("year");
  const [staffData, setStaffData] = useState<any>(null);
  const [loadingStaff, setLoadingStaff] = useState(false);

  useEffect(() => {
    if (tab !== "revenue") return;
    setLoadingStaff(true);
    const params = new URLSearchParams();
    if (period) params.set("period", period);
    if (selectedCity?.id) params.set("cityId", selectedCity.id);
    api
      .get(`/finance/staff-revenue?${params}`)
      .then((r) => setStaffData(r.data))
      .catch(() => {})
      .finally(() => setLoadingStaff(false));
  }, [tab, period, selectedCity?.id]);

  const maxRevenue = staffData?.staff?.[0]?.revenue ?? 1;

  const staffByRole = useMemo(() => {
    if (!staffData?.staff) return { hosts: [], drivers: [] };
    return {
      hosts: staffData.staff.filter((s: any) => s.role === "HOST"),
      drivers: staffData.staff.filter((s: any) => s.role === "DRIVER"),
    };
  }, [staffData]);

  return (
    <div className="p-4 md:p-8 bg-slate-50 min-h-screen">
      <h1 className="text-2xl font-bold text-slate-800 mb-6">Фінанси</h1>

      {/* Вкладки */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setTab("balance")}
          className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
            tab === "balance"
              ? "bg-blue-600 text-white shadow-sm"
              : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
          }`}
        >
          💰 Мій баланс
        </button>
        <button
          onClick={() => setTab("revenue")}
          className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
            tab === "revenue"
              ? "bg-blue-600 text-white shadow-sm"
              : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
          }`}
        >
          📊 Виручка команди
        </button>
      </div>

      {tab === "balance" && <BalanceCard myBalance={myBalance} />}

      {tab === "revenue" && (
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-3">
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="bg-white border border-slate-200 text-slate-700 text-sm font-medium rounded-xl px-4 py-2.5 focus:outline-none shadow-sm"
            >
              <option value="year">Цей рік</option>
              <option value="quarter">Цей квартал</option>
              <option value="month">Цей місяць</option>
              <option value="all">За весь час</option>
            </select>
            {selectedCity?.name && (
              <span className="text-sm text-slate-500">
                📍 {selectedCity.name}
              </span>
            )}
          </div>

          {loadingStaff ? (
            <div className="flex items-center justify-center py-16">
              <div className="w-8 h-8 border-4 border-slate-200 border-t-blue-500 rounded-full animate-spin" />
            </div>
          ) : !staffData || staffData.staff.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-10 text-center text-slate-400">
              <p className="text-3xl mb-3">📊</p>
              <p>Немає даних за обраний період</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 text-center">
                  <p className="text-xs text-slate-400 mb-1">
                    Загальна виручка
                  </p>
                  <p className="text-2xl font-black text-blue-600">
                    {fmt(staffData.totalRevenue)}{" "}
                    <span className="text-sm font-medium text-slate-400">
                      грн
                    </span>
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    {PERIOD_LABELS[period]}
                  </p>
                </div>
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 text-center">
                  <p className="text-xs text-slate-400 mb-1">Подій проведено</p>
                  <p className="text-2xl font-black text-slate-800">
                    {staffData.eventsCount}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    {PERIOD_LABELS[period]}
                  </p>
                </div>
              </div>

              {(
                [
                  {
                    key: "HOST",
                    label: "🎙️ Ведучі",
                    members: staffByRole.hosts,
                  },
                  {
                    key: "DRIVER",
                    label: "🚗 Водії",
                    members: staffByRole.drivers,
                  },
                ] as const
              ).map(({ key, label, members }) => {
                if (members.length === 0) return null;
                return (
                  <div
                    key={key}
                    className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5"
                  >
                    <h3 className="font-bold text-slate-800 mb-4">{label}</h3>
                    <div className="flex flex-col gap-4">
                      {members.map((member: any, i: number) => (
                        <StaffMemberRow
                          key={member.id}
                          member={member}
                          index={i}
                          maxRevenue={maxRevenue}
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </div>
      )}
    </div>
  );
});

```

# FILE: apps/frontend/src/components/IssueCarousel.tsx

```
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../config/api";
import { useSelectedCity } from "../context/CityContext";
import type { IssueReport } from "../types";

const STATUSES = ["Планується", "Виконується", "Виконано"];

const STATUS_STYLES: Record<string, string> = {
  Планується: "bg-amber-50 text-amber-700 border-amber-200",
  Виконується: "bg-blue-50 text-blue-700 border-blue-200",
  Виконано: "bg-emerald-50 text-emerald-700 border-emerald-200",
};

function getNextStatus(current: string) {
  const idx = STATUSES.indexOf(current);
  return STATUSES[(idx + 1) % STATUSES.length];
}

export default function IssueCarousel() {
  const { selectedCity } = useSelectedCity();
  const qc = useQueryClient();
  const [exitingIssueId, setExitingIssueId] = useState<string | null>(null);

  const { data: issues = [] } = useQuery({
    queryKey: ["issues", selectedCity?.id],
    queryFn: async () => {
      if (!selectedCity?.id) return [];
      const res = await api.get(`/issues?cityId=${selectedCity.id}`);
      return res.data.filter((i: IssueReport) => i.status !== "Виконано");
    },
    enabled: !!selectedCity?.id,
    refetchOnWindowFocus: true,
    staleTime: 0,
  });

  const updateStatusMutation = useMutation({
    mutationFn: (data: { id: string; status: string }) =>
      api.patch(`/issues/${data.id}/status`, { status: data.status }),
    onMutate: async (vars) => {
      await qc.cancelQueries({ queryKey: ["issues", selectedCity?.id] });
      const prev = qc.getQueryData(["issues", selectedCity?.id]);
      qc.setQueryData(["issues", selectedCity?.id], (old: IssueReport[] | undefined) =>
        Array.isArray(old)
          ? old
              .map((i) =>
                i.id === vars.id ? { ...i, status: vars.status } : i,
              )
              .filter((i) => i.status !== "Виконано")
          : old,
      );
      return { prev };
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.prev) qc.setQueryData(["issues", selectedCity?.id], ctx.prev);
    },
    onSettled: () => {
      qc.invalidateQueries({ queryKey: ["issues", selectedCity?.id] });
    },
  });

  const handleStatusToggle = (issue: IssueReport) => {
    const nextStatus = getNextStatus(issue.status);

    if (nextStatus === "Виконано") {
      setExitingIssueId(issue.id);
      setTimeout(() => {
        updateStatusMutation.mutate({ id: issue.id, status: nextStatus });
        setExitingIssueId(null);
      }, 500);
    } else {
      updateStatusMutation.mutate({ id: issue.id, status: nextStatus });
    }
  };

  if (issues.length === 0) return null;

  return (
    <div className="mb-6 animate-[slideDown_0.4s_cubic-bezier(0.16,1,0.3,1)_forwards]">
      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-15px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideUp {
          from { opacity: 1; transform: translateY(0); }
          to { opacity: 0; transform: translateY(-10px); }
        }
      `}</style>

      <h2 className="text-lg font-bold text-slate-800 mb-3 flex items-center gap-2">
        🚨 <span>Активні проблеми</span>
        <span className="text-sm font-medium text-red-600 bg-red-50 px-2 py-0.5 rounded-full border border-red-100">
          {issues.length}
        </span>
      </h2>

      {}
      <div className="flex overflow-x-auto pb-4 -mx-1 px-1">
        {issues.map((issue) => {
          const isExiting = exitingIssueId === issue.id;

          return (
            <div
              key={issue.id}
              className={`transition-all duration-500 ease-in-out overflow-hidden transform origin-left ${
                isExiting
                  ? "w-0 min-w-0 mr-0 opacity-0 pointer-events-none"
                  : "w-[300px] min-w-[300px] mr-4 opacity-100 shrink-0"
              }`}
            >
              {/* Внутрішній контейнер має фіксовану ширину, щоб текст не ламався */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 border-l-4 border-l-red-500 p-5 flex flex-col gap-3 w-[300px]">
                <div>
                  <p className="text-xs text-slate-400 mb-1">
                    {new Date(issue.createdAt).toLocaleDateString("uk-UA", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                  <p className="font-bold text-slate-800 text-sm">
                    {issue.schoolName}
                  </p>
                  <p className="text-xs text-slate-500">{issue.eventName}</p>
                </div>

                <p className="text-sm text-slate-700 bg-slate-50 rounded-xl p-3 italic leading-relaxed">
                  "{issue.message}"
                </p>

                <button
                  onClick={() => handleStatusToggle(issue)}
                  className={`text-xs font-bold px-3 py-2 rounded-lg border transition-colors text-left ${STATUS_STYLES[issue.status] || STATUS_STYLES["Планується"]}`}
                >
                  ● {issue.status} → натисни щоб змінити
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

```

# FILE: apps/frontend/src/components/Layout.tsx

```
import { Link, useLocation, useOutlet } from "react-router-dom";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSelectedCity } from "../context/CityContext";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../context/AuthContext";
import {
  Home,
  MapPin,
  School,
  Baby,
  Wallet,
  Calendar,
  Users,
  GraduationCap,
  Menu,
  X,
  LogOut,
} from "lucide-react";

function NavLink({
  to,
  icon: Icon,
  label,
  onClick,
}: {
  to: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  onClick?: () => void;
}) {
  const location = useLocation();
  const active = location.pathname.startsWith(to);
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`relative flex items-center px-4 py-3 rounded-lg transition-colors group
        ${active ? "bg-blue-600 text-white" : "text-slate-400 hover:bg-slate-800 hover:text-white"}`}
    >
      {active && (
        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-white rounded-r-full" />
      )}
      <Icon className="w-4 h-4 mr-3 shrink-0" />
      {label}
    </Link>
  );
}

export default function Layout() {
  const location = useLocation();
  const outlet = useOutlet();
  const queryClient = useQueryClient();
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const is = (roles: string[]) => !!user?.role && roles.includes(user.role);
  const { selectedCity } = useSelectedCity();

  const handleLogout = async () => {
    await logout();
    queryClient.clear();
  };

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <div className="flex h-screen bg-surface-subtle font-sans">
      {/* Мобільний хедер */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-[#0B1527] text-white flex items-center justify-between px-4 z-40">
        <div className="flex items-center gap-2">
          <GraduationCap className="w-5 h-5" />
          <span className="font-semibold tracking-wider text-sm">
            СВІТЛО ЗНАНЬ
          </span>
          <span className="text-xs text-blue-300 ml-1">
            · {selectedCity.name}
          </span>
        </div>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2"
          aria-label={isMobileMenuOpen ? "Закрити меню" : "Відкрити меню"}
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Оверлей для мобільного меню */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed inset-0 bg-slate-900/50 z-40"
            onClick={closeMenu}
          />
        )}
      </AnimatePresence>

      {/* Сайдбар */}
      <aside
        className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-[#0B1527] text-white flex flex-col transition-transform duration-300 ease-in-out
        md:relative md:translate-x-0
        ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        <div className="p-6 flex flex-col items-center border-b border-slate-700/50 hidden md:flex">
          <div className="w-16 h-16 bg-blue-500 rounded-full mb-3 flex items-center justify-center">
            <GraduationCap className="w-8 h-8" />
          </div>
          <h2 className="text-sm font-semibold tracking-wider">СВІТЛО ЗНАНЬ</h2>
          <p className="text-xs text-blue-300 mt-1 tracking-wide flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            {selectedCity.name}
          </p>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto mt-16 md:mt-0">
          {is(["SUPERADMIN", "MANAGER"]) && (
            <NavLink to="/dashboard" icon={Home} label="Дашборд" onClick={closeMenu} />
          )}
          {is(["SUPERADMIN"]) && (
            <NavLink to="/cities" icon={MapPin} label="Міста" onClick={closeMenu} />
          )}
          <NavLink to="/schools" icon={School} label="Школи" onClick={closeMenu} />
          <NavLink to="/kindergartens" icon={Baby} label="Садочки" onClick={closeMenu} />
          <NavLink to="/finance" icon={Wallet} label="Фінанси" onClick={closeMenu} />
          <NavLink to="/calendar" icon={Calendar} label="Календар" onClick={closeMenu} />
          {is(["SUPERADMIN"]) && (
            <NavLink to="/employees" icon={Users} label="Працівники" onClick={closeMenu} />
          )}
        </nav>

        <div className="p-4 border-t border-slate-700/50 pb-8 md:pb-4">
          <div className="flex items-center px-4 py-2 text-slate-300 justify-between">
            <div className="flex items-center min-w-0">
              <div className="w-8 h-8 bg-slate-600 rounded-full mr-3 flex items-center justify-center text-xs font-bold shrink-0">
                {user?.name?.charAt(0) ?? "?"}
              </div>
              <div className="text-sm truncate min-w-0">
                <p className="font-medium text-white truncate">
                  {user?.name ?? "Користувач"}
                </p>
                <p className="text-xs text-slate-400 truncate">
                  {user?.role ?? ""}
                </p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-slate-400 hover:text-white hover:bg-red-500/10 border border-transparent hover:border-red-500/30 transition-colors text-xs font-medium ml-2 shrink-0 px-2.5 py-2 rounded-lg"
              title="Вийти"
            >
              <LogOut className="w-4 h-4" />
              Вийти
            </button>
          </div>
        </div>
      </aside>

      {/* Головна область */}
      <main className="flex-1 overflow-y-auto overflow-x-hidden mt-16 md:mt-0 relative w-full min-w-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            onAnimationComplete={() =>
              window.dispatchEvent(new Event("resize"))
            }
          >
            {outlet}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

```

# FILE: apps/frontend/src/components/modals/EventSchema.ts

```
import { z } from "zod";

export const eventSchema = z.object({
  project: z.string().min(1, "Оберіть вид події"),
  date: z.string().min(1, "Вкажіть дату"),
  time: z.string().min(1, "Вкажіть час"),
  childrenPlanned: z
    .string()
    .min(1, "Вкажіть кількість дітей")
    .refine((v) => Number(v) > 0, "Має бути більше нуля"),
  price: z
    .string()
    .min(1, "Вкажіть вартість")
    .refine((v) => Number(v) >= 0, "Некоректна вартість"),
  address: z.string().optional().default(""),
  contactPerson: z.string().optional().default(""),
  contactPhone: z.string().optional().default(""),
});

export type EventFormValues = z.infer<typeof eventSchema>;

```

# FILE: apps/frontend/src/components/PhoneLink.tsx

```
interface PhoneLinkProps {
  phone?: string | null;
  className?: string;
}

export default function PhoneLink({ phone, className }: PhoneLinkProps) {
  if (!phone) return <span className="text-slate-400">—</span>;

  const cleaned = phone.replace(/[^\d+]/g, "");

  return (
    <a
      href={`tel:${cleaned}`}
      onClick={(e) => e.stopPropagation()}
      title="Зателефонувати"
      className={`group inline-flex items-center gap-1.5 text-slate-700 hover:text-blue-600 transition-colors ${
        className ?? ""
      }`}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        className="w-3.5 h-3.5 shrink-0 text-slate-400 group-hover:text-blue-500 transition-colors"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 6.75c0 8.284 6.716 15 15 15h1.5a2.25 2.25 0 002.25-2.25v-1.372a1.5 1.5 0 00-1.077-1.439l-3.808-1.142a1.5 1.5 0 00-1.55.43l-1.05 1.05a11.25 11.25 0 01-5.516-5.516l1.05-1.05a1.5 1.5 0 00.43-1.55L8.36 3.327A1.5 1.5 0 006.92 2.25H5.55A2.25 2.25 0 003.3 4.5v.75"
        />
      </svg>
      <span className="underline decoration-transparent group-hover:decoration-blue-300 decoration-1 underline-offset-2 transition-all">
        {phone}
      </span>
    </a>
  );
}
```

# FILE: apps/frontend/src/components/ProtectedRoute.tsx

```
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface Props {
  allowedRoles: string[];
  children: React.ReactNode;
}

export default function ProtectedRoute({ allowedRoles, children }: Props) {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/schools" replace />;
  }
  return <>{children}</>;
}

```

# FILE: apps/frontend/src/components/school-profile/AssignedCrew.tsx

```
import { memo } from 'react';
import PhoneLink from '../PhoneLink';
import { motion } from "framer-motion";
import type { Event, User } from '../../types';

interface AssignedCrewProps {
  currentEvent: Event | null;
  employees: User[];
}

export default memo(function AssignedCrew({ currentEvent, employees }: AssignedCrewProps) {
  const crew = currentEvent?.crew;

  if (!crew) {
    return (
<motion.div
      whileHover={{ y: -4, boxShadow: "0 12px 32px -4px rgba(0,0,0,0.10)" }}
      transition={{ duration: 0.2 }}
      className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-center items-center h-full text-slate-400 min-h-[250px]"
    >        <span className="text-4xl mb-3 opacity-50">🚐</span>
        <p className="font-medium">Екіпаж ще не призначено</p>
        <p className="text-xs mt-1">Виконайте пункт "Призначити екіпаж" зліва</p>
      </motion.div>
    );
  }

  const host = (employees ?? []).find(e => e.id === crew.hostId);
  const driver = (employees ?? []).find(e => e.id === crew.driverId);

  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: "0 12px 32px -4px rgba(0,0,0,0.10)" }}
      transition={{ duration: 0.2 }}
      className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 h-full flex flex-col"
    >
      <h3 className="font-bold text-slate-800 mb-4 border-b pb-3 border-slate-100">Призначений екіпаж</h3>
      <div className="space-y-4 text-sm flex-1">
        <div className="flex justify-between items-center">
          <span className="text-slate-500">Назва:</span>
          <span className="font-bold text-slate-800 bg-slate-100 px-3 py-1 rounded-lg">{crew.name || 'Екіпаж'}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-slate-500">Ведучий:</span>
          <span className="font-medium text-blue-600 flex items-center gap-2">
            <span className="bg-blue-100 text-blue-600 w-6 h-6 flex items-center justify-center rounded-full text-xs">🎙️</span>
            {host?.name || '—'} 
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-slate-500">Водій:</span>
          <span className="font-medium text-emerald-600 flex items-center gap-2">
            <span className="bg-emerald-100 text-emerald-600 w-6 h-6 flex items-center justify-center rounded-full text-xs">🚗</span>
            {driver?.name || '—'}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-slate-500">Авто:</span>
          <span className="font-medium">{crew.car || '—'}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-slate-500">Телефон:</span>
          <span className="font-medium"><PhoneLink phone={crew.phone} /></span>
        </div>
      </div>
    </motion.div>
  );
});

```

# FILE: apps/frontend/src/components/school-profile/CompletedEventModal.tsx

```
import React, { useEffect, useRef } from "react";
import type { Event, ExpenseItem, SalaryItem } from "../../types";

interface CompletedEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: Event | null;
}

const CompletedEventModal: React.FC<CompletedEventModalProps> = ({
  isOpen,
  onClose,
  event,
}) => {
  const headingId = 'completed-event-modal-heading';
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) closeRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  if (!isOpen || !event) return null;

  const report = event.report;
  const fmt = (n: number | null | undefined) =>
    new Intl.NumberFormat("uk-UA").format(Math.round(n || 0));

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={headingId}
      className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center sm:p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-white rounded-t-3xl sm:rounded-2xl shadow-xl w-full sm:max-w-3xl overflow-hidden max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-100 flex justify-between bg-slate-50 shrink-0">
          <div>
            <h3 id={headingId} className="text-xl font-bold text-slate-800">
              Звіт: {event.project}
            </h3>
            <p className="text-sm text-slate-500 mt-1">
              {new Date(event.date).toLocaleDateString("uk-UA")}
            </p>
          </div>
          <button ref={closeRef} onClick={onClose} aria-label="Закрити" className="text-slate-400 hover:text-slate-600 p-2 -mr-2 -mt-2 shrink-0 h-fit text-lg">
            ✕
          </button>
        </div>

        <div className="p-5 sm:p-6 flex-1 overflow-y-auto bg-slate-50/30">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {/* Результати */}
            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
              <h4 className="font-bold text-slate-800 mb-4">📊 Результати</h4>
              <div className="space-y-3 text-sm">
                {[
                  ["Дітей (факт)", report?.childrenCount || 0],
                  ["Класів", report?.classesCount || 0],
                  ["Пільговиків", report?.privilegedCount || 0],
                  ["Сеансів", report?.showingsCount || 0],
                ].map(([label, val]) => (
                  <div
                    key={label as string}
                    className="flex justify-between border-b border-slate-50 pb-2"
                  >
                    <span className="text-slate-500">{label}:</span>
                    <span className="font-medium">{val}</span>
                  </div>
                ))}
                <div className="flex justify-between pb-1">
                  <span className="text-slate-500">Оцінка:</span>
                  <span className="font-bold text-amber-500">
                    ⭐ {report?.rating || 0}/10
                  </span>
                </div>
              </div>
            </div>

            {/* Фінанси */}
            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
              <h4 className="font-bold text-slate-800 mb-4">💰 Фінанси</h4>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between border-b border-slate-50 pb-2">
                  <span className="text-slate-500">Загальна виручка:</span>
                  <span className="font-bold">{fmt(report?.totalSum)} грн</span>
                </div>
                <div className="flex justify-between border-b border-slate-50 pb-2">
                  <span className="text-slate-500">На заклад:</span>
                  <span className="font-medium text-rose-500">
                    − {fmt(report?.schoolSum)} грн
                  </span>
                </div>

                {Array.isArray(report?.expenses) &&
                  report.expenses.map((exp: ExpenseItem, i: number) => (
                    <div key={i} className="flex justify-between text-xs pl-2">
                      <span className="text-slate-400">
                        — {exp.name || exp.category || "Інше"}
                      </span>
                      <span className="text-rose-500 font-medium">
                        − {fmt(exp.amount)} грн
                      </span>
                    </div>
                  ))}

                <div className="flex justify-between pt-1 border-t border-slate-100">
                  <span className="font-bold text-slate-800">
                    Чистий прибуток:
                  </span>
                  <span className="font-bold text-emerald-600 text-base">
                    {fmt(report?.remainderSum)} грн
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Зарплати */}
          {Array.isArray(report?.salaries) && report.salaries.length > 0 && (
            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm mt-4">
              <h4 className="font-bold text-slate-800 mb-4">👥 Зарплати</h4>
              <div className="space-y-2">
                {report.salaries.map((s: SalaryItem, i: number) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span>
                      {s.name} {s.role ? `(${s.role})` : ""}
                    </span>
                    <span className="font-medium text-blue-600">
                      {fmt(s.amount)} грн
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Історія пайплайну */}
          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-100 shadow-sm mt-4">
            <h4 className="font-bold text-slate-800 mb-5 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-violet-50 text-violet-600 flex items-center justify-center">
                ⏳
              </span>
              Історія пайплайну
            </h4>
            {!event.history || event.history.length === 0 ? (
              <p className="text-sm text-slate-400 text-center py-4">
                Історія порожня.
              </p>
            ) : (
              <div className="space-y-4 relative before:absolute before:inset-0 before:ml-[11px] before:w-0.5 before:bg-slate-100">
                {[...event.history]
                  .sort(
                    (a, b) =>
                      new Date(a.createdAt).getTime() -
                      new Date(b.createdAt).getTime(),
                  )
                  .map((item) => (
                    <div key={item.id} className="relative pl-8 text-sm">
                      <div className="absolute left-1.5 w-3 h-3 rounded-full top-1 bg-violet-500 ring-4 ring-white"></div>
                      <p className="font-semibold text-slate-800">
                        {item.action}
                      </p>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        {new Date(item.createdAt).toLocaleString("uk-UA", {
                          day: "2-digit",
                          month: "2-digit",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}{" "}
                        · 👤 {item.userName}
                      </p>
                      {item.comment && (
                        <div className="mt-2 p-3 bg-slate-50/80 rounded-xl text-slate-600 italic border border-slate-100">
                          {item.comment}
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompletedEventModal;

```

# FILE: apps/frontend/src/components/school-profile/EventDetails.tsx

```
import { useState } from 'react';
import { motion } from 'framer-motion';
import AddressLink from "../AddressLink";
import PhoneLink from "../PhoneLink";
import IssueModal from "./modals/IssueModal";
import RescheduleModal from "./modals/RescheduleModal";
import type { Event, User } from '../../types';

interface EventDetailsProps {
  currentEvent: Event | null;
  schoolName?: string;
  cityId?: string;
  onEventUpdated?: () => void;
  employees?: User[];
}

export default function EventDetails({ currentEvent, schoolName, cityId, onEventUpdated, employees }: EventDetailsProps) {
  const [issueOpen, setIssueOpen] = useState(false);
  const [rescheduleOpen, setRescheduleOpen] = useState(false);

  if (!currentEvent) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center h-32 text-slate-400"
      >
        У цього закладу ще немає запланованих подій.
      </motion.div>
    );
  }

  const formattedDate = new Date(currentEvent.date).toLocaleDateString('uk-UA');

  return (
    <>
      <motion.div
        whileHover={{ y: -3, boxShadow: "0 12px 32px -4px rgba(0,0,0,0.09)" }}
        transition={{ duration: 0.2 }}
        className="bg-white rounded-2xl shadow-sm border border-slate-100 md:border-l-4 md:border-l-blue-600 relative"
      >
        <div className="p-5 sm:p-6 pl-6 sm:pl-6">
          
          {/* Заголовок */}
          <div className="flex justify-between items-center mb-2 md:mb-5 md:border-b border-slate-100 md:pb-4">
            <h3 className="font-bold text-slate-800 text-lg">Деталі події</h3>
            {/* Дата для мобільних (щоб була під заголовком) */}
            <span className="md:hidden text-sm font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-lg">
              {formattedDate}
            </span>
          </div>

          {/* ВЕЛИКІ МОБІЛЬНІ КНОПКИ (Відображаються тільки на телефоні) */}
          <div className="md:hidden grid grid-cols-2 gap-3 mb-5 border-b border-slate-100 pb-5 mt-3">
            <button 
              onClick={() => setRescheduleOpen(true)} 
              className="flex flex-col items-center justify-center gap-2 p-4 bg-amber-50 text-amber-600 rounded-2xl font-bold border border-amber-100/50 active:bg-amber-100 transition-colors shadow-sm"
            >
              <span className="text-2xl">📅</span>
              <span className="text-[11px] uppercase tracking-wider">Перенести</span>
            </button>
            <button 
              onClick={() => setIssueOpen(true)} 
              className="flex flex-col items-center justify-center gap-2 p-4 bg-red-50 text-red-600 rounded-2xl font-bold border border-red-100/50 active:bg-red-100 transition-colors shadow-sm"
            >
              <span className="text-2xl">🚨</span>
              <span className="text-[11px] uppercase tracking-wider">Проблема</span>
            </button>
          </div>

          {/* ДЕСКТОПНІ КНОПКИ (Відображаються тільки на ПК) */}
          <div className="hidden md:flex items-center justify-end gap-3 absolute top-5 right-6">
            <span className="text-sm font-medium text-blue-600 mr-2">{formattedDate}</span>
            <button
              onClick={() => setRescheduleOpen(true)}
              className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold rounded-lg transition-colors shadow-sm"
            >
              📅 Перенести
            </button>
            <button
              onClick={() => setIssueOpen(true)}
              className="px-3 py-1.5 bg-[#DC2626] hover:bg-red-700 text-white text-xs font-bold rounded-lg transition-colors shadow-sm"
            >
              🚨 Проблема
            </button>
          </div>

          {/* Інформація */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-4 text-sm mt-2 md:mt-0">
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-0">
              <span className="w-full sm:w-1/3 text-slate-500 font-medium">Проєкт:</span>
              <span className="font-bold text-slate-800">{currentEvent.project}</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-0">
              <span className="w-full sm:w-1/3 text-slate-500 font-medium">Час початку:</span>
              <span className="font-bold text-slate-800">{currentEvent.time}</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-0">
              <span className="w-full sm:w-1/3 text-slate-500 font-medium">Кількість дітей:</span>
              <span className="font-bold text-slate-800">{currentEvent.childrenPlanned}</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-0">
              <span className="w-full sm:w-1/3 text-slate-500 font-medium">Вартість:</span>
              <span className="font-bold text-slate-800">{currentEvent.price} грн</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-0 mt-2 border-t border-slate-50 pt-3 md:border-0 md:pt-0 md:mt-0">
              <span className="w-full sm:w-1/3 text-slate-500 font-medium mt-1">Адреса:</span>
              <span className="font-bold text-slate-800 flex items-start gap-1.5 leading-snug">
                 <span className="text-slate-400 mt-0.5 shrink-0">📍</span>
                 <AddressLink address={currentEvent.address} />
              </span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-0 mt-2 border-t border-slate-50 pt-3 md:border-0 md:pt-0 md:mt-0">
              <span className="w-full sm:w-1/3 text-slate-500 font-medium mt-1">Контакт:</span>
              <span className="font-bold text-slate-800 flex flex-col gap-1 leading-snug">
                <span>{currentEvent.contactPerson}</span>
                <span className="w-6 border-b-2 border-slate-200 my-0.5"></span>
                <PhoneLink phone={currentEvent.contactPhone} />
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      <IssueModal
        isOpen={issueOpen}
        onClose={() => setIssueOpen(false)}
        schoolName={schoolName || currentEvent.school?.name || ''}
        eventName={`${currentEvent.project} — ${formattedDate}`}
        eventId={currentEvent.id}
        cityId={cityId || currentEvent.cityId || ''}
        employees={employees}
      />
      <RescheduleModal
        isOpen={rescheduleOpen}
        onClose={() => setRescheduleOpen(false)}
        eventId={currentEvent.id}
        currentDate={currentEvent.date}
        currentTime={currentEvent.time || ''}
        onSuccess={() => onEventUpdated?.()}
      />
    </>
  );
}
```

# FILE: apps/frontend/src/components/school-profile/EventPreparation.tsx

```
import { memo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { EventPreparation as EventPreparationData } from "../../types";
import {
  PREPARATION_STATUS_LABELS,
  getNextPreparationStatus,
  type PreparationStatus,
} from "../../utils/preparationStatus";

interface PreparationProps {
  data: Partial<EventPreparationData>;
  onUpdate: (field: string, status: PreparationStatus) => void;
  onOpenCrewModal: () => void;
}

export default memo(function EventPreparation({
  data,
  onUpdate,
  onOpenCrewModal,
}: PreparationProps) {
  const [optimistic, setOptimistic] = useState<Record<string, string>>({});

  const tasks = [
    { key: "assignCrew", label: "Призначити екіпаж" },
    { key: "bookEquipment", label: "Забронювати обладнання" },
    { key: "prepareDocs", label: "Підготувати документи" },
    { key: "prepareMaterials", label: "Підготувати матеріали" },
    { key: "remindSchool", label: "Нагадати школі про подію" },
  ];

  const getStatusColor = (status: PreparationStatus) => {
    switch (status) {
      case "DONE":
        return "bg-emerald-50 text-emerald-600 border border-emerald-200";
      case "IN_PROGRESS":
        return "bg-orange-50 text-orange-600 border border-orange-200";
      default:
        return "bg-blue-50 text-blue-600 border border-blue-200";
    }
  };

  const handleTaskClick = (key: string) => {
    if (key === "assignCrew") {
      onOpenCrewModal();
    } else {
      const current = (optimistic[key] ??
        data[key as keyof EventPreparationData] ??
        "PLANNED") as PreparationStatus;
      const next = getNextPreparationStatus(current);
      setOptimistic((prev) => ({ ...prev, [key]: next }));
      onUpdate(key, next).catch(() => {
        setOptimistic((prev) => ({ ...prev, [key]: data[key] }));
      });
    }
  };

  return (
    <motion.div
      whileHover={{ y: -2, boxShadow: "0 12px 32px -4px rgba(0,0,0,0.08)" }}
      transition={{ duration: 0.2 }}
      className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100"
    >
      <h3 className="font-bold text-slate-800 mb-4 border-b pb-3 border-slate-100">
        Підготовка до події
      </h3>
      <div className="space-y-3 text-sm">
        {tasks.map((task) => {
          const currentStatus = (optimistic[task.key] ??
            data[task.key as keyof EventPreparationData] ??
            "PLANNED") as PreparationStatus;
          return (
            <motion.div
              key={task.key}
              whileTap={{ scale: 0.98 }}
              className="flex justify-between items-center cursor-pointer group hover:bg-slate-50 p-2 -mx-2 rounded-lg transition-colors"
              onClick={() => handleTaskClick(task.key)}
            >
              <span className="text-slate-700 font-medium select-none">
                {task.label}
              </span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentStatus}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  transition={{ duration: 0.15 }}
                  className={`px-2.5 py-1 rounded-full text-xs font-bold select-none ${getStatusColor(currentStatus)}`}
                >
                  {PREPARATION_STATUS_LABELS[currentStatus]}
                </motion.span>
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
});

```

# FILE: apps/frontend/src/components/school-profile/EventsTable.tsx

```

import { motion, AnimatePresence } from 'framer-motion';
import type { Event } from '../../types';
import { useDeleteEvent } from '../../hooks/useSchoolProfile';

interface EventsTableProps {
  events: Event[];
  selectedEventId: string | null;
  onEventSelect: (id: string) => void;
  onDeleteSuccess: () => void;
  schoolId: string;
}

export default function EventsTable({ events, selectedEventId, onEventSelect, onDeleteSuccess, schoolId }: EventsTableProps) {
  const deleteMutation = useDeleteEvent(schoolId);

  const handleDelete = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (!window.confirm('Видалити цю подію?')) return;

    try {
      await deleteMutation.mutateAsync(id);
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

# FILE: apps/frontend/src/components/school-profile/HistoryTimeline.tsx

```
import { memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Event, EventHistory } from "../../types";
interface HistoryTimelineProps {
  currentEvent: Event | null;
  onHistoryClick: (item: EventHistory) => void;
  onAddCommentClick: () => void;
}

export default memo(function HistoryTimeline({ currentEvent, onHistoryClick, onAddCommentClick }: HistoryTimelineProps) {
  return (
    <motion.div
      whileHover={{ y: -2, boxShadow: "0 12px 32px -4px rgba(0,0,0,0.08)" }}
      transition={{ duration: 0.2 }}
      className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col"
    >
      <div className="flex justify-between items-center mb-5">
        <h3 className="font-bold text-slate-800">Історія взаємодії</h3>
        <button 
          onClick={onAddCommentClick}
          className="text-xs font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 shadow-sm"
        >
          <span>+</span> Коментар
        </button>
      </div>
      
      {!currentEvent || !currentEvent.history || currentEvent.history.length === 0 ? (
        <p className="text-sm text-slate-400">Історія порожня.</p>
      ) : (
        <div className="space-y-3 relative before:absolute before:inset-0 before:ml-[11px] before:w-0.5 before:bg-slate-100">
          <AnimatePresence initial={false}>
          {currentEvent.history.map((item: EventHistory, i: number) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.22, delay: i * 0.04 }}
              onClick={() => onHistoryClick(item)}
              className="relative pl-8 pr-3 py-2 text-sm hover:bg-slate-50 rounded-xl cursor-pointer transition-colors group border border-transparent hover:border-slate-100"
            >
              <div className={`absolute left-1.5 w-3 h-3 rounded-full top-3.5 ${i === 0 ? 'bg-blue-600 ring-4 ring-blue-50' : 'bg-slate-300'}`}></div>
              <p className="font-semibold text-slate-800">{item.action}</p>
              {item.comment && (
                <p className="text-slate-600 mt-1.5 bg-white p-3 rounded-xl border border-slate-100 shadow-sm text-sm italic">
                  "{item.comment}"
                </p>
              )}
              <p className="text-[11px] text-slate-400 mt-2 flex justify-between items-center font-medium">
                <span>
                  👤 {item.userName} <span className="mx-1">•</span> 
                  {new Date(item.createdAt).toLocaleString("uk-UA", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                </span>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity text-blue-500">✏️ Редагувати</span>
              </p>
            </motion.div>
          ))}
          </AnimatePresence>
        </div>
      )}
    </motion.div>
  );
});

```

# FILE: apps/frontend/src/components/school-profile/modals/CommentModal.tsx

```
import React, { useEffect, useRef } from 'react';

interface CommentModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: string;
  text: string;
  setText: (text: string) => void;
  onSave: (e: React.FormEvent) => void;
}

export default function CommentModal({ isOpen, onClose, mode, text, setText, onSave }: CommentModalProps) {
  const headingId = 'comment-modal-heading';
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) closeRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={headingId}
      className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center sm:p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      onKeyDown={(e) => { if (e.key === 'Escape') onClose(); }}
    >
      <div className="bg-white rounded-t-3xl sm:rounded-2xl shadow-xl w-full sm:max-w-md overflow-hidden max-h-[90vh] flex flex-col">
        <div className="sm:hidden w-10 h-1.5 bg-slate-200 rounded-full mx-auto mt-3" />
        <div className="p-5 sm:p-6 border-b border-slate-100 flex justify-between bg-slate-50 shrink-0">
          <h3 id={headingId} className="text-xl font-bold text-slate-800">
            {mode === 'pipeline' ? 'Завершення етапу' : mode === 'add_comment' ? 'Новий коментар' : 'Редагувати'}
          </h3>
          <button ref={closeRef} onClick={onClose} aria-label="Закрити" className="text-slate-400 p-2 -mr-2">✕</button>
        </div>
        <form onSubmit={onSave} className="p-5 sm:p-6 flex-1 flex flex-col">
          <label className="block text-sm font-medium text-slate-700 mb-2">
            {mode === 'add_comment' ? 'Коментар' : 'Коментар (необов\'язково)'}
          </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Результати дзвінка, домовленості, примітки..."
            className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 resize-none h-32 flex-1 min-h-[120px]"
            autoFocus
            required={mode === 'add_comment'}
          />
          <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 mt-6 shrink-0 pb-1 sm:pb-0">
            <button type="button" onClick={onClose} className="w-full sm:w-auto px-5 py-3 sm:py-2.5 text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl font-medium transition-colors">
              Скасувати
            </button>
            <button type="submit" className="w-full sm:w-auto bg-blue-600 text-white px-5 py-3 sm:py-2.5 rounded-xl font-medium hover:bg-blue-700 transition-colors">
              {mode === 'pipeline' ? 'Завершити' : 'Зберегти'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

```

# FILE: apps/frontend/src/components/school-profile/modals/CrewModal.tsx

```
import { useState, useMemo, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../../config/api";
import type { City, Crew } from "../../../types";
import { useQuery } from "@tanstack/react-query";
import { useDaysOff } from "../../../hooks/useDaysOff";
interface CrewModalProps {
  isOpen: boolean;
  onClose: () => void;
  city?: string;
  eventDate?: string;
  onSave: (crewId: string) => void;
}

export default function CrewModal({
  isOpen,
  onClose,
  city,
  eventDate,
  onSave,
}: CrewModalProps) {
  const headingId = 'crew-modal-heading';
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) closeRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);
  const navigate = useNavigate();
  const { data: allCities = [] } = useQuery({
    queryKey: ["cities"],
    queryFn: () => api.get("/cities").then((r) => r.data),
    staleTime: 5 * 60 * 1000,
  });

  const currentCity = allCities.find((c: City) => c.name === city);
  const { data: crews = [], isLoading } = useQuery({
    queryKey: ["cityCrews", currentCity?.id],
    queryFn: () =>
      api.get<Crew[]>(`/cities/${currentCity!.id}/crews`).then((r) => r.data),
    enabled: !!currentCity?.id && isOpen,
    staleTime: 60 * 1000,
  });
  const dayOnly = eventDate ? eventDate.slice(0, 10) : undefined;
  const { data: dayOffs = [] } = useDaysOff(dayOnly, dayOnly);
  const dayOffUserIds = useMemo(
    () => new Set(dayOffs.map((d) => d.userId)),
    [dayOffs],
  );
  const [selectedCrewId, setSelectedCrewId] = useState("");

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={headingId}
      className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <h3 id={headingId} className="text-xl font-bold text-slate-800">
            Призначити екіпаж
          </h3>
          <button ref={closeRef} onClick={onClose} aria-label="Закрити" className="text-slate-400 hover:text-slate-600">
            ✕
          </button>
        </div>

        <div className="p-6">
          {isLoading ? (
            <p className="text-slate-500 text-center py-4">Завантаження...</p>
          ) : crews.length === 0 ? (
            <div className="text-center py-4">
              <p className="text-slate-500">
                У цьому місті ще немає сформованих екіпажів.
              </p>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  if (currentCity?.id) navigate(`/cities/${currentCity.id}`);
                }}
                className="text-sm mt-2 text-blue-600 hover:text-blue-800 underline underline-offset-2"
              >
                Створіть екіпаж у вкладці міста!
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <label className="block text-sm font-medium text-slate-700">
                Оберіть готовий екіпаж
              </label>
              <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                {crews.map((crew) => {
                  const hostOnDayOff =
                    crew.hostId && dayOffUserIds.has(crew.hostId);
                  const driverOnDayOff =
                    crew.driverId && dayOffUserIds.has(crew.driverId);
                  const isUnavailable = hostOnDayOff || driverOnDayOff;
                  return (
                    <label
                      key={crew.id}
                      className={`flex items-start p-3 rounded-xl border transition-all ${
                        isUnavailable
                          ? "border-slate-200 bg-slate-50 opacity-60 cursor-not-allowed"
                          : selectedCrewId === crew.id
                            ? "border-blue-500 bg-blue-50/50 ring-1 ring-blue-500 cursor-pointer"
                            : "border-slate-200 hover:border-blue-300 cursor-pointer"
                      }`}
                    >
                      <input
                        type="radio"
                        name="crew"
                        value={crew.id}
                        checked={selectedCrewId === crew.id}
                        disabled={!!isUnavailable}
                        onChange={() => setSelectedCrewId(crew.id)}
                        className="mt-1 mr-3 text-blue-600 focus:ring-blue-500"
                      />
                      <div>
                        <p className="font-bold text-slate-800">{crew.name}</p>
                        <p className="text-xs text-slate-500 mt-1">
                          🎙️ {crew.host?.name || "—"} | 🚗{" "}
                          {crew.driver?.name || "—"}
                        </p>
                        {crew.car && (
                          <p className="text-xs text-emerald-600 mt-0.5">
                            Авто: {crew.car}
                          </p>
                        )}
                        {isUnavailable && (
                          <p className="text-xs text-rose-500 font-medium mt-1">
                            🌴 {hostOnDayOff ? "Ведучий" : "Водій"} у вихідному
                            цього дня
                          </p>
                        )}
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>
          )}

          <div className="flex gap-3 mt-6">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2.5 bg-slate-100 text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-200"
            >
              Скасувати
            </button>
            <button
              onClick={() => onSave(selectedCrewId)}
              disabled={!selectedCrewId}
              className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50 transition-opacity"
            >
              Призначити
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

```

# FILE: apps/frontend/src/components/school-profile/modals/EditSchoolModal.tsx

```
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  schoolEditSchema,
  type SchoolEditFormValues,
} from "./SchoolEditSchema";

interface EditSchoolModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultValues: SchoolEditFormValues;
  onSave: (data: SchoolEditFormValues) => void;
}

export default function EditSchoolModal({
  isOpen,
  onClose,
  defaultValues,
  onSave,
}: EditSchoolModalProps) {
  const headingId = 'edit-school-modal-heading';
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) closeRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SchoolEditFormValues>({
    resolver: zodResolver(schoolEditSchema),
    defaultValues,
  });

  useEffect(() => {
    if (isOpen) reset(defaultValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={headingId}
      className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center sm:p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* Bottom-sheet на мобільному, центрований діалог на десктопі */}
      <div className="bg-white rounded-t-3xl sm:rounded-2xl shadow-xl w-full sm:max-w-2xl overflow-hidden max-h-[92vh] flex flex-col">
        <div className="sm:hidden w-10 h-1.5 bg-slate-200 rounded-full mx-auto mt-3" />

        {/* Шапка не зжимається (shrink-0) */}
        <div className="p-5 sm:p-6 border-b flex justify-between items-center bg-slate-50 shrink-0">
          <h3 id={headingId} className="text-xl font-bold">Редагування</h3>
          <button ref={closeRef} onClick={onClose} aria-label="Закрити" className="text-slate-400 p-2 -mr-2">
            ✕
          </button>
        </div>

        {/* Форма скролиться (overflow-y-auto) */}
        <form
          onSubmit={handleSubmit(onSave)}
          className="p-5 sm:p-6 overflow-y-auto flex-1 flex flex-col gap-4"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1">Тип</label>
              <select
                {...register("type")}
                className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option>Школа</option>
                <option>Садочок</option>
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm mb-1">Адреса</label>
              <input
                type="text"
                {...register("address")}
                className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Контакт</label>
              <input
                type="text"
                {...register("director")}
                className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Телефон</label>
              <input
                type="text"
                {...register("phone")}
                className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Email</label>
              <input
                type="email"
                {...register("email")}
                className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              {errors.email && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm mb-1">Дітей</label>
              <input
                type="number"
                {...register("childrenCount")}
                className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              {errors.childrenCount && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.childrenCount.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 mt-6 shrink-0 pt-4 border-t border-slate-100 pb-1 sm:pb-0">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-5 py-3 sm:py-2.5 bg-slate-100 hover:bg-slate-200 font-medium rounded-xl transition-colors"
            >
              Скасувати
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto bg-blue-600 text-white px-5 py-3 sm:py-2.5 font-medium rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              Зберегти
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

```

# FILE: apps/frontend/src/components/school-profile/modals/EventModal.tsx

```
import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "../../../config/api";
import type { Project } from "../../../types";
import { eventSchema, type EventFormValues } from "./EventSchema";

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultValues?: Partial<EventFormValues>;
  onSave: (data: EventFormValues) => void;
}

export default function EventModal({
  isOpen,
  onClose,
  defaultValues,
  onSave,
}: EventModalProps) {
  const headingId = 'event-modal-heading';
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) closeRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [priceTouched, setPriceTouched] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<EventFormValues>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      project: "",
      date: "",
      time: "",
      childrenPlanned: "",
      price: "",
      address: "",
      contactPerson: "",
      contactPhone: "",
      ...defaultValues,
    },
  });

  const currentProject = watch("project");
  const currentChildrenPlanned = watch("childrenPlanned");

  useEffect(() => {
    if (isOpen) {
      setPriceTouched(!!defaultValues?.price);
      reset({
        project: "",
        date: "",
        time: "",
        childrenPlanned: "",
        price: "",
        address: "",
        contactPerson: "",
        contactPhone: "",
        ...defaultValues,
      });
      setProjects([]);
      api.get<Project[]>("/projects")
        .then((res) => {
          setProjects(res.data);
          if (!defaultValues?.project && res.data.length > 0) {
            setValue("project", res.data[0].name);
          }
        })
        .catch(console.error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  useEffect(() => {
    if (priceTouched) return;
    const selected = projects.find((p) => p.name === currentProject) as
      | (Project & { pricePerChild?: number })
      | undefined;
    if (!selected?.pricePerChild) return;
    const count = Number(currentChildrenPlanned) || 0;
    setValue("price", String(count * selected.pricePerChild));
  }, [
    currentProject,
    currentChildrenPlanned,
    projects,
    priceTouched,
    setValue,
  ]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={headingId}
      className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden max-h-[92vh] flex flex-col">
        <div className="p-5 sm:p-6 border-b border-slate-100 flex justify-between bg-slate-50 shrink-0">
          <h3 id={headingId} className="text-xl font-bold text-slate-800">Нова подія</h3>
          <button ref={closeRef} onClick={onClose} aria-label="Закрити" className="text-slate-400 hover:text-slate-600 p-2 -mr-2 text-xl leading-none">
            ✕
          </button>
        </div>
        <form
          onSubmit={handleSubmit(onSave)}
          className="p-5 sm:p-6 overflow-y-auto flex-1 flex flex-col gap-4"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-sm mb-1 text-slate-600">
                Проєкт (Вид події)
              </label>
              <select
                {...register("project")}
                disabled={projects.length === 0}
                className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 bg-white disabled:bg-slate-50 disabled:text-slate-400"
              >
                <option value="" disabled>
                  {projects.length === 0
                    ? "Завантаження видів подій..."
                    : "Оберіть вид події"}
                </option>
                {projects.map((p) => (
                  <option key={p.id} value={p.name}>
                    {p.name}
                  </option>
                ))}
              </select>
              {errors.project && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.project.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm mb-1 text-slate-600">Дата</label>
              <input
                type="date"
                {...register("date")}
                className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              {errors.date && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.date.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm mb-1 text-slate-600">Час</label>
              <input
                type="time"
                {...register("time")}
                className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              {errors.time && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.time.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm mb-1 text-slate-600">
                Дітей (план)
              </label>
              <input
                type="number"
                {...register("childrenPlanned")}
                className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              {errors.childrenPlanned && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.childrenPlanned.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm mb-1 text-slate-600">
                Вартість
              </label>
              <input
                type="number"
                {...register("price")}
                onInput={() => setPriceTouched(true)}
                className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-xs text-slate-400 mt-1">
                Розраховується автоматично: діти × ціна за дитину. Можна
                змінити вручну.
              </p>
              {errors.price && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.price.message}
                </p>
              )}
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm mb-1 text-slate-600">
                Адреса
              </label>
              <input
                type="text"
                {...register("address")}
                className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm mb-1 text-slate-600">
                Контактна особа
              </label>
              <input
                type="text"
                {...register("contactPerson")}
                className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm mb-1 text-slate-600">
                Телефон
              </label>
              <input
                type="text"
                {...register("contactPhone")}
                className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="flex gap-3 mt-4 shrink-0 pt-4 border-t border-slate-100 pb-1">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-5 py-3 bg-slate-100 text-slate-600 hover:bg-slate-200 font-medium rounded-xl transition-colors"
            >
              Скасувати
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto px-5 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              Створити
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

```

# FILE: apps/frontend/src/components/school-profile/modals/EventSchema.ts

```
import { z } from "zod";

export const eventSchema = z.object({
  project: z.string().min(1, "Оберіть вид події"),
  date: z.string().min(1, "Вкажіть дату"),
  time: z.string().min(1, "Вкажіть час"),
  childrenPlanned: z
    .string()
    .min(1, "Вкажіть кількість дітей")
    .refine((v) => Number(v) > 0, "Має бути більше нуля"),
  price: z
    .string()
    .min(1, "Вкажіть вартість")
    .refine((v) => Number(v) >= 0, "Некоректна вартість"),
  address: z.string().optional().default(""),
  contactPerson: z.string().optional().default(""),
  contactPhone: z.string().optional().default(""),
});

export type EventFormValues = z.infer<typeof eventSchema>;

```

# FILE: apps/frontend/src/components/school-profile/modals/IssueModal.tsx

```
import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { api } from "../../../config/api";

interface Employee {
  id: string;
  name: string;
  role: string;
}

interface IssueModalProps {
  isOpen: boolean;
  onClose: () => void;
  schoolName: string;
  eventName: string;
  eventId: string;
  cityId: string;
  employees?: Employee[];
}

export default function IssueModal({
  isOpen,
  onClose,
  schoolName,
  eventName,
  eventId,
  cityId,
  employees = [],
}: IssueModalProps) {
  const [message, setMessage] = useState("");
  const [deadline, setDeadline] = useState("");
  const [assignedUserId, setAssignedUserId] = useState("");
  const [sent, setSent] = useState(false);
  const headingId = 'issue-modal-heading';
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) closeRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const assignedUser = employees.find((e) => e.id === assignedUserId);

  const handleSend = () => {
    if (!message.trim()) return;
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setMessage("");
      setDeadline("");
      setAssignedUserId("");
      onClose();
    }, 600);
    api
      .post("/issues", {
        eventId,
        schoolName,
        eventName,
        message,
        cityId,
        deadline: deadline || undefined,
        assignedUserId: assignedUserId || undefined,
        assignedUserName: assignedUser?.name || undefined,
      })
      .catch((e) => console.error(e));
  };

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={headingId}
      className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[9999] flex items-center justify-center p-4 opacity-0"
      style={{ animation: "fadeIn 0.2s ease-out forwards" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes modalScale {
          from { opacity: 0; transform: scale(0.95) translateY(15px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
      <div
        className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden max-h-[90vh] flex flex-col opacity-0"
        style={{ animation: "modalScale 0.3s ease-out forwards" }}
      >
        <div className="p-5 border-b border-slate-100 flex justify-between items-start bg-slate-50 shrink-0">
          <div>
            <h3 id={headingId} className="text-xl font-bold text-slate-800">🚨 Запит</h3>
            <p className="text-sm text-red-500 mt-0.5 font-medium">
              {schoolName}
            </p>
            <p className="text-xs text-slate-400 mt-0.5">{eventName}</p>
          </div>
          <button ref={closeRef} onClick={onClose} aria-label="Закрити" className="text-slate-400 hover:text-slate-600 text-xl leading-none p-2 -mr-2 transition-colors">
            ✕
          </button>
        </div>

        <div className="p-6 flex flex-col gap-4 overflow-y-auto">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Опишіть проблему або запит..."
            className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-400 focus:outline-none resize-none h-32 text-sm"
            autoFocus
          />

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1.5">
              ⏰ Дедлайн{" "}
              <span className="text-slate-400 font-normal">
                (необов'язково)
              </span>
            </label>
            <input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              min={new Date().toISOString().slice(0, 10)}
              className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-400 focus:outline-none text-sm"
            />
          </div>

          {employees.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1.5">
                👤 Відповідальний{" "}
                <span className="text-slate-400 font-normal">
                  (необов'язково)
                </span>
              </label>
              <select
                value={assignedUserId}
                onChange={(e) => setAssignedUserId(e.target.value)}
                className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-400 focus:outline-none text-sm bg-white"
              >
                <option value="">— Оберіть працівника —</option>
                {employees.map((emp) => (
                  <option key={emp.id} value={emp.id}>
                    {emp.name} ({emp.role})
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="flex gap-3 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-slate-100 text-slate-600 py-3 rounded-xl font-medium hover:bg-slate-200 transition-colors"
            >
              Скасувати
            </button>
            <button
              type="button"
              onClick={handleSend}
              disabled={sent || !message.trim()}
              className="flex-1 bg-red-600 text-white py-3 rounded-xl font-medium hover:bg-red-700 disabled:opacity-50 transition-colors"
            >
              {sent ? "✓ Надіслано!" : "Відправити"}
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}

```

# FILE: apps/frontend/src/components/school-profile/modals/ReportModal.tsx

```
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Expense {
  name: string;
  amount: number;
}
interface CrewMember {
  id: string;
  name: string;
  role: "host" | "driver";
}
export interface ReportData {
  announcementDone: boolean;
  materialShown: boolean;
  childrenCount: number;
  classesCount: number;
  privilegedCount: number;
  showingsCount: number;
  totalSum: number;
  schoolSum: number;
  remainderSum: number;
  rating: number;
  expenses: { name: string; amount: number }[];
  salaries: { userId: string; name: string; amount: number; role: string }[];
}

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: ReportData) => void;
  schoolName: string;
  eventType?: string;
  eventDate?: string;
  eventIndex?: number;
  crew?: {
    host?: { id: string; name: string } | null;
    driver?: { id: string; name: string } | null;
  };
}

const WEEKDAY_FMT = new Intl.DateTimeFormat("uk-UA", { weekday: "long" });
const DATE_FMT = new Intl.DateTimeFormat("uk-UA", {
  day: "2-digit",
  month: "2-digit",
  year: "2-digit",
});

function formatDate(dateStr?: string) {
  if (!dateStr) return "—";
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return "—";
  return `${DATE_FMT.format(d)} ${WEEKDAY_FMT.format(d)}`;
}

function formatMoney(value: number) {
  return new Intl.NumberFormat("uk-UA").format(Math.round(value || 0));
}

const Icon = {
  Check: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-4 h-4"
    >
      <path d="M9 11l3 3L22 4" />
      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
    </svg>
  ),
  Users: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-4 h-4"
    >
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  Wallet: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-4 h-4"
    >
      <path d="M21 12V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-1" />
      <path d="M16 12h6v4h-6a2 2 0 1 1 0-4z" />
    </svg>
  ),
  Star: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-4 h-4"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
};

function IconBadge({
  color,
  children,
}: {
  color: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={`w-7 h-7 shrink-0 rounded-lg flex items-center justify-center ${color}`}
    >
      {children}
    </span>
  );
}

function CardHeader({
  icon,
  color,
  title,
}: {
  icon: React.ReactNode;
  color: string;
  title: string;
}) {
  return (
    <div className="flex items-center gap-2.5 mb-4">
      <IconBadge color={color}>{icon}</IconBadge>
      <h4 className="text-sm font-bold text-slate-800">{title}</h4>
    </div>
  );
}

function Row({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
      <span className="text-sm text-slate-500">{label}</span>
      <div className="text-sm font-medium text-slate-800">{children}</div>
    </div>
  );
}

function TogglePill({
  value,
  onChange,
}: {
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex gap-1.5">
      <button
        type="button"
        onClick={() => onChange(true)}
        className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${value ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-400 hover:bg-slate-200"}`}
      >
        Так
      </button>
      <button
        type="button"
        onClick={() => onChange(false)}
        className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${!value ? "bg-rose-100 text-rose-600" : "bg-slate-100 text-slate-400 hover:bg-slate-200"}`}
      >
        Ні
      </button>
    </div>
  );
}

function NumberField({
  value,
  onChange,
  suffix,
}: {
  value: number;
  onChange: (v: number) => void;
  suffix?: string;
}) {
  return (
    <span className="inline-flex items-center gap-1">
      <input
        type="number"
        min={0}
        value={value || ""}
        onChange={(e) => onChange(+e.target.value)}
        className="w-16 text-right bg-transparent outline-none font-medium text-slate-800 focus:bg-blue-50 rounded px-1 -mr-1"
        placeholder="0"
      />
      {suffix && <span className="text-slate-400 text-xs">{suffix}</span>}
    </span>
  );
}

export default function ReportModal({
  isOpen,
  onClose,
  onSave,
  schoolName,
  eventType,
  eventDate,
  eventIndex,
  crew,
}: ReportModalProps) {
  const headingId = 'report-modal-heading';
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) closeRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);
  const [form, setForm] = useState({
    announcementDone: true,
    materialShown: true,
    childrenCount: 0,
    classesCount: 0,
    privilegedCount: 0,
    showingsCount: 0,
    totalSum: 0,
    schoolPercentage: 20,
    rating: 8,
  });

  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [newExp, setNewExp] = useState({ name: "", amount: "" });
  const [salaries, setSalaries] = useState<Record<string, number>>({});

  const schoolSum = (form.totalSum * form.schoolPercentage) / 100;
  const totalExpenses = expenses.reduce((s, e) => s + e.amount, 0);
  const remainder = form.totalSum - schoolSum - totalExpenses;

  const addExpense = () => {
    const amount = Number(newExp.amount);
    if (!newExp.name.trim() || !amount) return;
    setExpenses((prev) => [...prev, { name: newExp.name.trim(), amount }]);
    setNewExp({ name: "", amount: "" });
  };

  const removeExpense = (index: number) => {
    setExpenses((prev) => prev.filter((_, i) => i !== index));
  };

  const crewMembers = [
    ...(crew?.host
      ? [
          {
            id: crew.host.id,
            name: crew.host.name,
            role: "Ведучий",
          },
        ]
      : []),
    ...(crew?.driver
      ? [
          {
            id: crew.driver.id,
            name: crew.driver.name,
            role: "Водій",
          },
        ]
      : []),
  ];

  const handleSave = () => {
    const salariesArr = crewMembers
      .map((m) => ({
        userId: m.id,
        name: m.name,
        amount: salaries[m.id] || 0,
        role: m.role,
      }))
      .filter((s) => s.amount > 0);

    const { schoolPercentage, ...formRest } = form;
    void schoolPercentage;

    onSave({
      ...formRest,
      expenses,
      schoolSum,
      remainderSum: remainder,
      salaries: salariesArr,
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby={headingId}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center sm:p-4"
          onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="bg-white rounded-t-3xl sm:rounded-2xl shadow-xl w-full sm:max-w-3xl max-h-[94vh] sm:max-h-[92vh] flex flex-col overflow-hidden"
          >
        <div className="sm:hidden w-10 h-1.5 bg-slate-200 rounded-full mx-auto mt-3" />

        {/* Header */}
        <div className="px-4 sm:px-6 py-4 sm:py-5 border-b border-slate-100 bg-slate-50 flex items-start justify-between shrink-0">
          <div className="min-w-0">
            <h3 id={headingId} className="text-lg sm:text-xl font-bold text-slate-800 leading-tight">
              Звіт по події
            </h3>
            <p className="text-sm text-slate-500 mt-0.5 truncate">
              {schoolName}
            </p>
          </div>
          <button ref={closeRef} onClick={onClose} aria-label="Закрити" className="text-slate-400 hover:text-slate-600 text-lg leading-none p-2 -mr-2 shrink-0">
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="p-4 sm:p-6 overflow-y-auto bg-slate-50/50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Охоплення */}
            <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 md:col-span-2">
              <CardHeader
                icon={<Icon.Users />}
                color="bg-violet-50 text-violet-600"
                title="Охоплення та Проведення"
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6">
                <Row label="Кількість дітей">
                  <NumberField
                    value={form.childrenCount}
                    onChange={(v) => setForm({ ...form, childrenCount: v })}
                    suffix="дітей"
                  />
                </Row>
                <Row label="Класів">
                  <NumberField
                    value={form.classesCount}
                    onChange={(v) => setForm({ ...form, classesCount: v })}
                    suffix="кл."
                  />
                </Row>
                <Row label="Пільгових дітей">
                  <NumberField
                    value={form.privilegedCount}
                    onChange={(v) => setForm({ ...form, privilegedCount: v })}
                  />
                </Row>
                <Row label="Кількість показів">
                  <NumberField
                    value={form.showingsCount}
                    onChange={(v) => setForm({ ...form, showingsCount: v })}
                  />
                </Row>
              </div>
            </div>

            {/* Фінансовий результат */}
            <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 md:col-span-2">
              <CardHeader
                icon={<Icon.Wallet />}
                color="bg-amber-50 text-amber-600"
                title="Фінансовий результат"
              />
              <div className="flex items-center justify-between py-2 border-b border-slate-50">
                <span className="text-sm text-slate-500 font-medium">
                  Загальна виручка
                </span>
                <span className="inline-flex items-center gap-1">
                  <input
                    type="number"
                    min={0}
                    value={form.totalSum || ""}
                    onChange={(e) =>
                      setForm({ ...form, totalSum: +e.target.value })
                    }
                    className="w-28 text-right bg-transparent outline-none font-bold text-lg text-slate-800 focus:bg-blue-50 rounded px-1"
                    placeholder="0"
                  />
                  <span className="text-slate-400 text-sm">грн</span>
                </span>
              </div>

              {/* НОВЕ: Змінний відсоток для закладу */}
              <div className="flex items-center justify-between py-2 border-b border-slate-50">
                <span className="text-sm text-slate-500">Відсоток закладу</span>
                <NumberField
                  value={form.schoolPercentage}
                  onChange={(v) => setForm({ ...form, schoolPercentage: v })}
                  suffix="%"
                />
              </div>

              <Row label={`Сума закладу (${form.schoolPercentage}%)`}>
                <span>{formatMoney(schoolSum)} грн</span>
              </Row>

              <div className="py-3 border-b border-slate-50">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-500">
                    Додаткові витрати
                  </span>
                  <span className="text-sm font-medium text-rose-500">
                    −{formatMoney(totalExpenses)} грн
                  </span>
                </div>
                {expenses.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {expenses.map((exp, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1.5 bg-slate-100 rounded-full pl-3 pr-1.5 py-1 text-xs"
                      >
                        <span className="text-slate-600">{exp.name}</span>
                        <span className="font-semibold text-slate-700">
                          {formatMoney(exp.amount)} грн
                        </span>
                        <button
                          onClick={() => removeExpense(i)}
                          className="text-slate-400 hover:text-rose-500 w-4 h-4 rounded-full flex items-center justify-center hover:bg-white"
                        >
                          ✕
                        </button>
                      </span>
                    ))}
                  </div>
                )}
                <div className="flex gap-2 mt-2">
                  <input
                    placeholder="Назва витрати"
                    value={newExp.name}
                    onChange={(e) =>
                      setNewExp({ ...newExp, name: e.target.value })
                    }
                    className="flex-1 min-w-0 p-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                  <input
                    type="number"
                    min={0}
                    placeholder="грн"
                    value={newExp.amount}
                    onChange={(e) =>
                      setNewExp({ ...newExp, amount: e.target.value })
                    }
                    className="w-20 sm:w-24 p-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                  <button
                    onClick={addExpense}
                    type="button"
                    className="px-3 shrink-0 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 font-medium text-sm"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between bg-emerald-50 rounded-xl px-4 py-3 mt-3">
                <span className="text-sm font-semibold text-emerald-700">
                  Залишок ({100 - form.schoolPercentage}%)
                </span>
                <span className="text-lg font-bold text-emerald-700">
                  {formatMoney(remainder)} грн
                </span>
              </div>
            </div>
            {crewMembers.length > 0 && (
              <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 md:col-span-2">
                <CardHeader
                  icon={
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-4 h-4"
                    >
                      <circle cx="12" cy="8" r="6" />
                      <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
                    </svg>
                  }
                  color="bg-blue-50 text-blue-600"
                  title="Заробітня плата"
                />
                <div className="space-y-1">
                  {crewMembers.map((m) => (
                    <Row key={m.id} label={`${m.name} (${m.role})`}>
                      <span className="inline-flex items-center gap-1">
                        <input
                          type="number"
                          min={0}
                          value={salaries[m.id] || ""}
                          onChange={(e) =>
                            setSalaries((prev) => ({
                              ...prev,
                              [m.id]: +e.target.value,
                            }))
                          }
                          className="w-24 text-right bg-transparent outline-none font-medium text-slate-800 focus:bg-blue-50 rounded px-1"
                          placeholder="0"
                        />
                        <span className="text-slate-400 text-xs">грн</span>
                      </span>
                    </Row>
                  ))}
                </div>
                {crewMembers.some((m) => salaries[m.id] > 0) && (
                  <div className="flex justify-between items-center mt-3 pt-3 border-t border-slate-100">
                    <span className="text-sm font-semibold text-slate-500">
                      Разом ЗП
                    </span>
                    <span className="font-bold text-blue-600">
                      {formatMoney(
                        crewMembers.reduce(
                          (s, m) => s + (salaries[m.id] || 0),
                          0,
                        ),
                      )}{" "}
                      грн
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-3 px-4 sm:px-6 py-4 border-t border-slate-100 bg-white shrink-0">
          <button
            onClick={onClose}
            className="flex-1 text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl font-medium py-3"
          >
            Скасувати
          </button>
          <button
            onClick={handleSave}
            className="flex-1 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 py-3"
          >
            Зберегти звіт
          </button>
        </div>
      </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

```

# FILE: apps/frontend/src/components/school-profile/modals/RescheduleModal.tsx

```
import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { api } from "../../../config/api";

interface RescheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventId: string;
  currentDate: string;
  currentTime: string;
  onSuccess: () => void;
}

export default function RescheduleModal({
  isOpen,
  onClose,
  eventId,
  currentDate,
  currentTime,
  onSuccess,
}: RescheduleModalProps) {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [loading, setLoading] = useState(false);
  const headingId = 'reschedule-modal-heading';
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen && currentDate) {
      setDate(currentDate.slice(0, 10));
      setTime(currentTime || "");
    }
  }, [isOpen, currentDate, currentTime]);

  useEffect(() => {
    if (isOpen) closeRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSave = async () => {
    setLoading(true);
    try {
      await api.patch(`/events/${eventId}/reschedule`, { date, time });
      onClose();
      onSuccess();
    } catch (e) {
      console.error("Помилка перенесення:", e);
    } finally {
      setLoading(false);
    }
  };

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={headingId}
      className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[9999] flex items-center justify-center p-4 opacity-0"
      style={{ animation: "fadeIn 0.2s ease-out forwards" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes modalScale {
          from { opacity: 0; transform: scale(0.95) translateY(15px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
      <div
        className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden opacity-0"
        style={{ animation: "modalScale 0.3s ease-out forwards" }}
      >
        <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <h3 id={headingId} className="text-xl font-bold text-slate-800">
            📅 Перенести подію
          </h3>
          <button ref={closeRef} onClick={onClose} aria-label="Закрити" className="text-slate-400 hover:text-slate-600 text-xl leading-none p-2 -mr-2 transition-colors">
            ✕
          </button>
        </div>
        <div className="p-6 flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1.5">
              Нова дата
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1.5">
              Новий час
            </label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
            />
          </div>
          <div className="flex gap-3 mt-2">
            <button
              onClick={onClose}
              className="flex-1 bg-slate-100 text-slate-600 py-3 rounded-xl font-medium hover:bg-slate-200 transition-colors"
            >
              Скасувати
            </button>
            <button
              onClick={handleSave}
              disabled={loading}
              className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              {loading ? "Збереження..." : "Зберегти"}
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}

```

# FILE: apps/frontend/src/components/school-profile/modals/SchoolEditSchema.ts

```
import { z } from "zod";

export const schoolEditSchema = z.object({
  type: z.enum(["Школа", "Садочок"]),
  address: z.string().optional().default(""),
  director: z.string().optional().default(""),
  phone: z.string().optional().default(""),
  email: z
    .union([z.literal(""), z.string().email("Некоректний email")])
    .optional(),
  childrenCount: z
    .string()
    .optional()
    .default("")
    .refine((v) => v === "" || Number(v) >= 0, "Некоректна кількість"),
});

export type SchoolEditFormValues = z.infer<typeof schoolEditSchema>;

```

# FILE: apps/frontend/src/components/school-profile/Pipeline.tsx

```
import { memo } from "react";
import { motion } from "framer-motion";
import type { Event } from "../../types";
interface PipelineProps {
  currentStageIndex: number;
  currentEvent: Event | null;
  onPipelineClick: (stepId: number) => void;
  stages: Array<{ id: number; key: string; name: string }>;
}

export default memo(function Pipeline({ currentStageIndex, currentEvent, onPipelineClick, stages }: PipelineProps) {
  return (
    <motion.div
      whileHover={{ y: -2, boxShadow: "0 12px 32px -4px rgba(0,0,0,0.08)" }}
      transition={{ duration: 0.2 }}
      className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-slate-100 w-full"
    >
      <h3 className="font-bold text-slate-800 mb-4 md:hidden">Етап події</h3>
      <div className="overflow-x-auto pb-4 -mx-4 px-4 md:mx-0 md:px-0">
        <div className="flex items-start min-w-[600px] justify-between relative">
          <div className="absolute top-4 left-0 w-full h-[2px] bg-slate-100 -z-10"></div>
          {stages.map((step, index) => {
            const isCompleted = index < currentStageIndex;
            const isActive = index === currentStageIndex;
            const isNext = index === currentStageIndex + 1;
            const isClickable = !!currentEvent && isNext;

            return (
              <div key={step.id} className="flex flex-col items-center flex-1 z-10 px-1">
                <motion.button
                  onClick={() => isClickable && onPipelineClick(step.id)}
                  whileHover={isClickable ? { scale: 1.15 } : {}}
                  whileTap={isClickable ? { scale: 0.95 } : {}}
                  transition={{ duration: 0.15 }}
                  className={`w-8 h-8 md:w-9 md:h-9 shrink-0 rounded-full text-xs font-bold border-2 mb-2 transition-colors
                    ${isCompleted
                      ? 'border-blue-600 text-blue-600 bg-white'
                      : isActive
                      ? 'border-blue-600 bg-blue-600 text-white shadow-md'
                      : isNext
                      ? 'border-blue-400 bg-white text-blue-400 cursor-pointer'
                      : 'border-slate-200 text-slate-400 bg-white cursor-not-allowed opacity-50'
                    }`}
                >
                  {isCompleted ? '✓' : step.id}
                </motion.button>
                <span className={`text-[10px] md:text-[11px] leading-tight font-medium text-center break-words max-w-[70px]
                  ${isActive ? 'text-blue-600 font-bold' : isNext ? 'text-blue-400' : 'text-slate-400'}`}>
                  {step.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
});

```

# FILE: apps/frontend/src/components/school-profile/SchoolInfoCard.tsx

```
import { memo } from "react";
import AddressLink from "../AddressLink";
import PhoneLink from "../PhoneLink";
import { motion } from "framer-motion";
import type { SchoolProfileData } from "../../types";

export default memo(function SchoolInfoCard({
  schoolData,
}: {
  schoolData: SchoolProfileData;
}) {
  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: "0 12px 32px -4px rgba(0,0,0,0.10)" }}
      transition={{ duration: 0.2 }}
      className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100"
    >
      <ul className="space-y-4 text-sm">
        {[
          { icon: "🏛", label: "Тип", value: schoolData.type || "—" },
          { icon: "📍", label: "Місто", value: schoolData.city || "—" },
          {
            icon: "🗺",
            label: "Адреса",
            value: <AddressLink address={schoolData.address} />,
          },
          { icon: "👤", label: "Контакт", value: schoolData.director || "—" },
          {
            icon: "📞",
            label: "Телефон",
            value: <PhoneLink phone={schoolData.phone} />,
          },
          { icon: "👥", label: "Дітей", value: schoolData.childrenCount || 0 },
        ].map(({ icon, label, value }, i) => (
          <motion.li
            key={label}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.25, delay: i * 0.05 }}
            className="flex gap-3"
          >
            <span className="text-slate-400">{icon}</span>
            <div>
              <span className="text-slate-500">{label}:</span>{" "}
              <span className="font-medium">{value}</span>
            </div>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
});

```

# FILE: apps/frontend/src/components/school-profile/SchoolProfileHeader.tsx

```
import { memo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PhoneLink from "../PhoneLink";
import type { SchoolProfileData } from "../../types";

interface Props {
  schoolData: SchoolProfileData;
  onEdit: () => void;
  onAddEvent: () => void;
}

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.35, delay, ease: "easeOut" },
});

export default memo(function SchoolProfileHeader({ schoolData, onEdit, onAddEvent }: Props) {
  return (
    <div className="mb-6">
      {/* Хлібні крихти */}
      <motion.div {...fadeUp(0)} className="text-xs md:text-sm text-slate-500 mb-5 truncate">
        <Link to="/schools" className="hover:text-blue-600 transition-colors">
          Школи / Садочки
        </Link>
        <span className="mx-2">›</span>
        <span className="text-slate-800 font-medium">
          {schoolData.type} "{schoolData.name}"
        </span>
      </motion.div>

      {/* Hero Card */}
      <motion.div
        {...fadeUp(0.05)}
        className="relative bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden mb-2"
      >
        {/* Градієнтна смужка зверху */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />

        <div className="p-5 md:p-7">
          <div className="flex flex-col md:flex-row md:items-center gap-5">

            {/* Іконка */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.1, ease: "easeOut" }}
              className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-blue-50 flex items-center justify-center text-3xl shrink-0"
            >
              🏫
            </motion.div>

            {/* Назва + місто */}
            <div className="flex-1 min-w-0">
              <motion.h1
                {...fadeUp(0.12)}
                className="text-2xl md:text-3xl font-bold text-slate-800 leading-tight"
              >
                {schoolData.type} «{schoolData.name}»
              </motion.h1>
              <motion.div {...fadeUp(0.18)} className="flex flex-wrap items-center gap-3 mt-2">
                {schoolData.city && (
                  <span className="text-sm text-slate-500 flex items-center gap-1">
                    📍 {schoolData.city}
                  </span>
                )}
                {schoolData.director && (
                  <span className="text-sm text-slate-500 flex items-center gap-1">
                    👤 {schoolData.director}
                  </span>
                )}
                {schoolData.phone && (
                  <span className="text-sm text-slate-500">
                    <PhoneLink phone={schoolData.phone} />
                  </span>
                )}
              </motion.div>
            </div>

            {/* Quick Actions — десктоп */}
            <motion.div {...fadeUp(0.2)} className="hidden md:flex gap-2 shrink-0">
              <button
                onClick={onAddEvent}
                className="flex flex-col items-center gap-1 px-5 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 active:scale-95 transition-all shadow-sm text-xs font-semibold"
              >
                <span className="text-lg leading-none">＋</span>
                Подія
              </button>
              <button
                onClick={onEdit}
                className="flex flex-col items-center gap-1 px-5 py-3 bg-white border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 hover:-translate-y-0.5 hover:shadow-md active:scale-95 transition-all text-xs font-semibold"
              >
                <span className="text-lg leading-none">✏️</span>
                Редагувати
              </button>
            </motion.div>

            {/* Quick Actions — мобіл */}
            <motion.div {...fadeUp(0.2)} className="md:hidden flex gap-2">
              <button
                onClick={onEdit}
                className="w-10 h-10 bg-white border border-slate-200 text-slate-600 rounded-xl flex items-center justify-center shadow-sm active:bg-slate-50 active:scale-95 transition-all"
              >
                ✏️
              </button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
});
```

# FILE: apps/frontend/src/components/schools/SchoolDesktopTable.tsx

```
import React from "react";
import { useNavigate, type NavigateFunction } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import type { School, PipelineStage } from "../../types";

interface Props {
  schools: School[];
  searchQuery: string;
  onDelete: (e: React.MouseEvent, id: string, name: string) => void;
  stages: PipelineStage[];
}

interface SchoolRowProps {
  school: School;
  onDelete: (e: React.MouseEvent, id: string, name: string) => void;
  stages: PipelineStage[];
  navigate: NavigateFunction;
}

const CATEGORY_BADGES: Record<string, { label: string; className: string }> = {
  planned: {
    label: "Заплановано",
    className: "bg-blue-50 text-blue-600 border-blue-100",
  },
  inProgress: {
    label: "У процесі",
    className: "bg-amber-50 text-amber-600 border-amber-100",
  },
  done: {
    label: "Проведено",
    className: "bg-emerald-50 text-emerald-600 border-emerald-100",
  },
};

export const SchoolRow = React.memo(
  ({ school, onDelete, stages, navigate }: SchoolRowProps) => {
    const latestEvent = school.events?.[0];
    const stage = latestEvent
      ? stages.find((s) => s.key === latestEvent.status)
      : null;
    const categories = (school as any).categories as string[] | undefined;

    return (
      <motion.tr
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => navigate(`/schools/${school.id}`)}
        className="border-b border-slate-50 hover:bg-blue-50/50 transition-colors cursor-pointer"
      >
        <td className="p-4 font-bold text-slate-800 overflow-hidden">
          <span className="block truncate" title={school.name}>
            {school.name}
          </span>
        </td>
        <td className="p-4 font-medium text-slate-600">{school.city?.name}</td>
        <td className="p-4">
          <span className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-xs font-bold">
            Активна
          </span>
        </td>
        <td className="p-4">
          {categories && categories.length > 0 ? (
            <div className="flex flex-wrap gap-1.5">
              {categories.map((cat) => (
                <span
                  key={cat}
                  className={`px-3 py-1 rounded-full text-xs font-bold border ${CATEGORY_BADGES[cat]?.className ?? "bg-slate-50 text-slate-500 border-slate-100"}`}
                >
                  {CATEGORY_BADGES[cat]?.label ?? cat}
                </span>
              ))}
            </div>
          ) : stage ? (
            <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-bold border border-blue-100">
              {stage.name}
            </span>
          ) : (
            <span className="text-slate-400 text-xs italic">—</span>
          )}
        </td>
        <td className="p-4 text-center">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(e, school.id, school.name);
            }}
            className="p-2 rounded-lg text-slate-300 hover:text-red-500 hover:bg-red-50 transition-all text-lg"
          >
            🗑
          </button>
        </td>
      </motion.tr>
    );
  },
);

SchoolRow.displayName = "SchoolRow";

export default function SchoolDesktopTable({
  schools,
  searchQuery,
  onDelete,
  stages,
}: Props) {
  const navigate = useNavigate();

  return (
    <div className="hidden md:flex flex-col flex-1 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden min-h-0 min-w-0 custom-scrollbar">
      <div className="overflow-y-auto flex-1 min-w-0">
        <table className="w-full text-left border-collapse table-fixed">
          <colgroup>
            <col style={{ width: "42%" }} />
            <col style={{ width: "15%" }} />
            <col style={{ width: "13%" }} />
            <col style={{ width: "20%" }} />
            <col style={{ width: "10%" }} />
          </colgroup>
          <thead className="sticky top-0 z-10 bg-slate-50">
            <tr className="border-b border-slate-100">
              <th className="p-4 font-medium text-slate-600">Назва школи</th>
              <th className="p-4 font-medium text-slate-600">Місто</th>
              <th className="p-4 font-medium text-slate-600">Статус</th>
              <th className="p-4 font-medium text-slate-600">Поточний етап</th>
              <th className="p-4 font-medium text-slate-600 text-center">
                Дія
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            <AnimatePresence>
              {schools.map((school) => (
                <SchoolRow
                  key={school.id}
                  school={school}
                  onDelete={onDelete}
                  stages={stages}
                  navigate={navigate}
                />
              ))}
            </AnimatePresence>
          </tbody>
        </table>
        {schools.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 text-slate-400 text-sm font-medium"
          >
            {searchQuery
              ? `Нічого не знайдено за «${searchQuery}»`
              : "Шкіл ще немає"}
          </motion.div>
        )}
      </div>
    </div>
  );
}

```

# FILE: apps/frontend/src/components/schools/SchoolMobileList.tsx

```
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

const CATEGORY_BADGES: Record<string, { label: string; className: string }> = {
  planned: {
    label: "Заплановано",
    className: "bg-blue-50 text-blue-600 border-blue-100",
  },
  inProgress: {
    label: "У процесі",
    className: "bg-amber-50 text-amber-600 border-amber-100",
  },
  done: {
    label: "Проведено",
    className: "bg-emerald-50 text-emerald-600 border-emerald-100",
  },
};

export const SchoolCard = React.memo(
  ({ school, onDelete, stages, index = 0 }: SchoolCardProps) => {
    const navigate = useNavigate();
    const latestEvent = school.events?.[0];
    const stage = latestEvent
      ? stages.find((s) => s.key === latestEvent.status)
      : null;
    const categories = (school as any).categories as string[] | undefined;

    return (
      <div
        className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm transition-all hover:shadow-md hover:border-blue-200 cursor-pointer active:scale-[0.99]"
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
          {categories && categories.length > 0 ? (
            <div className="flex flex-wrap gap-1 justify-end">
              {categories.map((cat) => (
                <span
                  key={cat}
                  className={`text-[10px] px-2 py-0.5 rounded-full font-medium border ${CATEGORY_BADGES[cat]?.className ?? "bg-slate-50 text-slate-500 border-slate-100"}`}
                >
                  {CATEGORY_BADGES[cat]?.label ?? cat}
                </span>
              ))}
            </div>
          ) : (
            stage && (
              <span className="text-[10px] px-2 py-0.5 bg-blue-50 text-blue-600 rounded-full font-medium border border-blue-100">
                {stage.name}
              </span>
            )
          )}
        </div>
      </div>
    );
  },
);

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
          <SchoolCard
            key={school.id}
            school={school}
            index={index}
            onDelete={onDelete}
            stages={stages}
          />
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

# FILE: apps/frontend/src/components/schools/schoolUtils.ts

```
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

# FILE: apps/frontend/src/components/schools/StatsBar.tsx

```
import React from "react";
export { classifySchool, classifySize } from "./schoolUtils";

interface StatsBarProps {
  statusStats: Record<string, number>;
  sizeStats: Record<string, number>;
  activeFilter: string | null;
  onFilterChange: (filter: string | null) => void;
  sizeFilter: string | null;
  onSizeFilterChange: (filter: string | null) => void;
  schoolType?: "Школа" | "Садочок";
}


const STATUS_ITEMS = [
  {
    key: "new",
    label: "Нові",
    dot: "bg-slate-400",
    active: "bg-slate-800 text-white",
    inactive: "text-slate-600",
  },
  {
    key: "planned",
    label: "Заплановані",
    dot: "bg-amber-400",
    active: "bg-amber-500 text-white",
    inactive: "text-amber-600",
  },
  {
    key: "inProgress",
    label: "В роботі",
    dot: "bg-blue-500",
    active: "bg-blue-600 text-white",
    inactive: "text-blue-600",
  },
  {
    key: "done",
    label: "Проведені",
    dot: "bg-emerald-500",
    active: "bg-emerald-600 text-white",
    inactive: "text-emerald-600",
  },
];

const SIZE_ITEMS_SCHOOL = [
  {
    key: "small",
    label: "Малі",
    sublabel: "< 150",
    active: "bg-violet-600 text-white",
    inactive: "text-violet-600",
  },
  {
    key: "medium",
    label: "Середні",
    sublabel: "150–500",
    active: "bg-violet-600 text-white",
    inactive: "text-violet-600",
  },
  {
    key: "large",
    label: "Великі",
    sublabel: "500+",
    active: "bg-violet-600 text-white",
    inactive: "text-violet-600",
  },
];

const SIZE_ITEMS_KINDER = [
  {
    key: "small",
    label: "Малі",
    sublabel: "< 50",
    active: "bg-violet-600 text-white",
    inactive: "text-violet-600",
  },
  {
    key: "medium",
    label: "Середні",
    sublabel: "50–100",
    active: "bg-violet-600 text-white",
    inactive: "text-violet-600",
  },
  {
    key: "large",
    label: "Великі",
    sublabel: "100+",
    active: "bg-violet-600 text-white",
    inactive: "text-violet-600",
  },
];

export default function StatsBar({
  statusStats,
  activeFilter,
  onFilterChange,
  sizeStats,
  sizeFilter,
  onSizeFilterChange,
  schoolType = "Школа",
}: StatsBarProps) {
  const sizeItems =
    schoolType === "Садочок" ? SIZE_ITEMS_KINDER : SIZE_ITEMS_SCHOOL;
  const hasAnyFilter = activeFilter || sizeFilter;

  return (
    <div className="flex flex-col gap-2 mb-4">
      {/* Рядок 1: статус */}
      <div className="flex items-center bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        {STATUS_ITEMS.map((item, i) => {
          const isActive = activeFilter === item.key;
          return (
            <React.Fragment key={item.key}>
              {i > 0 && <div className="w-px h-8 bg-slate-100 shrink-0" />}
              <button
                onClick={() => onFilterChange(isActive ? null : item.key)}
                className={`flex-1 flex flex-col items-center py-2.5 px-1 transition-colors min-w-0 ${
                  isActive
                    ? item.active
                    : `bg-white ${item.inactive} hover:bg-slate-50`
                }`}
              >
                <span className="text-base font-bold tabular-nums leading-none">
                  {statusStats[item.key] ?? 0}
                </span>
                <span className="text-[10px] mt-1 leading-none opacity-80 truncate w-full text-center">
                  {item.label}
                </span>
              </button>
            </React.Fragment>
          );
        })}
        {activeFilter && (
          <button
            onClick={() => onFilterChange(null)}
            className="px-3 text-slate-400 hover:text-slate-600 text-lg shrink-0 border-l border-slate-100 self-stretch flex items-center"
          >
            ✕
          </button>
        )}
      </div>

      {/* Рядок 2: розмір */}
      <div className="flex items-center bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        {sizeItems.map((item, i) => {
          const isActive = sizeFilter === item.key;
          return (
            <React.Fragment key={item.key}>
              {i > 0 && <div className="w-px h-8 bg-slate-100 shrink-0" />}
              <button
                onClick={() => onSizeFilterChange(isActive ? null : item.key)}
                className={`flex-1 flex flex-col items-center py-2.5 px-1 transition-colors min-w-0 ${
                  isActive
                    ? item.active
                    : `bg-white ${item.inactive} hover:bg-slate-50`
                }`}
              >
                <span className="text-base font-bold tabular-nums leading-none">
                  {sizeStats[item.key] ?? 0}
                </span>
                <span className="text-[10px] mt-1 leading-none opacity-80 truncate w-full text-center">
                  {item.label}
                  <span className="opacity-60 ml-0.5">{item.sublabel}</span>
                </span>
              </button>
            </React.Fragment>
          );
        })}
        {sizeFilter && (
          <button
            onClick={() => onSizeFilterChange(null)}
            className="px-3 text-slate-400 hover:text-slate-600 text-lg shrink-0 border-l border-slate-100 self-stretch flex items-center"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
}

```

# FILE: apps/frontend/src/components/schools/VirtualDesktopTable.tsx

```
import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useVirtualizer } from "@tanstack/react-virtual";
import { SchoolRow } from "./SchoolDesktopTable";
import type { School, PipelineStage } from "../../types";

interface Props {
  schools: School[];
  searchQuery: string;
  onDelete: (e: React.MouseEvent, id: string, name: string) => void;
  stages: PipelineStage[];
  onEndReached?: () => void;
}

export default function VirtualDesktopTable({
  schools,
  searchQuery,
  onDelete,
  stages,
  onEndReached,
}: Props) {
  const navigate = useNavigate();
  const parentRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: schools.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 57,
    overscan: 8,
  });

  const virtualItems = rowVirtualizer.getVirtualItems();
  const lastItem = virtualItems[virtualItems.length - 1];

  useEffect(() => {
    if (!onEndReached || !lastItem) return;
    if (lastItem.index >= schools.length - 5) {
      onEndReached();
    }
  }, [lastItem?.index, schools.length, onEndReached]);

  return (
    <div ref={parentRef} className="overflow-y-auto flex-1 h-full min-w-0">
      <table className="w-full text-left border-collapse table-fixed">
        <colgroup>
          <col style={{ width: "42%" }} />
          <col style={{ width: "15%" }} />
          <col style={{ width: "13%" }} />
          <col style={{ width: "20%" }} />
          <col style={{ width: "10%" }} />
        </colgroup>
        <thead className="sticky top-0 z-10 bg-slate-50">
          <tr className="border-b border-slate-100">
            <th className="p-4 font-medium text-slate-600">Назва школи</th>
            <th className="p-4 font-medium text-slate-600">Місто</th>
            <th className="p-4 font-medium text-slate-600">Статус</th>
            <th className="p-4 font-medium text-slate-600">Поточний етап</th>
            <th className="p-4 font-medium text-slate-600 text-center">Дія</th>
          </tr>
        </thead>
        <tbody>
          {virtualItems.length > 0 && (
            <tr>
              <td
                colSpan={5}
                style={{ height: `${virtualItems[0].start}px`, padding: 0, border: "none" }}
              />
            </tr>
          )}
          {virtualItems.map((virtualRow) => (
            <tr key={schools[virtualRow.index].id} data-index={virtualRow.index}>
              <SchoolRow
                school={schools[virtualRow.index]}
                onDelete={onDelete}
                stages={stages}
                navigate={navigate}
              />
            </tr>
          ))}
          {virtualItems.length > 0 && (
            <tr>
              <td
                colSpan={5}
                style={{
                  height: `${rowVirtualizer.getTotalSize() - virtualItems[virtualItems.length - 1].end}px`,
                  padding: 0,
                  border: "none",
                }}
              />
            </tr>
          )}
        </tbody>
      </table>

      {schools.length === 0 && (
        <div className="text-center py-16 text-slate-400 text-sm font-medium">
          {searchQuery
            ? `Нічого не знайдено за «${searchQuery}»`
            : "Шкіл ще немає"}
        </div>
      )}
    </div>
  );
}

```

# FILE: apps/frontend/src/components/ui/Button.tsx

```
import { forwardRef } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";

type Variant = "primary" | "secondary" | "danger" | "ghost";
type Size = "sm" | "md";

const variants: Record<Variant, string> = {
  primary: "bg-brand text-white hover:bg-brand-hover disabled:opacity-50 disabled:cursor-not-allowed",
  secondary: "bg-surface-muted text-content-secondary hover:bg-border-strong disabled:opacity-50 disabled:cursor-not-allowed",
  danger: "bg-danger text-white hover:bg-danger/90 disabled:opacity-50 disabled:cursor-not-allowed",
  ghost: "bg-transparent text-content-secondary hover:bg-surface-muted disabled:opacity-50 disabled:cursor-not-allowed",
};

const sizes: Record<Size, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-5 py-2.5 text-sm",
};

interface Props extends Omit<HTMLMotionProps<"button">, "ref"> {
  variant?: Variant;
  size?: Size;
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, Props>(
  ({ variant = "primary", size = "md", isLoading, className = "", children, disabled, ...props }, ref) => (
    <motion.button
      ref={ref}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.1 }}
      disabled={disabled || isLoading}
      className={`rounded-control font-medium transition-colors duration-fast
        focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-2
        ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {isLoading ? "…" : children}
    </motion.button>
  )
);

```

# FILE: apps/frontend/src/components/ui/Card.tsx

```
import type { ReactNode, HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  padding?: "sm" | "md" | "lg";
}

const paddings = {
  sm: "p-3",
  md: "p-5 sm:p-6",
  lg: "p-6 sm:p-8",
};

export function Card({ children, padding = "md", className = "", ...props }: Props) {
  return (
    <div
      className={`bg-surface rounded-card shadow-card border border-border ${paddings[padding]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

```

# FILE: apps/frontend/src/components/ui/Input.tsx

```
import { forwardRef, type InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, Props>(
  ({ label, error, className = "", id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-content-primary">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={`rounded-control border px-3.5 py-2.5 text-sm text-content-primary bg-surface
            placeholder:text-content-muted transition-colors duration-fast
            ${error ? "border-danger" : "border-border-strong hover:border-content-muted"}
            focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand
            disabled:opacity-50 disabled:cursor-not-allowed
            ${className}`}
          {...props}
        />
        {error && <p className="text-xs text-danger">{error}</p>}
      </div>
    );
  }
);

```

# FILE: apps/frontend/src/components/ui/Modal.tsx

```
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, type ReactNode } from "react";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  maxWidth?: string;
}

export function Modal({ isOpen, onClose, title, children, maxWidth = "max-w-md" }: ModalProps) {
  const headingId = useRef(`modal-${Math.random().toString(36).slice(2)}`).current;
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", handler);
    closeRef.current?.focus();
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby={headingId}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center sm:p-4"
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            initial={{ y: 24, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 24, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className={`bg-surface rounded-t-3xl sm:rounded-modal shadow-modal w-full sm:${maxWidth} overflow-hidden max-h-[90vh] flex flex-col`}
          >
            <div className="sm:hidden w-10 h-1.5 bg-border-strong rounded-pill mx-auto mt-3" />
            <div className="p-5 sm:p-6 border-b border-border flex justify-between items-center bg-surface-subtle shrink-0">
              <h3 id={headingId} className="text-lg font-bold text-content-primary">{title}</h3>
              <button
                ref={closeRef}
                onClick={onClose}
                aria-label="Закрити"
                className="p-2 -mr-2 text-content-muted hover:text-content-primary rounded-control transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-5 sm:p-6 overflow-y-auto">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

```

# FILE: apps/frontend/src/components/ui/OptimizedImage.tsx

```
import { ImgHTMLAttributes } from 'react';

interface OptimizedImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  width?: number | string;
  height?: number | string;
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = "",
  ...props
}: OptimizedImageProps) {
  return (
    <img
      src={src}
      alt={alt || "Image"}
      width={width}
      height={height}
      loading="lazy"
      decoding="async"
      className={`object-cover ${className}`}
      {...props}
    />
  );
}

```

# FILE: apps/frontend/src/components/ui/Skeleton.tsx

```
export const SkeletonCard = () => (
  <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden animate-pulse">
    <div className="h-44 bg-slate-200 w-full"></div>
    <div className="p-5 flex flex-col gap-3">
      <div className="h-6 bg-slate-200 rounded w-1/2"></div>
      <div className="h-4 bg-slate-200 rounded w-3/4"></div>
      <div className="h-4 bg-slate-200 rounded w-1/2"></div>
    </div>
  </div>
);
```

# FILE: apps/frontend/src/components/ui/Toast.tsx

```
import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";

type ToastKind = "success" | "error" | "info";

interface ToastItem {
  id: number;
  msg: string;
  kind: ToastKind;
}

const ToastContext = createContext<(msg: string, kind?: ToastKind) => void>(() => {});

export const useToast = () => useContext(ToastContext);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const push = useCallback((msg: string, kind: ToastKind = "info") => {
    const id = Date.now();
    setToasts((t) => [...t, { id, msg, kind }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3500);
  }, []);

  return (
    <ToastContext.Provider value={push}>
      {children}
      <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 pointer-events-none">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: 40 }}
              transition={{ duration: 0.2 }}
              className={`pointer-events-auto px-4 py-3 rounded-control shadow-modal text-sm font-medium text-white
                ${t.kind === "success" ? "bg-success" : t.kind === "error" ? "bg-danger" : "bg-slate-800"}`}
            >
              {t.msg}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

```

# FILE: apps/frontend/src/components/VirtualSchoolList.tsx

```
import { useRef, useEffect } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import type { School } from "../types";

interface VirtualSchoolListProps {
  schools: School[];
  renderItem: (school: School, index: number) => JSX.Element;
  itemHeight?: number;
  onEndReached?: () => void;
  animationKey?: string | number;
}

export default function VirtualSchoolList({
  schools,
  renderItem,
  itemHeight = 120,
  onEndReached,
  animationKey,
}: VirtualSchoolListProps) {
  const parentRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: schools.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => itemHeight,
    overscan: 5,
  });

  const virtualItems = rowVirtualizer.getVirtualItems();
  const lastItem = virtualItems[virtualItems.length - 1];

  useEffect(() => {
    if (!onEndReached || !lastItem) return;
    if (lastItem.index >= schools.length - 5) {
      onEndReached();
    }
  }, [lastItem?.index, schools.length, onEndReached]);

  return (
    <div ref={parentRef} className="h-[calc(100vh-200px)] overflow-auto w-full">
      <style>{`
        @keyframes schoolRowIn {
          from { opacity: 0; transform: translateX(-14px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .school-row-enter {
          animation: schoolRowIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          animation-fill-mode: both;
        }
      `}</style>
      <div
        key={animationKey}
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          width: "100%",
          position: "relative",
        }}
      >
        {virtualItems.map((virtualRow) => (
          <div
            key={virtualRow.key}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: `${virtualRow.size}px`,
              transform: `translateY(${virtualRow.start}px)`,
            }}
          >
            <div
              className="school-row-enter"
              style={{
                animationDelay: `${Math.min(virtualRow.index * 40, 400)}ms`,
              }}
            >
              {renderItem(schools[virtualRow.index], virtualRow.index)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

```

# FILE: apps/frontend/src/config/api.ts

```
import axios, { AxiosError } from "axios";

export const API_BASE_URL = import.meta.env.VITE_API_URL || "/api";

export const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
  return match ? match[2] : null;
}

api.interceptors.request.use((config) => {
  if (config.method && config.method !== "get") {
    const csrfToken = getCookie("csrf_token");
    if (csrfToken) config.headers["X-CSRF-Token"] = csrfToken;
  }
  return config;
});

let refreshPromise: Promise<void> | null = null;

function refreshSession(): Promise<void> {
  if (!refreshPromise) {
    refreshPromise = api
      .post("/auth/refresh")
      .then(() => undefined)
      .finally(() => {
        refreshPromise = null;
      });
  }
  return refreshPromise;
}

api.interceptors.response.use(
  (res) => res,
  async (error: AxiosError) => {
    const original = error.config as (typeof error.config & { _retry?: boolean }) | undefined;

    const isAuthEndpoint = original?.url?.includes("/auth/login") || original?.url?.includes("/auth/refresh") || original?.url?.includes("/auth/me");

    if (error.response?.status === 401 && original && !original._retry && !isAuthEndpoint) {
      original._retry = true;
      try {
        await refreshSession();
        return api(original);
      } catch {
        window.dispatchEvent(new Event("auth:expired"));
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  },
);

```

# FILE: apps/frontend/src/context/AuthContext.tsx

```
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { api } from "../config/api";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  cityId?: string | null;
  cityName?: string | null;
}

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  logout: () => Promise<void>;
}
const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/auth/me")
      .then((res) => setUser(res.data.user))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const handleExpired = () => {
      setUser(null);
      window.location.href = "/login";
    };
    window.addEventListener("auth:expired", handleExpired);
    return () => window.removeEventListener("auth:expired", handleExpired);
  }, []);

  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } catch (e) {
      console.error("Logout error", e);
    }
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

```

# FILE: apps/frontend/src/context/CityContext.tsx

```
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useAuth } from "./AuthContext";

interface SelectedCity {
  id: string;
  name: string;
}

interface CityContextType {
  selectedCity: SelectedCity;
  setSelectedCity: (city: SelectedCity) => void;
  isCityLocked: boolean;
}

const DEFAULT_CITY: SelectedCity = { id: "", name: "Львів" };

const CityContext = createContext<CityContextType>({
  selectedCity: DEFAULT_CITY,
  setSelectedCity: () => {},
  isCityLocked: false,
});

export function CityProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const isCityLocked = user?.role === "MANAGER" && !!user.cityId;

  const [selectedCity, setSelectedCityState] = useState<SelectedCity>(() => {
    try {
      const raw = localStorage.getItem("selectedCity");
      return raw ? JSON.parse(raw) : DEFAULT_CITY;
    } catch {
      return DEFAULT_CITY;
    }
  });

  useEffect(() => {
    if (isCityLocked && user?.cityId) {
      setSelectedCityState({ id: user.cityId, name: user.cityName || "" });
    }
  }, [isCityLocked, user?.cityId, user?.cityName]);

  const setSelectedCity = (city: SelectedCity) => {
    if (isCityLocked) return;
    setSelectedCityState(city);
    localStorage.setItem("selectedCity", JSON.stringify(city));
  };

  return (
    <CityContext.Provider
      value={{ selectedCity, setSelectedCity, isCityLocked }}
    >
      {children}
    </CityContext.Provider>
  );
}

export function useSelectedCity() {
  return useContext(CityContext);
}

```

# FILE: apps/frontend/src/hooks/useApi.ts

```
import {
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { api } from "../config/api";
import type { City, School } from "../types";

export function useCities() {
  return useQuery({
    queryKey: ["cities"],
    queryFn: () => api.get<City[]>("/cities").then((r) => r.data),
    staleTime: 5 * 60 * 1000,
  });
}

export function useAddCity() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (name: string) =>
      api.post<City>("/cities", { name }).then((r) => r.data),
    onSuccess: (newCity) => {
      qc.setQueryData(["cities"], (old: City[] = []) => [newCity, ...old]);
    },
  });
}

export interface SchoolFilters {
  search?: string;
  cityId?: string;
  type?: "Школа" | "Садочок";
  stage?: "new" | "planned" | "inProgress" | "done";
  size?: "small" | "medium" | "large";
}

interface SchoolsPage {
  data: School[];
  meta: {
    totalItems: number;
    page: number;
    take: number;
    pageCount: number;
    hasNextPage: boolean;
  };
}

export function useSchools(filters: SchoolFilters = {}) {
  return useInfiniteQuery({
    queryKey: ["schools", filters],
    queryFn: ({ pageParam = 1 }) =>
      api
        .get<SchoolsPage>("/schools", {
          params: { ...filters, page: pageParam, take: 30 },
        })
        .then((r) => r.data),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.meta.hasNextPage ? lastPage.meta.page + 1 : undefined,
    staleTime: 5 * 60 * 1000,
  });
}

export function useSchoolStats(
  filters: Pick<SchoolFilters, "cityId" | "type" | "stage"> = {},
) {
  return useQuery({
    queryKey: ["schoolStats", filters],
    queryFn: () =>
      api
        .get("/schools/stats", { params: filters })
        .then((r) => r.data),
    staleTime: 2 * 60 * 1000,
  });
}

export function useSupportedCities() {
  return useQuery({
    queryKey: ["supportedCities"],
    queryFn: () =>
      api
        .get<string[]>("/schools/supported-cities")
        .then((r) => r.data),
    staleTime: 60 * 60 * 1000,
  });
}

export function useAddSchool() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<School>) =>
      api
        .post<School>("/schools", data)
        .then((r) => r.data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["schools"] });
      qc.invalidateQueries({ queryKey: ["schoolStats"] });
    },
  });
}

export function useDeleteSchool() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (schoolId: string) =>
      api.delete(`/schools/${schoolId}`),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["schools"] });
      qc.invalidateQueries({ queryKey: ["schoolStats"] });
    },
  });
}

export function useEvents() {
  return useQuery({
    queryKey: ["events"],
    queryFn: () => api.get("/events").then((r) => r.data),
    staleTime: 2 * 60 * 1000,
  });
}

export function usePrefetchSchool() {
  const qc = useQueryClient();
  return (schoolId: string) => {
    qc.prefetchQuery({
      queryKey: ["school", schoolId],
      queryFn: () =>
        api
          .get<School>(`/schools/${schoolId}`)
          .then((r) => r.data),
      staleTime: 2 * 60 * 1000,
    });
  };
}

```

# FILE: apps/frontend/src/hooks/useCalendar.ts

```
import { useQuery } from "@tanstack/react-query";
import { api } from "../config/api";
import type { Event, Project } from "../types";

export function useCalendarEvents() {
  return useQuery<Event[]>({
    queryKey: ["calendarEvents"],
    queryFn: () => api.get<Event[]>("/events").then((r) => r.data),
    staleTime: 60 * 1000,
  });
}

export function useCalendarProjects() {
  return useQuery<Project[]>({
    queryKey: ["projects"],
    queryFn: () => api.get<Project[]>("/projects").then((r) => r.data),
    staleTime: 5 * 60 * 1000,
  });
}

```

# FILE: apps/frontend/src/hooks/useCities.ts

```
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../config/api";
import type { City, CityProfile } from "../types";

export function useCities() {
  return useQuery<City[]>({
    queryKey: ["cities"],
    queryFn: () => api.get<City[]>("/cities").then((r) => r.data),
    staleTime: 5 * 60 * 1000,
  });
}

export function useCity(id: string | undefined) {
  return useQuery<CityProfile>({
    queryKey: ["city", id],
    queryFn: () => api.get<CityProfile>(`/cities/${id}`).then((r) => r.data),
    enabled: !!id,
    staleTime: 2 * 60 * 1000,
  });
}

export function useCreateCity() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (name: string) =>
      api.post("/cities", { name }).then((r) => r.data),
    onSuccess: (data) => {
      qc.setQueryData<City[]>(["cities"], (old) =>
        Array.isArray(old) ? [data, ...old] : [data],
      );
    },
  });
}

export function useCreateCrew(cityId: string | undefined) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (form: { name: string; hostId: string; driverId: string }) =>
      api.post(`/cities/${cityId}/crews`, form).then((r) => r.data),
    onMutate: async (form) => {
      await qc.cancelQueries({ queryKey: ["city", cityId] });
      const prev = qc.getQueryData<CityProfile>(["city", cityId]);
      const optimistic: Crew = { id: `temp-${Date.now()}`, ...form, name: form.name, cityId: cityId! };
      qc.setQueryData<CityProfile>(["city", cityId], (old) =>
        old ? { ...old, crews: [...(old.crews || []), optimistic] } : old,
      );
      return { prev };
    },
    onSuccess: (data) => {
      qc.setQueryData<CityProfile>(["city", cityId], (old) =>
        old
          ? {
              ...old,
              crews: old.crews?.map((c: Crew) =>
                c.id?.startsWith("temp-") ? data : c,
              ),
            }
          : old,
      );
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.prev) qc.setQueryData<CityProfile>(["city", cityId], ctx.prev);
    },
  });
}

export function useDeleteCrew(cityId: string | undefined) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (crewId: string) =>
      api.delete(`/cities/crews/${crewId}`).then((r) => r.data),
    onMutate: async (crewId) => {
      await qc.cancelQueries({ queryKey: ["city", cityId] });
      const prev = qc.getQueryData<CityProfile>(["city", cityId]);
      qc.setQueryData<CityProfile>(["city", cityId], (old) =>
        old
          ? { ...old, crews: old.crews?.filter((c: Crew) => c.id !== crewId) }
          : old,
      );
      return { prev };
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.prev) qc.setQueryData<CityProfile>(["city", cityId], ctx.prev);
    },
  });
}

```

# FILE: apps/frontend/src/hooks/useDaysOff.ts

```
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../config/api";

export interface DayOff {
  id: string;
  userId: string;
  date: string;
  user: { id: string; name: string; role: string; cityId: string | null };
}

export function useDaysOff(from?: string, to?: string, cityId?: string) {
  return useQuery({
    queryKey: ["daysOff", from, to, cityId],
    queryFn: () => {
      const params = new URLSearchParams();
      if (from) params.set("from", from);
      if (to) params.set("to", to);
      if (cityId) params.set("cityId", cityId);
      return api.get<DayOff[]>(`/days-off?${params}`).then((r) => r.data);
    },
    staleTime: 30 * 1000,
  });
}

export function useCreateDayOff() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: { date: string; userId?: string }) =>
      api.post<DayOff>("/days-off", payload).then((r) => r.data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["daysOff"] });
    },
  });
}

export function useDeleteDayOff() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.delete(`/days-off/${id}`),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["daysOff"] });
    },
  });
}

```

# FILE: apps/frontend/src/hooks/useEmployees.ts

```
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../config/api";
import type { User, Project } from "../types";

export interface UserFormData {
  fullName: string;
  phone: string;
  email: string;
  cityId: string;
  role: string;
  password: string;
  telegramId: string;
  car: string;
}

export function useUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: () =>
      api.get<User[]>("/users", undefined).then((r) => r.data),
    staleTime: 2 * 60 * 1000,
  });
}

export function useProjects() {
  return useQuery({
    queryKey: ["projects"],
    queryFn: () =>
      api.get<Project[]>("/projects", undefined).then((r) => r.data),
    staleTime: 5 * 60 * 1000,
  });
}

export function useCreateUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (form: UserFormData) =>
      api.post<User>("/users", form, undefined).then((r) => r.data),
    onMutate: async (form) => {
      await qc.cancelQueries({ queryKey: ["users"] });
      const prev = qc.getQueryData<User[]>(["users"]);
      const optimistic = {
        id: `temp-${Date.now()}`,
        name: form.fullName,
        ...form,
      };
      qc.setQueryData(["users"], (old: User[] | undefined) =>
        Array.isArray(old) ? [...old, optimistic] : [optimistic],
      );
      return { prev };
    },
    onSuccess: (data) => {
      qc.setQueryData(["users"], (old: User[] | undefined) =>
        Array.isArray(old)
          ? old.map((u) => (u.id?.startsWith("temp-") ? data : u))
          : [data],
      );
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.prev) qc.setQueryData(["users"], ctx.prev);
    },
  });
}

export function useUpdateUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, form }: { id: string; form: Partial<UserFormData> }) =>
      api
        .patch<User>(`/users/${id}`, form, undefined)
        .then((r) => r.data),
    onMutate: async ({ id, form }) => {
      await qc.cancelQueries({ queryKey: ["users"] });
      const prev = qc.getQueryData<User[]>(["users"]);
      qc.setQueryData(["users"], (old: User[] | undefined) =>
        Array.isArray(old)
          ? old.map((u) =>
              u.id === id
                ? { ...u, name: form.fullName ?? u.name, ...form }
                : u,
            )
          : old,
      );
      return { prev };
    },
    onSuccess: (data, vars) => {
      qc.setQueryData(["users"], (old: User[] | undefined) =>
        Array.isArray(old)
          ? old.map((u) => (u.id === vars.id ? { ...u, ...data } : u))
          : old,
      );
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.prev) qc.setQueryData(["users"], ctx.prev);
    },
  });
}

export function useDeleteUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      api.delete(`/users/${id}`, undefined).then((r) => r.data),
    onMutate: async (id) => {
      await qc.cancelQueries({ queryKey: ["users"] });
      const prev = qc.getQueryData<User[]>(["users"]);
      qc.setQueryData(["users"], (old: User[] | undefined) =>
        Array.isArray(old) ? old.filter((u) => u.id !== id) : old,
      );
      return { prev };
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.prev) qc.setQueryData(["users"], ctx.prev);
    },
  });
}

export function useCreateProject() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (form: {
      name: string;
      color: string;
      pricePerChild?: number;
    }) =>
      api
        .post<Project>("/projects", form, undefined)
        .then((r) => r.data),
    onSuccess: (data) => {
      qc.setQueryData(["projects"], (old: Project[] | undefined) =>
        Array.isArray(old) ? [...old, data] : [data],
      );
    },
  });
}

export function useUpdateProject() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      form,
    }: {
      id: string;
      form: { name?: string; color?: string; pricePerChild?: number };
    }) =>
      api
        .patch<Project>(`/projects/${id}`, form, undefined)
        .then((r) => r.data),
    onSuccess: (data, vars) => {
      qc.setQueryData(["projects"], (old: Project[] | undefined) =>
        Array.isArray(old)
          ? old.map((p) => (p.id === vars.id ? { ...p, ...data } : p))
          : old,
      );
    },
  });
}

export function useDeleteProject() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      api.delete(`/projects/${id}`, undefined).then((r) => r.data),
    onSuccess: (_data, id) => {
      qc.setQueryData(["projects"], (old: Project[] | undefined) =>
        Array.isArray(old) ? old.filter((p) => p.id !== id) : old,
      );
    },
  });
}

```

# FILE: apps/frontend/src/hooks/useSchoolProfile.ts

```
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../config/api";
import type {
  Event,
  EventHistory,
  SchoolProfileData,
  CreateEventPayload,
} from "../types";
import type { ReportData } from "../components/school-profile/modals/ReportModal";

export function useSchool(id: string | undefined) {
  return useQuery({
    queryKey: ["school", id],
    queryFn: async () => {
      const res = await api.get(`/schools/${id}`);
      return res.data;
    },
    enabled: !!id,
    staleTime: 2 * 60 * 1000,
  });
}

export function useSchoolCompletedEvents(schoolId: string | undefined) {
  return useQuery({
    queryKey: ["schoolCompletedEvents", schoolId],
    queryFn: async () => {
      const res = await api.get<Event[]>(
        `/events/school/${schoolId}/completed`,
      );
      return res.data;
    },
    enabled: !!schoolId,
    staleTime: 2 * 60 * 1000,
  });
}

export function useSchoolEvents(schoolId: string | undefined, full = false) {
  return useQuery({
    queryKey: ["schoolEvents", schoolId, full],
    queryFn: async () => {
      const url = full
        ? `/events/school/${schoolId}`
        : `/events/school/${schoolId}?minimal=true`;
      const res = await api.get<Event[]>(url, undefined);
      return res.data.filter((ev) => ev.status !== "RE_SALE");
    },
    enabled: !!schoolId,
    staleTime: 60 * 1000,
  });
}

export function useEventFull(eventId: string | undefined) {
  return useQuery({
    queryKey: ["eventFull", eventId],
    queryFn: async () => {
      const res = await api.get<Event>(`/events/${eventId}`);
      return res.data;
    },
    enabled: !!eventId,
    staleTime: 30 * 1000,
  });
}

export { useUsers } from "./useEmployees";

export function useUpdateEventStatus() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      eventId,
      status,
      actionName,
      comment,
    }: {
      eventId: string;
      status: string;
      actionName: string;
      comment?: string;
    }) =>
      api
        .patch(
          `/events/${eventId}/status`,
          { status, actionName, comment },
          undefined,
        )
        .then((r) => r.data),
    onSuccess: (data, vars) => {
      qc.setQueryData(["eventFull", vars.eventId], data);
      qc.setQueriesData(
        { queryKey: ["schoolEvents"] },
        (old: Event[] | undefined) =>
          Array.isArray(old)
            ? old
                .map((ev) =>
                  ev.id === vars.eventId
                    ? { ...ev, status: vars.status, ...data }
                    : ev,
                )
                .filter((ev) => ev.status !== "RE_SALE")
            : old,
      );
    },
  });
}

export function useUpdatePreparation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      eventId,
      field,
      status,
    }: {
      eventId: string;
      field: string;
      status: string;
    }) =>
      api
        .patch(
          `/events/${eventId}/preparation`,
          { field, status },
          undefined,
        )
        .then((r) => r.data),
    onSuccess: (_data, vars) => {
      qc.setQueryData(["eventFull", vars.eventId], (old: Event | undefined) =>
        old
          ? {
              ...old,
              preparation: {
                ...(old.preparation || {}),
                [vars.field]: vars.status,
              },
            }
          : old,
      );
    },
  });
}

export function useAssignCrew() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ eventId, crewId }: { eventId: string; crewId: string }) =>
      api
        .post(
          `/events/${eventId}/assign-crew`,
          { crewId },
          undefined,
        )
        .then((r) => r.data),
    onSuccess: (data, vars) => {
      qc.setQueryData(["eventFull", vars.eventId], data);
      qc.setQueriesData(
        { queryKey: ["schoolEvents"] },
        (old: Event[] | undefined) =>
          Array.isArray(old)
            ? old.map((ev) =>
                ev.id === vars.eventId
                  ? { ...ev, crewId: vars.crewId, crew: data.crew }
                  : ev,
              )
            : old,
      );
    },
  });
}

export function useSubmitReport() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      eventId,
      reportData,
    }: {
      eventId: string;
      reportData: ReportData;
    }) =>
      api
        .post(`/events/${eventId}/report`, reportData)
        .then((r) => r.data)
        .catch((err) => {
          console.error("submitReport failed:", err.response?.data ?? err);
          throw err;
        }),
    onSuccess: (_data, vars) => {
      qc.setQueriesData(
        { queryKey: ["schoolEvents"] },
        (old: Event[] | undefined) =>
          Array.isArray(old) ? old.filter((ev) => ev.id !== vars.eventId) : old,
      );
      qc.removeQueries({ queryKey: ["eventFull", vars.eventId] });
    },
  });
}

export function useAddComment() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ eventId, comment }: { eventId: string; comment: string }) =>
      api
        .post(
          `/events/${eventId}/history`,
          { comment },
          undefined,
        )
        .then((r) => r.data),
    onSuccess: (data, vars) => {
      qc.setQueryData(["eventFull", vars.eventId], (old: Event | undefined) =>
        old ? { ...old, history: data.history } : old,
      );
    },
  });
}

export const useUpdateSchool = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      ...payload
    }: { id: string } & Omit<SchoolProfileData, "id" | "city">) => {
      const res = await api.patch(`/schools/${id}`, payload);
      return res.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["school", variables.id] });
    },
  });
};

export function useDeleteEvent(schoolId: string | undefined) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (eventId: string) => {
      await api.delete(`/events/${eventId}`);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["school", schoolId] });
      qc.invalidateQueries({ queryKey: ["schoolCompletedEvents", schoolId] });
    },
  });
}

export const useCreateEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreateEventPayload) => {
      const res = await api.post<Event>("/events", payload);
      return res.data;
    },
    onSuccess: (_newEvent, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["schoolEvents", variables.schoolId],
      });
    },
  });
};

export function useUpdateHistoryComment() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      historyId,
      comment,
      eventId,
    }: {
      historyId: string;
      comment: string;
      eventId: string;
    }) =>
      api
        .patch(
          `/events/history/${historyId}`,
          { comment },
          undefined,
        )
        .then((r) => r.data),
    onSuccess: (_data, vars) => {
      qc.setQueryData(["eventFull", vars.eventId], (old: Event | undefined) =>
        old
          ? {
              ...old,
              history: old.history?.map((h: EventHistory) =>
                h.id === vars.historyId ? { ...h, comment: vars.comment } : h,
              ),
            }
          : old,
      );
    },
  });
}

```

# FILE: apps/frontend/src/index.css

```

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  *:focus-visible {
    outline: 2px solid theme('colors.brand.DEFAULT');
    outline-offset: 2px;
  }
}

.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: #cbd5e1 transparent;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #cbd5e1;
  border-radius: 20px;
}

```

# FILE: apps/frontend/src/instrument.ts

```
import * as Sentry from '@sentry/react';

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  environment: import.meta.env.VITE_SENTRY_ENVIRONMENT ?? import.meta.env.MODE,
  integrations: [Sentry.replayIntegration()],
  tracesSampleRate: import.meta.env.PROD ? 0.2 : 1.0,
  replaysSessionSampleRate: import.meta.env.PROD ? 0.1 : 0,
  replaysOnErrorSampleRate: 1.0,
});

```

# FILE: apps/frontend/src/main.tsx

```
import "./instrument";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import App from "./App";
import { ToastProvider } from "./components/ui/Toast";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
      retry: 1,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <App />
      </ToastProvider>
    </QueryClientProvider>
  </StrictMode>,
);

```

# FILE: apps/frontend/src/pages/CalendarView.tsx

```
import { useSelectedCity } from "../context/CityContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useCalendarEvents, useCalendarProjects } from "../hooks/useCalendar";
import { useUsers } from "../hooks/useEmployees";
import { useCities } from "../hooks/useCities";
import {
  useDaysOff,
  useCreateDayOff,
  useDeleteDayOff,
} from "../hooks/useDaysOff";
import { useState, useMemo, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DayOffModal from "../components/calendar/DayOffModal";
import type { Event, Project, City, User, DayOff } from "../types";

const STAFF_ROLES = ["HOST", "DRIVER"];
const MANAGER_ROLES = ["SUPERADMIN", "MANAGER"];

const PROJECT_HEX: Record<string, string> = {
  blue: "#3b82f6",
  emerald: "#10b981",
  rose: "#f43f5e",
  red: "#ef4444",
  amber: "#f59e0b",
  purple: "#a855f7",
};
const ROLE_ICON_MAP: Record<string, string> = {
  HOST: "🎙️",
  DRIVER: "🚗",
};

const toISODate = (d: Date) => d.toLocaleDateString("en-CA");

export default function CalendarView() {
  const { data: events = [], isLoading: eventsLoading } = useCalendarEvents();
  const { data: projects = [] } = useCalendarProjects();
  const { data: cities = [] } = useCities();
  const { data: allUsers = [] } = useUsers();
  const [currentDate, setCurrentDate] = useState(new Date());
  const isLoading = eventsLoading;
  const [selectedMobileDate, setSelectedMobileDate] = useState<Date>(
    new Date(),
  );
  const [dayOffModalDate, setDayOffModalDate] = useState<Date | null>(null);

  const { selectedCity } = useSelectedCity();
  const { user } = useAuth();
  const navigate = useNavigate();

  const userRole = user?.role || "GUEST";
  const isStaff = STAFF_ROLES.includes(userRole);
  const isManagerOrAdmin = MANAGER_ROLES.includes(userRole);

  const [filterCityId, setFilterCityId] = useState<string>(() =>
    userRole === "MANAGER" && user?.cityId ? user.cityId : "ALL",
  );

  const nextMonth = () =>
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1),
    );
  const prevMonth = () =>
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1),
    );
  const today = () => {
    setCurrentDate(new Date());
    setSelectedMobileDate(new Date());
  };

  const getDaysInMonth = (year: number, month: number) =>
    new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year: number, month: number) => {
    let day = new Date(year, month, 1).getDay();
    return day === 0 ? 6 : day - 1;
  };

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  const days: (Date | null)[] = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let i = 1; i <= daysInMonth; i++) days.push(new Date(year, month, i));

  const monthFrom = toISODate(new Date(year, month, 1));
  const monthTo = toISODate(new Date(year, month + 1, 0));

  const dayOffCityId = isManagerOrAdmin
    ? filterCityId !== "ALL"
      ? filterCityId
      : undefined
    : undefined;

  const { data: dayOffs = [] } = useDaysOff(monthFrom, monthTo, dayOffCityId);
  const createDayOff = useCreateDayOff();
  const deleteDayOff = useDeleteDayOff();

  const dayOffsByDate = useMemo(() => {
    const map = new Map<string, typeof dayOffs>();
    for (const d of dayOffs) {
      const key = d.date.slice(0, 10);
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(d);
    }
    return map;
  }, [dayOffs]);

  const staffForModal = useMemo(() => {
    const cityScope =
      userRole === "MANAGER"
        ? user?.cityId
        : filterCityId !== "ALL"
          ? filterCityId
          : null;
    return allUsers.filter(
      (u: User) =>
        STAFF_ROLES.includes(u.role) && (!cityScope || u.cityId === cityScope),
    );
  }, [allUsers, userRole, user?.cityId, filterCityId]);

  const filteredEvents = useMemo(() => {
    return events.filter((ev: Event) => {
      if (ev.status === "RE_SALE") return false;
      if (filterCityId !== "ALL" && ev.city?.id !== filterCityId) return false;
      return true;
    });
  }, [events, filterCityId]);

  const eventsByDate = useMemo(() => {
    const map = new Map<string, Event[]>();
    for (const ev of filteredEvents) {
      const key = ev.date.slice(0, 10);
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(ev);
    }
    return map;
  }, [filteredEvents]);

  const projectColorMap = useMemo(() => {
    const map = new Map<string, string>();
    for (const p of projects) {
      switch (p.color) {
        case "emerald":
          map.set(p.name, "bg-emerald-100 text-emerald-700 border-emerald-200 hover:bg-emerald-200 hover:border-emerald-300"); break;
        case "rose":
          map.set(p.name, "bg-rose-100 text-rose-700 border-rose-200 hover:bg-rose-200 hover:border-rose-300"); break;
        case "red":
          map.set(p.name, "bg-red-100 text-red-700 border-red-300 hover:bg-red-200 hover:border-red-400"); break;
        case "amber":
          map.set(p.name, "bg-amber-100 text-amber-700 border-amber-200 hover:bg-amber-200 hover:border-amber-300"); break;
        case "purple":
          map.set(p.name, "bg-purple-100 text-purple-700 border-purple-200 hover:bg-purple-200 hover:border-purple-300"); break;
        default:
          map.set(p.name, "bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-200 hover:border-blue-300");
      }
    }
    return map;
  }, [projects]);

  const projectHexMap = useMemo(() => {
    const map = new Map<string, string>();
    for (const p of projects) {
      map.set(p.name, PROJECT_HEX[p.color] || PROJECT_HEX.blue);
    }
    return map;
  }, [projects]);

  const isPastDay = (date: Date) => {
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);
    return date < startOfToday;
  };

  const selectedDayEvents = eventsByDate.get(toISODate(selectedMobileDate)) ?? [];

  const handleDayOffClick = useCallback(
    (e: React.MouseEvent, date: Date) => {
      e.stopPropagation();
      if (isPastDay(date)) return;

      if (isStaff && user) {
        const key = toISODate(date);
        const existing = dayOffsByDate
          .get(key)
          ?.find((d) => d.userId === user.id);
        if (existing) {
          deleteDayOff.mutate(existing.id);
        } else {
          createDayOff.mutate({ date: key });
        }
        return;
      }

      if (isManagerOrAdmin) {
        setDayOffModalDate(date);
      }
    },
    [
      isStaff,
      isManagerOrAdmin,
      user,
      dayOffsByDate,
      createDayOff,
      deleteDayOff,
    ],
  );

  const pressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const longPressFired = useRef(false);

  const startLongPress = useCallback(
    (day: Date) => {
      longPressFired.current = false;
      pressTimer.current = setTimeout(() => {
        longPressFired.current = true;
        if ("vibrate" in navigator) navigator.vibrate(15);
        if (isPastDay(day)) return;
        if (isStaff && user) {
          const key = toISODate(day);
          const existing = dayOffsByDate
            .get(key)
            ?.find((d) => d.userId === user.id);
          if (existing) deleteDayOff.mutate(existing.id);
          else createDayOff.mutate({ date: key });
        } else if (isManagerOrAdmin) {
          setDayOffModalDate(day);
        }
      }, 550);
    },
    [
      isStaff,
      isManagerOrAdmin,
      user,
      dayOffsByDate,
      createDayOff,
      deleteDayOff,
    ],
  );

  const cancelLongPress = useCallback(() => {
    if (pressTimer.current) clearTimeout(pressTimer.current);
  }, []);

  const handleMobileDayTap = useCallback((day: Date) => {
    if (longPressFired.current) {
      longPressFired.current = false;
      return;
    }
    setSelectedMobileDate(day);
  }, []);

  const handleToggleStaffDayOff = useCallback(
    (targetUserId: string, existingId?: string) => {
      if (existingId) {
        deleteDayOff.mutate(existingId);
      } else if (dayOffModalDate) {
        createDayOff.mutate({
          date: toISODate(dayOffModalDate),
          userId: targetUserId,
        });
      }
    },
    [dayOffModalDate, createDayOff, deleteDayOff],
  );

  const monthNames = [
    "Січень",
    "Лютий",
    "Березень",
    "Квітень",
    "Травень",
    "Червень",
    "Липень",
    "Серпень",
    "Вересень",
    "Жовтень",
    "Листопад",
    "Грудень",
  ];

  const shadeHex = (hex: string, percent: number) => {
    const n = parseInt(hex.replace("#", ""), 16);
    const r = Math.min(255, Math.max(0, (n >> 16) + percent));
    const g = Math.min(255, Math.max(0, ((n >> 8) & 0xff) + percent));
    const b = Math.min(255, Math.max(0, (n & 0xff) + percent));
    return `rgb(${r}, ${g}, ${b})`;
  };

  const getDayColor = (dayEvents: Event[]) => {
    if (dayEvents.length === 0) return undefined;
    const counts = new Map<string, number>();
    for (const ev of dayEvents) {
      const hex = projectHexMap.get(ev.project) ?? PROJECT_HEX.blue;
      counts.set(hex, (counts.get(hex) || 0) + 1);
    }
    const total = dayEvents.length;
    if (counts.size === 1) {
      const [hex] = counts.keys();
      return `linear-gradient(to bottom, ${shadeHex(hex, 35)}, ${shadeHex(hex, -25)})`;
    }
    let acc = 0;
    const stops: string[] = [];
    for (const [hex, count] of counts) {
      const start = (acc / total) * 100;
      acc += count;
      const end = (acc / total) * 100;
      stops.push(`${shadeHex(hex, 35)} ${start}%`);
      stops.push(`${shadeHex(hex, -25)} ${end}%`);
    }
    return `linear-gradient(to bottom, ${stops.join(", ")})`;
  };

  if (isLoading)
    return (
      <div className="p-4 md:p-8 bg-slate-50 min-h-screen pb-24 animate-pulse">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <div className="h-8 w-52 bg-slate-200 rounded-xl mb-2" />
            <div className="h-4 w-72 bg-slate-200 rounded-lg mb-4" />
            <div className="flex gap-3 mt-4">
              {[80, 100, 90].map((w, i) => (
                <div
                  key={i}
                  className="h-4 bg-slate-200 rounded-full"
                  style={{ width: w }}
                />
              ))}
            </div>
          </div>
          <div className="h-10 w-48 bg-slate-200 rounded-xl" />
        </div>

        <div className="bg-white rounded-[24px] border border-slate-100 overflow-hidden">
          <div className="flex items-center justify-between p-5 md:p-6 border-b border-slate-100">
            <div className="h-8 w-36 bg-slate-200 rounded-xl" />
            <div className="h-10 w-44 bg-slate-200 rounded-2xl" />
          </div>

          <div className="grid grid-cols-7 bg-slate-50/50">
            {["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд"].map((d) => (
              <div key={d} className="py-3 flex justify-center">
                <div className="h-3 w-6 bg-slate-200 rounded" />
              </div>
            ))}

            {Array.from({ length: 35 }).map((_, i) => (
              <div
                key={i}
                className="min-h-[80px] md:min-h-[120px] border-b border-r border-slate-100 p-2"
              >
                <div className="flex justify-end mb-2">
                  <div className="w-7 h-7 rounded-full bg-slate-200" />
                </div>
                {i % 4 === 0 && (
                  <div className="h-5 bg-slate-100 rounded-md mb-1.5 mx-0.5" />
                )}
                {i % 7 === 2 && (
                  <div className="h-5 bg-slate-100 rounded-md mx-0.5" />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 md:hidden">
          <div className="h-6 w-40 bg-slate-200 rounded-lg mb-3" />
          <div className="space-y-3">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="bg-white p-4 rounded-2xl border-l-4 border-l-slate-200 shadow-sm"
              >
                <div className="flex justify-between mb-2">
                  <div className="h-5 w-20 bg-slate-200 rounded" />
                  <div className="h-5 w-28 bg-slate-200 rounded" />
                </div>
                <div className="h-5 w-48 bg-slate-200 rounded mb-1" />
                <div className="h-4 w-36 bg-slate-200 rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );

  return (
    <div className="p-4 md:p-8 bg-slate-50 min-h-screen pb-24">
      <style>{`
        @keyframes dayOffPop {
          0% { transform: scale(0.7); opacity: 0; }
          60% { transform: scale(1.15); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        .dayoff-cell-enter {
          animation: dayOffPop 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>

      {/* Шапка календаря */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
            Календар подій
          </h1>
          <p className="text-slate-500 mt-1 text-sm">
            Графік запланованих та активних заходів
          </p>

          <div className="hidden md:flex flex-wrap items-center gap-3 mt-4">
            {projects.map((p: Project) => {
              const badgeColor =
                {
                  blue: "bg-blue-400",
                  emerald: "bg-emerald-400",
                  rose: "bg-rose-400",
                  red: "bg-red-500",
                  amber: "bg-amber-400",
                  purple: "bg-purple-400",
                }[p.color] || "bg-blue-400";

              return (
                <span
                  key={p.id}
                  className="flex items-center gap-1.5 text-xs font-medium text-slate-600"
                >
                  <span className={`w-3 h-3 rounded-full ${badgeColor}`}></span>{" "}
                  {p.name}
                </span>
              );
            })}
            <span className="flex items-center gap-1.5 text-xs font-medium text-slate-600">
              <span className="w-3 h-3 rounded-full bg-rose-500"></span>{" "}
              Вихідний
            </span>
          </div>
        </div>

        {userRole === "SUPERADMIN" && (
          <div className="hidden md:flex bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-200 items-center gap-3 shrink-0">
            <span className="text-sm text-slate-500 font-medium">Місто:</span>
            <select
              value={filterCityId}
              onChange={(e) => setFilterCityId(e.target.value)}
              className="text-sm font-semibold text-slate-800 outline-none cursor-pointer bg-transparent"
            >
              <option value="ALL">🌍 Всі міста</option>
              {cities.map((c: City) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      <div className="bg-white rounded-[24px] shadow-sm border border-slate-100 overflow-hidden flex flex-col">
        <div className="flex items-center justify-center p-5 md:p-6 border-b border-slate-100 bg-white">
          <div className="flex items-center gap-1.5 bg-slate-50 p-1.5 rounded-2xl border border-slate-100">
            <button
              onClick={prevMonth}
              className="px-3 md:px-4 py-2 rounded-xl hover:bg-white hover:shadow-sm text-slate-600 transition-all font-medium"
            >
              ◀
            </button>
            <span className="px-4 md:px-6 py-2 text-slate-800 font-bold capitalize tracking-tight">
              {monthNames[month]}{" "}
              <span className="text-slate-400 font-medium">{year}</span>
            </span>
            <button
              onClick={nextMonth}
              className="px-3 md:px-4 py-2 rounded-xl hover:bg-white hover:shadow-sm text-slate-600 transition-all font-medium"
            >
              ▶
            </button>
          </div>
        </div>

        <div className="hidden md:grid grid-cols-7 bg-slate-50/50">
          {["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд"].map((dayName) => (
            <div
              key={dayName}
              className="py-3 text-center text-[10px] md:text-xs font-bold tracking-widest text-slate-400 uppercase border-b border-slate-100"
            >
              {dayName}
            </div>
          ))}

          {days.map((day, idx) => {
            const isToday =
              day && day.toDateString() === new Date().toDateString();
            const isSelected =
              day && day.toDateString() === selectedMobileDate.toDateString();
            const dayKey = day ? toISODate(day) : "";
            const dayEvents = day ? (eventsByDate.get(dayKey) ?? []) : [];
            const dayOffEntries = day ? (dayOffsByDate.get(dayKey) ?? []) : [];

            const myDayOff = isStaff
              ? dayOffEntries.find((d) => d.userId === user?.id)
              : undefined;
            const hasAnyDayOff = isStaff
              ? !!myDayOff
              : dayOffEntries.length > 0;

            const showCross =
              day && !isPastDay(day) && (isStaff || isManagerOrAdmin);

            return (
              <div
                key={idx}
                onClick={() => day && setSelectedMobileDate(day)}
                className={`min-h-[80px] md:min-h-[120px] border-b border-r border-slate-100 p-1 md:p-2 transition-colors relative group
                  ${day ? "bg-white hover:bg-slate-50 cursor-pointer" : "bg-slate-50/30"}
                  ${isSelected ? "ring-2 ring-inset ring-blue-500/20 bg-blue-50/10" : ""}
                  ${hasAnyDayOff ? "dayoff-cell-enter bg-rose-50/70" : ""}
                `}
              >
                {day && (
                  <>
                    {showCross && (
                      <div className="absolute top-1 left-1 z-10 group/dayoff">
                        <button
                          onClick={(e) => handleDayOffClick(e, day)}
                          title={
                            hasAnyDayOff
                              ? "Скасувати вихідний"
                              : "Призначити вихідний"
                          }
                          className={`w-5 h-5 md:w-6 md:h-6 rounded-full flex items-center justify-center text-[10px] md:text-xs font-bold transition-all
                            ${
                              hasAnyDayOff
                                ? "bg-rose-500 text-white shadow-sm hover:bg-rose-600"
                                : "bg-slate-100 text-slate-400 opacity-0 group-hover:opacity-100 hover:bg-rose-100 hover:text-rose-500"
                            }`}
                        >
                          ✕
                        </button>

                        {isManagerOrAdmin && dayOffEntries.length > 0 && (
                          <div className="hidden md:block absolute top-full left-0 mt-2 w-48 bg-slate-800 text-white p-2.5 rounded-xl shadow-2xl opacity-0 invisible group-hover/dayoff:opacity-100 group-hover/dayoff:visible transition-all duration-200 pointer-events-none">
                            <p className="text-[10px] uppercase tracking-wide text-slate-400 mb-1.5">
                              Вихідний ({dayOffEntries.length})
                            </p>
                            <div className="space-y-1">
                              {dayOffEntries.map((d: DayOff) => {
                                const u = allUsers.find(
                                  (au: User) => au.id === d.userId,
                                );
                                return (
                                  <p
                                    key={d.id}
                                    className="text-xs font-medium truncate"
                                  >
                                    {u
                                      ? `${ROLE_ICON_MAP[u.role] || "👤"} ${u.name}`
                                      : "Невідомий"}
                                  </p>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    <div className="flex justify-center md:justify-end mb-1.5">
                      <span
                        className={`w-7 h-7 flex items-center justify-center rounded-full text-xs md:text-sm font-semibold transition-colors
                        ${isToday ? "bg-blue-600 text-white shadow-md" : "text-slate-500 md:group-hover:text-blue-600"}
                      `}
                      >
                        {day.getDate()}
                      </span>
                    </div>

                    {hasAnyDayOff && !isStaff && dayOffEntries.length > 0 && (
                      <p className="text-[9px] md:text-[10px] text-rose-600 font-semibold text-center mb-1 truncate px-1">
                        🌴 {dayOffEntries.length}{" "}
                        {dayOffEntries.length === 1 ? "вихідний" : "вихідних"}
                      </p>
                    )}

                    <div className="space-y-1.5">
                      {dayEvents.slice(0, 3).map((ev: Event) => (
                        <div
                          key={ev.id}
                          className="relative group/event z-0 hover:z-50"
                        >
                          <button
                            className={`w-full px-1.5 py-1 text-center md:text-left rounded-md border text-[10px] md:text-xs font-bold transition-all shadow-sm ${projectColorMap.get(ev.project) ?? "bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-200 hover:border-blue-300"}`}
                          >
                            {ev.time || "—"}
                          </button>

                          <div className="hidden md:block absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 bg-slate-800 text-white p-3 rounded-xl shadow-2xl opacity-0 invisible group-hover/event:opacity-100 group-hover/event:visible transition-all duration-200 pointer-events-none">
                            <p className="font-bold text-sm mb-1 truncate">
                              {ev.school?.name || "Невідомий заклад"}
                            </p>
                            <div className="space-y-1 text-xs text-slate-300">
                              <p>
                                <span className="text-slate-400">Проєкт:</span>{" "}
                                {ev.project}
                              </p>
                              <p>
                                <span className="text-slate-400">Екіпаж:</span>{" "}
                                {ev.crew?.name || "Не призначено"}
                              </p>
                              <p>
                                <span className="text-slate-400">Час:</span>{" "}
                                <span className="font-bold text-white">
                                  {ev.time || "—"}
                                </span>
                              </p>
                            </div>
                            <div className="absolute top-full left-1/2 -translate-x-1/2 border-[6px] border-transparent border-t-slate-800"></div>
                          </div>
                        </div>
                      ))}
                      {dayEvents.length > 3 && (
                        <p className="text-[9px] md:text-[10px] font-bold text-slate-400 text-center">
                          +{dayEvents.length - 3} ще
                        </p>
                      )}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="md:hidden mt-4">
        <div className="bg-white rounded-[24px] shadow-sm border border-slate-100 overflow-hidden">
          <div className="flex items-center justify-between px-3 py-3.5 border-b border-slate-100">
            <button
              onClick={prevMonth}
              className="w-8 h-8 flex items-center justify-center rounded-full text-slate-400 active:bg-slate-100 transition-colors"
            >
              ‹
            </button>
            <span className="text-base font-bold text-slate-800 capitalize">
              {monthNames[month]}{" "}
              <span className="text-slate-400 font-medium">{year}</span>
            </span>
            <button
              onClick={nextMonth}
              className="w-8 h-8 flex items-center justify-center rounded-full text-slate-400 active:bg-slate-100 transition-colors"
            >
              ›
            </button>
          </div>

          <div className="grid grid-cols-7 px-2 pt-2">
            {["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд"].map((dayName) => (
              <div
                key={dayName}
                className="text-center text-[10px] font-bold tracking-wide text-slate-400 uppercase pb-1.5"
              >
                {dayName}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-y-1.5 px-2 pb-3">
            {days.map((day, idx) => {
              const isToday =
                day && day.toDateString() === new Date().toDateString();
              const isSelected =
                day && day.toDateString() === selectedMobileDate.toDateString();
              const dayKey = day ? toISODate(day) : "";
              const dayEvents = day ? (eventsByDate.get(dayKey) ?? []) : [];
              const dayOffEntries = day
                ? (dayOffsByDate.get(dayKey) ?? [])
                : [];
              const dayColor = day ? getDayColor(dayEvents) : undefined;

              return (
                <div
                  key={idx}
                  className="flex items-center justify-center py-0.5"
                >
                  {day && (
                    <button
                      onTouchStart={() => startLongPress(day)}
                      onTouchEnd={() => {
                        cancelLongPress();
                        handleMobileDayTap(day);
                      }}
                      onTouchMove={cancelLongPress}
                      onContextMenu={(e) => e.preventDefault()}
                      onClick={() => handleMobileDayTap(day)}
                      className={`relative w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold transition-transform active:scale-90
                        ${isSelected ? "ring-2 ring-blue-600 ring-offset-2" : ""}
                        ${isToday && !isSelected ? "ring-2 ring-blue-200" : ""}
                      `}
                      style={{
                        background: dayColor || "#f1f5f9",
                        color: dayColor ? "#fff" : "#64748b",
                        textShadow: dayColor
                          ? "0 1px 2px rgba(0,0,0,0.35)"
                          : "none",
                      }}
                    >
                      {day.getDate()}
                      {dayOffEntries.length > 0 && (
                        <span className="pointer-events-none absolute -top-2.5 -right-2.5 w-3.5 h-3.5 rounded-full bg-rose-500 border-2 border-white flex items-center justify-center">
                          <span className="text-white text-[6px] font-bold leading-none">
                            ✕
                          </span>
                        </span>
                      )}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5 mt-3 px-1">
          {projects.map((p: Project) => (
            <span
              key={p.id}
              className="flex items-center gap-1 text-[10px] font-medium text-slate-500"
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{
                  background: PROJECT_HEX[p.color] || PROJECT_HEX.blue,
                }}
              />
              {p.name}
            </span>
          ))}
          <span className="flex items-center gap-1 text-[10px] font-medium text-slate-500">
            <span className="w-2 h-2 rounded-full bg-rose-500" />
            Вихідний
          </span>

          {userRole === "SUPERADMIN" && (
            <select
              value={filterCityId}
              onChange={(e) => setFilterCityId(e.target.value)}
              className="ml-auto text-[11px] font-semibold text-slate-700 outline-none bg-slate-50 border border-slate-200 rounded-lg px-2 py-1"
            >
              <option value="ALL">🌍 Всі міста</option>
              {cities.map((c: City) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          )}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={toISODate(selectedMobileDate)}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="mt-4"
          >
            <h3 className="text-sm font-bold text-slate-800 mb-2.5">
              {selectedMobileDate.toLocaleDateString("uk-UA", {
                day: "2-digit",
                month: "long",
                weekday: "long",
              })}
            </h3>

            {(() => {
              const key = toISODate(selectedMobileDate);
              const dayOffEntries = dayOffsByDate.get(key) ?? [];
              if (dayOffEntries.length === 0) return null;
              return (
                <div className="mb-3 flex flex-wrap gap-1.5">
                  {dayOffEntries.map((d: DayOff) => {
                    const u = allUsers.find((au: User) => au.id === d.userId);
                    return (
                      <span
                        key={d.id}
                        className="text-[11px] font-semibold text-rose-600 bg-rose-50 border border-rose-100 px-2 py-1 rounded-full"
                      >
                        🌴 {u?.name || "Вихідний"}
                      </span>
                    );
                  })}
                </div>
              );
            })()}

            {selectedDayEvents.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-100 p-8 text-center text-slate-400 text-sm">
                На цей день подій не заплановано
              </div>
            ) : (
              <div className="space-y-3">
                {selectedDayEvents.map((ev: Event) => (
                  <div
                    key={ev.id}
                    onClick={() =>
                      ev.school && navigate(`/schools/${ev.school.id}`)
                    }
                    className="bg-white p-4 rounded-2xl border-l-4 shadow-sm active:scale-[0.98] transition-transform cursor-pointer"
                    style={{ borderLeftColor: projectHexMap.get(ev.project) ?? PROJECT_HEX.blue }}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs font-bold px-2.5 py-1 rounded bg-slate-100 text-slate-600">
                        🕒 {ev.time || "Не вказано"}
                      </span>
                      <span className="text-xs font-medium text-slate-500">
                        {ev.project}
                      </span>
                    </div>
                    <p className="font-bold text-slate-800">
                      {ev.school?.name}
                    </p>
                    <p className="text-sm text-slate-500 mt-1">
                      🚐 Екіпаж: {ev.crew?.name || "Не призначено"}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <DayOffModal
        isOpen={!!dayOffModalDate}
        onClose={() => setDayOffModalDate(null)}
        date={dayOffModalDate}
        staff={staffForModal}
        dayOffs={
          dayOffModalDate
            ? (dayOffsByDate.get(toISODate(dayOffModalDate)) ?? [])
            : []
        }
        onToggle={handleToggleStaffDayOff}
      />
    </div>
  );
}

```

# FILE: apps/frontend/src/pages/Cities.tsx

```
import React, { useState, useCallback, lazy, Suspense } from "react";
import { createPortal } from "react-dom";
import { useSelectedCity } from "../context/CityContext";
import { useCities, useAddCity } from "../hooks/useApi";
import { useAuth } from "../context/AuthContext";

const IssueCarousel = lazy(() => import("../components/IssueCarousel"));
const CityMobileHeader = lazy(
  () => import("../components/cities/CityMobileHeader"),
);
const CityMobileList = lazy(
  () => import("../components/cities/CityMobileList"),
);
const CityDesktopGrid = lazy(
  () => import("../components/cities/CityDesktopGrid"),
);

const CitiesSkeleton = () => (
  <div className="w-full animate-pulse">
    {/* Мобільний скелетон */}
    <div className="md:hidden flex flex-col gap-4 mt-4">
      <div className="h-28 bg-slate-200 rounded-2xl w-full"></div>
      <div className="h-16 bg-slate-200 rounded-2xl w-full"></div>
      <div className="h-16 bg-slate-200 rounded-2xl w-full"></div>
    </div>
    {/* Десктопний скелетон */}
    <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-2xl shadow-sm border border-slate-100 h-72 overflow-hidden"
        >
          <div className="h-44 bg-slate-200 w-full"></div>
          <div className="p-5 flex flex-col gap-3">
            <div className="h-6 bg-slate-200 rounded w-1/2"></div>
            <div className="h-4 bg-slate-200 rounded w-3/4 mt-2"></div>
            <div className="h-10 bg-slate-200 rounded w-full mt-auto"></div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default function Cities() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCityName, setNewCityName] = useState("");

  const { selectedCity, setSelectedCity } = useSelectedCity();
  const { data: cities = [], isLoading: isFetching } = useCities();
  const addCity = useAddCity();

  const handleSelectCity = useCallback(
    (city: any) => {
      setSelectedCity(city);
    },
    [setSelectedCity],
  );
  const { user } = useAuth();
  const userRole = user?.role ?? null;
  const handleAddCity = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCityName.trim()) return;
    try {
      await addCity.mutateAsync(newCityName.trim());
      setNewCityName("");
      setIsModalOpen(false);
    } catch (err: any) {
      alert(
        `DEBUG\nстатус: ${err?.response?.status}\nтіло: ${JSON.stringify(err?.response?.data)}\ncookie: ${document.cookie}`,
      );
    }
  };

  return (
    <div
      className="p-4 md:p-8 bg-slate-50 min-h-screen"
      style={{ contentVisibility: "auto" }}
    >
      {/* Шапка для ПК */}
      <style>{`
        @keyframes headerFadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .header-enter { animation: headerFadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) both; }
        .header-btn-enter { animation: headerFadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both; }
      `}</style>
      <div className="hidden md:flex justify-between items-center mb-8">
        <h1 className="header-enter text-3xl font-bold text-slate-800">
          Міста
        </h1>
        {userRole === "SUPERADMIN" && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="header-btn-enter bg-blue-600 hover:bg-blue-700 active:scale-95 text-white px-5 py-2.5 rounded-lg font-medium shadow-sm flex items-center transition-all duration-150"
          >
            <span className="mr-2">+</span> Додати місто
          </button>
        )}
      </div>

      {isFetching ? (
        <CitiesSkeleton />
      ) : (
        /* Оптимізація 6: Suspense обгортка для лінивих компонентів */
        <Suspense fallback={<CitiesSkeleton />}>
          {/* 1. Блок для Мобільних (Шапка + Список) */}
          <div className="md:hidden">
            <CityMobileHeader selectedCity={selectedCity} cities={cities} />
            <CityMobileList
              cities={cities}
              selectedCity={selectedCity}
              onSelectCity={handleSelectCity}
            />
          </div>

          {/* 2. Блок для Десктопів (Карусель + Сітка) */}
          <div className="hidden md:block">
            <IssueCarousel />
            <CityDesktopGrid
              cities={cities}
              selectedCity={selectedCity}
              onSelectCity={handleSelectCity}
            />
          </div>
        </Suspense>
      )}

      {/* Мобільна плаваюча кнопка FAB */}
      {userRole === "SUPERADMIN" && (
        <button
          onClick={() => setIsModalOpen(true)}
          className="md:hidden fixed bottom-6 right-6 w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center text-3xl z-40 active:scale-95 transition-transform opacity-0"
          style={{
            animation:
              "fabPop 0.4s cubic-bezier(0.175,0.885,0.32,1.275) 0.2s forwards",
          }}
          aria-label="Додати місто"
        >
          <style>{`
            @keyframes fabPop {
              from { opacity: 0; transform: scale(0.5) translateY(20px); }
              to { opacity: 1; transform: scale(1) translateY(0); }
            }
          `}</style>
          +
        </button>
      )}

      {/* Модалка додавання */}
      {isModalOpen &&
        createPortal(
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[9999] flex items-center justify-center p-4 opacity-0"
            style={{ animation: "fadeIn 0.2s ease-out forwards" }}
          >
            <style>{`
            @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            @keyframes modalScale {
              from { opacity: 0; transform: scale(0.95) translateY(15px); }
              to { opacity: 1; transform: scale(1) translateY(0); }
            }
          `}</style>

            {/* ТУТ БУЛА ПРОБЛЕМА: додано opacity-0 та style з анімацією modalScale */}
            <div
              className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden opacity-0"
              style={{ animation: "modalScale 0.3s ease-out forwards" }}
            >
              <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                <h3 className="text-xl font-bold text-slate-800">Нове місто</h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-slate-400 hover:text-slate-600 text-xl leading-none p-2 -mr-2 transition-colors"
                >
                  ✕
                </button>
              </div>
              <form onSubmit={handleAddCity} className="p-6">
                <input
                  type="text"
                  value={newCityName}
                  onChange={(e) => setNewCityName(e.target.value)}
                  placeholder="Наприклад: Львів"
                  className="w-full p-3 mb-6 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-shadow"
                  autoFocus
                  required
                />
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 bg-slate-100 text-slate-600 py-3 rounded-xl font-medium hover:bg-slate-200 transition-colors"
                  >
                    Скасувати
                  </button>
                  <button
                    type="submit"
                    disabled={addCity.isPending}
                    className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors"
                  >
                    {addCity.isPending ? "Збереження..." : "Зберегти"}
                  </button>
                </div>
              </form>
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}

```

# FILE: apps/frontend/src/pages/CityProfile.tsx

```
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { lazy, Suspense } from "react";
const CityAnalytics = lazy(
  () => import("../components/city-profile/CityAnalytics"),
);
import PhoneLink from "../components/PhoneLink";
import type { Event, Crew, CityProfile as CityProfileType } from "../types";
import OptimizedImage from "../components/ui/OptimizedImage";
import { useCity, useCreateCrew, useDeleteCrew } from "../hooks/useCities";
import { useUsers } from "../hooks/useEmployees";

type Tab = "events" | "crews" | "analytics";

export default function CityProfile() {
  const { id } = useParams();
  const { data: city, isLoading } = useCity(id);
  const { data: users = [] } = useUsers();
  const createCrew = useCreateCrew(id);
  const deleteCrew = useDeleteCrew(id);

  const [activeTab, setActiveTab] = useState<Tab>("crews");
  const [selectedReportEvent, setSelectedReportEvent] = useState<any>(null);
  const [isCreateCrewModalOpen, setIsCreateCrewModalOpen] = useState(false);
  const [completedSearchQuery, setCompletedSearchQuery] = useState("");
  const [crewForm, setCrewForm] = useState({
    name: "",
    hostId: "",
    driverId: "",
  });

  const handleCreateCrew = (e: React.FormEvent) => {
    e.preventDefault();
    if (!crewForm.hostId || !crewForm.driverId)
      return alert("Оберіть ведучого та водія!");
    setIsCreateCrewModalOpen(false);
    createCrew.mutate(crewForm);
  };

  const handleDeleteCrew = (crewId: string) => {
    if (!window.confirm("Видалити екіпаж?")) return;
    deleteCrew.mutate(crewId);
  };

  if (isLoading)
    return <div className="p-8 text-slate-500">Завантаження...</div>;
  if (!city) return <div className="p-8 text-slate-500">Місто не знайдено</div>;

  const completedEvents: Event[] = city.events || [];
  const filteredCompletedEvents = completedEvents.filter((ev) =>
    (ev.school?.name || "")
      .toLowerCase()
      .includes(completedSearchQuery.trim().toLowerCase()),
  );
  const crews: Crew[] = city.crews || [];
  const manager = city.manager;

  const busyUserIds = crews.flatMap((c: any) => [c.hostId, c.driverId]);
  const availableHosts = users.filter(
    (u) =>
      u.role === "HOST" &&
      u.city?.id === city.id &&
      !busyUserIds.includes(u.id),
  );
  const availableDrivers = users.filter(
    (u) =>
      u.role === "DRIVER" &&
      u.city?.id === city.id &&
      !busyUserIds.includes(u.id),
  );

  const totalChildren = completedEvents.reduce(
    (sum, ev) => sum + (ev.report?.childrenCount || ev.childrenPlanned || 0),
    0,
  );
  const totalRevenue = completedEvents.reduce(
    (sum, ev) => sum + (ev.report?.totalSum || ev.price || 0),
    0,
  );
  const totalProfit = completedEvents.reduce(
    (sum, ev) => sum + (ev.report?.remainderSum || 0),
    0,
  );
  const fmt = (n: number) =>
    new Intl.NumberFormat("uk-UA").format(Math.round(n));

  const TABS: { key: Tab; label: string; icon: string }[] = [
    { key: "events", label: "Події", icon: "📅" },
    { key: "crews", label: "Екіпажі", icon: "🚐" },
    { key: "analytics", label: "Аналітика", icon: "📊" },
  ];

  return (
    <div className="p-4 md:p-8 bg-slate-50 min-h-screen">
      <div className="text-sm text-slate-500 mb-6">
        <Link to="/cities" className="hover:text-blue-600 transition-colors">
          Міста
        </Link>
        <span className="mx-2">›</span>
        <span className="text-slate-800 font-medium">{city.name}</span>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          <div className="flex items-center gap-4 min-w-[220px]">
            <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg shrink-0">
              {manager?.name?.charAt(0) ?? "?"}
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium uppercase tracking-wide mb-0.5">
                Менеджер
              </p>
              <p className="font-bold text-slate-800">{manager?.name ?? "—"}</p>
              <p className="text-sm text-slate-500">
                <PhoneLink phone={manager?.phone} />
              </p>
            </div>
          </div>
          <div className="hidden md:block w-px h-16 bg-slate-100" />
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-x-6 gap-y-4 sm:gap-8 flex-1">
            <Stat label="Закладів" value={city.schools?.length ?? 0} />
            <Stat label="Проведено подій" value={completedEvents.length} />
            <Stat label="Охоплено дітей" value={fmt(totalChildren)} />
            <Stat label="Виручка" value={`${fmt(totalRevenue)} грн`} />
            <Stat label="Прибуток" value={`${fmt(totalProfit)} грн`} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 sm:flex sm:w-fit gap-1 bg-white rounded-xl p-1 border border-slate-100 shadow-sm mb-6">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex items-center justify-center sm:justify-start gap-1.5 sm:gap-2 px-2 sm:px-5 py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
              activeTab === tab.key
                ? "bg-blue-600 text-white shadow-sm"
                : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
            }`}
          >
            <span>{tab.icon}</span>{" "}
            <span className="truncate">{tab.label}</span>
          </button>
        ))}
      </div>

      {activeTab === "events" && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-6 border-b border-slate-100 bg-slate-50/50">
            <h3 className="font-bold text-slate-800 mb-4">
              Завершені події ({completedEvents.length})
            </h3>
            <input
              type="text"
              value={completedSearchQuery}
              onChange={(e) => setCompletedSearchQuery(e.target.value)}
              placeholder="Пошук за назвою закладу..."
              className="w-full sm:max-w-xs p-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {filteredCompletedEvents.length === 0 ? (
            <div className="p-12 text-center text-slate-400">
              <p className="text-4xl mb-3">📭</p>
              <p className="font-medium">
                {completedSearchQuery
                  ? "Нічого не знайдено"
                  : "Завершених подій ще немає"}
              </p>
            </div>
          ) : (
            <>
              <div className="md:hidden divide-y divide-slate-50">
                {filteredCompletedEvents.map((ev) => (
                  <div
                    key={ev.id}
                    onClick={() => setSelectedReportEvent(ev)}
                    className="flex items-center justify-between gap-3 p-4 active:bg-slate-50 cursor-pointer"
                  >
                    <div className="min-w-0">
                      <p className="font-medium text-blue-600 truncate">
                        {ev.school?.name}
                      </p>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {ev.project} ·{" "}
                        {new Date(ev.date).toLocaleDateString("uk-UA")}
                      </p>
                      <p className="text-xs text-slate-500 mt-1">
                        👶{" "}
                        {ev.report?.childrenCount || ev.childrenPlanned || "—"}{" "}
                        дітей
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="font-semibold text-slate-800 text-sm">
                        {fmt(ev.report?.totalSum || ev.price || 0)} грн
                      </p>
                      <p className="text-xs font-medium text-emerald-600 mt-0.5">
                        +{fmt(ev.report?.remainderSum || 0)} грн
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="bg-white border-b border-slate-100 text-slate-500 text-xs font-semibold uppercase tracking-wider">
                      <th className="p-4">Заклад</th>
                      <th className="p-4">Проєкт</th>
                      <th className="p-4">Дата</th>
                      <th className="p-4">Дітей</th>
                      <th className="p-4">Виручка</th>
                      <th className="p-4">Прибуток</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCompletedEvents.map((ev) => (
                      <tr
                        key={ev.id}
                        onClick={() => setSelectedReportEvent(ev)}
                        className="border-b border-slate-50 hover:bg-slate-50 transition-colors cursor-pointer"
                      >
                        <td className="p-4">
                          <span className="font-medium text-blue-600">
                            {ev.school?.name}
                          </span>
                          <p className="text-xs text-slate-400">
                            {ev.school?.type}
                          </p>
                        </td>
                        <td className="p-4 text-slate-700">{ev.project}</td>
                        <td className="p-4 text-slate-600">
                          {new Date(ev.date).toLocaleDateString("uk-UA")}
                        </td>
                        <td className="p-4 font-medium">
                          {ev.report?.childrenCount ||
                            ev.childrenPlanned ||
                            "—"}
                        </td>
                        <td className="p-4 font-medium text-slate-800">
                          {fmt(ev.report?.totalSum || ev.price || 0)} грн
                        </td>
                        <td className="p-4 font-medium text-emerald-600">
                          {fmt(ev.report?.remainderSum || 0)} грн
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      )}

      {/* Вкладка ЕКІПАЖІ з новим дизайном */}
      {activeTab === "crews" && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-white">
            <h3 className="text-xl font-bold text-slate-800">
              Екіпажі - {city.name}
            </h3>
            <button
              onClick={() => {
                setCrewForm({
                  name: `Екіпаж №${crews.length + 1}`,
                  hostId: "",
                  driverId: "",
                });
                setIsCreateCrewModalOpen(true);
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-sm"
            >
              + Додати екіпаж
            </button>
          </div>

          {crews.length === 0 ? (
            <div className="p-12 text-center text-slate-400">
              <p className="text-4xl mb-3">🚐</p>
              <p className="font-medium">Екіпажів ще немає</p>
            </div>
          ) : (
            <>
              {/* Мобільний вигляд */}
              <div className="md:hidden divide-y divide-slate-50">
                {crews.map((crew: any) => {
                  const hostObj = users.find((u) => u.id === crew.hostId);
                  const driverObj = users.find((u) => u.id === crew.driverId);
                  const carName = crew.car
                    ? crew.car.split("(")[0].trim()
                    : "—";
                  const carPlate = crew.car?.match(/\(([^)]+)\)/)?.[1] || "";
                  const eventsCount =
                    city.events?.filter((e: any) => e.crewId === crew.id)
                      .length || 0;

                  return (
                    <div key={crew.id} className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-16 h-10 rounded overflow-hidden bg-slate-100 shrink-0 shadow-sm border border-slate-200">
                            <OptimizedImage
                              src="https://images.unsplash.com/photo-1517026575980-3e1e2dedeab4?auto=format&fit=crop&q=80&w=120&h=80"
                              alt="van"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <p className="font-bold text-slate-800">
                            {crew.name}
                          </p>
                        </div>
                        <span className="bg-emerald-50 text-emerald-600 px-2.5 py-1 rounded text-xs font-medium">
                          Активний
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-y-3 text-xs mt-4">
                        <div>
                          <p className="font-medium text-slate-800">
                            {hostObj?.name || crew.host?.name || "—"}
                          </p>
                          <p className="text-slate-500 mt-0.5">
                            {hostObj?.phone || "—"}
                          </p>
                        </div>
                        <div>
                          <p className="font-medium text-slate-800">
                            {driverObj?.name || crew.driver?.name || "—"}
                          </p>
                          <p className="text-slate-500 mt-0.5">
                            {driverObj?.phone || "—"}
                          </p>
                        </div>
                        <div>
                          <p className="font-medium text-slate-800">
                            {carName}
                          </p>
                          {carPlate && (
                            <p className="text-slate-500 mt-0.5">{carPlate}</p>
                          )}
                        </div>
                        <div>
                          <p className="text-slate-500">
                            Подій:{" "}
                            <span className="font-bold text-slate-800">
                              {eventsCount}
                            </span>
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDeleteCrew(crew.id)}
                        className="w-full mt-4 py-2 border border-slate-200 text-slate-600 hover:bg-red-50 hover:text-red-600 hover:border-red-200 rounded-lg text-sm font-medium transition-colors"
                      >
                        Видалити екіпаж
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Десктоп таблиця як на дизайні */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="bg-white border-b border-slate-100 text-slate-800 font-bold">
                      <th className="p-5">Екіпаж</th>
                      <th className="p-5">Ведучий</th>
                      <th className="p-5">Водій</th>
                      <th className="p-5">Авто</th>
                      <th className="p-5">Статус</th>
                      <th className="p-5 text-center">Подій (міс.)</th>
                      <th className="p-5 text-center">Дія</th>
                    </tr>
                  </thead>
                  <tbody>
                    {crews.map((crew: any) => {
                      const hostObj = users.find((u) => u.id === crew.hostId);
                      const driverObj = users.find(
                        (u) => u.id === crew.driverId,
                      );

                      const carName = crew.car
                        ? crew.car.split("(")[0].trim()
                        : "—";
                      const carPlate =
                        crew.car?.match(/\(([^)]+)\)/)?.[1] || "";

                      const eventsCount =
                        city.events?.filter((e: any) => e.crewId === crew.id)
                          .length || 0;

                      return (
                        <tr
                          key={crew.id}
                          className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors"
                        >
                          <td className="p-5">
                            <div className="flex items-center gap-3">
                              {/* Універсальна фотографія буса */}
                              <div className="w-[60px] h-[40px] rounded border border-slate-200 overflow-hidden bg-slate-100 shrink-0 shadow-sm">
                                <OptimizedImage
                                  src="https://images.unsplash.com/photo-1517026575980-3e1e2dedeab4?auto=format&fit=crop&q=80&w=120&h=80"
                                  alt="van"
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <span className="font-bold text-slate-800">
                                {crew.name}
                              </span>
                            </div>
                          </td>
                          <td className="p-5">
                            <div className="font-medium text-slate-800">
                              {hostObj?.name || crew.host?.name || "—"}
                            </div>
                            <div className="text-xs text-slate-500 mt-1 tracking-wide">
                              {hostObj?.phone || "—"}
                            </div>
                          </td>
                          <td className="p-5">
                            <div className="font-medium text-slate-800">
                              {driverObj?.name || crew.driver?.name || "—"}
                            </div>
                            <div className="text-xs text-slate-500 mt-1 tracking-wide">
                              {driverObj?.phone || "—"}
                            </div>
                          </td>
                          <td className="p-5">
                            <div className="font-medium text-slate-600">
                              {carName}
                            </div>
                            {carPlate ? (
                              <div className="text-xs text-slate-500 mt-1 tracking-wider">
                                {carPlate}
                              </div>
                            ) : (
                              <div className="text-xs text-slate-400 mt-1">
                                —
                              </div>
                            )}
                          </td>
                          <td className="p-5">
                            <span className="bg-emerald-50 text-emerald-600 px-3 py-1.5 rounded-md text-xs font-semibold tracking-wide">
                              Активний
                            </span>
                          </td>
                          <td className="p-5 text-center font-bold text-slate-800 text-base">
                            {eventsCount}
                          </td>
                          <td className="p-5 text-center">
                            <button
                              onClick={() => handleDeleteCrew(crew.id)}
                              className="text-slate-400 hover:text-red-500 p-2 transition-colors rounded-lg hover:bg-red-50"
                              title="Видалити екіпаж"
                            >
                              🗑
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      )}

      {activeTab === "analytics" && (
        <Suspense
          fallback={
            <div className="bg-white rounded-2xl h-64 animate-pulse border border-slate-100" />
          }
        >
          <CityAnalytics events={completedEvents} />
        </Suspense>
      )}

      {/* Модалка створення екіпажу */}
      {isCreateCrewModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden flex flex-col">
            <div className="p-5 sm:p-6 border-b border-slate-100 flex justify-between bg-slate-50">
              <h3 className="text-xl font-bold text-slate-800">Новий екіпаж</h3>
              <button
                onClick={() => setIsCreateCrewModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-lg leading-none"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleCreateCrew} className="p-5 sm:p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Назва екіпажу
                </label>
                <input
                  type="text"
                  value={crewForm.name}
                  onChange={(e) =>
                    setCrewForm({ ...crewForm, name: e.target.value })
                  }
                  className="w-full p-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Ведучий
                </label>
                <select
                  value={crewForm.hostId}
                  onChange={(e) =>
                    setCrewForm({ ...crewForm, hostId: e.target.value })
                  }
                  required
                  className="w-full p-2.5 border border-slate-200 rounded-lg bg-white outline-none"
                >
                  <option value="" disabled>
                    Оберіть ведучого
                  </option>
                  {availableHosts.map((h) => (
                    <option key={h.id} value={h.id}>
                      {h.name}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-emerald-600 mt-1">
                  ✓ Доступно: {availableHosts.length} вільних
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Водій
                </label>
                <select
                  value={crewForm.driverId}
                  onChange={(e) =>
                    setCrewForm({ ...crewForm, driverId: e.target.value })
                  }
                  required
                  className="w-full p-2.5 border border-slate-200 rounded-lg bg-white outline-none"
                >
                  <option value="" disabled>
                    Оберіть водія
                  </option>
                  {availableDrivers.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name} {d.car ? `(🚗 ${d.car})` : ""}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-emerald-600 mt-1">
                  ✓ Доступно: {availableDrivers.length} вільних
                </p>
              </div>
              <div className="flex gap-3 pt-2 mt-4">
                <button
                  type="button"
                  onClick={() => setIsCreateCrewModalOpen(false)}
                  className="flex-1 px-4 py-2.5 bg-slate-100 text-slate-600 rounded-lg font-medium hover:bg-slate-200 transition-colors"
                >
                  Скасувати
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Створити
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Модальне вікно Звіту */}
      <CompletedEventModal
        isOpen={!!selectedReportEvent}
        onClose={() => setSelectedReportEvent(null)}
        event={selectedReportEvent}
      />
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div>
      <p className="text-xs text-slate-400 font-medium mb-1">{label}</p>
      <p className="text-2xl font-bold text-slate-800">{value}</p>
    </div>
  );
}

function CompletedEventModal({
  isOpen,
  onClose,
  event,
}: {
  isOpen: boolean;
  onClose: () => void;
  event: any;
}) {
  if (!isOpen || !event) return null;
  const fmt = (n: number) =>
    new Intl.NumberFormat("uk-UA").format(Math.round(n || 0));
  const report = event.report;

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center sm:p-4">
      <div className="bg-white rounded-t-3xl sm:rounded-2xl shadow-xl w-full sm:max-w-3xl overflow-hidden max-h-[92vh] flex flex-col">
        <div className="sm:hidden w-10 h-1.5 bg-slate-200 rounded-full mx-auto mt-3" />
        <div className="p-5 sm:p-6 border-b border-slate-100 flex justify-between bg-slate-50 shrink-0">
          <div>
            <h3 className="text-xl font-bold text-slate-800">
              Звіт: {event.project}
            </h3>
            <p className="text-sm text-slate-500 mt-1">
              {event.school?.name} ·{" "}
              {new Date(event.date).toLocaleDateString("uk-UA")}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-2 -mr-2 -mt-2 shrink-0 h-fit text-lg"
          >
            ✕
          </button>
        </div>
        <div className="p-5 sm:p-6 flex-1 overflow-y-auto bg-slate-50/30">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
              <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                  📊
                </span>
                Результати
              </h4>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between border-b border-slate-50 pb-2">
                  <span className="text-slate-500">Дітей (факт):</span>
                  <span className="font-bold">
                    {report?.childrenCount || 0}
                  </span>
                </div>
                <div className="flex justify-between border-b border-slate-50 pb-2">
                  <span className="text-slate-500">Класів:</span>
                  <span className="font-medium">
                    {report?.classesCount || 0}
                  </span>
                </div>
                <div className="flex justify-between border-b border-slate-50 pb-2">
                  <span className="text-slate-500">Пільговиків:</span>
                  <span className="font-medium">
                    {report?.privilegedCount || 0}
                  </span>
                </div>
                <div className="flex justify-between border-b border-slate-50 pb-2">
                  <span className="text-slate-500">Сеансів:</span>
                  <span className="font-medium">
                    {report?.showingsCount || 0}
                  </span>
                </div>
                <div className="flex justify-between pb-1">
                  <span className="text-slate-500">Оцінка:</span>
                  <span className="font-bold text-amber-500">
                    ⭐ {report?.rating || 0}/10
                  </span>
                </div>
              </div>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
              <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  💰
                </span>
                Фінанси
              </h4>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between border-b border-slate-50 pb-2">
                  <span className="text-slate-500">Загальна виручка:</span>
                  <span className="font-bold">{fmt(report?.totalSum)} грн</span>
                </div>
                <div className="flex justify-between border-b border-slate-50 pb-2">
                  <span className="text-slate-500">На заклад (20%):</span>
                  <span className="font-medium text-rose-500">
                    − {fmt(report?.schoolSum)} грн
                  </span>
                </div>
                {Array.isArray(report?.expenses) &&
                  report.expenses.length > 0 && (
                    <div className="py-2 border-b border-slate-50">
                      <span className="text-slate-500 block mb-2">
                        Додаткові витрати:
                      </span>
                      {report.expenses.map((exp: any, i: number) => (
                        <div
                          key={i}
                          className="flex justify-between text-xs mb-1 pl-2"
                        >
                          <span className="text-slate-400">
                            — {exp.name || exp.category}
                          </span>
                          <span className="text-rose-500 font-medium">
                            − {fmt(exp.amount)} грн
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                <div className="flex justify-between pt-1">
                  <span className="font-bold text-slate-800">
                    Чистий прибуток:
                  </span>
                  <span className="font-bold text-emerald-600 text-base">
                    {fmt(report?.remainderSum)} грн
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-100 shadow-sm">
            <h4 className="font-bold text-slate-800 mb-5 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-violet-50 text-violet-600 flex items-center justify-center">
                ⏳
              </span>
              Історія пайплайну
            </h4>
            {!event.history || event.history.length === 0 ? (
              <p className="text-sm text-slate-400 text-center py-4">
                Історія порожня.
              </p>
            ) : (
              <div className="space-y-4 relative before:absolute before:inset-0 before:ml-[11px] before:w-0.5 before:bg-slate-100">
                {[...event.history]
                  .sort(
                    (a, b) =>
                      new Date(a.createdAt).getTime() -
                      new Date(b.createdAt).getTime(),
                  )
                  .map((item: any) => (
                    <div key={item.id} className="relative pl-8 text-sm">
                      <div className="absolute left-1.5 w-3 h-3 rounded-full top-1 bg-violet-500 ring-4 ring-white"></div>
                      <p className="font-semibold text-slate-800">
                        {item.action}
                      </p>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        {new Date(item.createdAt).toLocaleString("uk-UA", {
                          day: "2-digit",
                          month: "2-digit",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}{" "}
                        · 👤 {item.userName}
                      </p>
                      {item.comment && (
                        <div className="mt-2 p-3 bg-slate-50/80 rounded-xl text-slate-600 italic border border-slate-100">
                          {item.comment}
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

```

