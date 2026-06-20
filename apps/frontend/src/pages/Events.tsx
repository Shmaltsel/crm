

export default function Events() {
  const rows = [
    { name: 'Стендап-вечір / Dzyga', date: '25 Червня 2026', location: 'Артцентр "Дзиґа"', status: 'Заплановано' },
  ];

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Розклад подій</h1>
        <button className="bg-blue-600 text-white px-4 py-2.5 sm:py-2 rounded-lg hover:bg-blue-700 transition w-full sm:w-auto">
          + Додати подію
        </button>
      </div>

      {/* Картки — мобільний вигляд */}
      <div className="md:hidden flex flex-col gap-3">
        {rows.map((row, i) => (
          <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <p className="font-semibold text-gray-800">{row.name}</p>
            <p className="text-xs text-gray-500 mt-1">{row.date} · {row.location}</p>
            <span className="inline-block mt-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
              {row.status}
            </span>
          </div>
        ))}
      </div>

      {/* Таблиця — десктоп */}
      <div className="hidden md:block bg-white rounded-xl shadow-sm border border-gray-100 overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="p-4 font-medium text-gray-600">Назва події</th>
              <th className="p-4 font-medium text-gray-600">Дата</th>
              <th className="p-4 font-medium text-gray-600">Локація</th>
              <th className="p-4 font-medium text-gray-600">Статус</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className="border-b border-gray-50 hover:bg-gray-50/50 transition">
                <td className="p-4 text-gray-800 font-medium">{row.name}</td>
                <td className="p-4 text-gray-600">{row.date}</td>
                <td className="p-4 text-gray-600">{row.location}</td>
                <td className="p-4">
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">{row.status}</span>
                </td>
              </tr>
            ))}
            {/* Тут згодом будуть рендеритися дані з нашої бази */}
          </tbody>
        </table>
      </div>
    </div>
  );
}
