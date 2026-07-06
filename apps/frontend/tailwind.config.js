
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: "#ffffff",
          subtle: "#f8fafc",
          muted: "#f1f5f9",
        },
        border: {
          DEFAULT: "#f1f5f9",
          strong: "#e2e8f0",
        },
        content: {
          primary: "#1e293b",
          secondary: "#475569",
          muted: "#94a3b8",
        },
        brand: {
          DEFAULT: "#2563eb",
          hover: "#1d4ed8",
          subtle: "#eff6ff",
        },
        success: { DEFAULT: "#10b981", subtle: "#ecfdf5" },
        danger:  { DEFAULT: "#ef4444", subtle: "#fef2f2" },
        warning: { DEFAULT: "#f59e0b", subtle: "#fffbeb" },
      },
      borderRadius: {
        card: "1rem",
        modal: "1.5rem",
        control: "0.75rem",
        pill: "9999px",
      },
      boxShadow: {
        card: "0 1px 2px 0 rgb(0 0 0 / 0.04), 0 1px 3px 0 rgb(0 0 0 / 0.06)",
        modal: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
      },
      transitionDuration: { fast: "150ms", base: "200ms", slow: "300ms" },
    },
  },
  darkMode: "class",
  plugins: [],
}
