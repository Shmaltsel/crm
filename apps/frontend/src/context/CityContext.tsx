import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useAuth } from "./AuthContext";

interface SelectedCity {
  id: string;
  name: string;
}

interface CityContextType {
  selectedCity: SelectedCity;
  setSelectedCity: (city: SelectedCity) => void;
  isCityLocked: boolean;
}

const DEFAULT_CITY: SelectedCity = { id: "", name: "Львів" };

const CityContext = createContext<CityContextType>({
  selectedCity: DEFAULT_CITY,
  setSelectedCity: () => {},
  isCityLocked: false,
});

export function CityProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const isCityLocked = user?.role === "MANAGER" && !!user.cityId;

  const [selectedCity, setSelectedCityState] = useState<SelectedCity>(() => {
    try {
      const raw = localStorage.getItem("selectedCity");
      return raw ? JSON.parse(raw) : DEFAULT_CITY;
    } catch {
      return DEFAULT_CITY;
    }
  });

  useEffect(() => {
    if (isCityLocked && user?.cityId) {
      setSelectedCityState({ id: user.cityId, name: user.cityName || "" });
    }
  }, [isCityLocked, user?.cityId, user?.cityName]);

  const setSelectedCity = (city: SelectedCity) => {
    if (isCityLocked) return;
    setSelectedCityState(city);
    localStorage.setItem("selectedCity", JSON.stringify(city));
  };

  return (
    <CityContext.Provider
      value={{ selectedCity, setSelectedCity, isCityLocked }}
    >
      {children}
    </CityContext.Provider>
  );
}

export function useSelectedCity() {
  return useContext(CityContext);
}
