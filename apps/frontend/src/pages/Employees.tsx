import { useEffect, useState } from 'react';
import axios from 'axios';

type Role = 'MANAGER' | 'DRIVER' | 'HOST';

interface Employee {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  city: string;
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

const EMPTY_FORM = { fullName: '', phone: '', email: '', city: '', role: 'MANAGER' as Role };

export default function Employees() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [form, setForm] = useState<typeof EMPTY_FORM>({ ...EMPTY_FORM });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const token = localStorage.getItem('token');
  const headers = { Authorization: `Bearer ${token}` };

  const fetchEmployees = async () => {
    try {
      const res = await axios.get('https://crm-57qd.onrender.com/employees', { headers });
      setEmployees(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const grouped = (['MANAGER', 'DRIVER', 'HOST'] as Role[]).map((role) => ({
    role,
    label: ROLE_LABELS[role],
    items: employees.filter((e) => e.role === role),
  }));

  const handleOpenAdd = () => {
    setEditingEmployee(null);
    setForm({ ...EMPTY_FORM });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (emp: Employee) => {
    setEditingEmployee(emp);
    setForm({ fullName: emp.fullName, phone: emp.phone, email: emp.email, city: emp.city, role: emp.role });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.fullName.trim()) return;
    setIsSubmitting(true);
    try {
      if (editingEmployee) {
        await axios.patch(`https://crm-57qd.onrender.com/employees/${editingEmployee.id}`, form, { headers });
      } else {
        await axios.post('https://crm-57qd.onrender.com/employees', form, { headers });
      }
      setIsModalOpen(false);
      fetchEmployees();
    } catch (e) {
      console.error(e);
      alert('Помилка збереження');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Видалити працівника "${name}"?`)) return;
    try {
      await axios.delete(`https://crm-57qd.onrender.com/employees/${id}`, { headers });
      setEmployees(employees.filter((e) => e.id !== id));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="p-8 h-full">
      {/* Заголовок */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Працівники</h1>
          <p className="text-sm text-slate-400 mt-1">Менеджери, водії та ведучі компанії</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          + Додати працівника
        </button>
      </div>

      {/* Секції за категоріями */}
      <div className="space-y-8">
        {grouped.map(({ role, label, items }) => (
          <div key={role}>
            {/* Заголовок категорії */}
            <div className={`flex items-center gap-3 mb-4`}>
              <div className={`w-1 h-6 rounded-full ${ROLE_HEADER_COLORS[role]}`}></div>
              <h2 className="text-lg font-bold text-slate-700">{label}</h2>
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${ROLE_COLORS[role]}`}>
                {items.length}
              </span>
            </div>

            {items.length === 0 ? (
              <div className="bg-white rounded-xl border border-slate-100 p-6 text-center text-slate-400 text-sm">
                Немає {label.toLowerCase()}ів
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-100 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      <th className="px-5 py-3">ПІБ</th>
                      <th className="px-5 py-3">Телефон</th>
                      <th className="px-5 py-3">Пошта</th>
                      <th className="px-5 py-3">Місто</th>
                      <th className="px-5 py-3 text-center">Дії</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((emp) => (
                      <tr
                        key={emp.id}
                        className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors"
                      >
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white ${ROLE_HEADER_COLORS[role]}`}>
                              {emp.fullName.charAt(0)}
                            </div>
                            <span className="font-medium text-slate-800">{emp.fullName}</span>
                          </div>
                        </td>
                        <td className="px-5 py-4 text-slate-600 text-sm">{emp.phone || '—'}</td>
                        <td className="px-5 py-4 text-slate-600 text-sm">{emp.email || '—'}</td>
                        <td className="px-5 py-4">
                          <span className="bg-slate-100 text-slate-600 text-xs px-2.5 py-1 rounded-full font-medium">
                            📍 {emp.city || '—'}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => handleOpenEdit(emp)}
                              className="text-slate-400 hover:text-blue-500 transition-colors p-1.5 rounded-lg hover:bg-blue-50"
                              title="Редагувати"
                            >
                              ✏️
                            </button>
                            <button
                              onClick={() => handleDelete(emp.id, emp.fullName)}
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
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="text-xl font-bold text-slate-800">
                {editingEmployee ? 'Редагувати працівника' : 'Новий працівник'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 text-xl">✕</button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
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
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">Категорія *</label>
                <select
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value as Role })}
                  className="w-full p-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-400"
                >
                  <option value="MANAGER">Менеджер</option>
                  <option value="DRIVER">Водій</option>
                  <option value="HOST">Ведучий</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
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
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1">Місто</label>
                  <input
                    type="text"
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                    placeholder="Львів"
                    className="w-full p-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-400"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">Пошта</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="ivan@example.com"
                  className="w-full p-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-400"
                />
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
                  {isSubmitting ? 'Збереження...' : editingEmployee ? 'Зберегти' : 'Створити'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
