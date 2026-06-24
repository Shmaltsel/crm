import React, { useState, Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// --- СТАТИЧНІ ІМПОРТИ ---
// Ці компоненти завантажуються одразу, оскільки вони формують "скелет" додатку (меню, перевірка токена)
import Layout from "./components/Layout";
import Login from "./pages/Login";
import { CityProvider } from "./context/CityContext";

// --- ДИНАМІЧНІ ІМПОРТИ (Ледаче завантаження / Code Splitting) ---
// Ці файли будуть завантажуватись окремими шматками (chunks) ТІЛЬКИ коли користувач перейде на відповідну сторінку
const Cities = lazy(() => import("./pages/Cities"));
const Schools = lazy(() => import("./pages/Schools"));
const SchoolProfile = lazy(() => import("./pages/SchoolProfile"));
const Employees = lazy(() => import("./pages/Employees"));
const Finance = lazy(() => import("./pages/Finance"));
const CalendarView = lazy(() => import("./pages/CalendarView"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Kindergartens = lazy(() => import("./pages/Kindergartens"));

// Компонент-заглушка, який показується долі секунди, поки вантажиться JS код сторінки
const PageLoader = () => (
  <div className="flex items-center justify-center h-full min-h-[50vh]">
    <div className="text-slate-400 font-medium animate-pulse">
      Завантаження сторінки...
    </div>
  </div>
);

export default function App() {
  // Базова логіка авторизації
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!localStorage.getItem("token"),
  );

  const handleLogin = (token: string) => {
    localStorage.setItem("token", token);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <CityProvider>
        <Routes>
          {/* Публічний маршрут: Логін */}
          <Route
            path="/login"
            element={
              !isAuthenticated ? (
                <Login onLogin={handleLogin} />
              ) : (
                <Navigate to="/cities" replace />
              )
            }
          />

          {/* Захищені маршрути (Layout відображає бокове меню) */}
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <Layout onLogout={handleLogout} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          >
            {/* Редірект з кореня на сторінку міст за замовчуванням */}
            <Route index element={<Navigate to="/cities" replace />} />

            {/* Обгортаємо всі вкладені маршрути в Suspense. 
              Коли React намагається відрендерити "ліниву" сторінку, він показує fallback (PageLoader), 
              поки завантажується файл з сервера.
            */}
            <Route
              path="cities"
              element={
                <Suspense fallback={<PageLoader />}>
                  <Cities />
                </Suspense>
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
                <Suspense fallback={<PageLoader />}>
                  <Employees />
                </Suspense>
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
                <Suspense fallback={<PageLoader />}>
                  <Dashboard />
                </Suspense>
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
          </Route>
        </Routes>
      </CityProvider>
    </Router>
  );
}
