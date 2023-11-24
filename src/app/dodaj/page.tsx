"use client";
import UploadFormTest from "@/app/dodaj/components/upload-file";
import { DataTable } from "@/components/data-table";
import { columns } from "@/components/columns";
import {
  useChartsData,
  useData,
  useFilteredRow,
  useShowWisualization,
} from "@/lib/store-zustand";
import useStore from "@/lib/use-store";
import { Button } from "@/components/ui/button";
import { useCallback } from "react";
import format from "date-fns/format";
import avgOffDropsIndicator from "@/lib/helper";
import { DataForVisualisation } from "@/types/types";
import Link from "next/link";

const AddResults = () => {
  const allData = useStore(useData, (state) => state.allData);
  const { rowSelection } = useFilteredRow((state) => state);
  const { setShowChart } = useShowWisualization((state) => state);
  const { setChartsData } = useChartsData((state) => state);

  const handleClick = useCallback(() => {
    const filteredData = Object.keys(rowSelection).map((key) => allData![+key]);
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
  }, [rowSelection, allData, setChartsData, setShowChart]);

  return (
    <div className="mt-10 container">
      <UploadFormTest />
      {!!allData?.length && (
        <>
          <DataTable data={allData} columns={columns} />
          <Link href={"/wyswietl"}>
            <Button
              variant={"default"}
              onClick={handleClick}
              className="w-64 mr-4"
            >
              pokaż wizualizacje
            </Button>
          </Link>
        </>
      )}
    </div>
  );
};

export default AddResults;
