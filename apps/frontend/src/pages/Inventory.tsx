import { useState, useMemo } from "react";
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

function StockBadge({ current, min }: { current: number; min: number }) {
  let color = "bg-green-100 text-green-700";
  if (current < min) color = "bg-red-100 text-red-700";
  else if (current === min) color = "bg-yellow-100 text-yellow-700";
  return (
    <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${color}`}>
      {current}
    </span>
  );
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
  const canAddStock = canEdit || user?.role === "MANAGER";

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
    <div key={item.id} className="bg-white rounded-xl border border-slate-200 p-4 space-y-3 sm:hidden">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <div className="font-semibold text-slate-800 truncate">{item.name}</div>
          {item.sku && <div className="text-xs text-slate-400 mt-0.5">{item.sku}</div>}
        </div>
        <StockBadge current={item.currentStock} min={item.minStock} />
      </div>
      <div className="flex items-center gap-3 text-xs text-slate-500">
        <span className="bg-slate-100 px-2 py-0.5 rounded">{item.category}</span>
        {item.project && <span className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded">{item.project}</span>}
        {item.city && <span>{item.city.name}</span>}
      </div>
      <div className="flex items-center gap-2 pt-1">
        {canAddStock && (
          <button onClick={() => setStockModal({ id: item.id, name: item.name })} className="text-xs px-3 py-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 font-medium">
            Поповнити
          </button>
        )}
        {canEdit && (
          <>
            <button onClick={() => handleOpenEdit(item)} className="text-xs px-3 py-1.5 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 font-medium">
              <Edit3 className="w-3.5 h-3.5 inline mr-1" />
              Змінити
            </button>
            <button onClick={() => setDeleteConfirm(item.id)} className="text-xs px-3 py-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 font-medium">
              <Trash2 className="w-3.5 h-3.5 inline mr-1" />
            </button>
          </>
        )}
      </div>
    </div>
  );

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Склад</h1>
        {canEdit && (
          <button
            onClick={handleOpenCreate}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Додати товар
          </button>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-3 mb-5">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Пошук товару..."
            enterKeyHint="search"
            className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-base focus:ring-2 focus:ring-blue-500 outline-none"
          />
          {search && (
            <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="p-2.5 border border-slate-200 rounded-xl text-base focus:ring-2 focus:ring-blue-500 outline-none bg-white"
        >
          <option value="">Всі категорії</option>
          {uniqueCategories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={lowStockOnly}
            onChange={(e) => setLowStockOnly(e.target.checked)}
            className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
          />
          Мало на складі
        </label>
      </div>

      {isLoading ? (
        <div className="text-slate-500 py-8 text-center">Завантаження...</div>
      ) : !items || items.length === 0 ? (
        <div className="text-slate-400 py-16 text-center">
          <p className="text-lg mb-2">Склад порожній</p>
          {canEdit && (
            <button onClick={handleOpenCreate} className="text-blue-600 font-medium text-sm hover:underline">
              + Додати перший товар
            </button>
          )}
        </div>
      ) : (
        <>
          {/* Mobile cards */}
          <div className="flex flex-col gap-3 sm:hidden">{items.map(cardView)}</div>

          {/* Desktop table */}
          <div className="hidden sm:block overflow-x-auto bg-white rounded-2xl border border-slate-200">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50">
                  <th className="text-left px-4 py-3 font-semibold text-slate-600">Назва</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-600">Категорія</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-600">Проєкт</th>
                  <th className="text-center px-4 py-3 font-semibold text-slate-600">На складі</th>
                  <th className="text-center px-4 py-3 font-semibold text-slate-600">Мін.</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-600">Місто</th>
                  <th className="text-right px-4 py-3 font-semibold text-slate-600">Дії</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id} className="border-b border-slate-50 hover:bg-slate-50/50">
                    <td className="px-4 py-3 font-medium text-slate-800">{item.name}</td>
                    <td className="px-4 py-3 text-slate-500">{item.category}</td>
                    <td className="px-4 py-3 text-slate-500">{item.project || "—"}</td>
                    <td className="px-4 py-3 text-center">
                      <StockBadge current={item.currentStock} min={item.minStock} />
                    </td>
                    <td className="px-4 py-3 text-center text-slate-600">{item.minStock}</td>
                    <td className="px-4 py-3 text-slate-500">{item.city?.name || "—"}</td>
                    <td className="px-4 py-3 text-right space-x-2">
                      {canAddStock && (
                        <button
                          onClick={() => setStockModal({ id: item.id, name: item.name })}
                          className="text-xs px-3 py-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 font-medium"
                        >
                          Поповнити
                        </button>
                      )}
                      {canEdit && (
                        <>
                          <button
                            onClick={() => handleOpenEdit(item)}
                            className="text-xs px-3 py-1.5 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 font-medium"
                          >
                            <Edit3 className="w-3.5 h-3.5 inline mr-1" />
                            Змінити
                          </button>
                          <button
                            onClick={() => setDeleteConfirm(item.id)}
                            className="text-xs px-3 py-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 font-medium"
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
      {canEdit && (
        <button
          onClick={handleOpenCreate}
          className="sm:hidden fixed right-4 z-40 w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-blue-700 transition-colors"
          style={{ bottom: "calc(5rem + env(safe-area-inset-bottom, 0px))" }}
          aria-label="Додати товар"
        >
          <Plus className="w-6 h-6" />
        </button>
      )}

      {/* Create/Edit Modal */}
      <InventoryItemModal
        isOpen={modalOpen}
        onClose={() => { setModalOpen(false); setEditItem(null); }}
        onSave={handleSave}
        item={editItem}
      />

      {/* Stock modal */}
      {stockModal && (
        <div
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center"
          onClick={(e) => { if (e.target === e.currentTarget) setStockModal(null); }}
        >
          <div className="bg-white rounded-2xl p-6 shadow-xl w-full max-w-sm mx-4">
            <h2 className="text-lg font-bold text-slate-800 mb-1">Поповнення складу</h2>
            <p className="text-sm text-slate-500 mb-4">{stockModal.name}</p>
            <input
              type="number"
              min={1}
              value={stockQty || ""}
              onChange={(e) => setStockQty(+e.target.value)}
              placeholder="Кількість"
              className="w-full p-3 border border-slate-200 rounded-xl text-base focus:ring-2 focus:ring-blue-500 outline-none mb-4"
              inputMode="numeric"
              autoFocus
            />
            <div className="flex gap-3">
              <button
                onClick={() => setStockModal(null)}
                className="flex-1 py-2.5 rounded-xl bg-slate-100 text-slate-600 font-medium text-sm"
              >
                Скасувати
              </button>
              <button
                onClick={handleAddStock}
                disabled={stockQty <= 0 || addStock.isPending}
                className="flex-1 py-2.5 rounded-xl bg-blue-600 text-white font-medium text-sm disabled:opacity-50"
              >
                {addStock.isPending ? "..." : "Додати"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirmation */}
      {deleteConfirm && (
        <div
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center"
          onClick={(e) => { if (e.target === e.currentTarget) setDeleteConfirm(null); }}
        >
          <div className="bg-white rounded-2xl p-6 shadow-xl w-full max-w-sm mx-4">
            <h2 className="text-lg font-bold text-slate-800 mb-2">Видалити товар?</h2>
            <p className="text-sm text-slate-500 mb-5">Цю дію не можна скасувати.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 py-2.5 rounded-xl bg-slate-100 text-slate-600 font-medium text-sm"
              >
                Скасувати
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                disabled={deleteItem.isPending}
                className="flex-1 py-2.5 rounded-xl bg-red-600 text-white font-medium text-sm disabled:opacity-50"
              >
                {deleteItem.isPending ? "..." : "Видалити"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
