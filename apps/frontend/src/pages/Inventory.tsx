import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useInventory, useAddStock } from "../hooks/useInventory";

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

export default function InventoryPage() {
  const { user } = useAuth();
  const { data: items, isLoading } = useInventory();
  const addStock = useAddStock();
  const [stockModal, setStockModal] = useState<{ id: string; name: string } | null>(null);
  const [quantity, setQuantity] = useState(0);

  const canAddStock = user?.role === "MANAGER" || user?.role === "SUPERADMIN" || user?.role === "OWNER";

  const handleAddStock = async () => {
    if (!stockModal || quantity <= 0) return;
    await addStock.mutateAsync({ id: stockModal.id, quantity });
    setStockModal(null);
    setQuantity(0);
  };

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Склад</h1>
      </div>

      {isLoading ? (
        <div className="text-slate-500">Завантаження...</div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-2xl border border-slate-200">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                <th className="text-left px-4 py-3 font-semibold text-slate-600">Назва</th>
                <th className="text-left px-4 py-3 font-semibold text-slate-600">Артикул</th>
                <th className="text-left px-4 py-3 font-semibold text-slate-600">Од.</th>
                <th className="text-center px-4 py-3 font-semibold text-slate-600">На складі</th>
                <th className="text-center px-4 py-3 font-semibold text-slate-600">Мін.</th>
                <th className="text-right px-4 py-3 font-semibold text-slate-600">Дії</th>
              </tr>
            </thead>
            <tbody>
              {items?.map((item) => (
                <tr key={item.id} className="border-b border-slate-50 hover:bg-slate-50/50">
                  <td className="px-4 py-3 font-medium text-slate-800">{item.name}</td>
                  <td className="px-4 py-3 text-slate-500">{item.sku || "—"}</td>
                  <td className="px-4 py-3 text-slate-500">{item.unit}</td>
                  <td className="px-4 py-3 text-center">
                    <StockBadge current={item.currentStock} min={item.minStock} />
                  </td>
                  <td className="px-4 py-3 text-center text-slate-600">{item.minStock}</td>
                  <td className="px-4 py-3 text-right space-x-2">
                    {canAddStock && (
                      <button
                        onClick={() => setStockModal({ id: item.id, name: item.name })}
                        className="text-xs px-3 py-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 font-medium"
                      >
                        Поповнити
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {(!items || items.length === 0) && (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-slate-400">
                    Склад порожній
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

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
              value={quantity || ""}
              onChange={(e) => setQuantity(+e.target.value)}
              placeholder="Кількість"
              className="w-full p-3 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none mb-4"
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
                disabled={quantity <= 0 || addStock.isPending}
                className="flex-1 py-2.5 rounded-xl bg-blue-600 text-white font-medium text-sm disabled:opacity-50"
              >
                {addStock.isPending ? "..." : "Додати"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
