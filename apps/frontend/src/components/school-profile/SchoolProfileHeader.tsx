import { Link } from "react-router-dom";

interface Props {
  schoolData: any;
  onEdit: () => void;
  onAddEvent: () => void;
}

export default function SchoolProfileHeader({ schoolData, onEdit, onAddEvent }: Props) {
  return (
    <div className="mb-6">
      {/* Хлібні крихти */}
      <div className="text-xs md:text-sm text-slate-500 mb-4 truncate">
        <Link to="/schools" className="hover:text-blue-600 transition-colors">
          Школи / Садочки
        </Link>
        <span className="mx-2">›</span>
        <span className="text-slate-800 font-medium">
          {schoolData.type} "{schoolData.name}"
        </span>
      </div>

      {/* Заголовок та кнопки */}
      <div className="flex justify-between items-start md:items-center gap-4">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-800 leading-tight flex-1">
          {schoolData.type} "{schoolData.name}"
        </h1>

        {/* Десктопні кнопки */}
        <div className="hidden md:flex gap-3 shrink-0">
          <button
            onClick={onEdit}
            className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 text-sm font-medium transition-colors shadow-sm"
          >
            ✏️ Редагувати
          </button>
          <button
            onClick={onAddEvent}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium transition-colors shadow-sm"
          >
            ⏱ Додати подію
          </button>
        </div>

        {/* Мобільна кнопка Редагування (Іконка) */}
        <button 
          onClick={onEdit}
          className="md:hidden w-10 h-10 bg-white border border-slate-200 text-slate-600 rounded-xl flex items-center justify-center shrink-0 shadow-sm active:bg-slate-50 transition-colors"
        >
          ✏️
        </button>
      </div>
    </div>
  );
}