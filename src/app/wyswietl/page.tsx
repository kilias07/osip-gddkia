"use client";

import {
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
import { DataForVisualisation } from "@/types/types";
import avgOffDropsIndicator from "@/lib/helper";

import format from "date-fns/format";
import { useCallback } from "react";
import { Button } from "@/components/ui/button";

export default function ShowResults() {
  const allData = useStore(useData, (state) => state.allData)!;
  const { rowSelection } = useFilteredRow((state) => state);

  const { chartsData, setChartsData } = useChartsData((state) => state);

  const { showChart, setShowChart } = useShowWisualization((state) => state);

  const handleClick = useCallback(() => {
    const filteredData = Object.keys(rowSelection).map((key) => allData[+key]);
    const chartsData = filteredData?.map((measure) => {
      const roadTime = measure.data.sessions.stations[0].time;
      const roadOriginalName = measure.file.name;
      const timeMeasurement =
        roadTime && format(new Date(roadTime), "yyyyMMdd_HHmm");
      const ext = roadOriginalName.split(".").pop();
      const dataForName = {
        roadNumber: measure.userInput.roadNumber,
        roadwayNumber: measure.userInput.roadwayNumber,
        laneNumber: measure.userInput.laneNumber,
        type: measure.userInput.type === "asc" ? "r" : "m",
        dob: timeMeasurement,
      };
      return {
        id: measure.data.id,
        date: measure.userInput.dob,
        name: Object.values(dataForName).join("_") + "." + ext,
        originalName: measure.file.name,
        sessions: {
          length: measure.data.sessions.length,
          stationMinMax: measure.data.sessions.stationMinMax,
          stations: measure.data.sessions.stations.map((station) => {
            return {
              id: station.stationID,
              GPS: {
                lat: station.GPS.lat,
                long: station.GPS.long,
              },
              station: station.station,
              indicator: avgOffDropsIndicator(station.drops),
            };
          }),
        },
      };
    }) as DataForVisualisation[];

    const data = () => {
      const result = [];
      chartsData?.sort((a, b) => {
        return a.sessions.stations[0].station - b.sessions.stations[0].station;
      });
      for (let i = 0; i < chartsData!.length; i++) {
        for (let j = 0; j < chartsData![i].sessions.stations.length; j++) {
          result.push({
            name: chartsData![i].name,
            station: chartsData![i].sessions.stations[j].station,
            ["BCI" + i]:
              chartsData![i].sessions.stations[j].indicator.BCI.toFixed(2),
            ["BDI" + i]:
              chartsData![i].sessions.stations[j].indicator.BDI.toFixed(2),
            ["SCI" + i]:
              chartsData![i].sessions.stations[j].indicator.SCI.toFixed(2),
          });
        }
      }
      return result;
    };
    setChartsData(data());

    setShowChart(true);
  }, [rowSelection, allData, setShowChart, setChartsData]);

  return (
    <div className="my-10">
      {allData && <DataTable data={allData} columns={columns} />}
      <Button variant={"default"} onClick={handleClick} className="w-64 mr-4">
        pokaż wizualizacje
      </Button>
      <Button variant={"outline"} onClick={() => setShowChart(false)}>
        Schowaj
      </Button>
      {showChart ? (
        <>
          <ChartBDI chartsData={chartsData} />
          <ChartBCI chartsData={chartsData} />
          <ChartSCI chartsData={chartsData} />
        </>
      ) : null}
    </div>
  );
}
