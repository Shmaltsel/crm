import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CityProvider } from "./context/CityContext";
import Layout from "./components/Layout"; // Layout залишаємо звичайним імпортом

// 1. Змінюємо імпорти сторінок на ліниві (lazy)
const Login = lazy(() => import("./pages/Login"));
const Events = lazy(() => import("./pages/Events"));
const Cities = lazy(() => import("./pages/Cities"));
const CityProfile = lazy(() => import("./pages/CityProfile"));
const Schools = lazy(() => import("./pages/Schools"));
const Kindergartens = lazy(() => import("./pages/Kindergartens"));
const SchoolProfile = lazy(() => import("./pages/SchoolProfile"));
const Employees = lazy(() => import("./pages/Employees"));
const EventReport = lazy(() => import("./pages/EventReport"));
const Finance = lazy(() => import("./pages/Finance"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const CalendarView = lazy(() => import("./pages/CalendarView"));

// 2. Створюємо компонент-спінер, який показується під час завантаження сторінки
const PageLoader = () => (
  <div className="flex h-[80vh] w-full items-center justify-center">
    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
  </div>
);

export default function App() {
  return (
    <CityProvider>
      <BrowserRouter>
        {/* 3. Обгортаємо роути у Suspense */}
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/login" element={<Login />} />

            <Route element={<Layout />}>
              <Route path="/cities" element={<Cities />} />
              <Route path="/cities/:id" element={<CityProfile />} />
              <Route path="/events/:eventId/report" element={<EventReport />} />
              <Route path="/events" element={<Events />} />
              <Route path="/schools/:id" element={<SchoolProfile />} />
              <Route path="/schools" element={<Schools />} />
              <Route path="/kindergartens" element={<Kindergartens />} />
              <Route path="/employees" element={<Employees />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/finance" element={<Finance />} />
              
              {/* Календар */}
              <Route path="/calendar" element={<CalendarView />} />
            </Route>

            {/* Якщо маршрут не знайдено - перекидаємо на логін */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </CityProvider>
  );
}
