import { Card, CardContent } from "@/components/ui/card";
import {
  CartesianGrid,
  Cell,
  Legend,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useEffect, useMemo, useState } from "react";
import { useTheme } from "next-themes";
import { useChartsData } from "@/lib/store-zustand";
import { getShape } from "./chart-functions";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LegendBCI, LegendBDI } from "./legend";
import { Separator } from "@/components/ui/separator";
import { Kr_1, Kr_3, Kr_4, Kr_5, Kr_6 } from "./kr-chart";

const ChartALL = () => {
  const { chartsData } = useChartsData((state) => state);
  const [allKr, setAllKr] = useState<string[]>([]);

  const uniqueStations = useMemo(
    () => [...new Set(chartsData.flat().map((data) => data.name))],
    [chartsData]
  );

  const { theme } = useTheme();

  useEffect(() => {
    setAllKr(() => [
      ...new Set(chartsData.flat().map((data) => data.roadCategory)),
    ]);
  }, [chartsData, setAllKr]);

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
  const finalData = transformData(flatChartsData);
  return (
    <Tabs defaultValue={allKr[0]}>
      <TabsList className="flex justify-center w-fit">
        {allKr.sort().map((category) => (
          <TabsTrigger key={category} value={category}>
            KR{category}
          </TabsTrigger>
        ))}
      </TabsList>
      <Card className="mt-4 pt-6">
        <CardContent>
          <TabsContent value="1">
            <Kr_1
              theme={theme!}
              finalData={finalData}
              uniqueStations={uniqueStations}
            />
          </TabsContent>
          <TabsContent value="2">
            <Kr_1
              theme={theme!}
              finalData={finalData}
              uniqueStations={uniqueStations}
            />
          </TabsContent>

          <TabsContent value="3">
            <Kr_3
              theme={theme!}
              finalData={finalData}
              uniqueStations={uniqueStations}
            />
          </TabsContent>

          <TabsContent value="4">
            <Kr_4
              theme={theme!}
              finalData={finalData}
              uniqueStations={uniqueStations}
            />
          </TabsContent>

          <TabsContent value="5">
            <Kr_5
              theme={theme!}
              finalData={finalData}
              uniqueStations={uniqueStations}
            />
          </TabsContent>

          <TabsContent value="6">
            <Kr_6
              theme={theme!}
              finalData={finalData}
              uniqueStations={uniqueStations}
            />
          </TabsContent>
          <TabsContent value="7">
            <Kr_6
              theme={theme!}
              finalData={finalData}
              uniqueStations={uniqueStations}
            />
          </TabsContent>

          <div className="flex">
            <LegendBDI />
            <span className="relative -mr-6 font-medium -rotate-90 self-center h-fit">
              BDI
            </span>
            <ResponsiveContainer width={"100%"} height={300}>
              <ScatterChart syncId="all" data={finalData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={"station"} type="category" />
                <YAxis
                  type="number"
                  domain={[0, 300]}
                  ticks={[0, 50, 90, 120, 150, 180, 240, 300]}
                />
                <Tooltip />
                {uniqueStations.map((data, i) => {
                  return (
                    <Scatter
                      key={i}
                      dataKey={data + "_BDI"}
                      name={"BCI"}
                      shape={getShape(i)}
                      stroke="#000000"
                      fill={theme === "dark" ? "#fff" : "gray"}
                      isAnimationActive={false}
                    >
                      {finalData.map((entry, index) => {
                        return (
                          <Cell
                            key={`cell-${index}`}
                            fill={
                              +entry[data + "_BDI"] <= 90
                                ? "#00ff00"
                                : +entry[data + "_BDI"] <= 121
                                ? "#006600"
                                : +entry[data + "_BDI"] <= 150
                                ? "#ff9900"
                                : +entry[data + "_BDI"] <= 180
                                ? "#cc3300"
                                : "#ff0000"
                            }
                          />
                        );
                      })}
                    </Scatter>
                  );
                })}
              </ScatterChart>
            </ResponsiveContainer>
          </div>
          <Separator className="mb-4 w-full" />
          <div className="flex">
            <LegendBCI />
            <span className="relative -mr-6 mb-16 font-medium -rotate-90 self-center h-fit">
              BCI
            </span>
            <ResponsiveContainer width={"100%"} height={364}>
              <ScatterChart data={finalData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={"station"} type="category" />
                <YAxis
                  type="number"
                  domain={[0, 200]}
                  ticks={[0, 50, 90, 120, 150, 180, 200]}
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
                      <div className=" text-black flex flex-col mx-2 text-sm">
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
                <Tooltip />
                {uniqueStations.map((data, i) => {
                  return (
                    <Scatter
                      key={i}
                      dataKey={data + "_BCI"}
                      name={"SCI"}
                      shape={getShape(i)}
                      stroke="#000000"
                      fill={theme === "dark" ? "#fff" : "gray"}
                      isAnimationActive={false}
                    >
                      {finalData.map((entry, index) => {
                        return (
                          <Cell
                            key={`cell-${index}`}
                            fill={
                              +entry[data + "_BCI"] <= 45
                                ? "#00ff00"
                                : +entry[data + "_BCI"] <= 60
                                ? "#006600"
                                : +entry[data + "_BCI"] <= 75
                                ? "#ff9900"
                                : +entry[data + "_BCI"] <= 90
                                ? "#cc3300"
                                : "#ff0000"
                            }
                          />
                        );
                      })}
                    </Scatter>
                  );
                })}
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </Tabs>
  );
};

export default ChartALL;
