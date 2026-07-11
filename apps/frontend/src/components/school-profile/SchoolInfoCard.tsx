import { memo } from "react";
import AddressLink from "../AddressLink";
import PhoneLink from "../PhoneLink";
import { motion } from "framer-motion";
import { cardHoverVariants, DUR, useHoverCapable } from "../../lib/motion";
import type { SchoolProfileData } from "../../types";

export default memo(function SchoolInfoCard({
  schoolData,
}: {
  schoolData: SchoolProfileData;
}) {
  const hoverCapable = useHoverCapable();
  return (
    <motion.div
      variants={cardHoverVariants}
      initial="rest"
      whileHover={hoverCapable ? "hover" : undefined}
      className="bg-surface p-6 rounded-card card-shadow hover:card-shadow-hover border border-border"
    >
      <ul className="space-y-4 text-sm">
        {[
          { icon: "🏛", label: "Тип", value: schoolData.type || "—" },
          { icon: "📍", label: "Місто", value: schoolData.city || "—" },
          {
            icon: "🗺",
            label: "Адреса",
            value: <AddressLink address={schoolData.address} />,
          },
          { icon: "👤", label: "Контакт", value: schoolData.director || "—" },
          {
            icon: "📞",
            label: "Телефон",
            value: <PhoneLink phone={schoolData.phone} />,
          },
          { icon: "👥", label: "Дітей", value: schoolData.childrenCount || 0 },
        ].map(({ icon, label, value }, i) => (
          <motion.li
            key={label}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: DUR.normal, delay: i * 0.05 }}
            className="flex gap-3"
          >
            <span className="text-content-muted">{icon}</span>
            <div>
              <span className="text-content-muted">{label}:</span>{" "}
              <span className="font-medium text-content-primary">{value}</span>
            </div>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
});
