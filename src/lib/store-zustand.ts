import { DataAfterCalculation } from "@/types/types";
import { UUID } from "crypto";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type Store = {
  allData: DataAfterCalculation[];
};

type Actions = {
  setData: (data: DataAfterCalculation) => void;
  getData: (id: UUID) => DataAfterCalculation | undefined;
  deleteAllData: () => void;
  deleteData: (id: UUID) => void;
};

export const useData = create<Store & Actions>()(
  persist(
    (set, get) => ({
      allData: [],

      setData: (data) => {
        if (
          get().allData.length > 0 &&
          get().allData.find(
            ({
              file: storedDataFile,
            }: {
              file: DataAfterCalculation["file"];
            }) =>
              storedDataFile.size === data.file.size &&
              storedDataFile.name === data.file.name
          )
        ) {
          throw new Error("Data is already in store");
        }
        set((state) => ({ allData: [...state.allData, data] }));
      },

      getData: (id) =>
        get().allData.find((data: DataAfterCalculation) => data.data.id === id),

      deleteAllData: () => set({ allData: [] }),

      deleteData: (id) =>
        set((state) => ({
          allData: state.allData.filter(
            (data: DataAfterCalculation) => data.data.id !== id
          ),
        })),
    }),
    {
      name: "osad-data",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
