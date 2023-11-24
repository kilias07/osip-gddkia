"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Brush,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ReferenceArea,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import CustomizedDot from "./custom-dot";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { ChartData } from "@/lib/store-zustand";

const ChartSCI = ({ chartsData }: ChartData) => {
  const uniqueStations = useMemo(
    () => [...new Set(chartsData.map((data) => data.name))],
    [chartsData]
  );

  const [showReference, setShowReference] = useState(false);
  const { theme } = useTheme();

  const handleClick = () => {
    setShowReference((prev) => !prev);
  };
  const LineChartWithDot = useMemo(
    () =>
      uniqueStations.map((_, i) => (
        <Line
          key={"SCI" + i}
          dataKey={"SCI" + i}
          name={uniqueStations![i]}
          stroke={`${theme === "dark" ? "white" : "black"}`}
          dot={({ value, cx, cy }) => (
            <CustomizedDot
              key={value + "" + cx + "" + cy}
              value={value}
              cx={cx}
              cy={cy}
              range={[181, 151, 121, 91, 0]}
            />
          )}
        />
      )),
    [uniqueStations, theme]
  );
  const LineChartWithoutDot = useMemo(
    () =>
      uniqueStations.map((_, i) => (
        <Line
          key={"SCI" + i}
          dataKey={"SCI" + i}
          name={uniqueStations![i]}
          stroke={`${theme === "dark" ? "white" : "black"}`}
        />
      )),
    [uniqueStations, theme]
  );
  return (
    <Card className="mt-4 pt-6" key={"BDI"}>
      <CardContent className="flex flex-col md:flex-row">
        <div className="w-full md:w-64">
          <CardHeader className="pl-1">
            <CardTitle>Pakiet warstw bitumicznych</CardTitle>
            <CardDescription>SCI</CardDescription>
          </CardHeader>
          <CardDescription className="text-slate-950">
            Referencja
          </CardDescription>
          <ul>
            <li className="flex gap-2 items-center my-2 text-xs">
              <span className="bg-[#00ff00] w-5 h-5 rounded-full inline-block" />
              <p>0-120 dobry stan techniczny</p>
            </li>
            <li className="flex gap-2 items-center my-2 text-xs">
              <span className="bg-[#006600] w-5 h-5 rounded-full inline-block" />
              <p>121 - 160 stan techniczny zadowalający</p>
            </li>
            <li className="flex gap-2 items-center my-2 text-xs">
              <span className="bg-[#ff9900] w-5 h-5 rounded-full inline-block" />
              <p>161 - 200 stan ostrzegawczy</p>
            </li>
            <li className="flex gap-2 items-center my-2 text-xs">
              <span className="bg-[#cc3300] w-5 h-5 rounded-full inline-block" />
              <p>201 - 240 stan zły </p>
            </li>
            <li className="flex gap-2 items-center my-2 text-xs">
              <span className="bg-[#ff0000] w-5 h-5 rounded-full inline-block" />
              <p> {">"} 240 konieczny remont/przebudowa</p>
            </li>
          </ul>
          <Button
            onClick={handleClick}
            variant={showReference ? "secondary" : "default"}
            className="my-2"
          >
            {showReference ? "Ukryj Referencje" : "Pokaż Referencje"}
          </Button>
        </div>
        <ResponsiveContainer width={"100%"} height={700}>
          <LineChart data={chartsData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="station" />
            <YAxis
              type="number"
              domain={[0, 300]}
              ticks={[0, 50, 90, 120, 150, 180, 240, 300]}
            />
            <Tooltip />
            <Legend
              formatter={(value, entry, index) => {
                const firstPartText = value.substring(0, 7);
                const secondPartText = value.substring(8);

                return (
                  <div className="mx-1">
                    <p className="text-black">{firstPartText}</p>
                    <span className="text-black">{secondPartText}</span>
                  </div>
                );
              }}
            />
            {showReference ? (
              <>
                <ReferenceArea
                  y1={0}
                  y2={90}
                  fill="#00ff00"
                  fillOpacity={0.5}
                />
                <ReferenceArea
                  y1={90}
                  y2={120}
                  fill="#006600"
                  fillOpacity={0.5}
                />
                <ReferenceArea
                  y1={120}
                  y2={150}
                  fill="#ff9900"
                  fillOpacity={0.5}
                />
                <ReferenceArea
                  y1={150}
                  y2={180}
                  fill="#cc3300"
                  fillOpacity={0.5}
                />
                <ReferenceArea
                  y1={180}
                  y2={300}
                  fill="#ff0000"
                  fillOpacity={0.5}
                />
              </>
            ) : null}
            {showReference ? LineChartWithoutDot : LineChartWithDot}
            <Brush dataKey="station" stroke="black" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default ChartSCI;
