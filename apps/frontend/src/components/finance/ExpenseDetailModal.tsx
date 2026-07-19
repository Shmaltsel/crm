import { Modal } from "../ui/Modal";
import type { ManualExpense } from "../../types";

const fmt = (n: unknown) => new Intl.NumberFormat("uk-UA").format(Math.round(Number(n) || 0));

interface ExpenseDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  expense: ManualExpense;
}

export function ExpenseDetailModal({ isOpen, onClose, expense }: ExpenseDetailModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Деталі витрати">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-xs text-content-muted mb-1">Категорія</p>
            <p className="text-sm font-medium text-content-primary">{expense.category}</p>
          </div>
          {expense.name && (
            <div>
              <p className="text-xs text-content-muted mb-1">Назва</p>
              <p className="text-sm font-medium text-content-primary">{expense.name}</p>
            </div>
          )}
        </div>

        {expense.description && (
          <div>
            <p className="text-xs text-content-muted mb-1">Опис</p>
            <p className="text-sm text-content-primary">{expense.description}</p>
          </div>
        )}

        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-xs text-content-muted mb-1">Сума</p>
            <p className="text-lg font-bold text-content-primary">{fmt(expense.amount)} грн</p>
          </div>
          <div>
            <p className="text-xs text-content-muted mb-1">Дата</p>
            <p className="text-sm font-medium text-content-primary">
              {new Date(expense.date).toLocaleDateString("uk-UA")}
            </p>
          </div>
        </div>

        {(expense.city?.name || expense.createdBy?.name) && (
          <div className="grid grid-cols-2 gap-3">
            {expense.city?.name && (
              <div>
                <p className="text-xs text-content-muted mb-1">Місто</p>
                <p className="text-sm font-medium text-content-primary">{expense.city.name}</p>
              </div>
            )}
            {expense.createdBy?.name && (
              <div>
                <p className="text-xs text-content-muted mb-1">Автор</p>
                <p className="text-sm font-medium text-content-primary">{expense.createdBy.name}</p>
              </div>
            )}
          </div>
        )}

        {expense.photoUrl && (
          <div>
            <p className="text-xs text-content-muted mb-1">Фото чека</p>
            <a href={expense.photoUrl} target="_blank" rel="noopener noreferrer">
              <img
                src={expense.photoUrl}
                alt="Фото чека"
                className="rounded-xl max-h-64 object-contain border border-border"
              />
            </a>
          </div>
        )}
      </div>
    </Modal>
  );
}
