import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { api } from "../../../config/api";
import type { Project } from "../../../types";
import { eventSchema, type EventFormValues } from "./EventSchema";
import { backdropVariants, modalContentVariants } from "../../../lib/motion";

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultValues?: Partial<EventFormValues>;
  onSave: (data: EventFormValues) => void;
}

export default function EventModal({
  isOpen,
  onClose,
  defaultValues,
  onSave,
}: EventModalProps) {
  const headingId = 'event-modal-heading';
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
  const [projects, setProjects] = useState<Project[]>([]);
  const [priceTouched, setPriceTouched] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<EventFormValues>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      project: "",
      date: "",
      time: "",
      childrenPlanned: "",
      price: "",
      address: "",
      contactPerson: "",
      contactPhone: "",
      ...defaultValues,
    },
  });

  const currentProject = watch("project");
  const currentChildrenPlanned = watch("childrenPlanned");

  useEffect(() => {
    if (isOpen) {
      setPriceTouched(!!defaultValues?.price);
      reset({
        project: "",
        date: "",
        time: "",
        childrenPlanned: "",
        price: "",
        address: "",
        contactPerson: "",
        contactPhone: "",
        ...defaultValues,
      });
      setProjects([]);
      api.get<Project[]>("/projects")
        .then((res) => {
          setProjects(res.data);
          if (!defaultValues?.project && res.data.length > 0) {
            setValue("project", res.data[0].name);
          }
        })
        .catch(console.error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  useEffect(() => {
    if (priceTouched) return;
    const selected = projects.find((p) => p.name === currentProject) as
      | (Project & { pricePerChild?: number })
      | undefined;
    if (!selected?.pricePerChild) return;
    const count = Number(currentChildrenPlanned) || 0;
    setValue("price", String(count * selected.pricePerChild));
  }, [
    currentProject,
    currentChildrenPlanned,
    projects,
    priceTouched,
    setValue,
  ]);

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
          className="fixed inset-0 bg-backdrop md:backdrop-blur-sm z-[60] flex items-center justify-center p-4"
          onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
          <motion.div
            variants={modalContentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden max-h-[92vh] flex flex-col"
          >
        <div className="p-5 sm:p-6 border-b border-border flex justify-between bg-surface-muted shrink-0">
          <h3 id={headingId} className="text-xl font-bold text-content-primary">Нова подія</h3>
          <button ref={closeRef} onClick={onClose} aria-label="Закрити" className="text-content-muted hover:text-content-secondary p-2 -mr-2 text-xl leading-none active:scale-90 transition-transform duration-fast">
            ✕
          </button>
        </div>
        <form
          onSubmit={handleSubmit(onSave)}
          className="p-5 sm:p-6 overflow-y-auto flex-1 flex flex-col gap-4"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-sm mb-1 text-content-secondary">
                Проєкт (Вид події)
              </label>
              <select
                {...register("project")}
                disabled={projects.length === 0}
                className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 bg-white disabled:bg-surface-muted disabled:text-content-muted"
              >
                <option value="" disabled>
                  {projects.length === 0
                    ? "Завантаження видів подій..."
                    : "Оберіть вид події"}
                </option>
                {projects.map((p) => (
                  <option key={p.id} value={p.name}>
                    {p.name}
                  </option>
                ))}
              </select>
              {errors.project && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.project.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm mb-1 text-content-secondary">Дата</label>
              <input
                type="date"
                {...register("date")}
                className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              {errors.date && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.date.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm mb-1 text-content-secondary">Час</label>
              <input
                type="time"
                {...register("time")}
                className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              {errors.time && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.time.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm mb-1 text-content-secondary">
                Дітей (план)
              </label>
              <input
                type="number"
                {...register("childrenPlanned")}
                inputMode="numeric"
                className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              {errors.childrenPlanned && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.childrenPlanned.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm mb-1 text-content-secondary">
                Вартість
              </label>
              <input
                type="number"
                {...register("price")}
                inputMode="decimal"
                onInput={() => setPriceTouched(true)}
                className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-xs text-content-muted mt-1">
                Розраховується автоматично: діти × ціна за дитину. Можна
                змінити вручну.
              </p>
              {errors.price && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.price.message}
                </p>
              )}
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm mb-1 text-content-secondary">
                Адреса
              </label>
              <input
                type="text"
                {...register("address")}
                className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm mb-1 text-content-secondary">
                Контактна особа
              </label>
              <input
                type="text"
                {...register("contactPerson")}
                className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm mb-1 text-content-secondary">
                Телефон
              </label>
              <input
                type="text"
                {...register("contactPhone")}
                className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="flex gap-3 mt-4 shrink-0 pt-4 border-t border-border pb-1">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-5 py-3 bg-surface-muted text-content-secondary hover:bg-surface-muted font-medium rounded-xl transition-colors"
            >
              Скасувати
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto px-5 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              Створити
            </button>
          </div>
        </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
