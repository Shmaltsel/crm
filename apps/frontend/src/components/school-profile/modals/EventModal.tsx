import React, { useState, useEffect } from "react";
import { api } from "../../../config/api";

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventForm: any;
  setEventForm: (data: any) => void;
  onSave: (e: React.FormEvent) => void;
}

export default function EventModal({
  isOpen,
  onClose,
  eventForm,
  setEventForm,
  onSave,
}: EventModalProps) {
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    if (isOpen) {
      api
        .get("/projects", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
        .then((res) => {
          setProjects(res.data);
          // Якщо поточний проєкт не вибраний, автовибираємо перший доступний
          if (!eventForm.project && res.data.length > 0) {
            setEventForm((prev: any) => ({
              ...prev,
              project: res.data[0].name,
            }));
          }
        })
        .catch(console.error);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden max-h-[92vh] flex flex-col">
        <div className="p-5 sm:p-6 border-b border-slate-100 flex justify-between bg-slate-50 shrink-0">
          <h3 className="text-xl font-bold text-slate-800">Нова подія</h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-2 -mr-2 text-xl leading-none"
          >
            ✕
          </button>
        </div>
        <form
          onSubmit={onSave}
          className="p-5 sm:p-6 overflow-y-auto flex-1 flex flex-col gap-4"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-sm mb-1 text-slate-600">
                Проєкт (Вид події)
              </label>
              <select
                value={eventForm.project}
                onChange={(e) =>
                  setEventForm({ ...eventForm, project: e.target.value })
                }
                className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
                required
              >
                <option value="" disabled>
                  Оберіть вид події
                </option>
                {projects.length > 0 ? (
                  projects.map((p) => (
                    <option key={p.id} value={p.name}>
                      {p.name}
                    </option>
                  ))
                ) : (
                  <>
                    <option>Голограма для школи</option>
                    <option>360° шоу</option>
                  </>
                )}
              </select>
            </div>
            <div>
              <label className="block text-sm mb-1 text-slate-600">Дата</label>
              <input
                type="date"
                value={eventForm.date}
                onChange={(e) =>
                  setEventForm({ ...eventForm, date: e.target.value })
                }
                required
                className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm mb-1 text-slate-600">Час</label>
              <input
                type="time"
                value={eventForm.time}
                onChange={(e) =>
                  setEventForm({ ...eventForm, time: e.target.value })
                }
                required
                className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm mb-1 text-slate-600">
                Дітей (план)
              </label>
              <input
                type="number"
                value={eventForm.childrenPlanned}
                onChange={(e) =>
                  setEventForm({
                    ...eventForm,
                    childrenPlanned: e.target.value,
                  })
                }
                required
                className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm mb-1 text-slate-600">
                Вартість
              </label>
              <input
                type="number"
                value={eventForm.price}
                onChange={(e) =>
                  setEventForm({ ...eventForm, price: e.target.value })
                }
                required
                className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm mb-1 text-slate-600">
                Адреса
              </label>
              <input
                type="text"
                value={eventForm.address}
                onChange={(e) =>
                  setEventForm({ ...eventForm, address: e.target.value })
                }
                className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm mb-1 text-slate-600">
                Контактна особа
              </label>
              <input
                type="text"
                value={eventForm.contactPerson}
                onChange={(e) =>
                  setEventForm({ ...eventForm, contactPerson: e.target.value })
                }
                className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm mb-1 text-slate-600">
                Телефон
              </label>
              <input
                type="text"
                value={eventForm.contactPhone}
                onChange={(e) =>
                  setEventForm({ ...eventForm, contactPhone: e.target.value })
                }
                className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="flex gap-3 mt-4 shrink-0 pt-4 border-t border-slate-100 pb-1">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-5 py-3 bg-slate-100 text-slate-600 hover:bg-slate-200 font-medium rounded-xl transition-colors"
            >
              Скасувати
            </button>
            <button
              type="submit"
              className="w-full sm:w-auto px-5 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors"
            >
              Створити
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
