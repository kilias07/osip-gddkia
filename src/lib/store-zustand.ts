import { DataAfterCalculation } from "@/types/types";
import { UUID } from "crypto";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type DataStore = {
  allData: DataAfterCalculation[];
};

type DataActions = {
  setData: (data: DataAfterCalculation) => void;
  getData: (id: UUID) => DataAfterCalculation | undefined;
  deleteAllData: () => void;
  deleteData: (id: UUID) => void;
};

export const useData = create<DataStore & DataActions>()(
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

const COLORS = ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#00ffff"] as const;

type ColorStore = {
  color: string;
  colors: (typeof COLORS)[number][];
};
type ColorActions = {
  setColor: (color: string) => void;
  // setColors: (colors: (typeof COLORS)[number][]) => void;
};

export const useColor = create<ColorStore & ColorActions>((set) => ({
  color: "#ff0000",
  colors: ["#00ff00", "#0000ff", "#ffff00", "#00ffff"],
  setColor: (color) =>
    set((newColor) => ({
      color: newColor.color,
      // colors: [...colors],
    })),
}));
