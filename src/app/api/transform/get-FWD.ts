import { Sessions, Stations } from "@/types/types";
import { IncomingData } from "./route";
import { randomUUID } from "crypto";
import {
  BCIIndicator,
  BDIIndicator,
  SCIIndicator,
  getComments,
  getFWDDate,
  getGeophoneData,
} from "./utils";
import { orderStations } from "./utils";

export const getFWDData = async (data: IncomingData) => {
  const bytes = await data.file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  if (buffer.toString().slice(0, 3) === "R32") {
    const fileData = buffer.toString();
    const params = {
      id: randomUUID(),
      sessions: getSession(fileData),
    };
    return params;
  } else if (
    buffer.toString("utf-16le", 0, 100).slice(1, 6).toLowerCase() === "ikuab"
  ) {
    throw new Error(
      "Ten plik FWD - IKUAB nie jest obsługiwany, wsparcie wkrótce"
    );
  } else {
    throw new Error("Ten plik FWD nie jest obsługiwany");
  }
};

function getSession(fileData: string): Sessions {
  const lines = fileData.split(/\r\n|\n|\r/); //split file by line
  const startKMTest = lines[7].substring(17, 24); //in case this wont work, try to use More preciouse function like below
  const endKM = lines[7].substring(25, 33);
  //This is index of start of stations
  const strPos = fileData.lastIndexOf("*");

  // Find EOF and remove 2 characters from it to get the end of file and prevent empty spaces
  const endOfFile = fileData.lastIndexOf("EOF") - 2;
  const { geophoneX, radius } = getGeophoneData(lines[2]);

  const dateString = lines[0].substring(11, 19);
  const date = getFWDDate(dateString);

  const stationsString = fileData.slice(strPos, endOfFile);
  const stations = getStations(stationsString, date, radius, geophoneX);

  const orderedStations = orderStations(stations);

  return {
    date: date.toString(),
    length: (Math.abs(+endKM) - Math.abs(+startKMTest)).toFixed(2),
    stationMinMax: {
      min: +Number(startKMTest).toFixed(2),
      max: +Number(endKM).toFixed(2),
    },
    geophoneX,
    comments: getComments(lines),
    radius,
    stations: orderedStations,
  };
}

function getStations(
  fileData: string,
  date: Date,
  radius: number,
  geophoneX: ReturnType<typeof getGeophoneData>["geophoneX"]
) {
  const stationsRawArray = fileData.split(/\r\n|\n|\r/).slice(1);

  const startIndexOfStations = <Array<number>>[];

  if (stationsRawArray.length === 0) throw new Error("Plik nie posiada stacji");

  for (let i = 0; i < stationsRawArray.length; i++) {
    if (stationsRawArray[i].includes("S")) {
      startIndexOfStations.push(i);
    }
  }
  const stations = <Stations[]>[];

  let id = 1;
  let asphalftTemp = 0;
  let surfaceTemp = 0;
  let airTemp = 0;
  let lengthOfDrops = 0;

  for (let i = 0; i < stationsRawArray.length; i++) {
    if (startIndexOfStations.includes(i)) {
      const stationLine = stationsRawArray[i]
        .split(" ")
        .filter((x) => x !== "");
      let long = undefined;
      let lat = undefined;

      if (stationsRawArray[i - 1]?.includes("G0000000")) {
        long = +stationsRawArray[i - 1].split(" ")[1];
        lat = +stationsRawArray[i - 1].split(" ")[3];
      }
      const minutes = Number(stationLine[stationLine.length - 1].slice(3));
      const hours = Number(stationLine[stationLine.length - 1].slice(1, 3));

      asphalftTemp = Number(stationsRawArray[i].substring(14, 18));
      surfaceTemp = Number(stationsRawArray[i].substring(21, 23));
      airTemp = Number(stationsRawArray[i].substring(24, 26));
      stations.push({
        stationID: id++,
        station: +stationLine[1].match(/[\d.]+/g)?.[0]!,
        asphalftTemp,
        surfaceTemp,
        airTemp,
        time: new Date(date.setHours(hours, minutes)).toString(),
        GPS: {
          long: long,
          lat: lat,
        },
        drops: [],
      });
    } else {
      const rowDrops = stationsRawArray[i].split(" ").filter((x) => x !== "");
      //we skip the gps line that will always be 3 elements long
      if (rowDrops.length === 3) continue;
      //we skip hte comment station line
      if (rowDrops[0].includes("'")) continue;
      const stress = +rowDrops.shift()!;

      const getDrops = rowDrops.map((el, index) => {
        return {
          [`D${index + 1}`]: +el,
        };
      });

      const foundDrop = stations.find((el) => el.stationID === id - 1);
      const force = +(stress * Math.PI * Math.pow(radius * 0.001, 2)).toFixed(
        2
      );

      foundDrop?.drops.push({
        stress,
        force,
        drops: getDrops,
        SCI: SCIIndicator(geophoneX, force, asphalftTemp, getDrops),
        BDI: BDIIndicator(geophoneX, force, asphalftTemp, getDrops),
        BCI: BCIIndicator(geophoneX, force, asphalftTemp, getDrops),
      });
    }
  }

  return stations;
}
