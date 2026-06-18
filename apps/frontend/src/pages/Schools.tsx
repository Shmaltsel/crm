import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PIPELINE_STAGES = [
  { key: 'BASE', name: 'База' },
  { key: 'FIRST_CONTACT', name: 'Перший контакт' },
  { key: 'INTERESTED', name: 'Зацікавлений' },
  { key: 'PRE_APPROVAL', name: 'Попереднє погодження' },
  { key: 'DATE_CONFIRMED', name: 'Підтвердження дати' },
  { key: 'PREPARATION', name: 'Підготовка' },
  { key: 'IN_PROGRESS', name: 'Подія в роботі' },
  { key: 'DONE', name: 'Проведено' },
  { key: 'REPORT', name: 'Звіт' },
  { key: 'RE_SALE', name: 'Повторний продаж' },
];

interface City {
  id: string;
  name: string;
}

export default function Schools() {
  const navigate = useNavigate();
  const [schools, setSchools] = useState<any[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ name: '', type: 'Школа', cityId: '' });

  const fetchSchools = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:3000/schools', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSchools(res.data);
    } catch (e) { console.error(e); }
  };

  const fetchCities = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:3000/cities', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCities(res.data);
    } catch (e) { console.error(e); }
  };

  useEffect(() => {
    fetchSchools();
    fetchCities();
  }, []);

  const handleOpenModal = () => {
    setForm({ name: '', type: 'Школа', cityId: cities[0]?.id ?? '' });
    setIsModalOpen(true);
  };

  const handleAddSchool = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.cityId) return;
    setIsSubmitting(true);
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:3000/schools', form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setIsModalOpen(false);
      fetchSchools();
    } catch (e) {
      console.error(e);
      alert('Не вдалося створити заклад');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteSchool = async (e: React.MouseEvent, schoolId: string, schoolName: string) => {
    e.stopPropagation();
    if (!window.confirm(`Видалити заклад "${schoolName}"? Це видалить також усі його події.`)) return;
    try {
      await axios.delete(`http://localhost:3000/schools/${schoolId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setSchools(schools.filter(s => s.id !== schoolId));
    } catch (e) { console.error(e); }
  };

  return (
    <div className="p-8 h-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Школи та Садочки</h1>
        <button
          onClick={handleOpenModal}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700"
        >
          + Додати заклад
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              <th className="p-4 font-medium text-slate-600">Назва закладу</th>
              <th className="p-4 font-medium text-slate-600">Тип</th>
              <th className="p-4 font-medium text-slate-600">Місто</th>
              <th className="p-4 font-medium text-slate-600">Статус</th>
              <th className="p-4 font-medium text-slate-600">Поточний етап</th>
              <th className="p-4 font-medium text-slate-600 text-center">Дія</th>
            </tr>
          </thead>
          <tbody>
            {schools.map((school) => {
              const latestEvent = school.events?.[0];
              const stage = latestEvent ? PIPELINE_STAGES.find(s => s.key === latestEvent.status) : null;
              return (
                <tr
                  key={school.id}
                  onClick={() => navigate(`/schools/${school.id}`)}
                  className="cursor-pointer border-b border-slate-50 hover:bg-slate-50/50 transition"
                >
                  <td className="p-4 text-slate-800 font-medium">{school.name}</td>
                  <td className="p-4 text-slate-600">{school.type}</td>
                  <td className="p-4 text-slate-600">{school.city?.name}</td>
                  <td className="p-4">
                    <span className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-xs font-medium">
                      Активний
                    </span>
                  </td>
                  <td className="p-4">
                    {stage ? (
                      <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-medium border border-blue-100">
                        {stage.name}
                      </span>
                    ) : (
                      <span className="text-slate-400 text-xs italic">—</span>
                    )}
                  </td>
                  <td className="p-4 text-center">
                    <button
                      onClick={(e) => handleDeleteSchool(e, school.id, school.name)}
                      className="text-slate-400 hover:text-red-500 transition-colors p-2"
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

      {/* Модалка додавання закладу */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex justify-between bg-slate-50">
              <h3 className="text-xl font-bold text-slate-800">Новий заклад</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>
            <form onSubmit={handleAddSchool} className="p-6 flex flex-col gap-4">
              <div>
                <label className="block text-sm text-slate-600 mb-1">Назва закладу</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  required
                  placeholder="Школа №1"
                  className="w-full p-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-400"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-600 mb-1">Тип</label>
                <select
                  value={form.type}
                  onChange={e => setForm({ ...form, type: e.target.value })}
                  className="w-full p-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-400"
                >
                  <option value="Школа">Школа</option>
                  <option value="Садочок">Садочок</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-slate-600 mb-1">Місто</label>
                <select
                  value={form.cityId}
                  onChange={e => setForm({ ...form, cityId: e.target.value })}
                  required
                  className="w-full p-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-400"
                >
                  <option value="">— Оберіть місто —</option>
                  {cities.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end gap-3 mt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 bg-slate-100 rounded-lg text-sm font-medium hover:bg-slate-200"
                >
                  Скасувати
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50"
                >
                  {isSubmitting ? 'Збереження...' : 'Створити'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
