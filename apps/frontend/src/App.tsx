import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Events from './pages/Events';
import Cities from './pages/Cities';
import CityProfile from './pages/CityProfile';
import Layout from './components/Layout';
import Schools from './pages/Schools';
import SchoolProfile from './pages/SchoolProfile';
import Employees from './pages/Employees';
import EventReport from './pages/EventReport';

export default function App() {
  return (
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
          <Route path="/employees" element={<Employees />} />
          <Route path="/dashboard" element={<Navigate to="/cities" replace />} />
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
