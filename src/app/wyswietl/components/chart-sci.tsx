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
import {
  LegendSCIKr_1,
  LegendSCIKr_3,
  LegendSCIKr_4,
  LegendSCIKr_5,
  LegendSCIKr_6,
} from "./legend";
import dynamic from "next/dynamic";
const Map = dynamic(() => import("./map"), { ssr: false });

const CustomReferenceAreaKat = ({ category }: { category: number }) => {
  if (category === 1 || category === 2) {
    return (
      <>
        <ReferenceArea y1={0} y2={115} fill="#00ff00" fillOpacity={0.7} />
        <ReferenceArea y1={115} y2={165} fill="#006600" fillOpacity={0.7} />
        <ReferenceArea y1={165} y2={240} fill="#ff9900" fillOpacity={0.7} />
        <ReferenceArea y1={240} y2={500} fill="#ff0000" fillOpacity={0.8} />
      </>
    );
  }
  if (category === 3)
    return (
      <>
        <ReferenceArea y1={0} y2={70} fill="#00ff00" fillOpacity={0.7} />
        <ReferenceArea y1={70} y2={110} fill="#006600" fillOpacity={0.7} />
        <ReferenceArea y1={110} y2={190} fill="#ff9900" fillOpacity={0.7} />
        <ReferenceArea y1={190} y2={500} fill="#ff0000" fillOpacity={0.8} />
      </>
    );
  if (category === 4)
    return (
      <>
        <ReferenceArea y1={0} y2={50} fill="#00ff00" fillOpacity={0.7} />
        <ReferenceArea y1={50} y2={80} fill="#006600" fillOpacity={0.7} />
        <ReferenceArea y1={80} y2={140} fill="#ff9900" fillOpacity={0.7} />
        <ReferenceArea y1={140} y2={500} fill="#ff0000" fillOpacity={0.8} />
      </>
    );
  if (category === 5)
    return (
      <>
        <ReferenceArea y1={0} y2={40} fill="#00ff00" fillOpacity={0.7} />
        <ReferenceArea y1={40} y2={60} fill="#006600" fillOpacity={0.7} />
        <ReferenceArea y1={60} y2={100} fill="#ff9900" fillOpacity={0.7} />
        <ReferenceArea y1={100} y2={500} fill="#ff0000" fillOpacity={0.8} />
      </>
    );
  if (category === 6 || category === 7) {
    return (
      <>
        <ReferenceArea y1={0} y2={30} fill="#00ff00" fillOpacity={0.7} />
        <ReferenceArea y1={30} y2={50} fill="#006600" fillOpacity={0.7} />
        <ReferenceArea y1={50} y2={80} fill="#ff9900" fillOpacity={0.7} />
        <ReferenceArea y1={80} y2={500} fill="#ff0000" fillOpacity={0.8} />
      </>
    );
  }
};
const LegendSCI = ({ category }: { category: number }) => {
  if (category === 1 || category === 2) {
    return <LegendSCIKr_1 />;
  }
  if (category === 3) {
    return <LegendSCIKr_3 />;
  }
  if (category === 4) {
    return <LegendSCIKr_4 />;
  }
  if (category === 5) {
    return <LegendSCIKr_5 />;
  }
  if (category === 6 || category === 7) {
    return <LegendSCIKr_6 />;
  }
};

const ChartSCI = () => {
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
        const SCI = +entry.SCI;
        const index = result.findIndex((el) => el.station === station);
        if (index === -1) {
          result.push({
            station,
            [name]: SCI,
            originalName: entry.originalName,
            gps: entry.GPS,
          });
        } else {
          result[index][name] = SCI;
        }
      }
      return result.sort((a, b) => a.station - b.station);
    },
    []
  );
  const roadCategory = +chartsData[0][0].roadCategory;
  const gps = chartsData[0][0].GPS;

  return (
    <Card className="mt-4 pt-6">
      <CardContent className="flex flex-col md:flex-row">
        <LegendSCI category={roadCategory} />
        <ResponsiveContainer height={700}>
          <ScatterChart data={transformData(flatChartsData)}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={"station"} type="category" />
            <YAxis
              type="number"
              domain={[0, 500]}
              ticks={[0, 50, 90, 120, 150, 180, 240, 500]}
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
            {CustomReferenceAreaKat({ category: roadCategory })}
            {uniqueStations.map((data, i) => {
              return (
                <Scatter
                  isAnimationActive={false}
                  key={i}
                  dataKey={data}
                  name={"SCI"}
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

export default ChartSCI;
