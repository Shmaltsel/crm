import React from 'react';
import type { SchoolProfileData } from '../../../types';

interface EditSchoolModalProps {
  isOpen: boolean;
  onClose: () => void;
  editForm: SchoolProfileData;
  setEditForm: React.Dispatch<React.SetStateAction<SchoolProfileData>>;
  onSave: (e: React.FormEvent) => void;
}

export default function EditSchoolModal({ isOpen, onClose, editForm, setEditForm, onSave }: EditSchoolModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center sm:p-4">
      {/* Bottom-sheet на мобільному, центрований діалог на десктопі */}
      <div className="bg-white rounded-t-3xl sm:rounded-2xl shadow-xl w-full sm:max-w-2xl overflow-hidden max-h-[92vh] flex flex-col">
        <div className="sm:hidden w-10 h-1.5 bg-slate-200 rounded-full mx-auto mt-3" />

        {/* Шапка не зжимається (shrink-0) */}
        <div className="p-5 sm:p-6 border-b flex justify-between items-center bg-slate-50 shrink-0">
          <h3 className="text-xl font-bold">Редагування</h3>
          <button onClick={onClose} className="text-slate-400 p-2 -mr-2">✕</button>
        </div>

        {/* Форма скролиться (overflow-y-auto) */}
        <form onSubmit={onSave} className="p-5 sm:p-6 overflow-y-auto flex-1 flex flex-col gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1">Тип</label>
              <select value={editForm.type} onChange={e => setEditForm({...editForm, type: e.target.value})} className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500">
                <option>Школа</option>
                <option>Садочок</option>
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm mb-1">Адреса</label>
              <input type="text" value={editForm.address} onChange={e => setEditForm({...editForm, address: e.target.value})} className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm mb-1">Контакт</label>
              <input type="text" value={editForm.director} onChange={e => setEditForm({...editForm, director: e.target.value})} className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm mb-1">Телефон</label>
              <input type="text" value={editForm.phone} onChange={e => setEditForm({...editForm, phone: e.target.value})} className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm mb-1">Email</label>
              <input type="email" value={editForm.email} onChange={e => setEditForm({...editForm, email: e.target.value})} className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm mb-1">Дітей</label>
              <input type="number" value={editForm.childrenCount || ''} onChange={e => setEditForm({...editForm, childrenCount: Number(e.target.value)})} className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>
          
          <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 mt-6 shrink-0 pt-4 border-t border-slate-100 pb-1 sm:pb-0">
            <button type="button" onClick={onClose} className="w-full sm:w-auto px-5 py-3 sm:py-2.5 bg-slate-100 hover:bg-slate-200 font-medium rounded-xl transition-colors">Скасувати</button>
            <button type="submit" className="w-full sm:w-auto bg-blue-600 text-white px-5 py-3 sm:py-2.5 font-medium rounded-xl hover:bg-blue-700 transition-colors">Зберегти</button>
          </div>
        </form>
      </div>
    </div>
  );
}
