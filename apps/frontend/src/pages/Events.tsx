export default function Events() {
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Розклад подій</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
          + Додати подію
        </button>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
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
            <tr className="border-b border-gray-50 hover:bg-gray-50/50 transition">
              <td className="p-4 text-gray-800 font-medium">Стендап-вечір / Dzyga</td>
              <td className="p-4 text-gray-600">25 Червня 2026</td>
              <td className="p-4 text-gray-600">Артцентр "Дзиґа"</td>
              <td className="p-4">
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">Заплановано</span>
              </td>
            </tr>
            {/* Тут згодом будуть рендеритися дані з нашої бази */}
          </tbody>
        </table>
      </div>
    </div>
  );
}