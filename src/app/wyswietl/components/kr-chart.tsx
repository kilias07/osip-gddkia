import {LegendSCIKr_1, LegendSCIKr_3, LegendSCIKr_4, LegendSCIKr_5, LegendSCIKr_6,} from "./legend";
import {CartesianGrid, Cell, ResponsiveContainer, Scatter, ScatterChart, Tooltip, XAxis, YAxis,} from "recharts";
import {Separator} from "@radix-ui/react-dropdown-menu";
import {getShape} from "./chart-functions";


const roadCatgories = [
  {
    name: "KR-1"
  }
]

interface KrProps {
  finalData: {
    [x: string]: string | number;
    station: number;
    originalName: string;
  }[];
  uniqueStations: string[];
  theme: string;
}

export const Kr_1 = ({finalData, uniqueStations, theme}: KrProps) => {
  return (
    <>
      <div className="flex">
        <LegendSCIKr_1/>
        <span className="relative -mr-6 font-medium -rotate-90 self-center h-fit">
          SCI
        </span>
        <ResponsiveContainer width={"100%"} height={300}>
          <ScatterChart syncId={"all"} data={finalData}>
            <CartesianGrid strokeDasharray="3 3"/>
            <XAxis dataKey={"station"} type="category"/>
            <YAxis
              name="dupa"
              type="number"
              domain={[0, 500]}
              ticks={[0, 50, 90, 120, 150, 180, 240, 500]}
            />

            <Tooltip/>

            {uniqueStations.map((data, i) => {
              return (
                <Scatter
                  key={i}
                  dataKey={data + "_SCI"}
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
                          +entry[data + "_SCI"] <= 115
                            ? "#00ff00"
                            : +entry[data + "_SCI"] <= 165
                              ? "#006600"
                              : +entry[data + "_SCI"] <= 240
                                ? "#ff9900"
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
      <Separator className="mb-4 w-full"/>
    </>
  );
};

export const Kr_3 = ({finalData, uniqueStations, theme}: KrProps) => {
  return (
    <>
      <div className="flex">
        <LegendSCIKr_3/>
        <span className="relative -mr-6 font-medium -rotate-90 self-center h-fit">
          SCI
        </span>
        <ResponsiveContainer width={"100%"} height={300}>
          <ScatterChart syncId={"all"} data={finalData}>
            <CartesianGrid strokeDasharray="3 3"/>
            <XAxis dataKey={"station"} type="category"/>
            <YAxis
              name="dupa"
              type="number"
              domain={[0, 500]}
              ticks={[0, 50, 90, 120, 150, 180, 240, 500]}
            />

            <Tooltip/>

            {uniqueStations.map((data, i) => {
              return (
                <Scatter
                  key={i}
                  dataKey={data + "_SCI"}
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
                          +entry[data + "_SCI"] <= 70
                            ? "#00ff00"
                            : +entry[data + "_SCI"] <= 110
                              ? "#006600"
                              : +entry[data + "_SCI"] <= 190
                                ? "#ff9900"
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
      <Separator className="mb-4 w-full"/>
    </>
  );
};

export const Kr_4 = ({finalData, uniqueStations, theme}: KrProps) => {
  return (
    <>
      <div className="flex">
        <LegendSCIKr_4/>
        <span className="relative -mr-6 font-medium -rotate-90 self-center h-fit">
          SCI
        </span>
        <ResponsiveContainer width={"100%"} height={300}>
          <ScatterChart syncId={"all"} data={finalData}>
            <CartesianGrid strokeDasharray="3 3"/>
            <XAxis dataKey={"station"} type="category"/>
            <YAxis
              name="dupa"
              type="number"
              domain={[0, 500]}
              ticks={[0, 50, 90, 120, 150, 180, 240, 500]}
            />

            <Tooltip/>

            {uniqueStations.map((data, i) => {
              return (
                <Scatter
                  key={i}
                  dataKey={data + "_SCI"}
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
                          +entry[data + "_SCI"] <= 50
                            ? "#00ff00"
                            : +entry[data + "_SCI"] <= 80
                              ? "#006600"
                              : +entry[data + "_SCI"] <= 140
                                ? "#ff9900"
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
      <Separator className="mb-4 w-full"/>
    </>
  );
};

export const Kr_5 = ({finalData, uniqueStations, theme}: KrProps) => {
  return (
    <>
      <div className="flex">
        <LegendSCIKr_5/>
        <span className="relative -mr-6 font-medium -rotate-90 self-center h-fit">
          SCI
        </span>
        <ResponsiveContainer width={"100%"} height={300}>
          <ScatterChart syncId={"all"} data={finalData}>
            <CartesianGrid strokeDasharray="3 3"/>
            <XAxis dataKey={"station"} type="category"/>
            <YAxis
              name="dupa"
              type="number"
              domain={[0, 500]}
              ticks={[0, 50, 90, 120, 150, 180, 240, 500]}
            />

            <Tooltip/>

            {uniqueStations.map((data, i) => {
              return (
                <Scatter
                  key={i}
                  dataKey={data + "_SCI"}
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
                          +entry[data + "_SCI"] <= 40
                            ? "#00ff00"
                            : +entry[data + "_SCI"] <= 60
                              ? "#006600"
                              : +entry[data + "_SCI"] <= 100
                                ? "#ff9900"
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
      <Separator className="mb-4 w-full"/>
    </>
  );
};

export const Kr_6 = ({finalData, uniqueStations, theme}: KrProps) => {
  return (
    <>
      <div className="flex">
        <LegendSCIKr_6/>
        <span className="relative -mr-6 font-medium -rotate-90 self-center h-fit">
          SCI
        </span>
        <ResponsiveContainer width={"100%"} height={300}>
          <ScatterChart syncId={"all"} data={finalData}>
            <CartesianGrid strokeDasharray="3 3"/>
            <XAxis dataKey={"station"} type="category"/>
            <YAxis
              name="dupa"
              type="number"
              domain={[0, 500]}
              ticks={[0, 50, 90, 120, 150, 180, 240, 500]}
            />

            <Tooltip/>

            {uniqueStations.map((data, i) => {
              return (
                <Scatter
                  key={i}
                  dataKey={data + "_SCI"}
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
                          +entry[data + "_SCI"] <= 30
                            ? "#00ff00"
                            : +entry[data + "_SCI"] <= 50
                              ? "#006600"
                              : +entry[data + "_SCI"] <= 80
                                ? "#ff9900"
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
      <Separator className="mb-4 w-full"/>
    </>
  );
};
