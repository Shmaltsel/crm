import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Events from "./pages/Events";
import Cities from "./pages/Cities";
import CityProfile from "./pages/CityProfile";
import Layout from "./components/Layout";
import Schools from "./pages/Schools";
import Kindergartens from './pages/Kindergartens';
import SchoolProfile from "./pages/SchoolProfile";
import Employees from "./pages/Employees";
import EventReport from "./pages/EventReport";
import Finance from "./pages/Finance";
import { CityProvider } from "./context/CityContext";
import Dashboard from "./pages/Dashboard";
import CalendarView from './pages/CalendarView';

export default function App() {
  return (
    <CityProvider>
      <BrowserRouter>
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
            
            {/* ДОДАЄМО КАЛЕНДАР САМЕ ТУТ! Тоді він буде всередині Layout */}
            <Route path="/calendar" element={<CalendarView />} />
          </Route>

          {/* Якщо маршрут не знайдено - перекидаємо на логін */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </CityProvider>
  );
}