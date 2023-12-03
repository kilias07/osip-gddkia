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

const CustomReferenceArea = () => (
  <>
    <ReferenceArea y1={0} y2={45} fill="#00ff00" fillOpacity={0.5} />
    <ReferenceArea y1={45} y2={60} fill="#006600" fillOpacity={0.5} />
    <ReferenceArea y1={60} y2={75} fill="#ff9900" fillOpacity={0.5} />
    <ReferenceArea y1={75} y2={90} fill="#cc3300" fillOpacity={0.5} />
    <ReferenceArea y1={90} y2={300} fill="#ff0000" fillOpacity={0.5} />
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
    <Card className="mt-4 pt-6" key={"BDI"}>
      <CardContent className="flex flex-col md:flex-row">
        <div className="w-full md:w-64">
          <CardHeader className="pl-1">
            <CardTitle>Podłoże</CardTitle>
            <CardDescription>BCI</CardDescription>
          </CardHeader>
          <CardDescription className="text-slate-950">Legenda</CardDescription>

          <ul>
            <li className="flex gap-2 items-center my-2 text-xs">
              <span className="bg-[#00ff00] w-5 h-5 rounded-full inline-block" />
              <p>0 - 45 dobry stan techniczny</p>
            </li>
            <li className="flex gap-2 items-center my-2 text-xs">
              <span className="bg-[#006600] w-5 h-5 rounded-full inline-block" />
              <p>46 - 60 stan techniczny zadowalający</p>
            </li>
            <li className="flex gap-2 items-center my-2 text-xs">
              <span className="bg-[#ff9900] w-5 h-5 rounded-full inline-block" />
              <p>61 - 75 stan ostrzegawczy</p>
            </li>
            <li className="flex gap-2 items-center my-2 text-xs">
              <span className="bg-[#cc3300] w-5 h-5 rounded-full inline-block" />
              <p>76 - 90 stan zły</p>
            </li>
            <li className="flex gap-2 items-center my-2 text-xs">
              <span className="bg-[#ff0000] w-5 h-5 rounded-full inline-block" />
              <p> {">"} 90 konieczny remont/przebudowa</p>
            </li>
          </ul>
        </div>

        <ResponsiveContainer width={"100%"} height={700}>
          <ScatterChart data={transformData(flatChartsData)}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={"station"} type="category" />
            <YAxis
              type="number"
              domain={[0, 300]}
              ticks={[0, 50, 90, 120, 150, 180, 240, 300]}
            />

            <Tooltip />
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
      </CardContent>
    </Card>
  );
};

export default ChartBCI;
