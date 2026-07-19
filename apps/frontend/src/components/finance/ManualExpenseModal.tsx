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
  photoUrl: z.string().optional().default(""),
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
  const [categoryError, setCategoryError] = useState("");
  const [photoPreview, setPhotoPreview] = useState<string>("");

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
        photoUrl: expense?.photoUrl ?? "",
      });
      setPhotoPreview(expense?.photoUrl ?? "");
      setAddingCategory(false);
      setNewCategory("");
      setCategoryError("");
    }
  }, [isOpen, expense, reset]);

  const handleAddCategory = async () => {
    if (!newCategory.trim()) return;
    setCategoryError("");
    try {
      await createCategory.mutateAsync({ name: newCategory.trim(), type: "EXPENSE" });
      setValue("category", newCategory.trim());
      setNewCategory("");
      setAddingCategory(false);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Не вдалося створити категорію";
      setCategoryError(msg);
    }
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      setCategoryError("Фото занадто велике (макс. 5 МБ)");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      setPhotoPreview(base64);
      setValue("photoUrl", base64);
    };
    reader.readAsDataURL(file);
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
                onChange={(e) => { setNewCategory(e.target.value); setCategoryError(""); }}
                placeholder="Назва нової категорії"
                className="flex-1 p-2.5 border border-border-strong rounded-control bg-surface focus:ring-2 focus:ring-brand outline-none"
                autoFocus
                onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); handleAddCategory(); } if (e.key === "Escape") { setAddingCategory(false); setCategoryError(""); } }}
              />
              <button type="button" onClick={handleAddCategory} disabled={createCategory.isPending} className="px-3 py-2.5 rounded-control bg-brand text-white text-sm">
                {createCategory.isPending ? "..." : "OK"}
              </button>
              <button type="button" onClick={() => { setAddingCategory(false); setCategoryError(""); }} className="px-3 py-2.5 rounded-control bg-surface-muted text-content-secondary text-sm">
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
          {categoryError && <p className="text-xs text-red-500 mt-1">{categoryError}</p>}
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

        <div>
          <label className="block text-sm mb-1 text-content-secondary">Фото чека (необов'язково)</label>
          {photoPreview ? (
            <div className="relative inline-block">
              <img
                src={photoPreview}
                alt="Превʼю чека"
                className="max-h-32 rounded-lg border border-border object-contain"
              />
              <button
                type="button"
                onClick={() => { setPhotoPreview(""); setValue("photoUrl", ""); }}
                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full text-xs flex items-center justify-center hover:bg-red-600"
              >
                ✕
              </button>
            </div>
          ) : (
            <label className="flex items-center gap-2 px-4 py-3 border border-dashed border-border-strong rounded-lg cursor-pointer hover:bg-surface-muted transition-colors text-sm text-content-muted">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Натисніть для завантаження
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="hidden"
              />
            </label>
          )}
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
