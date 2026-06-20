

import { useEffect, useState } from 'react';
import axios from 'axios';

type Role = 'MANAGER' | 'DRIVER' | 'HOST';

interface City {
  id: string;
  name: string;
}

interface User {
  id: string;
  name: string;
  phone: string | null;
  email: string;
  cityId: string | null;
  city?: City; // Отримуємо з бекенду
  role: Role;
}

const ROLE_LABELS: Record<Role, string> = {
  MANAGER: 'Менеджер',
  DRIVER: 'Водій',
  HOST: 'Ведучий',
};

const ROLE_COLORS: Record<Role, string> = {
  MANAGER: 'bg-blue-50 text-blue-700 border-blue-200',
  DRIVER: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  HOST: 'bg-violet-50 text-violet-700 border-violet-200',
};

const ROLE_HEADER_COLORS: Record<Role, string> = {
  MANAGER: 'bg-blue-600',
  DRIVER: 'bg-emerald-600',
  HOST: 'bg-violet-600',
};

const EMPTY_FORM = { fullName: '', phone: '', email: '', cityId: '', role: 'MANAGER' as Role, password: '' };

// ТИМЧАСОВО ДЛЯ ЛОКАЛЬНИХ ТЕСТІВ. ПОТІМ ЗМІНИ НА 'https://crm-57qd.onrender.com'
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://crm-57qd.onrender.com';

export default function Employees() {
  const [users, setUsers] = useState<User[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [form, setForm] = useState<typeof EMPTY_FORM>({ ...EMPTY_FORM });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const token = localStorage.getItem('token');
  const headers = { Authorization: `Bearer ${token}` };

  const fetchData = async () => {
    try {
      const [usersRes, citiesRes] = await Promise.all([
        axios.get(`${API_BASE_URL}/users`, { headers }),
        axios.get(`${API_BASE_URL}/cities`, { headers })
      ]);
      setUsers(usersRes.data);
      setCities(citiesRes.data);
    } catch (e) {
      console.error('Помилка завантаження даних:', e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const grouped = (['MANAGER', 'DRIVER', 'HOST'] as Role[]).map((role) => ({
    role,
    label: ROLE_LABELS[role],
    items: users.filter((u) => u.role === role),
  }));

  const handleOpenAdd = () => {
    setEditingUser(null);
    setForm({ ...EMPTY_FORM });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (user: User) => {
    setEditingUser(user);
    setForm({ 
      fullName: user.name, // У формі ми залишили fullName для сумісності з бекендом
      phone: user.phone || '', 
      email: user.email, 
      cityId: user.cityId || '', 
      role: user.role,
      password: '' // Пароль залишаємо порожнім при редагуванні
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.fullName.trim()) return;
    setIsSubmitting(true);
    try {
      if (editingUser) {
        await axios.patch(`${API_BASE_URL}/users/${editingUser.id}`, form, { headers });
      } else {
        await axios.post(`${API_BASE_URL}/users`, form, { headers });
      }
      setIsModalOpen(false);
      fetchData();
    } catch (e) {
      console.error(e);
      alert('Помилка збереження. Перевірте, чи не дублюється email.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Видалити користувача "${name}"?`)) return;
    try {
      await axios.delete(`${API_BASE_URL}/users/${id}`, { headers });
      setUsers(users.filter((u) => u.id !== id));
    } catch (e) {
      console.error(e);
      alert('Помилка видалення');
    }
  };

  return (
    <div className="p-4 md:p-8 h-full">
      {/* Заголовок */}
       <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6 md:mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Акаунти та Працівники</h1>
          <p className="text-sm text-slate-400 mt-1">Керування доступами, менеджерами, водіями та ведучими</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="bg-blue-600 text-white px-4 py-2.5 sm:py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors w-full sm:w-auto"
        >
          + Створити користувача
        </button>
      </div>

      {/* Секції за категоріями */}
      <div className="space-y-8">
        {grouped.map(({ role, label, items }) => (
          <div key={role}>
            <div className={`flex items-center gap-3 mb-4`}>
              <div className={`w-1 h-6 rounded-full ${ROLE_HEADER_COLORS[role]}`}></div>
              <h2 className="text-lg font-bold text-slate-700">{label}</h2>
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${ROLE_COLORS[role]}`}>
                {items.length}
              </span>
            </div>

            {items.length === 0 ? (
              <div className="bg-white rounded-xl border border-slate-100 p-6 text-center text-slate-400 text-sm overflow-x-auto">
                Немає {label.toLowerCase()}ів
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                {/* Картки — мобільний вигляд */}
                <div className="md:hidden divide-y divide-slate-50">
                  {items.map((u) => (
                    <div key={u.id} className="p-4 flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0 ${ROLE_HEADER_COLORS[role]}`}>
                        {u.name.charAt(0)}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-slate-800 truncate">{u.name}</p>
                        <p className="text-xs text-slate-500 truncate mt-0.5">{u.email}</p>
                        <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                          {u.phone && <span className="text-xs text-slate-500">{u.phone}</span>}
                          <span className="bg-slate-100 text-slate-600 text-[11px] px-2 py-0.5 rounded-full font-medium">
                            📍 {u.city?.name || 'Всі міста'}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          onClick={() => handleOpenEdit(u)}
                          className="text-slate-400 active:text-blue-500 transition-colors p-2 rounded-lg active:bg-blue-50"
                        >
                          ✏️
                        </button>
                        <button
                          onClick={() => handleDelete(u.id, u.name)}
                          className="text-slate-400 active:text-red-500 transition-colors p-2 rounded-lg active:bg-red-50"
                        >
                          🗑
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Таблиця — десктоп */}
                <table className="hidden md:table w-full text-left">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-100 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      <th className="px-5 py-3">ПІБ</th>
                      <th className="px-5 py-3">Телефон</th>
                      <th className="px-5 py-3">Пошта / Логін</th>
                      <th className="px-5 py-3">Місто</th>
                      <th className="px-5 py-3 text-center">Дії</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((u) => (
                      <tr
                        key={u.id}
                        className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors"
                      >
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white ${ROLE_HEADER_COLORS[role]}`}>
                              {u.name.charAt(0)}
                            </div>
                            <span className="font-medium text-slate-800">{u.name}</span>
                          </div>
                        </td>
                        <td className="px-5 py-4 text-slate-600 text-sm">{u.phone || '—'}</td>
                        <td className="px-5 py-4 text-slate-600 text-sm font-medium">{u.email}</td>
                        <td className="px-5 py-4">
                          <span className="bg-slate-100 text-slate-600 text-xs px-2.5 py-1 rounded-full font-medium">
                            📍 {u.city?.name || 'Всі міста'}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => handleOpenEdit(u)}
                              className="text-slate-400 hover:text-blue-500 transition-colors p-1.5 rounded-lg hover:bg-blue-50"
                              title="Редагувати"
                            >
                              ✏️
                            </button>
                            <button
                              onClick={() => handleDelete(u.id, u.name)}
                              className="text-slate-400 hover:text-red-500 transition-colors p-1.5 rounded-lg hover:bg-red-50"
                              title="Видалити"
                            >
                              🗑
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Модальне вікно додавання/редагування */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center sm:p-4">
          <div className="bg-white rounded-t-3xl sm:rounded-2xl shadow-xl w-full sm:max-w-lg max-h-[92vh] overflow-hidden flex flex-col">
            <div className="sm:hidden w-10 h-1.5 bg-slate-200 rounded-full mx-auto mt-3" />
            <div className="p-5 sm:p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50 shrink-0">
              <h3 className="text-xl font-bold text-slate-800">
                {editingUser ? 'Редагувати користувача' : 'Новий користувач'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 text-xl p-2 -mr-2">✕</button>
            </div>
            <form onSubmit={handleSubmit} className="p-5 sm:p-6 flex flex-col gap-4 overflow-y-auto">
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">ПІБ *</label>
                <input
                  type="text"
                  value={form.fullName}
                  onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                  required
                  placeholder="Іваненко Іван Іванович"
                  className="w-full p-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-400"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1">Пошта (Логін) *</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                    placeholder="ivan@example.com"
                    className="w-full p-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1">
                    Пароль {editingUser ? '(необов\'язково)' : '*'}
                  </label>
                  <input
                    type="password"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    required={!editingUser} // Обов'язковий тільки при створенні
                    placeholder="••••••••"
                    className="w-full p-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-400"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1">Роль *</label>
                  <select
                    value={form.role}
                    onChange={(e) => setForm({ ...form, role: e.target.value as Role })}
                    className="w-full p-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-400 bg-white"
                  >
                    <option value="MANAGER">Менеджер</option>
                    <option value="DRIVER">Водій</option>
                    <option value="HOST">Ведучий</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1">Місто</label>
                  <select
                    value={form.cityId}
                    onChange={(e) => setForm({ ...form, cityId: e.target.value })}
                    className="w-full p-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-400 bg-white"
                  >
                    <option value="">— Без прив'язки до міста —</option>
                    {cities.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">Телефон</label>
                <input
                  type="text"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="+380..."
                  className="w-full p-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-400"
                />
              </div>
              <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 mt-4 pb-1 sm:pb-0">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="w-full sm:w-auto px-5 py-3 sm:py-2.5 bg-slate-100 rounded-xl sm:rounded-lg text-sm font-medium hover:bg-slate-200 transition-colors"
                >
                  Скасувати
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-5 py-3 sm:py-2.5 bg-blue-600 text-white rounded-xl sm:rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors"
                >
                  {isSubmitting ? 'Збереження...' : editingUser ? 'Зберегти зміни' : 'Створити акаунт'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

