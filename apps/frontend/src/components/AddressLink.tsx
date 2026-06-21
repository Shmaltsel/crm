// Невеликий перевикористовуваний компонент:
// будь-яку адресу робить клікабельною — відкриває її в Google Maps у новій вкладці.
// Використання: <AddressLink address={event.address} />

interface AddressLinkProps {
  address?: string | null;
  className?: string;
}

export default function AddressLink({ address, className }: AddressLinkProps) {
  if (!address) return <>—</>;

  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    address,
  )}`;

  return (
    <a
      href={mapsUrl}
      target="_blank"
      rel="noopener noreferrer"
      // щоб клік по адресі не тригерив onClick батьківського рядка/картки (наприклад, навігацію)
      onClick={(e) => e.stopPropagation()}
      title="Відкрити в Google Maps"
      className={`inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 hover:underline ${
        className ?? ""
      }`}
    >
      <span>{address}</span>
      <span aria-hidden="true">🗺️</span>
    </a>
  );
}
