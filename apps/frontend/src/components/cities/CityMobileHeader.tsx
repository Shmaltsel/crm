import { useNavigate } from "react-router-dom";

interface Props {
  selectedCity: any;
}

export default function CityMobileHeader({ selectedCity }: Props) {
  const navigate = useNavigate();

  return (
    <div className="md:hidden flex flex-col gap-4 mb-4">
      {/* Сповіщення про проблему */}
      <div className="bg-[#FFF4F4] border border-red-100 rounded-2xl p-4 flex items-center gap-4">
        <div className="w-10 h-10 bg-red-100 text-red-500 rounded-full flex items-center justify-center shrink-0 text-xl shadow-sm">
          🔔
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-bold text-slate-800 text-sm">1 активна проблема</p>
          <p className="text-xs text-slate-600 truncate mt-0.5">Початкова приватна школа "Альфа"</p>
          <p className="text-[10px] text-slate-400 mt-1">27.06.2026</p>
        </div>
        <button className="text-slate-400 hover:text-slate-600 text-xl font-light">›</button>
      </div>

      {/* Поточне місто */}
      {selectedCity?.id && (
        <div className="bg-white border border-blue-50 rounded-2xl p-4 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">Поточне місто</span>
            <span className="bg-emerald-50 text-emerald-600 px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center gap-1.5">
              ✓ Активне місто
            </span>
          </div>

          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-50 text-blue-600 flex items-center justify-center rounded-full text-lg">📍</div>
            <h2 className="text-2xl font-bold text-slate-800">{selectedCity.name}</h2>
          </div>

          <div className="flex items-center justify-between text-xs font-medium gap-2">
            <div className="flex items-center gap-1.5 text-slate-600 bg-slate-50 px-2.5 py-2 rounded-xl">
              <span className="text-blue-500 text-sm">📅</span> 4 події сьогодні
            </div>
            <div className="flex items-center gap-1.5 text-slate-600 bg-slate-50 px-2.5 py-2 rounded-xl">
              <span className="text-blue-500 text-sm">🏫</span> 28 шкіл
            </div>
            <div className="flex items-center gap-1.5 text-rose-600 bg-rose-50 px-2.5 py-2 rounded-xl">
              <span className="text-sm">⚠️</span> 1 проблема
            </div>
            <button 
              onClick={() => navigate(`/cities/${selectedCity.id}`)} 
              className="w-10 h-10 flex items-center justify-center bg-white border border-slate-200 rounded-xl text-blue-600 shadow-sm shrink-0"
            >
              →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
