import create from "zustand";
import { persist } from "zustand/middleware";

import { CountryType } from "../types/types";
import { Store } from "../types/types";

const useCountriesStore = create<Store>()(
  persist(
    (set) => ({
      countries: [],
      addCountry: (country: CountryType) => {
        set((state: Store) => ({ countries: [...state.countries, country] }));
      },
      deleteCountry: (countryId: string) => {
        set((state: Store) => ({
          countries: state.countries.filter(
            (cId: CountryType) => cId.id !== countryId
          ),
        }));
      },
    }),
    { name: "countries" }
  )
);

export default useCountriesStore;
