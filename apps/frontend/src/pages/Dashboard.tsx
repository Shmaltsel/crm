import IssueCarousel from '../components/IssueCarousel';
import { useSelectedCity } from '../context/CityContext';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { selectedCity } = useSelectedCity();

  return (
    <div className="p-4 md:p-8 bg-slate-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-800">Дашборд</h1>
        <p className="text-sm text-slate-500 mt-1">
          📍 {selectedCity.name || 'Оберіть місто'}
        </p>
      </div>

      {!selectedCity.id ? (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-10 text-center">
          <p className="text-4xl mb-3">📍</p>
          <p className="font-semibold text-slate-700 mb-2">Місто не обрано</p>
          <p className="text-sm text-slate-500 mb-4">
            Оберіть місто у розділі «Міста», щоб бачити проблеми та активність
          </p>
          <Link
            to="/cities"
            className="inline-block px-5 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            Перейти до міст
          </Link>
        </div>
      ) : (
        <IssueCarousel />
      )}
    </div>
  );
}
