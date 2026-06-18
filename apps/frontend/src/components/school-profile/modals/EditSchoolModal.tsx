import React from 'react';

interface EditSchoolModalProps {
  isOpen: boolean;
  onClose: () => void;
  editForm: any;
  setEditForm: (data: any) => void;
  onSave: (e: React.FormEvent) => void;
}

export default function EditSchoolModal({ isOpen, onClose, editForm, setEditForm, onSave }: EditSchoolModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden">
        <div className="p-6 border-b flex justify-between items-center bg-slate-50">
          <h3 className="text-xl font-bold">Редагування</h3>
          <button onClick={onClose} className="text-slate-400">✕</button>
        </div>
        <form onSubmit={onSave} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm">Тип</label>
              <select value={editForm.type} onChange={e => setEditForm({...editForm, type: e.target.value})} className="w-full p-2 border rounded">
                <option>Школа</option>
                <option>Садочок</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm">Адреса</label>
              <input type="text" value={editForm.address} onChange={e => setEditForm({...editForm, address: e.target.value})} className="w-full p-2 border rounded" />
            </div>
            <div>
              <label className="block text-sm">Директор</label>
              <input type="text" value={editForm.director} onChange={e => setEditForm({...editForm, director: e.target.value})} className="w-full p-2 border rounded" />
            </div>
            <div>
              <label className="block text-sm">Телефон</label>
              <input type="text" value={editForm.phone} onChange={e => setEditForm({...editForm, phone: e.target.value})} className="w-full p-2 border rounded" />
            </div>
            <div>
              <label className="block text-sm">Email</label>
              <input type="email" value={editForm.email} onChange={e => setEditForm({...editForm, email: e.target.value})} className="w-full p-2 border rounded" />
            </div>
            <div>
              <label className="block text-sm">Дітей</label>
              <input type="number" value={editForm.childrenCount || ''} onChange={e => setEditForm({...editForm, childrenCount: Number(e.target.value)})} className="w-full p-2 border rounded" />
            </div>
          </div>
          <div className="flex justify-end gap-3 mt-6">
            <button type="button" onClick={onClose} className="px-5 py-2.5 bg-slate-100 rounded">Скасувати</button>
            <button type="submit" className="bg-blue-600 text-white px-5 py-2.5 rounded">Зберегти</button>
          </div>
        </form>
      </div>
    </div>
  );
}
