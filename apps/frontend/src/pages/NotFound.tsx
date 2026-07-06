import { useNavigate } from "react-router-dom";
import { SearchX } from "lucide-react";
import { Button } from "../components/ui/Button";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-subtle px-4">
      <div className="max-w-md w-full bg-surface rounded-card shadow-card border border-border p-8 text-center">
        <div className="w-16 h-16 rounded-full bg-brand-subtle flex items-center justify-center mx-auto mb-4">
          <SearchX className="w-7 h-7 text-brand" />
        </div>
        <h1 className="text-xl font-bold text-content-primary mb-2">
          Сторінку не знайдено
        </h1>
        <p className="text-sm text-content-muted mb-6">
          Можливо, її було переміщено або видалено.
        </p>
        <Button onClick={() => navigate("/")}>
          На головну
        </Button>
      </div>
    </div>
  );
}
