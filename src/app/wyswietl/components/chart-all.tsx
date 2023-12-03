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
  LineChart,
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

const ChartALL = () => {
  const { chartsData } = useChartsData((state) => state);

  const uniqueStations = useMemo(
    () => [...new Set(chartsData.flat().map((data) => data.name))],
    [chartsData]
  );
  console.log(uniqueStations);
  const { theme } = useTheme();

  const flatChartsData = chartsData.flat();
  const transformData = useMemo(
    () => (data: typeof flatChartsData) => {
      const result = [];
      for (let i = 0; i < data.length; i++) {
        const entry = data[i];
        const station = entry.station;
        const name = entry.name;
        const SCI = +entry.SCI;
        const BCI = +entry.BCI;
        const BDI = +entry.BDI;
        const index = result.findIndex((el) => el.station === station);
        if (index === -1) {
          result.push({
            station,
            [name + "_SCI"]: SCI,
            [name + "_BCI"]: BCI,
            [name + "_BDI"]: BDI,
            originalName: entry.originalName,
          });
        } else {
          result[index][name + "_SCI"] = SCI;
          result[index][name + "_BDI"] = BDI;
          result[index][name + "_BCI"] = BCI;
        }
      }
      return result.sort((a, b) => a.station - b.station);
    },
    []
  );
  console.log(transformData(flatChartsData));

  return (
    <Card className="mt-4 pt-6">
      <CardContent className="flex flex-col md:flex-row">
        <div className="w-full md:w-64">
          <CardHeader className="pl-1">
            <CardTitle>Pakiet warstw bitumicznych</CardTitle>
            <CardDescription>SCI</CardDescription>
          </CardHeader>
          <CardDescription className="text-slate-950">Legenda</CardDescription>
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
        </div>
        <div className="w-full ">
          <ResponsiveContainer width={"100%"} height={300}>
            <ScatterChart syncId={"all"} data={transformData(flatChartsData)}>
              <Brush />
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
              {uniqueStations.map((data, i) => {
                return (
                  <Scatter
                    key={i}
                    dataKey={data + "_SCI"}
                    name={"SCI"}
                    shape={getShape(i)}
                    stroke="#000000"
                    fill={theme === "dark" ? "#fff" : "gray"}
                  />
                );
              })}
            </ScatterChart>
          </ResponsiveContainer>
          <ResponsiveContainer width={"100%"} height={300}>
            <ScatterChart syncId="all" data={transformData(flatChartsData)}>
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
              {uniqueStations.map((data, i) => {
                return (
                  <Scatter
                    key={i}
                    dataKey={data + "_BDI"}
                    name={"BCI"}
                    shape={getShape(i)}
                    stroke="#000000"
                    fill={theme === "dark" ? "#fff" : "gray"}
                  />
                );
              })}
            </ScatterChart>
          </ResponsiveContainer>
          <ResponsiveContainer width={"100%"} height={300}>
            <ScatterChart syncId="all" data={transformData(flatChartsData)}>
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
              {uniqueStations.map((data, i) => {
                return (
                  <Scatter
                    key={i}
                    dataKey={data + "_BCI"}
                    name={"SCI"}
                    shape={getShape(i)}
                    stroke="#000000"
                    fill={theme === "dark" ? "#fff" : "gray"}
                  />
                );
              })}
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChartALL;
