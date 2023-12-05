"use client";

import {
  ChartData,
  useChartsData,
  useData,
  useFilteredRow,
  useShowWisualization,
} from "@/lib/store-zustand";
import useStore from "@/lib/use-store";
import { columns } from "@/components/columns";
import { DataTable } from "@/components/data-table";
import ChartBDI from "./components/chart-bdi";
import ChartSCI from "./components/chart-sci";
import ChartBCI from "./components/chart-bci";
import avgOffDropsIndicator from "@/lib/helper";
import format from "date-fns/format";
import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import ChartPicker from "./components/chart-picker";
import ChartALL from "./components/chart-all";

export interface Picker {
  SCI: boolean;
  BDI: boolean;
  BCI: boolean;
  ALL: boolean;
}

export default function ShowResults() {
  const allData = useStore(useData, (state) => state.allData)!;
  const { rowSelection } = useFilteredRow((state) => state);
  const { setChartsData } = useChartsData((state) => state);
  const { showChart, setShowChart } = useShowWisualization((state) => state);
  const [picked, setPicked] = useState<Picker>({
    SCI: true,
    BDI: true,
    BCI: true,
    ALL: false,
  });

  const handleClick = useCallback(() => {
    const filteredData = Object.keys(rowSelection).map((key) => allData[+key]);
    const chartsData = filteredData?.map((measure): ChartData => {
      const roadTime = measure.data.sessions.stations[0].time;
      const roadOriginalName = measure.file.name;
      const timeMeasurement =
        roadTime && format(new Date(roadTime), "yyyyMMdd_HHmm");
      const ext = roadOriginalName.split(".").pop();
      const dataForName = {
        roadNumber: measure.userInput.roadNumber,
        roadCategory: measure.userInput.roadCategory,
        roadwayNumber: measure.userInput.roadwayNumber,
        laneNumber: measure.userInput.laneNumber,
        type: measure.userInput.type === "asc" ? "r" : "m",
        dob: timeMeasurement,
      };
      return measure.data.sessions.stations.map((station) => {
        const name = Object.values(dataForName).join("_") + "." + ext;

        const { BCI, BDI, SCI } = avgOffDropsIndicator(station.drops);
        return {
          GPS: {
            long: station.GPS.long,
            lat: station.GPS.lat,
          },
          station: station.station,
          roadCategory: measure.userInput.roadCategory,
          SCI: Math.round(SCI),
          BDI: Math.round(BDI),
          BCI: Math.round(BCI),
          date: measure.userInput.dob,
          name,
          originalName: measure.file.name,
        };
      });
    });
    setChartsData(chartsData);

    setShowChart(true);
  }, [rowSelection, allData, setShowChart, setChartsData]);

  return (
    <div className="my-10">
      {allData && <DataTable data={allData} columns={columns} />}
      {Object.keys(rowSelection).length === 0 ? null : (
        <div className="flex gap-10">
          <div>
            <Button
              variant={"default"}
              onClick={handleClick}
              className="w-64 mr-4"
            >
              pokaż wizualizacje
            </Button>
            <Button variant={"outline"} onClick={() => setShowChart(false)}>
              Schowaj
            </Button>
          </div>
          {showChart ? (
            <ChartPicker picked={picked} setPicked={setPicked} />
          ) : null}
        </div>
      )}
      {showChart ? (
        <>
          {picked.SCI ? <ChartSCI /> : null}
          {picked.BDI ? <ChartBDI /> : null}
          {picked.BCI ? <ChartBCI /> : null}
          {picked.ALL ? <ChartALL /> : null}
        </>
      ) : null}
    </div>
  );
}
