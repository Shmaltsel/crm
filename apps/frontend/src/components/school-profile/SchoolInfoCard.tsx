import { memo } from "react";
import AddressLink from "../AddressLink";
import PhoneLink from "../PhoneLink";
import { motion } from "framer-motion";
import type { SchoolProfileData } from "../../types";

export default memo(function SchoolInfoCard({
  schoolData,
}: {
  schoolData: SchoolProfileData;
}) {
  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: "0 12px 32px -4px rgba(0,0,0,0.10)" }}
      transition={{ duration: 0.2 }}
      className="bg-surface p-6 rounded-card shadow-card border border-border"
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
            transition={{ duration: 0.25, delay: i * 0.05 }}
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
