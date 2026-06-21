// Невеликий перевикористовуваний компонент:
// будь-який номер телефону робить клікабельним — на телефоні відкриває діалер з номером,
// на десктопі — пропонує подзвонити через застосунок, який обробляє tel: (Skype, FaceTime тощо).
// Використання: <PhoneLink phone={crew.phone} />

interface PhoneLinkProps {
  phone?: string | null;
  className?: string;
}

export default function PhoneLink({ phone, className }: PhoneLinkProps) {
  if (!phone) return <span className="text-slate-400">—</span>;

  // tel: посилання працює надійніше, якщо лишити тільки цифри та "+"
  const cleaned = phone.replace(/[^\d+]/g, "");

  return (
    <a
      href={`tel:${cleaned}`}
      // щоб клік по номеру не тригерив onClick батьківського рядка/картки (наприклад, навігацію)
      onClick={(e) => e.stopPropagation()}
      title="Зателефонувати"
      className={`group inline-flex items-center gap-1.5 text-slate-700 hover:text-blue-600 transition-colors ${
        className ?? ""
      }`}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        className="w-3.5 h-3.5 shrink-0 text-slate-400 group-hover:text-blue-500 transition-colors"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 6.75c0 8.284 6.716 15 15 15h1.5a2.25 2.25 0 002.25-2.25v-1.372a1.5 1.5 0 00-1.077-1.439l-3.808-1.142a1.5 1.5 0 00-1.55.43l-1.05 1.05a11.25 11.25 0 01-5.516-5.516l1.05-1.05a1.5 1.5 0 00.43-1.55L8.36 3.327A1.5 1.5 0 006.92 2.25H5.55A2.25 2.25 0 003.3 4.5v.75"
        />
      </svg>
      <span className="underline decoration-transparent group-hover:decoration-blue-300 decoration-1 underline-offset-2 transition-all">
        {phone}
      </span>
    </a>
  );
}