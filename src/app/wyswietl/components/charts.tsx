import { DataAfterCalculation } from "@/types/types";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface ChartsProps {
  selectedData: DataAfterCalculation[];
}

const Charts = ({ selectedData }: ChartsProps) => {
  const selecteddata2 = selectedData.map(
    (item, i) => item.data.sessions.geophoneX
  );

  function transformArray(data: typeof selecteddata2) {
    const result = [];
    for (let i = 0; i < data[0].length; i++) {
      const obj: any = { name: data[0][i].name };

      data.forEach((items, index) => {
        obj[`road${index + 1}`] = items[i].value;
      });

      result.push(obj);
    }

    return result;
  }

  return (
    <div className="max-w-screen-sm w-full h-[20rem]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={transformArray(selecteddata2)}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          {Object.values(transformArray(selecteddata2)[0]).map((_, i) => {
            return (
              <Line
                key={i}
                type="monotone"
                dataKey={`road${i + 1}`}
                stroke={i === 0 ? "#82ca9d" : "#FF0000"}
                strokeWidth={2}
                activeDot={{ r: 8 }}
                name={`road${i + 1}`}
              />
            );
          })}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Charts;

// Data should be transformed as this
// const testValues = [
//   {
//     name: "X1",
//     road1: 0,
//     road2: 0,
//     road3: 0,
//   },
//   {
//     name: "X2",
//     road1: 100,
//     road2: 140,
//     road3: 120,
//   },
//   {
//     name: "X3",
//     road1: 300,
//     road2: 240,
//     road3: 250,
//   },
// ];
