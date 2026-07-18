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
  category: z.string().min(1, "\u041E\u0431\u0435\u0440\u0456\u0442\u044C \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0456\u044E"),
  name: z.string().optional().default(""),
  description: z.string().optional().default(""),
  amount: z.coerce.number().positive("\u0421\u0443\u043C\u0430 \u043F\u043E\u0432\u0438\u043D\u043D\u0430 \u0431\u0443\u0442\u0438 \u0431\u0456\u043B\u044C\u0448\u0435 0"),
  date: z.string().min(1, "\u0412\u043A\u0430\u0436\u0456\u0442\u044C \u0434\u0430\u0442\u0443"),
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
      title={expense ? "\u0420\u0435\u0434\u0430\u0433\u0443\u0432\u0430\u0442\u0438 \u0432\u0438\u0442\u0440\u0430\u0442\u0443" : "\u041D\u043E\u0432\u0430 \u0432\u0438\u0442\u0440\u0430\u0442\u0430"}
      maxWidth="max-w-lg"
    >
      <form onSubmit={handleSubmit(onSave)} className="flex flex-col gap-4">
        <div>
          <label className="block text-sm mb-1 text-content-secondary">\u041A\u0430\u0442\u0435\u0433\u043E\u0440\u0456\u044F *</label>
          {addingCategory ? (
            <div className="flex gap-2">
              <input
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="\u041D\u0430\u0437\u0432\u0430 \u043D\u043E\u0432\u043E\u0457 \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0456\u0457"
                className="flex-1 p-2.5 border border-border-strong rounded-control bg-surface focus:ring-2 focus:ring-brand outline-none"
                autoFocus
                onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); handleAddCategory(); } if (e.key === "Escape") setAddingCategory(false); }}
              />
              <button type="button" onClick={handleAddCategory} disabled={createCategory.isPending} className="px-3 py-2.5 rounded-control bg-brand text-white text-sm">
                {createCategory.isPending ? "..." : "OK"}
              </button>
              <button type="button" onClick={() => setAddingCategory(false)} className="px-3 py-2.5 rounded-control bg-surface-muted text-content-secondary text-sm">
                \u2715
              </button>
            </div>
          ) : (
            <div className="flex gap-2">
              <select
                {...register("category")}
                className="flex-1 p-2.5 border border-border-strong rounded-control bg-surface focus:ring-2 focus:ring-brand outline-none"
              >
                <option value="">\u041E\u0431\u0435\u0440\u0456\u0442\u044C \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0456\u044E</option>
                {categories?.map((cat) => (
                  <option key={cat.id} value={cat.name}>{cat.name}</option>
                ))}
              </select>
              <button type="button" onClick={() => setAddingCategory(true)} className="px-3 py-2.5 rounded-control border border-border-strong bg-surface hover:bg-surface-muted transition-colors" title="\u0414\u043E\u0434\u0430\u0442\u0438 \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0456\u044E">
                <Plus className="w-4 h-4" />
              </button>
            </div>
          )}
          {errors.category && <p className="text-xs text-red-500 mt-1">{errors.category.message}</p>}
        </div>

        <div>
          <label className="block text-sm mb-1 text-content-secondary">\u041D\u0430\u0437\u0432\u0430</label>
          <input
            {...register("name")}
            placeholder="\u041D\u0430\u043F\u0440., \u0411\u0435\u043D\u0437\u0438\u043D \u0434\u043B\u044F \u043F\u043E\u0457\u0437\u0434\u043A\u0438"
            className="w-full p-2.5 border border-border-strong rounded-control bg-surface focus:ring-2 focus:ring-brand outline-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-1 text-content-secondary">\u0421\u0443\u043C\u0430 (\u0433\u0440\u043D) *</label>
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
            <label className="block text-sm mb-1 text-content-secondary">\u0414\u0430\u0442\u0430 *</label>
            <input
              type="date"
              {...register("date")}
              className="w-full p-2.5 border border-border-strong rounded-control bg-surface focus:ring-2 focus:ring-brand outline-none"
            />
            {errors.date && <p className="text-xs text-red-500 mt-1">{errors.date.message}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm mb-1 text-content-secondary">\u041C\u0456\u0441\u0442\u043E</label>
          <select
            {...register("cityId")}
            className="w-full p-2.5 border border-border-strong rounded-control bg-surface focus:ring-2 focus:ring-brand outline-none"
          >
            <option value="">\u2014 \u0411\u0435\u0437 \u043C\u0456\u0441\u0442\u0430 \u2014</option>
            {cities?.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm mb-1 text-content-secondary">\u041E\u043F\u0438\u0441</label>
          <textarea
            {...register("description")}
            rows={2}
            placeholder="\u0414\u043E\u0434\u0430\u0442\u043A\u043E\u0432\u0456 \u043F\u043E\u0434\u0440\u043E\u0431\u0438\u0446\u0456"
            className="w-full p-2.5 border border-border-strong rounded-control bg-surface focus:ring-2 focus:ring-brand outline-none resize-none"
          />
        </div>

        <div className="flex gap-3 mt-2 pt-4 border-t border-border">
          <button type="button" onClick={onClose} className="flex-1 py-2.5 rounded-pill bg-surface-muted text-content-secondary font-medium text-sm hover:bg-surface transition-colors">
            \u0421\u043A\u0430\u0441\u0443\u0432\u0430\u0442\u0438
          </button>
          <button type="submit" disabled={isSubmitting} className="flex-1 py-2.5 rounded-pill bg-brand text-white font-medium text-sm hover:opacity-90 transition-opacity disabled:opacity-50">
            {isSubmitting ? "..." : expense ? "\u0417\u0431\u0435\u0440\u0435\u0433\u0442\u0438" : "\u0414\u043E\u0434\u0430\u0442\u0438"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
