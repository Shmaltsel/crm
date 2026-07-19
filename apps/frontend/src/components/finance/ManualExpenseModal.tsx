import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Plus } from "lucide-react";
import { Modal } from "../ui/Modal";
import type { ManualExpense } from "../../types";
import { useCities } from "../../hooks/useCities";
import { useCategories, useCreateCategory } from "../../hooks/useCategories";

const schema = z.object({
  category: z.string().min(1, "Оберіть категорію"),
  name: z.string().optional().default(""),
  description: z.string().optional().default(""),
  amount: z.coerce.number().positive("Сума повинна бути більше 0"),
  date: z.string().min(1, "Вкажіть дату"),
  cityId: z.string().optional().default(""),
});

type FormValues = z.infer<typeof schema>;

interface ManualExpenseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: FormValues) => Promise<void>;
  expense?: ManualExpense | null;
}

const today = () => new Date().toISOString().split("T")[0];

export function ManualExpenseModal({ isOpen, onClose, onSave, expense }: ManualExpenseModalProps) {
  const { data: cities } = useCities();
  const { data: categories } = useCategories("EXPENSE");
  const createCategory = useCreateCategory();
  const [newCategory, setNewCategory] = useState("");
  const [addingCategory, setAddingCategory] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      category: "",
      name: "",
      description: "",
      amount: 0,
      date: today(),
      cityId: "",
    },
  });

  useEffect(() => {
    if (isOpen) {
      reset({
        category: expense?.category ?? "",
        name: expense?.name ?? "",
        description: expense?.description ?? "",
        amount: expense?.amount ?? 0,
        date: expense?.date?.split("T")[0] ?? today(),
        cityId: expense?.cityId ?? "",
      });
      setAddingCategory(false);
      setNewCategory("");
    }
  }, [isOpen, expense, reset]);

  const handleAddCategory = async () => {
    if (!newCategory.trim()) return;
    await createCategory.mutateAsync({ name: newCategory.trim(), type: "EXPENSE" });
    setValue("category", newCategory.trim());
    setNewCategory("");
    setAddingCategory(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={expense ? "Редагувати витрату" : "Нова витрата"}
      maxWidth="max-w-lg"
    >
      <form onSubmit={handleSubmit(onSave)} className="flex flex-col gap-4">
        <div>
          <label className="block text-sm mb-1 text-content-secondary">Категорія *</label>
          {addingCategory ? (
            <div className="flex gap-2">
              <input
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="Назва нової категорії"
                className="flex-1 p-2.5 border border-border-strong rounded-control bg-surface focus:ring-2 focus:ring-brand outline-none"
                autoFocus
                onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); handleAddCategory(); } if (e.key === "Escape") setAddingCategory(false); }}
              />
              <button type="button" onClick={handleAddCategory} disabled={createCategory.isPending} className="px-3 py-2.5 rounded-control bg-brand text-white text-sm">
                {createCategory.isPending ? "..." : "OK"}
              </button>
              <button type="button" onClick={() => setAddingCategory(false)} className="px-3 py-2.5 rounded-control bg-surface-muted text-content-secondary text-sm">
                ✕
              </button>
            </div>
          ) : (
            <div className="flex gap-2">
              <select
                {...register("category")}
                className="flex-1 p-2.5 border border-border-strong rounded-control bg-surface focus:ring-2 focus:ring-brand outline-none"
              >
                <option value="">Оберіть категорію</option>
                {categories?.map((cat) => (
                  <option key={cat.id} value={cat.name}>{cat.name}</option>
                ))}
              </select>
              <button type="button" onClick={() => setAddingCategory(true)} className="px-3 py-2.5 rounded-control border border-border-strong bg-surface hover:bg-surface-muted transition-colors" title="Додати категорію">
                <Plus className="w-4 h-4" />
              </button>
            </div>
          )}
          {errors.category && <p className="text-xs text-red-500 mt-1">{errors.category.message}</p>}
        </div>

        <div>
          <label className="block text-sm mb-1 text-content-secondary">Назва</label>
          <input
            {...register("name")}
            placeholder="Напр., Бензин для поїздки"
            className="w-full p-2.5 border border-border-strong rounded-control bg-surface focus:ring-2 focus:ring-brand outline-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-1 text-content-secondary">Сума (грн) *</label>
            <input
              type="number"
              step="0.01"
              {...register("amount")}
              inputMode="decimal"
              className="w-full p-2.5 border border-border-strong rounded-control bg-surface focus:ring-2 focus:ring-brand outline-none"
            />
            {errors.amount && <p className="text-xs text-red-500 mt-1">{errors.amount.message}</p>}
          </div>
          <div>
            <label className="block text-sm mb-1 text-content-secondary">Дата *</label>
            <input
              type="date"
              {...register("date")}
              className="w-full p-2.5 border border-border-strong rounded-control bg-surface focus:ring-2 focus:ring-brand outline-none"
            />
            {errors.date && <p className="text-xs text-red-500 mt-1">{errors.date.message}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm mb-1 text-content-secondary">Місто</label>
          <select
            {...register("cityId")}
            className="w-full p-2.5 border border-border-strong rounded-control bg-surface focus:ring-2 focus:ring-brand outline-none"
          >
            <option value="">— Без міста —</option>
            {cities?.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm mb-1 text-content-secondary">Опис</label>
          <textarea
            {...register("description")}
            rows={2}
            placeholder="Додаткові подробиці"
            className="w-full p-2.5 border border-border-strong rounded-control bg-surface focus:ring-2 focus:ring-brand outline-none resize-none"
          />
        </div>

        <div className="flex gap-3 mt-2 pt-4 border-t border-border">
          <button type="button" onClick={onClose} className="flex-1 py-2.5 rounded-pill bg-surface-muted text-content-secondary font-medium text-sm hover:bg-surface transition-colors">
            Скасувати
          </button>
          <button type="submit" disabled={isSubmitting} className="flex-1 py-2.5 rounded-pill bg-brand text-white font-medium text-sm hover:opacity-90 transition-opacity disabled:opacity-50">
            {isSubmitting ? "..." : expense ? "Зберегти" : "Додати"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
