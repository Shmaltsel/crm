import { useState } from "react";
import { api } from "../../../config/api";
import type { City, CityProfile } from "../../../types";
import { useQuery } from "@tanstack/react-query";
interface CrewModalProps {
  isOpen: boolean;
  onClose: () => void;
  city?: string;
  onSave: (crewId: string) => void;
}

export default function CrewModal({
  isOpen,
  onClose,
  city,
  onSave,
}: CrewModalProps) {
  const { data: allCities = [] } = useQuery({
    queryKey: ["cities"],
    queryFn: () => api.get("/cities").then((r) => r.data),
    staleTime: 5 * 60 * 1000,
  });

  const currentCity = allCities.find((c: City) => c.name === city);
  const { data: cityProfile, isLoading } = useQuery({
    queryKey: ["cityProfile", currentCity?.id],
    queryFn: () =>
      api.get<CityProfile>(`/cities/${currentCity!.id}`).then((r) => r.data),
    enabled: !!currentCity?.id && isOpen,
    staleTime: 60 * 1000,
  });

  const crews = cityProfile?.crews || [];
  const [selectedCrewId, setSelectedCrewId] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <h3 className="text-xl font-bold text-slate-800">
            Призначити екіпаж
          </h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600"
          >
            ✕
          </button>
        </div>

        <div className="p-6">
          {isLoading ? (
            <p className="text-slate-500 text-center py-4">Завантаження...</p>
          ) : crews.length === 0 ? (
            <div className="text-center py-4">
              <p className="text-slate-500">
                У цьому місті ще немає сформованих екіпажів.
              </p>
              <p className="text-sm mt-2 text-blue-600">
                Створіть екіпаж у вкладці міста!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <label className="block text-sm font-medium text-slate-700">
                Оберіть готовий екіпаж
              </label>
              <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                {crews.map((crew) => (
                  <label
                    key={crew.id}
                    className={`flex items-start p-3 rounded-xl border cursor-pointer transition-all ${selectedCrewId === crew.id ? "border-blue-500 bg-blue-50/50 ring-1 ring-blue-500" : "border-slate-200 hover:border-blue-300"}`}
                  >
                    <input
                      type="radio"
                      name="crew"
                      value={crew.id}
                      checked={selectedCrewId === crew.id}
                      onChange={() => setSelectedCrewId(crew.id)}
                      className="mt-1 mr-3 text-blue-600 focus:ring-blue-500"
                    />
                    <div>
                      <p className="font-bold text-slate-800">{crew.name}</p>
                      <p className="text-xs text-slate-500 mt-1">
                        🎙️ {crew.host?.name || "—"} | 🚗{" "}
                        {crew.driver?.name || "—"}
                      </p>
                      {crew.car && (
                        <p className="text-xs text-emerald-600 mt-0.5">
                          Авто: {crew.car}
                        </p>
                      )}
                    </div>
                  </label>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-3 mt-6">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2.5 bg-slate-100 text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-200"
            >
              Скасувати
            </button>
            <button
              onClick={() => onSave(selectedCrewId)}
              disabled={!selectedCrewId}
              className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50 transition-opacity"
            >
              Призначити
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
