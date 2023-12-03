import { Checkbox } from "@/components/ui/checkbox";
import { Dispatch, SetStateAction } from "react";
import { Picker } from "../page";

interface ChartPickerProps {
  picked: Picker;
  setPicked: Dispatch<SetStateAction<Picker>>;
}

const ChartPicker = ({ picked, setPicked }: ChartPickerProps) => {
  return (
    <div className="rounded-md border p-4">
      <h1 className="text-base mb-2 font-medium leading-none">
        Wybierz warstwy
      </h1>
      <div className="flex gap-4 items-center">
        <div className="items-top flex space-x-2">
          <Checkbox
            id="SCI"
            checked={picked.SCI}
            onCheckedChange={() => {
              setPicked((prev) => ({
                ...prev,
                SCI: !prev.SCI,
                ALL: false,
              }));
            }}
          />
          <label
            htmlFor="SCI"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            SCI
          </label>
        </div>
        <div className="items-top flex space-x-2">
          <Checkbox
            id="BDI"
            checked={picked.BDI}
            onCheckedChange={() => {
              setPicked((prev) => ({
                ...prev,
                BDI: !prev.BDI,
                ALL: false,
              }));
            }}
          />
          <label
            htmlFor="BDI"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            BDI
          </label>
        </div>
        <div className="items-top flex space-x-2">
          <Checkbox
            id="BCI"
            checked={picked.BCI}
            onCheckedChange={() => {
              setPicked((prev) => ({
                ...prev,
                BCI: !prev.BCI,
                ALL: false,
              }));
            }}
          />
          <label
            htmlFor="BCI"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            BCI
          </label>
        </div>
        <div className="items-top flex space-x-2">
          <Checkbox
            id="ALL"
            checked={picked.ALL}
            onCheckedChange={() => {
              setPicked((prev) => ({
                ALL: !prev.ALL,
                SCI: prev.ALL,
                BDI: prev.ALL,
                BCI: prev.ALL,
              }));
            }}
          />
          <label
            htmlFor="ALL"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Wszystko
          </label>
        </div>
      </div>
    </div>
  );
};

export default ChartPicker;
