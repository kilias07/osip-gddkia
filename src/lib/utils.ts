import { Drops } from "@/types/types";
import { type ClassValue, clsx } from "clsx";
import { Value } from "mdb-reader/lib/types/types";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type Obj = {
  [key: string]: number | Value;
};

//this is for MDB file
export function getNonZeroValArr(obj: Obj) {
  const keys = Object.keys(obj).reverse();
  for (let i = 0; i < keys.length; i++) {
    if (obj[keys[i]] !== 0) {
      return keys.slice(i).reverse();
    }
  }
}

//this is for FWD file
/*
 * @params data - string
 * @return geophoneX - array of objects
 */
export function getGeophoneData(data: string) {
  //all data where first element is radius and the rest is geophoneX
  const geophoneData = data.split(" ").filter((x) => x !== "");
  const radius = +geophoneData[0];

  //all geophoneX data
  const geophoneXRaw = geophoneData.splice(1);

  const regex = /[1-9][0-9]0{1,2}/g;
  const geophoneCalc = geophoneXRaw.pop();

  //rest data that was not splice from geophoneX
  const allgeophoneData = geophoneCalc
    ?.match(regex)
    ?.concat(geophoneXRaw)
    .map((x) => Number(x))
    .sort((a, b) => a - b);

  const geophoneX = allgeophoneData!.map((x, i) => {
    return {
      name: `X${i + 1}`,
      value: x,
    };
  }) as Array<{ name: `X${number}`; value: number }>;
  return {
    radius,
    geophoneX,
  };
}

export function getFWDDate(dateString: string) {
  const year = +dateString.slice(0, 4);
  const month = +dateString.slice(4, 2);
  const day = +dateString.slice(6, 2);
  return new Date(year, month, day);
}

function getPositionOfGeophone(
  value: number,
  geophoneX: ReturnType<typeof getGeophoneData>["geophoneX"]
) {
  return geophoneX.findIndex((el) => el.value === value) + 1;
}

export const SCIIndicator = (
  geophoneX: ReturnType<typeof getGeophoneData>["geophoneX"],
  force: number,
  asphalftTemp: number,
  drops: Drops["drops"]
) => {
  const Ux0Position = getPositionOfGeophone(0, geophoneX);
  const Ux30Position = getPositionOfGeophone(300, geophoneX);
  const Dx0Value = drops.find((el) => el[`D${Ux0Position}`])![
    `D${Ux0Position}`
  ];
  const Dx30Value = drops.find((el) => el[`D${Ux30Position}`])![
    `D${Ux30Position}`
  ];
  const u30 = (50 / force) * Dx30Value * 1 + 0.02 * (20 - asphalftTemp);
  const u0 = (50 / force) * Dx0Value * 1 + 0.02 * (20 - asphalftTemp);
  const sci = +(u0 - u30).toFixed(2);
  return sci;
};

export const BDIIndicator = (
  geophoneX: ReturnType<typeof getGeophoneData>["geophoneX"],
  force: number,
  asphalftTemp: number,
  drops: Drops["drops"]
) => {
  const Ux30Position = getPositionOfGeophone(300, geophoneX);
  const Ux60Position = getPositionOfGeophone(600, geophoneX);
  const Dx0Value = drops.find((el) => el[`D${Ux30Position}`])![
    `D${Ux30Position}`
  ];
  const Dx60Value = drops.find((el) => el[`D${Ux60Position}`])![
    `D${Ux60Position}`
  ];
  const u60 = (50 / force) * Dx60Value * 1 + 0.02 * (20 - asphalftTemp);
  const u30 = (50 / force) * Dx0Value * 1 + 0.02 * (20 - asphalftTemp);
  const sci = +(u30 - u60).toFixed(2);
  return sci;
};

export const BCIIndicator = (
  geophoneX: ReturnType<typeof getGeophoneData>["geophoneX"],
  force: number,
  asphalftTemp: number,
  drops: Drops["drops"]
) => {
  const Ux60Position = getPositionOfGeophone(600, geophoneX);
  const Ux90Position = getPositionOfGeophone(900, geophoneX);
  const Dx0Value = drops.find((el) => el[`D${Ux60Position}`])![
    `D${Ux60Position}`
  ];
  const Dx90Value = drops.find((el) => el[`D${Ux90Position}`])![
    `D${Ux90Position}`
  ];
  const u90 = (50 / force) * Dx90Value * 1 + 0.02 * (20 - asphalftTemp);
  const u60 = (50 / force) * Dx0Value * 1 + 0.02 * (20 - asphalftTemp);
  const sci = +(u60 - u90).toFixed(2);
  return sci;
};
