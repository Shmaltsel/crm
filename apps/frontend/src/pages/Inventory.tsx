import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Search, Edit3, Trash2, X } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import {
  useInventory,
  useCreateInventoryItem,
  useUpdateInventoryItem,
  useDeleteInventoryItem,
  useAddStock,
} from "../hooks/useInventory";
import { InventoryItemModal } from "../components/inventory/InventoryItemModal";
import type { InventoryItem } from "../types";
import { Skeleton } from "../components/ui/Skeleton";
import { Badge } from "../components/ui/Badge";
import { Modal } from "../components/ui/Modal";
import { ConfirmDialog } from "../components/ui/ConfirmDialog";
import {
  staggerContainer,
  staggerItem,
  fabVariants,
  TRANSITION,
} from "../lib/motion";

function StockBadge({ current, min }: { current: number; min: number }) {
  let variant: "success" | "danger" | "warning" | "default" = "success";
  if (current < min) variant = "danger";
  else if (current === min) variant = "warning";
  return <Badge variant={variant}>{current}</Badge>;
}

const CATEGORIES = ["Техніка", "Матеріали", "Реквізит", "Канцелярія", "Інше"];

export default function InventoryPage() {
  const { user } = useAuth();
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [lowStockOnly, setLowStockOnly] = useState(false);

  const { data: items, isLoading } = useInventory({
    search: search || undefined,
    category: categoryFilter || undefined,
    lowStock: lowStockOnly ? "true" : undefined,
  });

  const createItem = useCreateInventoryItem();
  const updateItem = useUpdateInventoryItem();
  const deleteItem = useDeleteInventoryItem();
  const addStock = useAddStock();

  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<InventoryItem | null>(null);
  const [stockModal, setStockModal] = useState<{ id: string; name: string } | null>(null);
  const [stockQty, setStockQty] = useState(0);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const canEdit = user?.role === "SUPERADMIN" || user?.role === "OWNER";
  const canCreate = canEdit || user?.role === "MANAGER";
  const canAddStock = canCreate;

  const uniqueCategories = useMemo(() => {
    if (!items) return CATEGORIES;
    const cats = new Set(items.map((i) => i.category));
    return [...new Set([...CATEGORIES, ...cats])];
  }, [items]);

  const handleOpenCreate = () => {
    setEditItem(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (item: InventoryItem) => {
    setEditItem(item);
    setModalOpen(true);
  };

  const handleSave = async (data: { name: string; category: string; project?: string; minStock: number; currentStock: number; notes?: string }) => {
    if (editItem) {
      await updateItem.mutateAsync({ id: editItem.id, ...data });
    } else {
      await createItem.mutateAsync(data);
    }
    setModalOpen(false);
    setEditItem(null);
  };

  const handleDelete = async (id: string) => {
    await deleteItem.mutateAsync(id);
    setDeleteConfirm(null);
  };

  const handleAddStock = async () => {
    if (!stockModal || stockQty <= 0) return;
    await addStock.mutateAsync({ id: stockModal.id, quantity: stockQty });
    setStockModal(null);
    setStockQty(0);
  };

  const cardView = (item: InventoryItem) => (
    <motion.div key={item.id} className="bg-surface rounded-card border border-border p-4 space-y-3 sm:hidden" variants={staggerItem} whileTap={{ scale: 0.98 }} transition={TRANSITION.tap}>
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <div className="font-semibold text-content-primary truncate">{item.name}</div>
          {item.sku && <div className="text-xs text-content-muted mt-0.5">{item.sku}</div>}
        </div>
        <StockBadge current={item.currentStock} min={item.minStock} />
      </div>
      <div className="flex items-center gap-3 text-xs text-content-secondary">
        <span className="bg-surface-muted px-2 py-0.5 rounded-control">{item.category}</span>
        {item.project && <span className="bg-brand-50 text-brand px-2 py-0.5 rounded-control">{item.project}</span>}
        {item.city && <span>{item.city.name}</span>}
      </div>
      <div className="flex items-center gap-2 pt-1">
        {canAddStock && (
          <button onClick={() => setStockModal({ id: item.id, name: item.name })} className="text-xs px-3 py-1.5 rounded-control bg-brand-50 text-brand hover:bg-brand-100 font-medium active:scale-[0.97] transition-transform duration-fast">
            Поповнити
          </button>
        )}
        {canEdit && (
          <>
            <button onClick={() => handleOpenEdit(item)} className="text-xs px-3 py-1.5 rounded-control bg-surface-muted text-content-secondary hover:bg-border-strong font-medium active:scale-[0.97] transition-transform duration-fast">
              <Edit3 className="w-3.5 h-3.5 inline mr-1" />
              Змінити
            </button>
            <button onClick={() => setDeleteConfirm(item.id)} className="text-xs px-3 py-1.5 rounded-control bg-danger-50 text-danger hover:bg-danger-100 font-medium active:scale-90 transition-transform duration-fast">
              <Trash2 className="w-3.5 h-3.5 inline mr-1" />
            </button>
          </>
        )}
      </div>
    </motion.div>
  );

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-content-primary">Склад</h1>
        {canCreate && (
          <button
            onClick={handleOpenCreate}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 bg-brand text-white rounded-control text-sm font-medium hover:bg-brand-hover active:scale-[0.97] transition-all duration-fast"
          >
            <Plus className="w-4 h-4" />
            Додати товар
          </button>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-3 mb-5">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-content-muted" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Пошук товару..."
            enterKeyHint="search"
            className="w-full pl-9 pr-4 py-2.5 border border-border-strong rounded-control text-base focus:ring-2 focus:ring-brand/30 focus:border-brand outline-none bg-surface"
          />
          {search && (
            <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-content-muted hover:text-content-secondary transition-colors">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="p-2.5 border border-border-strong rounded-control text-base focus:ring-2 focus:ring-brand/30 focus:border-brand outline-none bg-surface"
        >
          <option value="">Всі категорії</option>
          {uniqueCategories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <label className="flex items-center gap-2 text-sm text-content-secondary cursor-pointer select-none">
          <input
            type="checkbox"
            checked={lowStockOnly}
            onChange={(e) => setLowStockOnly(e.target.checked)}
            className="rounded border-border-strong text-brand focus:ring-brand/30"
          />
          Мало на складі
        </label>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="mobile-card animate-pulse">
              <Skeleton className="h-4 w-1/2 mb-3" />
              <Skeleton className="h-3 w-1/3" />
            </div>
          ))}
        </div>
      ) : !items || items.length === 0 ? (
        <div className="text-content-muted py-16 text-center">
          <p className="text-lg mb-2">Склад порожній</p>
          {canCreate && (
            <button onClick={handleOpenCreate} className="text-brand font-medium text-sm hover:text-brand-hover active:scale-[0.97] transition-transform duration-fast">
              + Додати перший товар
            </button>
          )}
        </div>
      ) : (
        <>
          {/* Mobile cards */}
          <motion.div
            className="flex flex-col gap-3 sm:hidden"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >{items.map(cardView)}</motion.div>

          {/* Desktop table */}
          <div className="hidden sm:block overflow-x-auto bg-surface rounded-card shadow-card border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-surface-muted">
                  <th className="text-left px-4 py-3 font-semibold text-content-secondary">Назва</th>
                  <th className="text-left px-4 py-3 font-semibold text-content-secondary">Категорія</th>
                  <th className="text-left px-4 py-3 font-semibold text-content-secondary">Проєкт</th>
                  <th className="text-center px-4 py-3 font-semibold text-content-secondary">На складі</th>
                  <th className="text-center px-4 py-3 font-semibold text-content-secondary">Мін.</th>
                  <th className="text-left px-4 py-3 font-semibold text-content-secondary">Місто</th>
                  <th className="text-right px-4 py-3 font-semibold text-content-secondary">Дії</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id} className="border-b border-border last:border-0 hover:bg-surface-muted/50 transition-colors">
                    <td className="px-4 py-3 font-medium text-content-primary">{item.name}</td>
                    <td className="px-4 py-3 text-content-secondary">{item.category}</td>
                    <td className="px-4 py-3 text-content-secondary">{item.project || "—"}</td>
                    <td className="px-4 py-3 text-center">
                      <StockBadge current={item.currentStock} min={item.minStock} />
                    </td>
                    <td className="px-4 py-3 text-center text-content-secondary">{item.minStock}</td>
                    <td className="px-4 py-3 text-content-secondary">{item.city?.name || "—"}</td>
                    <td className="px-4 py-3 text-right space-x-2">
                      {canAddStock && (
                        <button
                          onClick={() => setStockModal({ id: item.id, name: item.name })}
                          className="text-xs px-3 py-1.5 rounded-control bg-brand-50 text-brand hover:bg-brand-100 font-medium active:scale-[0.97] transition-transform duration-fast"
                        >
                          Поповнити
                        </button>
                      )}
                      {canEdit && (
                        <>
                          <button
                            onClick={() => handleOpenEdit(item)}
                            className="text-xs px-3 py-1.5 rounded-control bg-surface-muted text-content-secondary hover:bg-border-strong font-medium active:scale-[0.97] transition-transform duration-fast"
                          >
                            <Edit3 className="w-3.5 h-3.5 inline mr-1" />
                            Змінити
                          </button>
                          <button
                            onClick={() => setDeleteConfirm(item.id)}
                            className="text-xs px-3 py-1.5 rounded-control bg-danger-50 text-danger hover:bg-danger-100 font-medium active:scale-90 transition-transform duration-fast"
                          >
                            <Trash2 className="w-3.5 h-3.5 inline" />
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* FAB for mobile */}
      {canCreate && (
        <motion.button
          onClick={handleOpenCreate}
          className="sm:hidden fab"
          variants={fabVariants}
          initial="hidden"
          animate="visible"
          whileTap={{ scale: 0.9 }}
          aria-label="Додати товар"
        >
          <Plus className="w-6 h-6" />
        </motion.button>
      )}

      {/* Create/Edit Modal */}
      <InventoryItemModal
        isOpen={modalOpen}
        onClose={() => { setModalOpen(false); setEditItem(null); }}
        onSave={handleSave}
        item={editItem}
      />

      {/* Stock modal */}
      <Modal
        isOpen={!!stockModal}
        onClose={() => setStockModal(null)}
        title="Поповнення складу"
        maxWidth="max-w-sm"
      >
        <p className="text-sm text-content-muted mb-4">{stockModal?.name}</p>
        <input
          type="number"
          min={1}
          value={stockQty || ""}
          onChange={(e) => setStockQty(+e.target.value)}
          placeholder="Кількість"
          className="w-full p-3 border border-border-strong rounded-control text-base focus:ring-2 focus:ring-brand/30 focus:border-brand outline-none mb-4 bg-surface"
          inputMode="numeric"
          autoFocus
        />
        <div className="flex gap-3">
          <button
            onClick={() => setStockModal(null)}
            className="flex-1 py-2.5 rounded-control bg-surface-muted text-content-secondary font-medium text-sm hover:bg-border-strong transition-colors active:scale-[0.97] transition-transform duration-fast"
          >
            Скасувати
          </button>
          <button
            onClick={handleAddStock}
            disabled={stockQty <= 0 || addStock.isPending}
            className="flex-1 py-2.5 rounded-control bg-brand text-white font-medium text-sm hover:bg-brand-hover disabled:opacity-50 active:scale-[0.97] transition-transform duration-fast"
          >
            {addStock.isPending ? "..." : "Додати"}
          </button>
        </div>
      </Modal>

      {/* Delete confirmation */}
      <ConfirmDialog
        isOpen={!!deleteConfirm}
        title="Видалити товар?"
        message="Цю дію не можна скасувати."
        confirmLabel="Видалити"
        variant="danger"
        onConfirm={() => handleDelete(deleteConfirm!)}
        onCancel={() => setDeleteConfirm(null)}
      />
    </div>
  );
}
