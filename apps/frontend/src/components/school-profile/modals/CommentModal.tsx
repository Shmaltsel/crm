import React, { useEffect, useRef } from 'react';

interface CommentModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: string;
  text: string;
  setText: (text: string) => void;
  onSave: (e: React.FormEvent) => void;
}

export default function CommentModal({ isOpen, onClose, mode, text, setText, onSave }: CommentModalProps) {
  const headingId = 'comment-modal-heading';
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) closeRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={headingId}
      className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center sm:p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      onKeyDown={(e) => { if (e.key === 'Escape') onClose(); }}
    >
      <div className="bg-white rounded-t-3xl sm:rounded-2xl shadow-xl w-full sm:max-w-md overflow-hidden max-h-[90vh] flex flex-col pb-safe">
        <div className="sm:hidden w-10 h-1.5 bg-slate-200 rounded-full mx-auto mt-3" />
        <div className="p-5 sm:p-6 border-b border-slate-100 flex justify-between bg-slate-50 shrink-0">
          <h3 id={headingId} className="text-xl font-bold text-slate-800">
            {mode === 'pipeline' ? 'Завершення етапу' : mode === 'add_comment' ? 'Новий коментар' : 'Редагувати'}
          </h3>
          <button ref={closeRef} onClick={onClose} aria-label="Закрити" className="text-slate-400 p-2 -mr-2">✕</button>
        </div>
        <form onSubmit={onSave} className="p-5 sm:p-6 flex-1 flex flex-col">
          <label className="block text-sm font-medium text-slate-700 mb-2">
            {mode === 'add_comment' ? 'Коментар' : 'Коментар (необов\'язково)'}
          </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Результати дзвінка, домовленості, примітки..."
            className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 resize-none h-32 flex-1 min-h-[120px]"
            autoFocus
            required={mode === 'add_comment'}
          />
          <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 mt-6 shrink-0 pb-1 sm:pb-0">
            <button type="button" onClick={onClose} className="w-full sm:w-auto px-5 py-3 sm:py-2.5 text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl font-medium transition-colors">
              Скасувати
            </button>
            <button type="submit" className="w-full sm:w-auto bg-blue-600 text-white px-5 py-3 sm:py-2.5 rounded-xl font-medium hover:bg-blue-700 transition-colors">
              {mode === 'pipeline' ? 'Завершити' : 'Зберегти'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
