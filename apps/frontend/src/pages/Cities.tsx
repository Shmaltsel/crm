import { useState, useEffect } from 'react';
import axios from 'axios';

// Описуємо, як виглядає місто з бази
interface City {
  id: string;
  name: string;
}

export default function Cities() {
  const [cities, setCities] = useState<City[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCityName, setNewCityName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Функція для завантаження міст з бекенду
  const fetchCities = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3000/cities', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCities(response.data);
    } catch (error) {
      console.error('Помилка при завантаженні міст:', error);
    }
  };

  // Завантажуємо міста при першому відкритті сторінки
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchCities();
  }, []);

  // Функція для збереження нового міста
  const handleAddCity = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCityName.trim()) return;

    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:3000/cities', 
        { name: newCityName },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      // Очищаємо форму, закриваємо модалку і оновлюємо список
      setNewCityName('');
      setIsModalOpen(false);
      fetchCities();
    } catch (error) {
      console.error('Помилка при створенні міста:', error);
      alert('Не вдалося створити місто');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8 relative h-full">
      {/* Шапка сторінки */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-slate-800">Міста</h1>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium transition-colors shadow-sm flex items-center"
        >
          <span className="mr-2">+</span> Додати місто
        </button>
      </div>

      {/* Сітка карток міст */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cities.map((city) => (
          <div key={city.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <h2 className="text-xl font-bold text-slate-800 mb-1">{city.name}</h2>
            <span className="text-xs font-medium text-green-600 bg-green-50 px-2.5 py-1 rounded-full">Активне місто</span>
            
            <div className="mt-6 space-y-3 text-sm">
              <div className="flex justify-between text-slate-500">
                <span>Заплановано подій:</span>
                <span className="font-medium text-slate-800">0</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Проведено подій:</span>
                <span className="font-medium text-slate-800">0</span>
              </div>
            </div>
          </div>
        ))}

        {cities.length === 0 && (
          <div className="col-span-full text-center py-10 text-slate-500">
            Міст ще немає. Натисни "+ Додати місто", щоб створити перше!
          </div>
        )}
      </div>

      {/* Модальне вікно (з'являється тільки коли isModalOpen === true) */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="p-6 border-b border-slate-100">
              <h3 className="text-xl font-bold text-slate-800">Нове місто</h3>
            </div>
            
            <form onSubmit={handleAddCity} className="p-6">
              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Назва міста
                </label>
                <input 
                  type="text" 
                  value={newCityName}
                  onChange={(e) => setNewCityName(e.target.value)}
                  placeholder="Наприклад: Львів"
                  className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  autoFocus
                  required
                />
              </div>

              <div className="flex justify-end gap-3">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 text-slate-600 font-medium hover:bg-slate-50 rounded-xl transition-colors"
                >
                  Скасувати
                </button>
                <button 
                  type="submit"
                  disabled={isLoading}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-medium transition-colors disabled:opacity-50"
                >
                  {isLoading ? 'Збереження...' : 'Зберегти'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}