"use client";

import { useData } from "@/lib/store-zustand";
import useStore from "@/lib/use-store";
import { useEffect, useState } from "react";
import { DataTableShow } from "./components/data-table-show";
import { DataAfterCalculation } from "@/types/types";
import { columnsShow } from "./components/columns";
import dynamic from "next/dynamic";
import ChartBDI from "./components/chart-bdi";
import ChartSCI from "./components/chart-sci";
import ChartBCI from "./components/chart-bci";
import Legend from "./components/legend";
import { DataContext } from "./components/context-data";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
    <div className="w-full h-screen flex justify-center items-center">
      <Card className="max-w-lg">
        <CardHeader>
          <CardDescription className="text-xl">
            Funkcjonalność strony zostanie odblokowana po przeprowadzeniu
            pierwszego szkolenia w umówionym terminie
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}

// export default ShowResults;
