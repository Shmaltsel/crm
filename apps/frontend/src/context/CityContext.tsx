import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface SelectedCity {
  id: string;
  name: string;
}

interface CityContextType {
  selectedCity: SelectedCity;
  setSelectedCity: (city: SelectedCity) => void;
}

const DEFAULT_CITY: SelectedCity = { id: '', name: 'Львів' };

const CityContext = createContext<CityContextType>({
  selectedCity: DEFAULT_CITY,
  setSelectedCity: () => {},
});

export function CityProvider({ children }: { children: ReactNode }) {
  const [selectedCity, setSelectedCityState] = useState<SelectedCity>(() => {
    try {
      const raw = localStorage.getItem('selectedCity');
      return raw ? JSON.parse(raw) : DEFAULT_CITY;
    } catch {
      return DEFAULT_CITY;
    }
  });

  const setSelectedCity = (city: SelectedCity) => {
    setSelectedCityState(city);
    localStorage.setItem('selectedCity', JSON.stringify(city));
  };

  return (
    <CityContext.Provider value={{ selectedCity, setSelectedCity }}>
      {children}
    </CityContext.Provider>
  );
}

export function useSelectedCity() {
  return useContext(CityContext);
}
