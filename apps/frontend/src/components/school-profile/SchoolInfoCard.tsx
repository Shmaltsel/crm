import AddressLink from "../AddressLink";

export default function SchoolInfoCard({ schoolData }: { schoolData: any }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
      <ul className="space-y-4 text-sm">
        <li className="flex gap-3"><span className="text-slate-400">🏛</span> <div><span className="text-slate-500">Тип:</span> <span className="font-medium">{schoolData.type || '—'}</span></div></li>
        <li className="flex gap-3"><span className="text-slate-400">📍</span> <div><span className="text-slate-500">Місто:</span> <span className="font-medium">{schoolData.city || '—'}</span></div></li>
        <li className="flex gap-3"><span className="text-slate-400">🗺</span> <div><span className="text-slate-500">Адреса:</span> <span className="font-medium"><AddressLink address={schoolData.address} /></span></div></li>
        <li className="flex gap-3"><span className="text-slate-400">👤</span> <div><span className="text-slate-500">Директор:</span> <span className="font-medium">{schoolData.director || '—'}</span></div></li>
        <li className="flex gap-3"><span className="text-slate-400">📞</span> <div><span className="text-slate-500">Телефон:</span> <span className="font-medium text-blue-600">{schoolData.phone || '—'}</span></div></li>
        <li className="flex gap-3"><span className="text-slate-400">👥</span> <div><span className="text-slate-500">Дітей:</span> <span className="font-medium">{schoolData.childrenCount || 0}</span></div></li>
      </ul>
    </div>
  );
}
