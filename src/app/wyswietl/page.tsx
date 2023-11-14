"use client";

import { useData } from "@/lib/store-zustand";
import useStore from "@/lib/use-store";
import { createContext, useEffect, useState } from "react";
import { DataTableShow } from "./components/data-table-show";
import { DataAfterCalculation } from "@/types/types";
import { columnsShow } from "./components/columns";
import dynamic from "next/dynamic";
import ChartBDI from "./components/chart-bdi";
import ChartSCI from "./components/chart-sci";
import ChartBCI from "./components/chart-bci";
import Legend from "./components/legend";
import { DataContext } from "./components/context-data";

const Map = dynamic(() => import("./components/map"), {
  ssr: false,
});

export default function ShowResults() {
  const allData = useStore(useData, (state) => state.allData)!;
  const [rowSelection, setRowSelection] = useState({});
  const [filteredSelectedData, setFilteredSelectedData] = useState<
    DataAfterCalculation[]
  >([]);

  useEffect(() => {
    const filteredSelectedData = Object.keys(rowSelection).map(
      (key) => allData[+key]
    );
    setFilteredSelectedData(filteredSelectedData);
  }, [rowSelection, allData]);
  const gps = filteredSelectedData.map((selectedRow) => {
    return selectedRow.data.sessions.stations.map((station) => {
      return station.GPS;
    });
  });

  return (
    <div className="my-10">
      {allData && (
        <DataTableShow
          rowSelection={rowSelection}
          setRowSelection={setRowSelection}
          data={allData}
          columns={columnsShow}
        />
      )}
      {filteredSelectedData.length === 1 ? (
        <div className="flex w-full gap-4">
          <Legend />
          <div className="flex flex-col w-1/2 grow gap-4">
            <DataContext.Provider value={filteredSelectedData}>
              <ChartSCI />
              <ChartBDI />
              <ChartBCI />
              {/* <Map /> */}
            </DataContext.Provider>
          </div>
        </div>
      ) : null}
    </div>
  );
}

// export default ShowResults;
