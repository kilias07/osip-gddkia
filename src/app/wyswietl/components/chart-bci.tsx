"use client";

import dynamic from "next/dynamic";
const Map = dynamic(() => import("./map"), { ssr: false });
import { Card, CardContent } from "@/components/ui/card";

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
import { LegendBCI } from "./legend";

const CustomReferenceArea = () => (
  <>
    <ReferenceArea y1={0} y2={45} fill="#00ff00" fillOpacity={0.7} />
    <ReferenceArea y1={45} y2={60} fill="#006600" fillOpacity={0.7} />
    <ReferenceArea y1={60} y2={75} fill="#ff9900" fillOpacity={0.7} />
    <ReferenceArea y1={75} y2={90} fill="#cc3300" fillOpacity={0.7} />
    <ReferenceArea y1={90} y2={200} fill="#ff0000" fillOpacity={0.8} />
  </>
);

const ChartBCI = () => {
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
        const BCI = +entry.BCI;

        const index = result.findIndex((el) => el.station === station);
        if (index === -1) {
          result.push({
            station,
            [name]: BCI,
            originalName: entry.originalName,
            gps: entry.GPS,
          });
        } else {
          result[index][name] = BCI;
        }
      }
      return result.sort((a, b) => a.station - b.station);
    },
    []
  );

  return (
    <Card className="mt-4 pt-6 w-full">
      <CardContent className="flex flex-col md:flex-row">
        <LegendBCI />
        <ResponsiveContainer className="grow" width={"100%"} height={700}>
          <ScatterChart data={transformData(flatChartsData)}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={"station"} type="category" />
            <YAxis
              type="number"
              domain={[0, 200]}
              ticks={[0, 45, 60, 75, 150, 90, 200]}
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
                  isAnimationActive={false}
                  key={i}
                  dataKey={data}
                  name={"BCI"}
                  shape={getShape(i)}
                  stroke="#000000"
                  fill={theme === "dark" ? "#fff" : "gray"}
                />
              );
            })}
            <Brush />
          </ScatterChart>
        </ResponsiveContainer>
        <Map data={transformData(flatChartsData)} indicator={"BCI"} />
      </CardContent>
    </Card>
  );
};

export default ChartBCI;
