"use client";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import dynamic from "next/dynamic";
import { DataContext } from "./context-data";
import { useContext } from "react";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const ChartSCI = () => {
  const data = useContext(DataContext);
  const stations = data[0].data.sessions.stations.map((station) => {
    return {
      stationID: station.stationID,
      SCI: station.drops[0].SCI,
      station: station.station,
    };
  });

  const series = [
    {
      name: "SCI",
      data: stations.map((station) => station.SCI),
    },
  ];

  const options: ApexCharts.ApexOptions = {
    chart: {
      id: "sci-chart",
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
      max: 250,
      seriesName: "SCI",
      title: {
        text: "SCI",
      },
    },
    annotations: {
      yaxis: [
        {
          y: 0,
          y2: 120,
          opacity: 0.5,
          fillColor: "#00ff00",
        },
        {
          y: 120,
          y2: 160,
          opacity: 0.5,

          fillColor: "#006600",
        },
        {
          y: 160,
          opacity: 0.5,

          y2: 200,
          fillColor: "#ff9900",
        },
        {
          y: 200,
          y2: 240,
          opacity: 0.5,

          fillColor: "#cc3300",
        },
        {
          y: 240,
          y2: 260,
          opacity: 0.5,

          fillColor: "#ff0000",
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
      id: "sci-chart2",
      height: 140,
      type: "bar",
      foreColor: "#ccc",
      brush: {
        target: "sci-chart",
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
          min: stations[0].station + 0.5,
          max: stations[stations.length - 1].station - 0.5,
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
      max: 260,
      tickAmount: 4,
      seriesName: "SCI",
      title: {
        text: "SCI",
      },
    },
  };

  return (
    <Card className="max-w-5xl px-3" key={"SCI"}>
      <CardHeader className="pb-0">
        <CardTitle>Współczynnik SCI</CardTitle>
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
          animation={false}
        />
      </div>
    </Card>
  );
};

export default ChartSCI;
