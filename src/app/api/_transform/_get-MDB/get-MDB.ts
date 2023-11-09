import { IncomingData } from "../route";
import MDBReader from "mdb-reader";
import { getNonZeroValArr } from "@/lib/utils";
import { randomUUID } from "crypto";
import { Drops, Sessions, Stations } from "@/types/types";

const X_PATTERN = /\bX([1-9]|\d{2})\b/;
const D_PATTERN = /\bD([1-9]|\d{2})\b/;

export const getMDBData = async (data: IncomingData) => {
  const bytes = await data.file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const reader = new MDBReader(buffer);

  const params = {
    id: randomUUID(),
    sessions: getSessions(reader),
  };
  return params;
};

function getSessions(reader: MDBReader): Sessions {
  const sessions = reader.getTable("Sessions").getData()[0];
  const getAllXCol = reader
    .getTable("Sessions")
    .getColumnNames()
    .filter((header) => {
      return header.match(X_PATTERN);
    });

  const getAllXColData = reader.getTable("Sessions").getData({
    columns: getAllXCol,
  })[0];
  const Xarr = getNonZeroValArr(getAllXColData)!;

  return {
    date: String(sessions.Date),
    length: "",
    stationMinMax: {
      min: Number((sessions.StationMin as number)?.toFixed(2)),
      max: Number((sessions.StationMax as number)?.toFixed(2)),
    },
    geophoneX: Xarr.map((x) => {
      return {
        name: x,
        value: sessions[x],
      };
    }) as Array<{ name: `X${number}`; value: number }>,
    stations: getStations(reader),
  };
}

function getStations(reader: MDBReader): Stations[] {
  return reader
    .getTable("Stations")
    .getData()
    .map((station) => {
      return {
        stationID: station.StationID,
        station: station.Station && +(station.Station as number).toFixed(3),
        asphalftTemp:
          station.AsphaltTemperature &&
          +(station.AsphaltTemperature as number).toFixed(3),
        surfaceTemp:
          station.SurfaceTemperature &&
          +(station.SurfaceTemperature as number).toFixed(3),
        airTemp:
          station.AirTemperature &&
          +(station.AirTemperature as number).toFixed(3),
        time: station.Time,
        GPS: {
          long: station.Longitude,
          lat: station.Latitude,
        },
        drops: getDrops(reader, station.StationID as number),
      };
    }) as Stations[];
}

function getDrops(reader: MDBReader, stationID: number): Drops[] {
  const getAllDCol = reader
    .getTable("Drops")
    .getColumnNames()
    .filter((header) => {
      return header.match(D_PATTERN);
    });

  const getAllDColData = reader.getTable("Drops").getData({
    columns: getAllDCol,
  })[0];

  const Darr = getNonZeroValArr(getAllDColData)!;

  const data = reader
    .getTable("Drops")
    .getData()
    .filter((drop) => drop.StationID === stationID)
    .map((drop) => {
      return {
        dropID: drop.DropID,
        force: drop.Force && +(drop.Force as number).toFixed(3),
        stress: drop.Stress && +(drop.Stress as number).toFixed(3),
        d: Darr.map((d) => {
          return {
            [d]: drop[d] && +(drop[d] as number).toFixed(3),
          };
        }),
      };
    }) as Drops[];
  return data;
}
