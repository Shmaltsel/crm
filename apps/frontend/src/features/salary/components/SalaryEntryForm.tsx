import { useState } from "react";
import { useCreateSalary } from "../../../hooks/useSalary";
import { useUsers } from "../../../hooks/useEmployees";
import { useToast } from "../../../components/ui/Toast";

const SALARY_ERROR_MAP: Record<string, string> = {
  "salary.notManager": "Недостатньо прав",
  "salary.reportNotApproved": "Звіт не подано або не затверджено",
  "salary.amountTooLarge": "Сума занадто велика (макс. 99 999 грн)",
  "report.notFound": "Звіт не знайдено",
};

export default function SalaryEntryForm({ reportId, cityId }: { reportId: string; cityId?: string }) {
  const { data: users = [] } = useUsers();
  const createSalary = useCreateSalary();
  const toast = useToast();

  const [employeeId, setEmployeeId] = useState("");
  const [amount, setAmount] = useState<number | "">("");
  const [comment, setComment] = useState("");

  const staff = users.filter((u) => {
    if (u.role !== "HOST" && u.role !== "DRIVER") return false;
    if (cityId && u.cityId !== cityId) return false;
    return true;
  });

  const handleAdd = () => {
    if (!employeeId || !amount || Number(amount) <= 0 || Number(amount) > 99999) {
      toast("Оберіть співробітника і суму від 1 до 99999 грн", "error");
      return;
    }
    createSalary.mutate(
      {
        reportId,
        items: [{ employeeId, amount: Number(amount), comment: comment.trim() || undefined }],
      },
      {
        onSuccess: () => {
          toast("Нарахування додано", "success");
          setEmployeeId("");
          setAmount("");
          setComment("");
        },
        onError: (error: unknown) => {
          const key = (error as { response?: { data?: { message?: string } } })?.response?.data?.message;
          toast(SALARY_ERROR_MAP[key ?? ""] ?? "Не вдалося додати нарахування", "error");
        },
      },
    );
  };

  return (
    <div className="flex flex-wrap items-center gap-2 mt-3 p-3 bg-surface-muted rounded-xl">
      <select
        value={employeeId}
        onChange={(e) => setEmployeeId(e.target.value)}
        className="flex-1 min-w-[140px] border border-border rounded-lg px-2 py-1.5 text-sm bg-surface"
      >
        <option value="">Співробітник…</option>
        {staff.map((u) => (
          <option key={u.id} value={u.id}>
            {u.name}
          </option>
        ))}
      </select>
      <input
        type="number"
        min={1}
        max={99999}
        placeholder="Сума"
        value={amount}
        onChange={(e) => setAmount(e.target.value === "" ? "" : Number(e.target.value))}
        className="w-24 rounded-control border border-border-strong px-3 py-2.5 text-base text-content-primary bg-surface placeholder:text-content-muted"
      />
      <input
        placeholder="Коментар (необов'язково)"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="flex-1 min-w-[120px] rounded-control border border-border-strong px-3 py-2.5 text-base text-content-primary bg-surface placeholder:text-content-muted"
      />
      <button
        onClick={handleAdd}
        disabled={createSalary.isPending}
        className="px-3 py-1.5 bg-brand text-white rounded-lg text-sm font-medium hover:bg-brand-700 disabled:opacity-50 transition"
      >
        Додати
      </button>
    </div>
  );
}
