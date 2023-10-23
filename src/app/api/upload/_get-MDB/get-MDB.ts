import { Data } from "../route";
import MDBReader from "mdb-reader";
import { getNonZeroXVal, getNonZeroDArr } from "@/lib/utils";
import { randomUUID } from "crypto";

const X_PATTERN = /\bX([1-9]|\d{2})\b/;
const D_PATTERN = /\bD([1-9]|\d{2})\b/;

export const getMDBData = async (data: Data) => {
  const bytes = await data.file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const reader = new MDBReader(buffer);

  const params = {
    type: data.type,
    roadNumber: data.roadNumber,
    roadwayNumber: data.roadwayNumber,
    laneNumber: data.laneNumber,
    id: randomUUID(),
    sessions: getSessions(reader),
  };
  return params;
};

function getSessions(reader: MDBReader) {
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

  return {
    date: sessions.Date,
    length: "",
    stationMinMax: {
      min: sessions.StationMin && +(sessions.StationMin as number).toFixed(2),
      max: sessions.StationMax && +(sessions.StationMax as number).toFixed(2),
    },
    geophoneX: getNonZeroXVal(getAllXColData),
    stations: getStations(reader),
  };
}

function getStations(reader: MDBReader) {
  return reader
    .getTable("Stations")
    .getData()
    .map((station) => {
      return {
        stationID: station.StationID,
        station: station.Station && +(station.Station as number).toFixed(2),
        asphalftTemp:
          station.AsphaltTemperature &&
          +(station.AsphaltTemperature as number).toFixed(2),
        surfaceTemp:
          station.SurfaceTemperature &&
          +(station.SurfaceTemperature as number).toFixed(2),
        airTemp:
          station.AirTemperature &&
          +(station.AirTemperature as number).toFixed(2),
        time: station.Time,
        GPS: {
          long: station.Longitude,
          lat: station.Latitude,
        },
        drops: getDrops(reader, station.StationID as number),
      };
    });
}

function getDrops(reader: MDBReader, stationID: number) {
  const getAllDCol = reader
    .getTable("Drops")
    .getColumnNames()
    .filter((header) => {
      return header.match(D_PATTERN);
    });

  const getAllDColData = reader.getTable("Drops").getData({
    columns: getAllDCol,
  })[0];

  const Darr = getNonZeroDArr(getAllDColData)!;

  const data = reader
    .getTable("Drops")
    .getData()
    .filter((drop) => drop.StationID === stationID)
    .map((drop) => {
      return {
        dropID: drop.DropID,
        force: drop.Force,
        stress: drop.Stress,
        d: Darr.map((d) => {
          return {
            [d]: drop[d],
          };
        }),
      };
    });
  return data;
}
