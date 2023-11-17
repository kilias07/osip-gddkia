"use client";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import dynamic from "next/dynamic";
import { DataContext } from "./context-data";
import { useContext, useMemo } from "react";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const ChartBCI = () => {
  const data = useContext(DataContext);
  const stations = useMemo(
    () =>
      data[0].data.sessions.stations.map((station) => {
        return {
          stationID: station.stationID,
          BDI: station.drops[0].BCI,
          station: station.station,
        };
      }),
    [data]
  );

  const series = [
    {
      name: "BCI",
      data: stations.map((station) => station.BDI),
    },
  ];

  const options: ApexCharts.ApexOptions = {
    chart: {
      id: "bci-chart",
      animations: {
        enabled: false,
      },
      toolbar: {
        tools: {
          pan: false,
          reset: false,
        },
      },
    },
    xaxis: {
      type: "numeric",
      categories: stations.map((station) => station.station),
      title: {
        text: "Kilometraż",
      },
    },
    yaxis: {
      min: 0,
      max: 120,

      seriesName: "BCI",
      title: {
        text: "BCI",
      },
    },
    annotations: {
      yaxis: [
        {
          y: 0,
          y2: 45,
          opacity: 0.5,
          fillColor: "#00ff00",
          borderWidth: 0,
          borderColor: "#00ff00",
          strokeDashArray: 0,
        },
        {
          y: 45,
          y2: 60,
          opacity: 0.5,
          fillColor: "#006600",
          borderWidth: 0,
          borderColor: "#006600",
          strokeDashArray: 0,
        },
        {
          y: 60,
          y2: 75,
          opacity: 0.5,
          fillColor: "#ff9900",
          borderWidth: 0,
          borderColor: "#ff9900",
          strokeDashArray: 0,
        },
        {
          y: 75,
          y2: 90,
          opacity: 0.5,
          fillColor: "#cc3300",
          borderWidth: 0,
          borderColor: "#cc3300",
          strokeDashArray: 0,
        },
        {
          y: 90,
          y2: 120,
          opacity: 0.5,
          fillColor: "#ff0000",
          borderWidth: 0,
          borderColor: "#ff0000",
          strokeDashArray: 0,
        },
      ],
    },
    stroke: {
      curve: "straight",
      width: 2,
      colors: ["#000"],
    },
    markers: {
      size: 2,
      colors: ["#fff"],
      strokeColors: ["#000"],
    },
  };

  const brushOptions: ApexCharts.ApexOptions = {
    colors: ["#000"],
    chart: {
      id: "bdi-chart2",
      height: 140,
      type: "bar",
      foreColor: "#ccc",
      brush: {
        target: "bci-chart",
        enabled: true,
      },
      animations: {
        enabled: false,
      },
      selection: {
        enabled: true,

        fill: {
          color: "#fff",
          opacity: 0.6,
        },
        xaxis: {
          min: stations[0].station - 0.1,
          max: stations[stations.length - 1].station + 0.1,
        },
      },
    },
    xaxis: {
      type: "numeric",
      categories: stations.map((station) => station.station),
      min: stations[0].station - 0.1,
      max: stations[stations.length - 1].station + 0.1,
      title: {
        text: "Kilometraż",
      },
    },
    yaxis: {
      min: 0,
      max: 120,
      tickAmount: 4,
      seriesName: "BCI",
      title: {
        text: "BCI",
      },
    },
  };

  return (
    <Card className="max-w-5xl px-3" key={"BCI"}>
      <CardHeader className="pb-0">
        <CardTitle>Współczynnik BCI</CardTitle>
      </CardHeader>
      <div>
        <ReactApexChart
          options={options}
          type="line"
          height={300}
          width="100%"
          series={series}
        />
        <ReactApexChart
          style={{ marginTop: "-45px" }}
          options={brushOptions}
          type="bar"
          height={140}
          width="100%"
          series={series}
        />
      </div>
    </Card>
  );
};

export default ChartBCI;
