import { Card, CardContent } from "@/components/ui/card";
const Map = dynamic(() => import("./map"), { ssr: false });

import {
  Brush,
  CartesianGrid,
  Legend,
  ReferenceArea,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useMemo } from "react";
import { useTheme } from "next-themes";
import { useChartsData } from "@/lib/store-zustand";
import { getShape } from "./chart-functions";
import { LegendBDI } from "./legend";
import dynamic from "next/dynamic";

const CustomReferenceArea = () => (
  <>
    <ReferenceArea y1={0} y2={90} fill="#00ff00" fillOpacity={0.7} />
    <ReferenceArea y1={90} y2={120} fill="#006600" fillOpacity={0.7} />
    <ReferenceArea y1={120} y2={150} fill="#ff9900" fillOpacity={0.7} />
    <ReferenceArea y1={150} y2={180} fill="#cc3300" fillOpacity={0.7} />
    <ReferenceArea y1={180} y2={300} fill="#ff0000" fillOpacity={0.8} />
  </>
);

const ChartBDI = () => {
  const { chartsData } = useChartsData((state) => state);
  const uniqueStations = useMemo(
    () => [...new Set(chartsData.flat().map((data) => data.name))],
    [chartsData]
  );

  const { theme } = useTheme();

  const flatChartsData = chartsData.flat();
  const transformData = useMemo(
    () => (data: typeof flatChartsData) => {
      const result = [];
      for (let i = 0; i < data.length; i++) {
        const entry = data[i];
        const station = entry.station;
        const name = entry.name;
        const BDI = +entry.BDI;
        const index = result.findIndex((el) => el.station === station);
        if (index === -1) {
          result.push({
            station,
            [name]: BDI,
            originalName: entry.originalName,
            gps: entry.GPS,
          });
        } else {
          result[index][name] = BDI;
        }
      }
      return result.sort((a, b) => a.station - b.station);
    },
    []
  );
  const gps = chartsData[0][0].GPS;

  return (
    <Card className="mt-4 pt-6 w-full">
      <CardContent className="flex flex-col md:flex-row">
        <LegendBDI />
        <ResponsiveContainer width={"100%"} height={700}>
          <ScatterChart data={transformData(flatChartsData)}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={"station"} type="category" />
            <YAxis
              type="number"
              domain={[0, 300]}
              ticks={[0, 50, 90, 120, 150, 180, 240, 300]}
            />

            <Tooltip
              labelFormatter={() => {
                return <></>;
              }}
            />
            <Legend
              payload={uniqueStations.map((data, i) => ({
                value: data,
                type: getShape(i),
                id: data,
                color: theme === "dark" ? "#fff" : "#000",
              }))}
              formatter={(value, entry) => {
                return (
                  <div className="flex flex-col mx-2 text-sm">
                    <span>{value}</span>
                    <span>
                      {
                        flatChartsData.find((el) => el.name === entry.value)
                          ?.originalName
                      }
                    </span>
                  </div>
                );
              }}
            />
            {CustomReferenceArea()}
            {uniqueStations.map((data, i) => {
              return (
                <Scatter
                  key={i}
                  dataKey={data}
                  name={"BDI"}
                  isAnimationActive={false}
                  shape={getShape(i)}
                  stroke="#000000"
                  fill={theme === "dark" ? "#fff" : "gray"}
                />
              );
            })}
            <Brush />
          </ScatterChart>
        </ResponsiveContainer>
        {gps.lat ? (
          <Map data={transformData(flatChartsData)} indicator={"BCI"} />
        ) : null}
      </CardContent>
    </Card>
  );
};

export default ChartBDI;
