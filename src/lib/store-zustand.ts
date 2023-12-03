import { DataAfterCalculation, Drops, Stations } from "@/types/types";
import { OnChangeFn, RowSelectionState } from "@tanstack/react-table";
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

type FilteredStore = {
  rowSelection: { [val: number]: boolean };
};
type FilteredActions = {
  rowSelection: {};
  setRowSelecton: OnChangeFn<RowSelectionState>;
  deleteRowSelection: (i: number) => void;
};

export const useFilteredRow = create<FilteredStore & FilteredActions>(
  (set) => ({
    rowSelection: {},
    //@ts-ignore add types for zustand
    setRowSelecton: (fn: (prev: PrevState) => PrevState) => {
      return set((state) => ({ rowSelection: fn(state.rowSelection) }));
    },
    deleteRowSelection: (i) => {
      set((state) => {
        if (state.rowSelection[i]) {
          delete state.rowSelection[i];
        }
        return { rowSelection: state.rowSelection };
      });
    },
  })
);

export const useShowWisualization = create<{
  showChart: boolean;
  setShowChart: (showChart: boolean) => void;
}>((set) => ({
  showChart: false,
  setShowChart: (showChart) => set({ showChart }),
}));

export type ChartData = Array<
  Pick<Stations, "GPS"> & {
    station: number;
    SCI: number;
    BDI: number;
    BCI: number;
    originalName: string;
    name: string;
    date: Date;
  }
>;

export const useChartsData = create<{
  chartsData: ChartData[];
  setChartsData: (chartsData: ChartData[]) => void;
}>((set) => ({
  chartsData: [],
  setChartsData: (chartsData) => set({ chartsData }),
}));
