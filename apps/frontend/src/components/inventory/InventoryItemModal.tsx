import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Plus } from "lucide-react";
import { Modal } from "../ui/Modal";
import type { InventoryItem } from "../../types";
import { useProjects } from "../../hooks/useEmployees";
import { useCategories, useCreateCategory } from "../../hooks/useCategories";

const schema = z.object({
  name: z.string().min(1, "Введіть назву товару"),
  category: z.string().min(1, "Введіть категорію"),
  project: z.string().optional().default(""),
  minStock: z.coerce.number().min(0, "Мінімум не може бути від'ємним"),
  currentStock: z.coerce.number().min(0, "Кількість не може бути від'ємною"),
  notes: z.string().optional().default(""),
});

type FormValues = z.infer<typeof schema>;

interface InventoryItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: FormValues) => Promise<void>;
  item?: InventoryItem | null;
}

export function InventoryItemModal({ isOpen, onClose, onSave, item }: InventoryItemModalProps) {
  const { data: projects } = useProjects();
  const { data: categories } = useCategories("INVENTORY");
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
      name: "",
      category: "Інше",
      project: "",
      minStock: 5,
      currentStock: 0,
      notes: "",
    },
  });

  useEffect(() => {
    if (isOpen) {
      reset({
        name: item?.name ?? "",
        category: item?.category ?? "Інше",
        project: item?.project ?? "",
        minStock: item?.minStock ?? 5,
        currentStock: item?.currentStock ?? 0,
        notes: item?.notes ?? "",
      });
      setAddingCategory(false);
      setNewCategory("");
    }
  }, [isOpen, item, reset]);

  const handleAddCategory = async () => {
    if (!newCategory.trim()) return;
    await createCategory.mutateAsync({ name: newCategory.trim(), type: "INVENTORY" });
    setValue("category", newCategory.trim());
    setNewCategory("");
    setAddingCategory(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={item ? "Редагувати товар" : "Новий товар"} maxWidth="max-w-2xl">
      <form onSubmit={handleSubmit(onSave)} className="flex flex-col gap-4">
        <div>
          <label className="block text-sm mb-1 text-slate-600">Назва *</label>
          <input {...register("name")} className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
          {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-1 text-slate-600">Категорія *</label>
            {addingCategory ? (
              <div className="flex gap-2">
                <input
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  placeholder="Нова категорія"
                  className="flex-1 p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  autoFocus
                  onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); handleAddCategory(); } if (e.key === "Escape") setAddingCategory(false); }}
                />
                <button type="button" onClick={handleAddCategory} disabled={createCategory.isPending} className="px-3 py-2.5 rounded-lg bg-blue-600 text-white text-sm">
                  {createCategory.isPending ? "..." : "OK"}
                </button>
                <button type="button" onClick={() => setAddingCategory(false)} className="px-3 py-2.5 rounded-lg bg-slate-100 text-slate-600 text-sm">
                  ✕
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
                <select {...register("category")} className="flex-1 p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white">
                  <option value="">Оберіть...</option>
                  {categories?.map((cat) => (
                    <option key={cat.id} value={cat.name}>{cat.name}</option>
                  ))}
                </select>
                <button type="button" onClick={() => setAddingCategory(true)} className="px-3 py-2.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 transition-colors" title="Додати категорію">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            )}
            {errors.category && <p className="text-xs text-red-500 mt-1">{errors.category.message}</p>}
          </div>
          <div>
            <label className="block text-sm mb-1 text-slate-600">Проєкт</label>
            <select {...register("project")} className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white">
              <option value="">— Без проєкту —</option>
              {projects?.map((p) => (
                <option key={p.id} value={p.name}>{p.name}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-1 text-slate-600">Мінімум</label>
            <input type="number" {...register("minStock")} inputMode="numeric" className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
            {errors.minStock && <p className="text-xs text-red-500 mt-1">{errors.minStock.message}</p>}
          </div>
          <div>
            <label className="block text-sm mb-1 text-slate-600">На складі</label>
            <input type="number" {...register("currentStock")} inputMode="numeric" className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
            {errors.currentStock && <p className="text-xs text-red-500 mt-1">{errors.currentStock.message}</p>}
          </div>
        </div>
        <div>
          <label className="block text-sm mb-1 text-slate-600">Нотатки</label>
          <textarea {...register("notes")} rows={3} className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none" />
        </div>
        <div className="flex gap-3 mt-2 pt-4 border-t border-slate-100">
          <button type="button" onClick={onClose} className="flex-1 py-2.5 rounded-xl bg-slate-100 text-slate-600 font-medium text-sm hover:bg-slate-200 transition-colors">
            Скасувати
          </button>
          <button type="submit" disabled={isSubmitting} className="flex-1 py-2.5 rounded-xl bg-blue-600 text-white font-medium text-sm hover:bg-blue-700 transition-colors disabled:opacity-50">
            {isSubmitting ? "..." : item ? "Зберегти" : "Створити"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
