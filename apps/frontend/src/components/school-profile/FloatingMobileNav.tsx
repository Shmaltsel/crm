import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SECTIONS = [
  { id: "section-events", label: "Події" },
  { id: "section-notes", label: "Нотатки" },
  { id: "section-details", label: "Деталі" },
];

export default function FloatingMobileNav() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeSection, setActiveSection] = useState("section-events");
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const elements = SECTIONS.map((s) => document.getElementById(s.id)).filter(Boolean) as HTMLElement[];
    if (elements.length === 0) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          setActiveSection(visible[0].target.id);
        }
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0 },
    );

    elements.forEach((el) => observerRef.current?.observe(el));
    return () => observerRef.current?.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <nav className="md:hidden fixed z-50 left-1/2 -translate-x-1/2 bottom-[calc(56px+env(safe-area-inset-bottom,0px))] bg-surface/95 backdrop-blur-md border border-border rounded-full flex items-center gap-1 px-2 py-1.5 shadow-lg">
        {SECTIONS.map((s) => (
          <button
            key={s.id}
            onClick={() => scrollTo(s.id)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-full transition-colors ${
              activeSection === s.id
                ? "bg-brand text-white"
                : "text-content-muted active:bg-surface-muted"
            }`}
          >
            {s.label}
          </button>
        ))}
      </nav>

      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="md:hidden fixed z-50 bottom-[calc(56px+env(safe-area-inset-bottom,0px)+48px)] right-5 w-11 h-11 bg-surface border border-border-strong text-content-secondary rounded-full flex items-center justify-center shadow-lg active:scale-95 transition-transform"
          >
            ↑
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
