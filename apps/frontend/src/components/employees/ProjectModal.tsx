import { motion, AnimatePresence } from "framer-motion";
import {
  backdropVariants,
  modalVariants,
  formVariants,
  fieldVariants,
} from "../../animations/employees";

const PROJECT_COLORS: Record<string, string> = {
  blue: "bg-blue-500",
  emerald: "bg-emerald-500",
  rose: "bg-rose-500",
  red: "bg-red-500",
  amber: "bg-amber-500",
  purple: "bg-purple-500",
};

interface ProjectForm {
  name: string;
  color: string;
  pricePerChild: string;
}

interface Props {
  isOpen: boolean;
  isEditing: boolean;
  form: ProjectForm;
  setForm: (form: ProjectForm) => void;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function ProjectModal({
  isOpen,
  isEditing,
  form,
  setForm,
  onClose,
  onSubmit,
}: Props) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden"
          >
            <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="text-xl font-bold text-slate-800">
                {isEditing ? "Редагувати вид події" : "Новий вид події"}
              </h3>
              <button
                onClick={onClose}
                className="text-slate-400 text-xl leading-none p-2 -mr-2"
              >
                ✕
              </button>
            </div>
            <motion.form
              onSubmit={onSubmit}
              variants={formVariants}
              initial="hidden"
              animate="visible"
              className="p-6"
            >
              <motion.div variants={fieldVariants}>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Назва
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none mb-6"
                  required
                  placeholder="Наприклад: Шоу мильних бульбашок"
                />
              </motion.div>
              <motion.div variants={fieldVariants}>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Ціна за дитину, грн
                </label>
                <input
                  type="number"
                  min={0}
                  value={form.pricePerChild}
                  onChange={(e) =>
                    setForm({ ...form, pricePerChild: e.target.value })
                  }
                  placeholder="Наприклад: 150"
                  className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none mb-6"
                />
              </motion.div>
              <motion.div variants={fieldVariants}>
                <label className="block text-sm font-medium text-slate-700 mb-3">
                  Колір для календаря
                </label>
                <div className="flex gap-4 mb-8">
                  {Object.keys(PROJECT_COLORS).map((c) => (
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      type="button"
                      key={c}
                      onClick={() => setForm({ ...form, color: c })}
                      className={`w-8 h-8 rounded-full ${PROJECT_COLORS[c]} transition-all ${form.color === c ? "ring-4 ring-offset-2 ring-blue-200 scale-110" : "hover:scale-110"}`}
                    />
                  ))}
                </div>
              </motion.div>
              <motion.div variants={fieldVariants} className="flex gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 bg-slate-100 py-3 rounded-xl font-medium"
                >
                  Скасувати
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-emerald-600 text-white py-3 rounded-xl font-medium"
                >
                  Зберегти
                </button>
              </motion.div>
            </motion.form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
