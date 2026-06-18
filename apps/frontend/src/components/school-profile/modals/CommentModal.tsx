import React from 'react';

interface CommentModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: string;
  text: string;
  setText: (text: string) => void;
  onSave: (e: React.FormEvent) => void;
}

export default function CommentModal({ isOpen, onClose, mode, text, setText, onSave }: CommentModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between bg-slate-50">
          <h3 className="text-xl font-bold text-slate-800">
            {mode === 'pipeline' ? 'Завершення етапу' : 'Редагувати коментар'}
          </h3>
          <button onClick={onClose} className="text-slate-400">✕</button>
        </div>
        
        <form onSubmit={onSave} className="p-6">
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Коментар (необов'язково)
          </label>
          <textarea 
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Результати дзвінка, домовленості, примітки..."
            className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 resize-none h-32"
            autoFocus
          />
          
          <div className="flex justify-end gap-3 mt-6">
            <button type="button" onClick={onClose} className="px-5 py-2.5 text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl font-medium">
              Скасувати
            </button>
            <button type="submit" className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-blue-700">
              {mode === 'pipeline' ? 'Завершити етап' : 'Зберегти'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
