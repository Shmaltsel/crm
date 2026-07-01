import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  useUsers,
  useProjects,
  useCreateUser,
  useUpdateUser,
  useDeleteUser,
  useCreateProject,
  useDeleteProject,
} from "../hooks/useEmployees";
import { useCities } from "../hooks/useCities";
import PhoneLink from "../components/PhoneLink";
import { useSelectedCity } from "../context/CityContext";

type Role = "MANAGER" | "DRIVER" | "HOST" | "SUPERADMIN" | "GUEST";

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
  city?: City;
  role: Role;
  telegramId?: string | null;
  car?: string | null;
}
interface Project {
  id: string;
  name: string;
  color: string;
}

const ROLE_LABELS: Record<string, string> = {
  MANAGER: "Менеджер",
  DRIVER: "Водій",
  HOST: "Ведучий",
  SUPERADMIN: "Суперадмін",
  GUEST: "Гість",
};
const ROLE_COLORS: Record<string, string> = {
  MANAGER: "bg-blue-50 text-blue-700 border-blue-200",
  DRIVER: "bg-emerald-50 text-emerald-700 border-emerald-200",
  HOST: "bg-violet-50 text-violet-700 border-violet-200",
};
const ROLE_HEADER_COLORS: Record<string, string> = {
  MANAGER: "bg-blue-600",
  DRIVER: "bg-emerald-600",
  HOST: "bg-violet-600",
};
const EMPTY_FORM = {
  fullName: "",
  phone: "",
  email: "",
  cityId: "",
  role: "MANAGER" as Role,
  password: "",
  telegramId: "",
  car: "",
};

const PROJECT_COLORS: Record<string, string> = {
  blue: "bg-blue-500",
  emerald: "bg-emerald-500",
  rose: "bg-rose-500",
  red: "bg-red-500",
  amber: "bg-amber-500",
  purple: "bg-purple-500",
};

function EmployeesSkeleton() {
  return (
    <div className="p-4 md:p-8 animate-pulse">
      <div className="flex justify-between items-center mb-8">
        <div>
          <div className="h-7 w-56 bg-slate-200 rounded-lg mb-2" />
          <div className="h-4 w-72 bg-slate-100 rounded" />
        </div>
        <div className="h-10 w-44 bg-slate-200 rounded-lg" />
      </div>
      {["Менеджери", "Водії", "Ведучі"].map((label) => (
        <div key={label} className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-6 bg-slate-200 rounded-full" />
            <div className="h-5 w-24 bg-slate-200 rounded" />
            <div className="h-5 w-8 bg-slate-100 rounded-full" />
          </div>
          <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
            <div className="bg-slate-50 border-b border-slate-100 px-5 py-3 flex gap-8">
              {["w-24", "w-20", "w-28", "w-16", "w-12"].map((w, i) => (
                <div key={i} className={`h-3 ${w} bg-slate-200 rounded`} />
              ))}
            </div>
            {[1, 2].map((i) => (
              <div
                key={i}
                className="flex items-center gap-8 px-5 py-4 border-b border-slate-50"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-200" />
                  <div className="h-4 w-28 bg-slate-200 rounded" />
                </div>
                <div className="h-4 w-20 bg-slate-100 rounded" />
                <div className="h-4 w-36 bg-slate-100 rounded" />
                <div className="h-6 w-20 bg-slate-100 rounded-full" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Employees() {
  const { data: users = [], isLoading: usersLoading } = useUsers();
  const { data: cities = [] } = useCities();
  const { data: projects = [], isLoading: projectsLoading } = useProjects();
  const createUser = useCreateUser();
  const updateUser = useUpdateUser();
  const deleteUser = useDeleteUser();
  const createProject = useCreateProject();
  const deleteProject = useDeleteProject();

  const isLoading = usersLoading;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [form, setForm] = useState<typeof EMPTY_FORM>({ ...EMPTY_FORM });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [projectForm, setProjectForm] = useState({ name: "", color: "blue" });

  const { selectedCity } = useSelectedCity();

  const [userRole] = useState<string | null>(() => {
    try {
      return JSON.parse(localStorage.getItem("user") || "null")?.role ?? null;
    } catch {
      return null;
    }
  });
  const isSuperAdmin = userRole === "SUPERADMIN";

  const cityFilteredUsers = selectedCity.id
    ? users.filter((u) => u.cityId === selectedCity.id)
    : users;
  const grouped = (["MANAGER", "DRIVER", "HOST"] as Role[]).map((role) => ({
    role,
    label: ROLE_LABELS[role],
    items: cityFilteredUsers.filter((u) => u.role === role),
  }));

  const handleOpenModal = (user: User | null = null) => {
    setEditingUser(user);
    if (user) {
      setForm({
        fullName: user.name,
        phone: user.phone || "",
        email: user.email,
        cityId: user.cityId || "",
        role: user.role,
        password: "",
        telegramId: user.telegramId || "",
        car: user.car || "",
      });
    } else {
      setForm({ ...EMPTY_FORM });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.fullName.trim()) return;
    setIsModalOpen(false); // закриваємо одразу
    if (editingUser) {
      const { password, ...rest } = form;
      const payload = password.trim() ? form : rest;
      updateUser.mutate({ id: editingUser.id, form: payload });
    } else {
      createUser.mutate(form);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Видалити користувача "${name}"?`)) return;
    try {
      await deleteUser.mutateAsync(id);
    } catch (e) {
      alert("Помилка видалення");
    }
  };

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectForm.name.trim()) return;
    setIsProjectModalOpen(false);
    setProjectForm({ name: "", color: "blue" });
    createProject.mutate(projectForm);
  };

  const handleDeleteProject = async (id: string, name: string) => {
    if (
      !window.confirm(
        `Видалити вид події "${name}"? Існуючі події з цією назвою збережуться.`,
      )
    )
      return;
    try {
      await deleteProject.mutateAsync(id);
    } catch (e) {
      alert("Помилка видалення");
    }
  };

  if (isLoading) return <EmployeesSkeleton />;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="p-4 md:p-8 h-full"
    >
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6 md:mb-8">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <h1 className="text-2xl font-bold text-slate-800">
            Акаунти та Проєкти{" "}
            {selectedCity.id && (
              <span className="ml-2 text-base font-normal text-blue-500">
                · {selectedCity.name}
              </span>
            )}
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Керування доступами, працівниками та видами подій
          </p>
        </motion.div>
        {isSuperAdmin && (
          <motion.button
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleOpenModal()}
            className="bg-blue-600 text-white px-4 py-2.5 sm:py-2 rounded-lg font-medium hover:bg-blue-700 w-full sm:w-auto"
          >
            + Створити користувача
          </motion.button>
        )}
      </div>

      <div className="space-y-8">
        {grouped.map(({ role, label, items }, gi) => (
          <motion.div
            key={role}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: gi * 0.06 }}
          >
            <div className={`flex items-center gap-3 mb-4`}>
              <div
                className={`w-1 h-6 rounded-full ${ROLE_HEADER_COLORS[role]}`}
              ></div>
              <h2 className="text-lg font-bold text-slate-700">{label}</h2>
              <motion.span
                key={items.length}
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.2 }}
                className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${ROLE_COLORS[role]}`}
              >
                {items.length}
              </motion.span>
            </div>
            {items.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.25 }}
                className="bg-white rounded-xl border border-slate-100 p-6 text-center text-slate-400 text-sm"
              >
                Немає {label.toLowerCase()}ів
              </motion.div>
            ) : (
              <motion.div
                whileHover={{
                  y: -2,
                  boxShadow: "0 8px 24px -4px rgba(0,0,0,0.08)",
                }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden"
              >
                <table className="w-full text-left">
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
                    <AnimatePresence initial={false}>
                      {items.map((u, ri) => (
                        <motion.tr
                          key={u.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2, delay: ri * 0.04 }}
                          className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors"
                        >
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-3">
                              <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.2, delay: 0.05 }}
                                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white ${ROLE_HEADER_COLORS[role]}`}
                              >
                                {u.name.charAt(0)}
                              </motion.div>
                              <span className="font-medium text-slate-800">
                                {u.name}
                              </span>
                            </div>
                          </td>
                          <td className="px-5 py-4 text-slate-600 text-sm">
                            <PhoneLink phone={u.phone} />
                            {u.car && (
                              <p className="text-xs text-emerald-600 font-medium mt-1">
                                🚗 {u.car}
                              </p>
                            )}
                          </td>
                          <td className="px-5 py-4 text-slate-600 text-sm font-medium">
                            {u.email}
                          </td>
                          <td className="px-5 py-4">
                            <span className="bg-slate-100 text-slate-600 text-xs px-2.5 py-1 rounded-full font-medium">
                              📍 {u.city?.name || "Всі міста"}
                            </span>
                          </td>
                          <td className="px-5 py-4 text-center">
                            {isSuperAdmin && (
                              <>
                                <motion.button
                                  whileTap={{ scale: 0.93 }}
                                  onClick={() => handleOpenModal(u)}
                                  className="text-slate-400 hover:text-blue-500 p-1.5 hover:bg-blue-50 rounded-lg mr-2 transition-colors"
                                >
                                  ✏️
                                </motion.button>
                                <motion.button
                                  whileTap={{ scale: 0.93 }}
                                  onClick={() => handleDelete(u.id, u.name)}
                                  className="text-slate-400 hover:text-red-500 p-1.5 hover:bg-red-50 rounded-lg transition-colors"
                                >
                                  🗑
                                </motion.button>
                              </>
                            )}
                          </td>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  </tbody>
                </table>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      {/* --- СЕКЦІЯ ПРОЄКТІВ (ВИДІВ ПОДІЙ) --- */}
      <div className="mt-16 border-t border-slate-200 pt-10">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">
              Види подій (Проєкти)
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Ці проєкти відображатимуться у випадаючому списку при створенні
              події
            </p>
          </div>
          {isSuperAdmin && (
            <button
              onClick={() => setIsProjectModalOpen(true)}
              className="bg-emerald-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-emerald-700 transition-colors w-full sm:w-auto"
            >
              + Створити вид події
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((p, pi) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: pi * 0.05 }}
              whileHover={{
                y: -3,
                boxShadow: "0 8px 24px -4px rgba(0,0,0,0.10)",
              }}
              className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm flex justify-between items-center group cursor-default"
            >
              <div className="flex items-center gap-3">
                <motion.div
                  whileHover={{ scale: 1.3 }}
                  transition={{ duration: 0.15 }}
                  className={`w-4 h-4 rounded-full ${PROJECT_COLORS[p.color] || "bg-blue-500"} shadow-sm`}
                />
                <span className="font-bold text-slate-800">{p.name}</span>
              </div>
              {isSuperAdmin && (
                <button
                  onClick={() => handleDeleteProject(p.id, p.name)}
                  className="text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity p-2 -mr-2"
                  title="Видалити"
                >
                  🗑
                </button>
              )}
            </motion.div>
          ))}
          {projects.length === 0 && (
            <div className="col-span-full text-center py-10 text-slate-400">
              Ви ще не додали жодного виду події
            </div>
          )}
        </div>
      </div>

      {/* Модалки Користувача і Проєктів */}
      {isProjectModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="text-xl font-bold text-slate-800">
                Новий вид події
              </h3>
              <button
                onClick={() => setIsProjectModalOpen(false)}
                className="text-slate-400 text-xl leading-none p-2 -mr-2"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleCreateProject} className="p-6">
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Назва
              </label>
              <input
                type="text"
                value={projectForm.name}
                onChange={(e) =>
                  setProjectForm({ ...projectForm, name: e.target.value })
                }
                className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none mb-6"
                required
                placeholder="Наприклад: Шоу мильних бульбашок"
              />
              <label className="block text-sm font-medium text-slate-700 mb-3">
                Колір для календаря
              </label>
              <div className="flex gap-4 mb-8">
                {Object.keys(PROJECT_COLORS).map((c) => (
                  <button
                    type="button"
                    key={c}
                    onClick={() => setProjectForm({ ...projectForm, color: c })}
                    className={`w-8 h-8 rounded-full ${PROJECT_COLORS[c]} transition-all ${projectForm.color === c ? "ring-4 ring-offset-2 ring-blue-200 scale-110" : "hover:scale-110"}`}
                  />
                ))}
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsProjectModalOpen(false)}
                  className="flex-1 bg-slate-100 py-3 rounded-xl font-medium"
                >
                  Скасувати
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-emerald-600 text-white py-3 rounded-xl font-medium"
                >
                  Зберегти
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Ваша стара модалка Користувача */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          {/* Ваш існуючий код модалки працівника... Для стислості я зберіг базові поля */}
          <div className="bg-white rounded-2xl shadow-xl w-full sm:max-w-lg overflow-hidden flex flex-col">
            <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50 shrink-0">
              <h3 className="text-xl font-bold">
                {editingUser ? "Редагувати" : "Новий користувач"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 text-xl p-2 -mr-2"
              >
                ✕
              </button>
            </div>
            <form
              onSubmit={handleSubmit}
              className="p-6 flex flex-col gap-4 overflow-y-auto max-h-[70vh]"
            >
              <input
                type="text"
                value={form.fullName}
                onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                required
                placeholder="ПІБ"
                className="w-full p-2.5 border rounded-lg"
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                  placeholder="Пошта"
                  className="w-full p-2.5 border rounded-lg"
                />
                <input
                  type="password"
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  required={!editingUser}
                  placeholder="Пароль"
                  className="w-full p-2.5 border rounded-lg"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="Телефон"
                  className="w-full p-2.5 border rounded-lg"
                />
                <input
                  type="text"
                  value={form.telegramId}
                  onChange={(e) =>
                    setForm({ ...form, telegramId: e.target.value })
                  }
                  placeholder="Telegram ID або @username"
                  className="w-full p-2.5 border rounded-lg"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <select
                  value={form.role}
                  onChange={(e) =>
                    setForm({ ...form, role: e.target.value as Role })
                  }
                  className="w-full p-2.5 border rounded-lg"
                >
                  <option value="MANAGER">Менеджер</option>
                  <option value="DRIVER">Водій</option>
                  <option value="HOST">Ведучий</option>
                  <option value="SUPERADMIN">Суперадмін</option>
                </select>
                <select
                  value={form.cityId}
                  onChange={(e) => setForm({ ...form, cityId: e.target.value })}
                  className="w-full p-2.5 border rounded-lg"
                >
                  <option value="">Всі міста</option>
                  {cities.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
              {form.role === "DRIVER" && (
                <input
                  type="text"
                  value={form.car || ""}
                  onChange={(e) => setForm({ ...form, car: e.target.value })}
                  placeholder="Автомобіль (напр. Renault Trafic)"
                  className="w-full p-2.5 border rounded-lg"
                />
              )}
              <div className="flex gap-3 mt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 bg-slate-100 py-3 rounded-xl font-medium"
                >
                  Скасувати
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-medium"
                >
                  Зберегти
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </motion.div>
  );
}
