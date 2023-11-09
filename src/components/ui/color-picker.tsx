"use client";

import { useState } from "react";
import { CheckIcon } from "@radix-ui/react-icons";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const colors = [
  {
    name: "zinc",
    value: "#27272A",
  },
  {
    name: "rose",
    value: "#B91C1C",
  },
  {
    name: "blue",
    value: "#1D4ED8",
  },
  {
    name: "green",
    value: "#064E3B",
  },
  {
    name: "orange",
    value: "#FDE047",
  },
] as const;

const ColorPicker = ({ selected = true }: { selected: boolean }) => {
  const [color, setColor] = useState("");
  const [isActive, setIsActive] = useState(false);
  // if (selected) {
  //   const copyColors = [...colors];
  //   const getColor = copyColors.shift();
  //   setColor(getColor.name);
  // }

  return (
    <Popover>
      <PopoverTrigger disabled={!selected} className="flex items-center w-44">
        <span
          className="w-6 h-6 rounded-full inline-block mr-2"
          style={{
            backgroundColor: color,
          }}
        />
        zmień kolor{" "}
      </PopoverTrigger>

      <PopoverContent className="w-52 space-y-2">
        <span className="">Wybierz kolor wykresu</span>
        <ul className="w-44 gap-3 flex justify-center ">
          {colors.map(({ name, value }) => (
            <li key={name} className="w-6 h-6">
              <button
                className="w-full h-full rounded-full flex justify-center items-center ring-offset-2 ring-gray"
                style={{
                  backgroundColor: value,
                }}
                onClick={() => {
                  setColor(value);
                  setIsActive(true);
                }}
              >
                {isActive && color === value && (
                  <CheckIcon className="w-4 h-4 text-white" />
                )}
              </button>
            </li>
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  );
};
export default ColorPicker;
