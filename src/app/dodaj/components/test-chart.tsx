import { DataAfterCalculation } from "@/types/types";
import { VictoryChart, VictoryLine, VictoryTheme } from "victory";

interface ChartsProps {
  selectedData: DataAfterCalculation[];
}

const TestChart = ({ selectedData }: ChartsProps) => {
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
    <div>
      <VictoryChart theme={VictoryTheme.material} />
      <VictoryLine
        data={stations}
        x="stationID"
        y="BCI"
        domain={{
          x: [stationStartIndex, stationEndIndex],
          y: [0, 100],
        }}
      />
    </div>
  );
};

export default TestChart;
