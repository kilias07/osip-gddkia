"use client";
import UploadForm from "@/app/dodaj/components/upload-file";
import { DataTable } from "@/components/data-table";
import { columns } from "@/components/columns";
import {
  ChartData,
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
  const allData = useStore(useData, (state) => state.allData)!;
  const { rowSelection } = useFilteredRow((state) => state);
  const { setShowChart } = useShowWisualization((state) => state);
  const { setChartsData } = useChartsData((state) => state);

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
          SCI,
          BDI,
          BCI,
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
    <div className="mt-10 container">
      <UploadForm />
      {!!allData?.length && (
        <>
          <DataTable data={allData} columns={columns} />
          {Object.keys(rowSelection).length === 0 ? null : (
            <Link href={"/wyswietl"}>
              <Button
                variant={"default"}
                onClick={handleClick}
                className="w-64 mr-4"
              >
                pokaż wizualizacje
              </Button>
            </Link>
          )}
        </>
      )}
    </div>
  );
};

export default AddResults;
