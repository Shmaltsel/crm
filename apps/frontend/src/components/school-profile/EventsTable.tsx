
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { staggerItem, fadeVariants, emptyStateVariants } from '../../lib/motion';
import type { Event } from '../../types';
import { useDeleteEvent } from '../../hooks/useSchoolProfile';
import { ConfirmDialog } from '../ui/ConfirmDialog';

interface EventsTableProps {
  events: Event[];
  selectedEventId: string | null;
  onEventSelect: (id: string) => void;
  onDeleteSuccess: () => void;
  schoolId: string;
  onAddEvent?: () => void;
}

export default function EventsTable({ events, selectedEventId, onEventSelect, onDeleteSuccess, schoolId, onAddEvent }: EventsTableProps) {
  const deleteMutation = useDeleteEvent(schoolId);
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; name: string } | null>(null);

  const handleDeleteClick = (e: React.MouseEvent, id: string, name: string) => {
    e.stopPropagation();
    setDeleteTarget({ id, name });
  };

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;
    try {
      await deleteMutation.mutateAsync(deleteTarget.id);
      onDeleteSuccess();
    } catch (error) {
      console.error('Помилка видалення:', error);
    } finally {
      setDeleteTarget(null);
    }
  };

  if (events.length === 0) {
    return (
      <motion.div
        variants={emptyStateVariants}
        initial="hidden"
        animate="visible"
        className="bg-surface rounded-card border border-border p-8 text-center"
      >
        <p className="text-4xl mb-3">📅</p>
        <p className="text-content-secondary mb-4">Ще немає подій</p>
        {onAddEvent && (
          <button
            onClick={onAddEvent}
            className="inline-flex items-center gap-2 px-4 py-2 bg-brand text-white text-sm font-medium rounded-control hover:bg-brand-hover transition-colors"
          >
            <span>➕</span> Додати подію
          </button>
        )}
      </motion.div>
    );
  }

  return (
    <div className="bg-surface rounded-card shadow-card border border-border overflow-hidden mt-2 w-full">
      <div className="p-4 sm:p-6 border-b border-border bg-surface-muted flex justify-between items-center">
        <h3 className="font-bold text-content-primary">Всі події ({events.length})</h3>
      </div>

      <div className="md:hidden divide-y divide-border">
        <AnimatePresence initial={false}>
        {events.map((ev, i) => (
          <motion.div
            key={ev.id}
            variants={staggerItem}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, x: -20 }}
            transition={{ delay: i * 0.04 }}
            onClick={() => onEventSelect(ev.id)}
            className={`flex items-center justify-between gap-3 p-4 transition-colors cursor-pointer ${selectedEventId === ev.id ? 'bg-brand-50/50' : 'active:bg-surface-muted'}`}
          >
            <div className="min-w-0">
              <p className="font-medium text-content-primary">{ev.project}</p>
              <p className="text-xs text-content-muted mt-0.5">{new Date(ev.date).toLocaleDateString()}</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="font-medium text-sm text-content-secondary">{ev.price} грн</span>
              <button
                onClick={(e) => handleDeleteClick(e, ev.id, ev.project)}
                className="text-danger-600 active:text-danger p-2.5 rounded-control active:scale-90 transition-transform duration-fast"
              >
                🗑
              </button>
            </div>
          </motion.div>
        ))}
        </AnimatePresence>
      </div>

      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="bg-surface border-b border-border text-content-muted">
              <th className="p-4">Дата</th>
              <th className="p-4">Проєкт</th>
              <th className="p-4">Вартість</th>
              <th className="p-4 text-center">Дія</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence initial={false}>
            {events.map((ev, i) => (
              <motion.tr
                key={ev.id}
                variants={fadeVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ delay: i * 0.03 }}
                onClick={() => onEventSelect(ev.id)}
                className={`border-b transition-colors cursor-pointer ${selectedEventId === ev.id ? 'bg-brand-50/50' : 'hover:bg-surface-muted'}`}
              >
                <td className="p-4 font-medium">{new Date(ev.date).toLocaleDateString()}</td>
                <td className="p-4">{ev.project}</td>
                <td className="p-4">{ev.price} грн</td>
                <td className="p-4 text-center">
                  <button
                    onClick={(e) => handleDeleteClick(e, ev.id, ev.project)}
                    className="text-danger-600 hover:text-danger p-2.5 active:scale-90 transition-transform duration-fast"
                  >
                    🗑
                  </button>
                </td>
              </motion.tr>
            ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      <ConfirmDialog
        isOpen={!!deleteTarget}
        title="Видалити подію?"
        message={`Подію «${deleteTarget?.name ?? ''}» буде видалено назавжди.`}
        confirmLabel="Видалити"
        variant="danger"
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}


