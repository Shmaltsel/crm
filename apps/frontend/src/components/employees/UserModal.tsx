import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  backdropVariants,
  modalContentVariants,
  formVariants,
  shakeVariants,
  checkmarkVariants,
} from "../../animations/employees";

type Role = "MANAGER" | "DRIVER" | "HOST" | "SUPERADMIN" | "GUEST";
interface City { id: string; name: string }

interface Props {
  isOpen: boolean;
  isEditing: boolean;
  initialValues: {
    fullName: string; phone: string; email: string; cityId: string;
    role: Role; password: string; telegramId: string; car: string;
  };
  cities: City[];
  formError: string;
  isSubmitting: boolean;
  showSuccess: boolean;
  onClose: () => void;
  onSave: (values: Record<string, string>) => void;
}

const PHONE_REGEX = /^(\+?380\d{9}|0\d{9}|\d{10,13})$/;

const validationSchema = Yup.object({
  fullName: Yup.string().required("ПІБ обов'язкове"),
  email: Yup.string().email("Невірний формат email").required("Email обов'язковий"),
  phone: Yup.string().matches(PHONE_REGEX, "Невірний формат телефону (+380...)"),
  password: Yup.string().min(6, "Мінімум 6 символів"),
  telegramId: Yup.string(),
  car: Yup.string(),
  cityId: Yup.string(),
  role: Yup.string().required(),
});

export default function UserModal({
  isOpen,
  isEditing,
  initialValues,
  cities,
  formError,
  isSubmitting,
  showSuccess,
  onClose,
  onSave,
}: Props) {
  const formik = useFormik({
    initialValues: {
      fullName: initialValues.fullName,
      phone: initialValues.phone ?? "",
      email: initialValues.email,
      cityId: initialValues.cityId ?? "",
      role: initialValues.role as string,
      password: initialValues.password ?? "",
      telegramId: initialValues.telegramId ?? "",
      car: initialValues.car ?? "",
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      onSave(values);
    },
  });

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            variants={modalContentVariants}
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
              <button onClick={onClose} className="text-slate-400 text-xl p-2 -mr-2 active:scale-90 transition-transform duration-fast">
                ✕
              </button>
            </div>

            <motion.form
              onSubmit={formik.handleSubmit}
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

              <div>
                <input
                  type="text"
                  name="fullName"
                  value={formik.values.fullName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="ПІБ"
                  className="w-full p-2.5 border rounded-lg text-base"
                />
                {formik.touched.fullName && formik.errors.fullName && (
                  <p className="text-xs text-red-500 mt-1">{formik.errors.fullName}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <input
                    type="email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Пошта"
                    className="w-full p-2.5 border rounded-lg text-base"
                  />
                  {formik.touched.email && formik.errors.email && (
                    <p className="text-xs text-red-500 mt-1">{formik.errors.email}</p>
                  )}
                </div>
                <div>
                  <input
                    type="password"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Пароль"
                    className="w-full p-2.5 border rounded-lg text-base"
                  />
                  {formik.touched.password && formik.errors.password && (
                    <p className="text-xs text-red-500 mt-1">{formik.errors.password}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <input
                    type="tel"
                    name="phone"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Телефон (+380...)"
                    className="w-full p-2.5 border rounded-lg text-base"
                  />
                  {formik.touched.phone && formik.errors.phone && (
                    <p className="text-xs text-red-500 mt-1">{formik.errors.phone}</p>
                  )}
                </div>
                <div>
                  <input
                    type="text"
                    name="telegramId"
                    value={formik.values.telegramId}
                    onChange={formik.handleChange}
                    placeholder="Telegram ID або @username"
                    className="w-full p-2.5 border rounded-lg text-base"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <select
                    name="role"
                    value={formik.values.role}
                    onChange={formik.handleChange}
                    className="w-full p-2.5 border rounded-lg text-base"
                  >
                    <option value="MANAGER">Менеджер</option>
                    <option value="DRIVER">Водій</option>
                    <option value="HOST">Ведучий</option>
                    <option value="SUPERADMIN">Суперадмін</option>
                  </select>
                </div>
                <div>
                  <select
                    name="cityId"
                    value={formik.values.cityId}
                    onChange={formik.handleChange}
                    className="w-full p-2.5 border rounded-lg text-base"
                  >
                    <option value="">Всі міста</option>
                    {cities.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {formik.values.role === "DRIVER" && (
                <div>
                  <input
                    type="text"
                    name="car"
                    value={formik.values.car ?? ""}
                    onChange={formik.handleChange}
                    placeholder="Автомобіль (напр. Renault Trafic)"
                    className="w-full p-2.5 border rounded-lg text-base"
                  />
                </div>
              )}

              <div className="flex gap-3 mt-2">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={isSubmitting}
                  className="flex-1 bg-slate-100 py-3 rounded-xl font-medium disabled:opacity-50 active:scale-[0.97] transition-transform duration-fast"
                >
                  Скасувати
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-medium disabled:opacity-60 active:scale-[0.97] transition-transform duration-fast"
                >
                  {isSubmitting ? "Збереження..." : "Зберегти"}
                </button>
              </div>
            </motion.form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
