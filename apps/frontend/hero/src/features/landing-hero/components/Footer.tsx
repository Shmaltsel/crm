interface Props {
  onOpenContact: () => void
}

export function Footer({ onOpenContact }: Props) {
  return (
    <footer className="relative z-[50] border-t border-gold/12 bg-night py-9 text-[13px] text-mist-soft">
      <div className="mx-auto flex max-w-[1180px] flex-wrap items-center justify-between gap-3.5 px-7">
        <span>&copy; 2026 Світло Знань. Уява оживає.</span>
        <ul className="flex list-none gap-[22px]">
          <li>
            <a href="#" className="text-mist-soft transition-colors hover:text-gold">
              Публічна оферта
            </a>
          </li>
          <li>
            <a href="#" className="text-mist-soft transition-colors hover:text-gold">
              Політика конфіденційності
            </a>
          </li>
          <li>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault()
                onOpenContact()
              }}
              className="text-mist-soft transition-colors hover:text-gold"
            >
              Контакти
            </a>
          </li>
        </ul>
      </div>
    </footer>
  )
}
