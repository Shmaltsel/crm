import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  schoolEditSchema,
  type SchoolEditFormValues,
} from "./SchoolEditSchema";
import { backdropVariants, modalContentVariants } from "../../../lib/motion";

interface EditSchoolModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultValues: SchoolEditFormValues;
  onSave: (data: SchoolEditFormValues) => void;
}

export default function EditSchoolModal({
  isOpen,
  onClose,
  defaultValues,
  onSave,
}: EditSchoolModalProps) {
  const headingId = 'edit-school-modal-heading';
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) closeRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SchoolEditFormValues>({
    resolver: zodResolver(schoolEditSchema),
    defaultValues,
  });

  useEffect(() => {
    if (isOpen) reset(defaultValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby={headingId}
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 bg-backdrop backdrop-blur-sm z-[60] flex items-end sm:items-center justify-center sm:p-4"
          onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
          <motion.div
            variants={modalContentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="bg-white rounded-t-3xl sm:rounded-2xl shadow-xl w-full sm:max-w-2xl overflow-hidden max-h-[92vh] flex flex-col pb-safe"
          >
        <div className="sm:hidden w-10 h-1.5 bg-border-strong rounded-full mx-auto mt-3" />

        {/* Шапка не зжимається (shrink-0) */}
        <div className="p-5 sm:p-6 border-b flex justify-between items-center bg-surface-muted shrink-0">
          <h3 id={headingId} className="text-xl font-bold">Редагування</h3>
          <button ref={closeRef} onClick={onClose} aria-label="Закрити" className="text-content-muted p-2 -mr-2 active:scale-90 transition-transform duration-fast">
            ✕
          </button>
        </div>

        {/* Форма скролиться (overflow-y-auto) */}
        <form
          onSubmit={handleSubmit(onSave)}
          className="p-5 sm:p-6 overflow-y-auto flex-1 flex flex-col gap-4"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1">Тип</label>
              <select
                {...register("type")}
                className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option>Школа</option>
                <option>Садочок</option>
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm mb-1">Адреса</label>
              <input
                type="text"
                {...register("address")}
                className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Контакт</label>
              <input
                type="text"
                {...register("director")}
                className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Телефон</label>
              <input
                type="text"
                {...register("phone")}
                className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Email</label>
              <input
                type="email"
                {...register("email")}
                className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              {errors.email && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm mb-1">Дітей</label>
              <input
                type="number"
                {...register("childrenCount")}
                inputMode="numeric"
                className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              {errors.childrenCount && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.childrenCount.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 mt-6 shrink-0 pt-4 border-t border-border pb-1 sm:pb-0">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-5 py-3 sm:py-2.5 bg-surface-muted hover:bg-surface-muted font-medium rounded-xl transition-colors"
            >
              Скасувати
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto bg-blue-600 text-white px-5 py-3 sm:py-2.5 font-medium rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              Зберегти
            </button>
          </div>
        </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
