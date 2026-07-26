import { EmptyState } from "../../../components/ui/EmptyState";
import { Car } from "lucide-react";

export default function Mileage() {
  return (
    <div className="p-4 space-y-4">
      <EmptyState
        icon={Car}
        title="Кілометраж"
        description="Тут буде відображатися інформація про пройдений кілометраж"
      />
    </div>
  );
}
