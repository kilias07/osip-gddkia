import { DataAfterCalculation } from "@/types/types";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import {
  Tooltip,
  Legend,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Brush,
  ReferenceArea,
  LineChart,
} from "recharts";
import { use, useEffect, useState } from "react";

const Checkboxs = () => {
  const [selectedValue, setSelectedValue] = useState("BCI");

  // console.log(selectedValue);
  // const handleSelectionChange = (
  //   event: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   setSelectedValue(event.target.value);
  // };

  return (
    <div className="h-fit">
      <RadioGroup defaultValue={selectedValue}>
        <div className="flex items-center space-x-2">
          <RadioGroupItem
            value="BCI"
            id="BCI"
            checked={selectedValue === "BCI"}
          />
          <Label htmlFor="BCI">BCI</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem
            value="BDI"
            id="BDI"
            checked={selectedValue === "BDI"}
          />
          <Label htmlFor="BDI">BDI</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem
            value="SCI"
            id="SCI"
            checked={selectedValue === "SCI"}
          />
          <Label htmlFor="SCI">SCI</Label>
        </div>
      </RadioGroup>
    </div>
  );
};

interface ChartsProps {
  selectedData: DataAfterCalculation[];
}

const Charts = ({ selectedData }: ChartsProps) => {
  const stations = selectedData[0].data.sessions.stations.map((station) => {
    return {
      stationID: station.stationID,
      BCI: station.drops[0].BCI,
      BDI: station.drops[0].BDI,
      SCI: station.drops[0].SCI,
      station: station.station,
    };
  });

  const stationStartIndex = 0;
  const stationEndIndex = stations.length - 1;

  return (
    <div className="flex gap-10 justify-between">
      {/* <Checkboxs /> */}
      <div>
        <LineChart width={800} height={600} data={stations}>
          <XAxis dataKey="station" />
          <YAxis domain={[0, 300]} />
          <Tooltip label={"test"} />
          <Legend />
          <CartesianGrid stroke="#f5f5f5" />
          <Line dataKey="SCI" stroke="#ff7300" strokeWidth={1.5} />
          <Line dataKey="BDI" stroke="#8884d8" strokeWidth={1.5} />
          <Line dataKey="BCI" stroke="#ff00FF" strokeWidth={2} />
          <ReferenceArea
            y1={0}
            y2={120}
            label="Nie wymaga remontu"
            fill="#90EE90"
            fillOpacity={0.2}
            onMouseEnter={() => {
              console.log("enter");
            }}
          />
          <ReferenceArea
            y1={120}
            y2={160}
            fill="#006400"
            fillOpacity={0.2}
            label="Faza początkowa degradacji"
          />
          <ReferenceArea
            y1={160}
            y2={200}
            fill="#F49000"
            label="stan ostrzegawczy"
            fillOpacity={0.2}
          />
          <ReferenceArea
            y1={200}
            y2={240}
            fill="#F44340"
            label="stan ostrzegawczy"
            fillOpacity={0.2}
          />

          <ReferenceArea
            y1={240}
            stroke="#F5093C"
            strokeOpacity={0.2}
            fill="#F5093C"
            label="Stan zły"
          />

          <Brush
            startIndex={stationStartIndex}
            endIndex={stationEndIndex}
            dataKey="stationID"
          />
        </LineChart>
      </div>
    </div>
  );
};

export default Charts;
