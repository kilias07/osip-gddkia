import { DataAfterCalculation } from "@/types/types";
import ReactApexChart from "react-apexcharts";
import Chart from "react-apexcharts";

interface ChartsProps {
  selectedData: DataAfterCalculation[];
}

const NewCharts = ({ selectedData }: ChartsProps) => {
  const stations = selectedData[0].data.sessions.stations.map((station) => {
    return {
      stationID: station.stationID,
      BCI: station.drops[0].BCI,
      BDI: station.drops[0].BDI,
      SCI: station.drops[0].SCI,
      station: station.station,
    };
  });

  const series = [
    {
      name: "BCI",
      data: stations.map((station) => station.BDI),
    },
  ];

  const options: ApexCharts.ApexOptions = {
    chart: {
      id: "basic-bar",
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
      seriesName: "BCI",
      title: {
        text: "BCI",
      },
    },
    annotations: {
      yaxis: [
        {
          y: 0,
          y2: 120,
          fillColor: "#90EE90",
        },
        {
          y: 120,
          y2: 160,
          fillColor: "#006400",
        },
        {
          y: 160,
          y2: 200,
          fillColor: "#F49000",
        },
        {
          y: 200,
          y2: 240,
          fillColor: "#F44340",
        },
        {
          y: 240,
          y2: 260,
          fillColor: "#F5093C",
        },
      ],
    },
    stroke: {
      curve: "straight",
      width: 3,
      colors: ["#000"],
    },
    markers: {
      size: 3,
      colors: ["#fff"],
      strokeColors: ["#000"],
    },
  };

  const options2: ApexCharts.ApexOptions = {
    colors: ["#000"],
    chart: {
      id: "basic-bar2",
      height: 140,
      type: "bar",
      foreColor: "#ccc",
      brush: {
        target: "basic-bar",
        enabled: true,
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
      seriesName: "BCI",
      title: {
        text: "BCI",
      },
    },
  };
  return (
    <div>
      <ReactApexChart
        options={options}
        type="line"
        height={600}
        series={series}
      />
      <ReactApexChart
        style={{ marginTop: "-45px" }}
        options={options2}
        type="bar"
        height={140}
        series={series}
      />
    </div>
  );
};

export default NewCharts;
