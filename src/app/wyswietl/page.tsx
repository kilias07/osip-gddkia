"use client";

import { useData } from "@/lib/store-zustand";
import useStore from "@/lib/use-store";
import Charts from "./components/charts";
import { useEffect, useMemo, useState } from "react";
import { DataTableShow } from "./components/data-table-show";
import { DataAfterCalculation } from "@/types/types";
import { columnsShow } from "./components/columns";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("./components/map"), {
  ssr: false,
});

const ShowResults = () => {
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
  console.log("gps", gps[0]);
  return (
    <div className="">
      {allData && (
        <DataTableShow
          rowSelection={rowSelection}
          setRowSelection={setRowSelection}
          data={allData}
          columns={columnsShow}
        />
      )}
      {filteredSelectedData.length > 0 ? (
        <div className="flex">
          <Charts selectedData={filteredSelectedData} />
          <Map />
        </div>
      ) : null}
    </div>
  );
};

export default ShowResults;
