import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="max-w-md w-full bg-white rounded-[24px] shadow-sm border border-slate-100 p-8 text-center">
        <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-4 text-3xl">
          🔍
        </div>
        <h1 className="text-xl font-bold text-slate-800 mb-2">
          Сторінку не знайдено
        </h1>
        <p className="text-sm text-slate-500 mb-6">
          Можливо, її було переміщено або видалено.
        </p>
        <button
          onClick={() => navigate("/")}
          className="px-5 py-2.5 rounded-full bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 transition-colors active:scale-95"
        >
          На головну
        </button>
      </div>
    </div>
  );
}
