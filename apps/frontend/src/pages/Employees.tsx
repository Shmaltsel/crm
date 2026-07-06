import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  useUsers,
  useProjects,
  useCreateUser,
  useUpdateUser,
  useDeleteUser,
  useCreateProject,
  useUpdateProject,
  useDeleteProject,
} from "../hooks/useEmployees";
import { useCities } from "../hooks/useCities";
import EmployeeCard from "../components/employees/EmployeeCard";
import { sectionVariants } from "../animations/employees";
import { useSelectedCity } from "../context/CityContext";
import { useAuth } from "../context/AuthContext";

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
  const updateProject = useUpdateProject();
  const deleteProject = useDeleteProject();

  const isLoading = usersLoading;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [form, setForm] = useState<typeof EMPTY_FORM>({ ...EMPTY_FORM });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [projectForm, setProjectForm] = useState({
    name: "",
    color: "blue",
    pricePerChild: "",
  });

  const handleOpenProjectModal = (project: Project | null = null) => {
    setEditingProject(project);
    setProjectForm(
      project
        ? {
            name: project.name,
            color: project.color,
            pricePerChild: String((project as any).pricePerChild ?? ""),
          }
        : { name: "", color: "blue", pricePerChild: "" },
    );
    setIsProjectModalOpen(true);
  };

  const { selectedCity } = useSelectedCity();

  const { user } = useAuth();
  const isSuperAdmin = user?.role === "SUPERADMIN";

  const cityFilteredUsers = selectedCity.id
    ? users.filter((u) => u.cityId === selectedCity.id)
    : users;
  const grouped = (["MANAGER", "DRIVER", "HOST"] as Role[]).map((role) => ({
    role,
    label: ROLE_LABELS[role],
    items: cityFilteredUsers.filter((u) => u.role === role),
  }));

  const handleOpenModal = (user: User | null = null) => {
    setFormError("");
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

  const [formError, setFormError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.fullName.trim()) return;
    setFormError("");
    try {
      if (editingUser) {
        const { password, ...rest } = form;
        const payload = password.trim() ? form : rest;
        await updateUser.mutateAsync({ id: editingUser.id, form: payload });
      } else {
        await createUser.mutateAsync(form);
      }
      setIsModalOpen(false);
    } catch (err: any) {
      const messages = err?.response?.data?.message;
      setFormError(
        Array.isArray(messages)
          ? messages.join(", ")
          : messages || "Помилка збереження",
      );
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
    const payload = {
      ...projectForm,
      pricePerChild: Number(projectForm.pricePerChild) || 0,
    };
    setProjectForm({ name: "", color: "blue", pricePerChild: "" });
    if (editingProject) {
      updateProject.mutate({ id: editingProject.id, form: payload });
      setEditingProject(null);
    } else {
      createProject.mutate(payload);
    }
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
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
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
                variants={sectionVariants}
                className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3"
              >
                <AnimatePresence initial={false}>
                  {items.map((u) => (
                    <EmployeeCard
                      key={u.id}
                      user={u}
                      role={role}
                      isSuperAdmin={isSuperAdmin}
                      onEdit={handleOpenModal}
                      onDelete={handleDelete}
                    />
                  ))}
                </AnimatePresence>
              </motion.div>
            )}{" "}
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
              onClick={() => handleOpenProjectModal()}
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
             className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm flex justify-between items-center group cursor-default hover:border-slate-200 transition-colors"
            >
              <div className="flex items-center gap-3">
                <motion.div
                  whileHover={{ scale: 1.15 }}
                  transition={{ duration: 0.15 }}
                  className={`w-10 h-10 rounded-2xl flex items-center justify-center ${PROJECT_COLORS[p.color] || "bg-blue-500"} shadow-sm ring-4 ring-offset-1 ring-slate-50`}
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-white/80" />
                </motion.div>
                <div>
                  <span className="font-bold text-slate-800">{p.name}</span>
                  {!!(p as any).pricePerChild && (
                    <p className="text-xs text-slate-400">
                      {(p as any).pricePerChild} грн / дитина
                    </p>
                  )}
                </div>
              </div>
              {isSuperAdmin && (
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleOpenProjectModal(p)}
                    className="text-slate-300 hover:text-blue-500 p-2 -mr-1"
                    title="Редагувати"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => handleDeleteProject(p.id, p.name)}
                    className="text-slate-300 hover:text-red-500 p-2 -mr-2"
                    title="Видалити"
                  >
                    🗑
                  </button>
                </div>
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
                {editingProject ? "Редагувати вид події" : "Новий вид події"}
              </h3>
              <button
                onClick={() => {
                  setIsProjectModalOpen(false);
                  setEditingProject(null);
                }}
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
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Ціна за дитину, грн
              </label>
              <input
                type="number"
                min={0}
                value={projectForm.pricePerChild}
                onChange={(e) =>
                  setProjectForm({
                    ...projectForm,
                    pricePerChild: e.target.value,
                  })
                }
                placeholder="Наприклад: 150"
                className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none mb-6"
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
              {formError && (
                <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg">
                  {formError}
                </div>
              )}
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
                  placeholder="Пароль (мін. 8 симв., літера+цифра)"
                  minLength={8}
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
