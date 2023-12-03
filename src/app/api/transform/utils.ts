import { Stations } from "@/types/types";
import { Value } from "mdb-reader/lib/types/types";
import { Drops } from "@/types/types";

export function orderStations(stations: Stations[]) {
  if (stations[0].station > stations[stations.length - 1].station) {
    return stations.reverse();
  }
  return stations;
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

/**
 * @description this function is strictly for FWD file data. It returns array of objects with station data
 * @param {String} data - data from file
 * @return {Array} geophoneX - array of objects
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
  let year = null;
  const yearDigits = Number(dateString.slice(0, 4));
  if (yearDigits.toString().length === 4) {
    year = +dateString.slice(0, 4);
  }
  if (
    yearDigits.toString().length === 1 ||
    yearDigits.toString().length === 2
  ) {
    if (+dateString.slice(0, 4) > 50) {
      year = +dateString.slice(0, 4) + 1900;
    } else {
      year = +dateString.slice(0, 4) + 2000;
    }
  }
  const month = +dateString.slice(4, 6) - 1;
  const day = +dateString.slice(6, 8);
  return new Date(year!, +month, day);
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
  const u30 = (50 / force) * Dx30Value * (1 + 0.02 * (20 - asphalftTemp));
  const u0 = (50 / force) * Dx0Value * (1 + 0.02 * (20 - asphalftTemp));
  const sci = +(u0 - u30).toFixed(2);
  if (sci > 300) return 300;
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
  const u60 = (50 / force) * Dx60Value * (1 + 0.02 * (20 - asphalftTemp));
  const u30 = (50 / force) * Dx0Value * (1 + 0.02 * (20 - asphalftTemp));
  const bdi = +(u30 - u60).toFixed(2);
  if (bdi > 300) return 300;
  return bdi;
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
  const u90 = (50 / force) * Dx90Value * (1 + 0.02 * (20 - asphalftTemp));
  const u60 = (50 / force) * Dx0Value * (1 + 0.02 * (20 - asphalftTemp));
  const bci = +(u60 - u90).toFixed(2);
  if (bci > 300) return 300;
  return bci;
};

/**
 * @description this function is strictly for FWD file data. It returns array of objects with station data
 * @param {String[]} lines from FWD file spliting by /\r\n|\n|\r/
 * @return {String} comments of FWD file
 */
export const getComments = (lines: string[]): string => {
  const comments = [];

  const operator = lines[20]
    .split(" ")
    .filter((x) => x !== "")
    .join(" ");

  const commentLine1 = lines[0]
    .substring(19)
    .split(" ")
    .filter((x) => x !== "")
    .join(" ");

  const commentLine2 = lines[20]
    .split(" ")
    .filter((x) => x !== "")
    .join(" ");

  const commentLine3 = lines[23]
    .split(" ")
    .filter((x) => x !== "")
    .join(" ");

  const commentLine4 = lines[26]
    .split(" ")
    .filter((x) => x !== "")
    .join(" ");

  const commentLine5 = lines[35]
    .split(" ")
    .filter((x) => x !== "")
    .join(" ");

  comments.push(
    commentLine1,
    commentLine2,
    commentLine3,
    commentLine4,
    commentLine5,
    operator
  );

  return comments.join("\n");
};
