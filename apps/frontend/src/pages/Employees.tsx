import { useState, useMemo, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence, MotionConfig } from "framer-motion";
import { X, Search, UserPlus } from "lucide-react";
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
import { useDebounce } from "../hooks/useDebounce";
import EmployeeCard from "../components/employees/EmployeeCard";
import EmployeesTable from "../components/employees/EmployeesTable";
import UserModal from "../components/employees/UserModal";
import ProjectModal from "../components/employees/ProjectModal";
import { EmployeesHeader } from "../components/employees/EmployeesHeader";
import { FilterPanel } from "../components/employees/FilterPanel";
import { EmptyState } from "../components/ui/EmptyState";
import { sectionVariants } from "../animations/employees";
import { useSelectedCity } from "../context/CityContext";
import { useAuth } from "../context/AuthContext";

type Role = "MANAGER" | "DRIVER" | "HOST" | "SUPERADMIN" | "GUEST";
type ViewMode = "cards" | "table";

interface City { id: string; name: string }
interface User {
  id: string; name: string; phone: string | null; email: string;
  cityId: string | null; city?: City; role: Role;
  telegramId?: string | null; car?: string | null;
}
interface Project { id: string; name: string; color: string }

const ROLE_LABELS: Record<string, string> = {
  MANAGER: "Менеджер", DRIVER: "Водій", HOST: "Ведучий",
  SUPERADMIN: "Суперадмін", GUEST: "Гість",
};
const ROLE_COLORS: Record<string, string> = {
  MANAGER: "bg-blue-50 text-blue-700 border-blue-200",
  DRIVER: "bg-emerald-50 text-emerald-700 border-emerald-200",
  HOST: "bg-violet-50 text-violet-700 border-violet-200",
};
const ROLE_HEADER_COLORS: Record<string, string> = {
  MANAGER: "bg-blue-600", DRIVER: "bg-emerald-600", HOST: "bg-violet-600",
};
const EMPTY_FORM = {
  fullName: "", phone: "", email: "", cityId: "", role: "MANAGER" as Role,
  password: "", telegramId: "", car: "",
};
const PROJECT_COLORS: Record<string, string> = {
  blue: "bg-blue-500", emerald: "bg-emerald-500", rose: "bg-rose-500",
  red: "bg-red-500", amber: "bg-amber-500", purple: "bg-purple-500",
};

function Shimmer() {
  return (
    <motion.div
      className="absolute inset-0 -translate-x-full"
      style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)" }}
      animate={{ translateX: ["-100%", "100%"] }}
      transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
    />
  );
}

function EmployeesSkeleton() {
  return (
    <div className="p-4 md:p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <div className="h-7 w-56 bg-slate-200 rounded-lg mb-2" />
          <div className="h-4 w-72 bg-slate-100 rounded" />
        </div>
        <div className="h-10 w-44 bg-slate-200 rounded-lg" />
      </div>
      {[
        { label: "Менеджери", accent: "bg-blue-200" },
        { label: "Водії", accent: "bg-emerald-200" },
        { label: "Ведучі", accent: "bg-violet-200" },
      ].map(({ label, accent }) => (
        <div key={label} className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className={`w-1 h-6 rounded-full ${accent}`} />
            <div className="h-5 w-24 bg-slate-200 rounded" />
            <div className="h-5 w-8 bg-slate-100 rounded-full" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="relative overflow-hidden bg-white border border-slate-100 rounded-3xl p-5 flex items-start gap-4">
                <Shimmer />
                <div className="w-12 h-12 rounded-2xl bg-slate-200 shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="h-4 w-32 bg-slate-200 rounded mb-2" />
                  <div className="h-3 w-40 bg-slate-100 rounded mb-3" />
                  <div className="flex gap-2">
                    <div className="h-5 w-16 bg-slate-100 rounded-full" />
                    <div className="h-5 w-20 bg-slate-100 rounded-full" />
                  </div>
                </div>
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
  const { selectedCity: contextCity } = useSelectedCity();
  const { user: authUser } = useAuth();
  const isSuperAdmin = authUser?.role === "SUPERADMIN";

  const [searchParams, setSearchParams] = useSearchParams();
  const rawSearch = searchParams.get("search") ?? "";
  const rawRoles = searchParams.get("roles") ?? "";
  const rawCity = searchParams.get("city") ?? "";

  const updateParams = useCallback((updates: Record<string, string | null>) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      for (const [key, value] of Object.entries(updates)) {
        if (value === null || value === "") next.delete(key);
        else next.set(key, value);
      }
      return next;
    });
  }, [setSearchParams]);

  const debouncedSearch = useDebounce(rawSearch, 300);

  const selectedRoles = useMemo(
    () => rawRoles ? rawRoles.split(",").filter(Boolean) : [],
    [rawRoles],
  );
  const selectedCity = rawCity;

  const [viewMode, setViewMode] = useState<ViewMode>(
    (searchParams.get("view") as ViewMode) ?? "cards",
  );
  const [filterPanelOpen, setFilterPanelOpen] = useState(false);

  const handleViewModeChange = useCallback((mode: ViewMode) => {
    setViewMode(mode);
    updateParams({ view: mode });
  }, [updateParams]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [form, setForm] = useState<typeof EMPTY_FORM>({ ...EMPTY_FORM });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [projectForm, setProjectForm] = useState({ name: "", color: "blue", pricePerChild: "" });

  const [formError, setFormError] = useState("");

  const handleOpenProjectModal = useCallback((project: Project | null = null) => {
    setEditingProject(project);
    setProjectForm(
      project
        ? { name: project.name, color: project.color, pricePerChild: String((project as any).pricePerChild ?? "") }
        : { name: "", color: "blue", pricePerChild: "" },
    );
    setIsProjectModalOpen(true);
  }, []);

  const cityFilteredUsers = useMemo(
    () => contextCity.id ? users.filter((u) => u.cityId === contextCity.id) : users,
    [users, contextCity.id],
  );

  const filteredUsers = useMemo(() => {
    let result = cityFilteredUsers;

    if (selectedRoles.length > 0) {
      result = result.filter((u) => selectedRoles.includes(u.role));
    }

    if (selectedCity && selectedCity !== "all") {
      result = result.filter((u) => u.cityId === selectedCity || u.city?.id === selectedCity);
    }

    if (debouncedSearch.trim()) {
      const q = debouncedSearch.trim().toLowerCase();
      result = result.filter(
        (u) =>
          u.name.toLowerCase().includes(q) ||
          u.email.toLowerCase().includes(q) ||
          (u.phone ?? "").toLowerCase().includes(q),
      );
    }

    return result;
  }, [cityFilteredUsers, selectedRoles, selectedCity, debouncedSearch]);

  const grouped = useMemo(
    () => (["MANAGER", "DRIVER", "HOST"] as Role[]).map((role) => ({
      role,
      label: ROLE_LABELS[role],
      items: filteredUsers.filter((u) => u.role === role),
    })),
    [filteredUsers],
  );

  const hasActiveFilters = selectedRoles.length > 0 || (selectedCity !== "" && selectedCity !== "all");

  const handleResetFilters = useCallback(() => {
    updateParams({ roles: null, city: null });
  }, [updateParams]);

  const activeFilterChips = useMemo(() => {
    const chips: { key: string; label: string; onRemove: () => void }[] = [];

    if (debouncedSearch.trim()) {
      chips.push({
        key: "search",
        label: `Пошук: "${debouncedSearch.trim()}"`,
        onRemove: () => updateParams({ search: null }),
      });
    }

    selectedRoles.forEach((r) => {
      chips.push({
        key: `role-${r}`,
        label: ROLE_LABELS[r] ?? r,
        onRemove: () => {
          const next = selectedRoles.filter((x) => x !== r);
          updateParams({ roles: next.length > 0 ? next.join(",") : null });
        },
      });
    });

    if (selectedCity && selectedCity !== "all") {
      const cityName = cities.find((c) => c.id === selectedCity)?.name || selectedCity;
      chips.push({
        key: "city",
        label: cityName,
        onRemove: () => updateParams({ city: null }),
      });
    }

    return chips;
  }, [debouncedSearch, selectedRoles, selectedCity, cities, updateParams]);

  const handleOpenModal = useCallback((user: User | null = null) => {
    setFormError("");
    setEditingUser(user);
    if (user) {
      setForm({
        fullName: user.name, phone: user.phone || "", email: user.email,
        cityId: user.cityId || "", role: user.role, password: "",
        telegramId: user.telegramId || "", car: user.car || "",
      });
    } else {
      setForm({ ...EMPTY_FORM });
    }
    setIsModalOpen(true);
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.fullName.trim()) return;
    setFormError("");
    setIsSubmitting(true);
    try {
      if (editingUser) {
        const { password, ...rest } = form;
        const payload = password.trim() ? form : rest;
        await updateUser.mutateAsync({ id: editingUser.id, form: payload });
      } else {
        await createUser.mutateAsync(form);
      }
      setShowSuccess(true);
      setTimeout(() => { setShowSuccess(false); setIsModalOpen(false); }, 700);
    } catch (err: any) {
      const messages = err?.response?.data?.message;
      setFormError(Array.isArray(messages) ? messages.join(", ") : messages || "Помилка збереження");
    } finally {
      setIsSubmitting(false);
    }
  }, [form, editingUser, createUser, updateUser]);

  const handleDelete = useCallback(async (id: string, name: string) => {
    if (!window.confirm(`Видалити користувача "${name}"?`)) return;
    try { await deleteUser.mutateAsync(id); }
    catch { alert("Помилка видалення"); }
  }, [deleteUser]);

  const handleCreateProject = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (!projectForm.name.trim()) return;
    setIsProjectModalOpen(false);
    const payload = { ...projectForm, pricePerChild: Number(projectForm.pricePerChild) || 0 };
    setProjectForm({ name: "", color: "blue", pricePerChild: "" });
    if (editingProject) {
      updateProject.mutate({ id: editingProject.id, form: payload });
      setEditingProject(null);
    } else {
      createProject.mutate(payload);
    }
  }, [projectForm, editingProject, updateProject, createProject]);

  const handleDeleteProject = useCallback(async (id: string, name: string) => {
    if (!window.confirm(`Видалити вид події "${name}"? Існуючі події з цією назвою збережуться.`)) return;
    try { await deleteProject.mutateAsync(id); }
    catch { alert("Помилка видалення"); }
  }, [deleteProject]);

  const cityOptions = useMemo(
    () => [{ value: "all", label: "Всі міста" }, ...cities.map((c: City) => ({ value: c.id, label: c.name }))],
    [cities],
  );

  if (isLoading) return <EmployeesSkeleton />;

  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="p-4 md:p-8 h-full"
      >
        <EmployeesHeader
          isSuperAdmin={isSuperAdmin}
          viewMode={viewMode}
          onViewModeChange={handleViewModeChange}
          onAddUser={() => handleOpenModal()}
          onToggleFilter={() => setFilterPanelOpen((p) => !p)}
          searchQuery={rawSearch}
          onSearchChange={(q) => updateParams({ search: q || null })}
        />

        {activeFilterChips.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 mb-4">
            {activeFilterChips.map((chip) => (
              <span
                key={chip.key}
                className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-brand-50 text-brand-700 border border-brand-200"
              >
                {chip.label}
                <button onClick={chip.onRemove} className="hover:text-brand-900 transition-colors">
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
            {hasActiveFilters && (
              <button
                onClick={handleResetFilters}
                className="text-xs font-semibold text-content-muted hover:text-content-primary transition-colors"
              >
                Очистити всі
              </button>
            )}
          </div>
        )}

        <div className="flex gap-6">
          <FilterPanel
            isMobileOpen={filterPanelOpen}
            onMobileClose={() => setFilterPanelOpen(false)}
            selectedRoles={selectedRoles}
            onRolesChange={(roles) => updateParams({ roles: roles.length > 0 ? roles.join(",") : null })}
            selectedCity={selectedCity || "all"}
            onCityChange={(city) => updateParams({ city: city === "all" ? null : city })}
            cityOptions={cityOptions}
            onReset={handleResetFilters}
            hasActiveFilters={hasActiveFilters}
          />

          <div className="flex-1 min-w-0">
            {filteredUsers.length === 0 ? (
              <EmptyState
                icon={Search}
                title="Нічого не знайдено"
                description="Спробуйте змінити параметри пошуку або фільтри"
                action={
                  hasActiveFilters || debouncedSearch.trim() ? (
                    <button
                      onClick={handleResetFilters}
                      className="text-sm font-semibold text-brand hover:text-brand-700 transition-colors"
                    >
                      Очистити фільтри
                    </button>
                  ) : isSuperAdmin ? (
                    <button
                      onClick={() => handleOpenModal()}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:text-brand-700 transition-colors"
                    >
                      <UserPlus className="w-4 h-4" />
                      Додати працівника
                    </button>
                  ) : undefined
                }
              />
            ) : viewMode === "cards" ? (
              <div className="space-y-8">
                {grouped.map(({ role, label, items }) => (
                  <motion.div
                    key={role}
                    variants={sectionVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-1 h-6 rounded-full ${ROLE_HEADER_COLORS[role]}`} />
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
                        className="bg-white rounded-2xl border border-dashed border-slate-200 p-8 text-center"
                      >
                        <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 text-lg">👤</div>
                        <p className="text-slate-400 text-sm mb-3">Немає {label.toLowerCase()}ів</p>
                        {isSuperAdmin && (
                          <button onClick={() => handleOpenModal()} className="text-xs font-semibold text-blue-600 hover:text-blue-700">
                            + Додати {label.toLowerCase()}а
                          </button>
                        )}
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
                    )}
                  </motion.div>
                ))}

                <div className="border-t border-slate-200 pt-10">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
                    <div>
                      <h2 className="text-2xl font-bold text-slate-800">Види подій (Проєкти)</h2>
                      <p className="text-sm text-slate-400 mt-1">Ці проєкти відображатимуться у випадаючому списку при створенні події</p>
                    </div>
                    {isSuperAdmin && (
                      <button onClick={() => handleOpenProjectModal()} className="bg-emerald-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-emerald-700 transition-colors w-full sm:w-auto">
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
                        whileHover={{ y: -3, boxShadow: "0 8px 24px -4px rgba(0,0,0,0.10)" }}
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
                              <p className="text-xs text-slate-400">{(p as any).pricePerChild} грн / дитина</p>
                            )}
                          </div>
                        </div>
                        {isSuperAdmin && (
                          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => handleOpenProjectModal(p)} className="text-slate-300 hover:text-blue-500 p-2 -mr-1" title="Редагувати">✏️</button>
                            <button onClick={() => handleDeleteProject(p.id, p.name)} className="text-slate-300 hover:text-red-500 p-2 -mr-2" title="Видалити">🗑</button>
                          </div>
                        )}
                      </motion.div>
                    ))}
                    {projects.length === 0 && (
                      <div className="col-span-full text-center py-10 text-slate-400">Ви ще не додали жодного виду події</div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <EmployeesTable users={filteredUsers} onSelect={(user) => console.log("select", user)} />
            )}
          </div>
        </div>

        <ProjectModal
          isOpen={isProjectModalOpen}
          isEditing={!!editingProject}
          form={projectForm}
          setForm={setProjectForm}
          onClose={() => { setIsProjectModalOpen(false); setEditingProject(null); }}
          onSubmit={handleCreateProject}
        />
        <UserModal
          isOpen={isModalOpen}
          isEditing={!!editingUser}
          form={form}
          setForm={setForm}
          cities={cities}
          formError={formError}
          isSubmitting={isSubmitting}
          showSuccess={showSuccess}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSubmit}
        />
      </motion.div>
    </MotionConfig>
  );
}
