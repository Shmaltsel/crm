import { motion, AnimatePresence } from "framer-motion";
import {
  backdropVariants,
  modalVariants,
  formVariants,
  fieldVariants,
  shakeVariants,
  checkmarkVariants,
} from "../../animations/employees";

type Role = "MANAGER" | "DRIVER" | "HOST" | "SUPERADMIN" | "GUEST";
interface City {
  id: string;
  name: string;
}
interface FormState {
  fullName: string;
  phone: string;
  email: string;
  cityId: string;
  role: Role;
  password: string;
  telegramId: string;
  car: string;
}

interface Props {
  isOpen: boolean;
  isEditing: boolean;
  form: FormState;
  setForm: (form: FormState) => void;
  cities: City[];
  formError: string;
  isSubmitting: boolean;
  showSuccess: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function UserModal({
  isOpen,
  isEditing,
  form,
  setForm,
  cities,
  formError,
  isSubmitting,
  showSuccess,
  onClose,
  onSubmit,
}: Props) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
            className="relative bg-white rounded-2xl shadow-xl w-full sm:max-w-lg overflow-hidden flex flex-col"
          >
            <AnimatePresence>
              {showSuccess && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-white z-10 flex flex-col items-center justify-center gap-3"
                >
                  <motion.div
                    variants={checkmarkVariants}
                    initial="hidden"
                    animate="visible"
                    className="w-16 h-16 rounded-full bg-emerald-500 flex items-center justify-center text-white text-3xl"
                  >
                    ✓
                  </motion.div>
                  <p className="text-slate-600 font-medium">Збережено</p>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50 shrink-0">
              <h3 className="text-xl font-bold">
                {isEditing ? "Редагувати" : "Новий користувач"}
              </h3>
              <button
                onClick={onClose}
                className="text-slate-400 text-xl p-2 -mr-2"
              >
                ✕
              </button>
            </div>
            <motion.form
              onSubmit={onSubmit}
              variants={formVariants}
              initial="hidden"
              animate="visible"
              className="p-6 flex flex-col gap-4 overflow-y-auto max-h-[70vh]"
            >
              <AnimatePresence>
                {formError && (
                  <motion.div
                    key={formError}
                    variants={shakeVariants}
                    animate="shake"
                    initial={{ opacity: 0 }}
                    exit={{ opacity: 0 }}
                    className="p-3 bg-red-50 text-red-600 text-sm rounded-lg"
                  >
                    {formError}
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.input
                variants={fieldVariants}
                type="text"
                value={form.fullName}
                onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                required
                placeholder="ПІБ"
                className="w-full p-2.5 border rounded-lg"
              />
              <motion.div
                variants={fieldVariants}
                className="grid grid-cols-2 gap-4"
              >
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
                  required={!isEditing}
                  placeholder="Пароль (мін. 8 симв., літера+цифра)"
                  minLength={8}
                  className="w-full p-2.5 border rounded-lg"
                />
              </motion.div>
              <motion.div
                variants={fieldVariants}
                className="grid grid-cols-2 gap-4"
              >
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
              </motion.div>
              <motion.div
                variants={fieldVariants}
                className="grid grid-cols-2 gap-4"
              >
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
              </motion.div>
              {form.role === "DRIVER" && (
                <motion.input
                  variants={fieldVariants}
                  type="text"
                  value={form.car || ""}
                  onChange={(e) => setForm({ ...form, car: e.target.value })}
                  placeholder="Автомобіль (напр. Renault Trafic)"
                  className="w-full p-2.5 border rounded-lg"
                />
              )}
              <motion.div variants={fieldVariants} className="flex gap-3 mt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 bg-slate-100 py-3 rounded-xl font-medium"
                >
                  Скасувати
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-medium disabled:opacity-60"
                >
                  {isSubmitting ? "Збереження..." : "Зберегти"}
                </button>
              </motion.div>
            </motion.form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
