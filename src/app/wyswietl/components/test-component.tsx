import { DataContext } from "./context-data";
import { useContext, useMemo } from "react";
import dynamic from "next/dynamic";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const TestComponent = () => {
  const data = useContext(DataContext);

  const stations = data
    .map((measure) => {
      const name =
        measure.userInput.roadNumber +
        "_" +
        measure.userInput.roadwayNumber +
        "_" +
        measure.userInput.laneNumber;
      return {
        name,
        data: measure.data.sessions.stations.map((station) => {
          return {
            stationID: station.stationID,
            SCI: station.drops[0].SCI,
            station: station.station,
          };
        }),
      };
    })
    .flat();
  console.log(stations);

  const series = stations.map((station) => {
    return {
      name: station.name,
      data: station.data.map((station) => station.SCI),
    };
  });
  const allStationValues = stations
    .map((station) => station.data.map((indicator) => indicator.station))
    .flat();

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
      categories: allStationValues.sort((a, b) => a - b),
      title: {
        text: "Kilometraż",
      },
    },
    colors: ["#FF0000", "#0000ff", "#476930"],

    yaxis: {
      min: 0,
      max: 250,
      seriesName: "SCI",
      title: {
        text: "SCI",
      },
    },
    // annotations: {
    //   yaxis: [
    //     {
    //       borderWidth: 0,
    //       y: 0,
    //       y2: 120,
    //       opacity: 0.4,
    //       fillColor: "#00ff00",
    //       strokeDashArray: 0,
    //       borderColor: "#00ff00",
    //     },
    //     {
    //       borderWidth: 0,
    //       y: 120,
    //       y2: 160,
    //       opacity: 0.4,
    //       strokeDashArray: 0,
    //       fillColor: "#006600",
    //       borderColor: "#006600",
    //     },
    //     {
    //       borderWidth: 0,
    //       strokeDashArray: 0,
    //       y: 160,
    //       opacity: 0.4,
    //       y2: 200,
    //       fillColor: "#ff9900",
    //       borderColor: "#ff9900",
    //     },
    //     {
    //       borderWidth: 0,
    //       strokeDashArray: 0,
    //       y: 200,
    //       y2: 240,
    //       opacity: 0.4,
    //       fillColor: "#cc3300",
    //       borderColor: "#cc3300",
    //     },
    //     {
    //       strokeDashArray: 0,
    //       borderColor: "#ff0000",
    //       borderWidth: 0,
    //       y: 240,
    //       y2: 260,
    //       opacity: 0.4,
    //       fillColor: "#ff0000",
    //     },
    //   ],
    // },
    stroke: {
      curve: "straight",
      width: 2,
      // colors: ["#00ff00", "red"],
    },
    markers: {
      size: 2,
      colors: ["#fff"],
      strokeColors: ["#FF0000", "#0000ff", "#476930"],
      shape: "rect",
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
          min: allStationValues.sort((a, b) => a - b)[0] - 0.1,
          max:
            allStationValues.sort((a, b) => a - b)[
              allStationValues.length - 1
            ] + 0.1,
        },
      },
    },
    xaxis: {
      type: "numeric",
      categories: allStationValues,
      min: allStationValues.sort((a, b) => a - b)[0] - 0.1,
      max:
        allStationValues.sort((a, b) => a - b)[allStationValues.length - 1] +
        0.1,
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
    <div>
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
          />
        </div>
      </Card>
    </div>
  );
};
export default TestComponent;
