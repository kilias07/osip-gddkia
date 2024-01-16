import {IncomingData} from "./route";
import MDBReader from "mdb-reader";
import {BCIIndicator, BDIIndicator, getNonZeroValArr, orderStations, SCIIndicator,} from "./utils";
import {randomUUID} from "crypto";
import {Drops, Sessions, Stations} from "@/types/types";

const X_PATTERN = /\bX([1-9]|\d{2})\b/;
const D_PATTERN = /\bD([1-9]|\d{2})\b/;

export const getMDBData = async (data: IncomingData) => {
  const bytes = await data.file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const reader = new MDBReader(buffer);
  let geophoneX = <Sessions["geophoneX"]>[];
  let asphaltTemp = <null | number>null;
  let surfaceTemp = <null | number>null;

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
    geophoneX = Xarr.map((x) => {
      return {
        name: x,
        value: sessions[x],
      };
    }) as Array<{ name: `X${number}`; value: number }>;

    const orderedStations = orderStations(getStations(reader));

    return {
      date: String(sessions.Date),
      length: (
        Number(sessions.StationMax) - Number(sessions.StationMin)
      ).toFixed(2),
      stationMinMax: {
        min: Number((sessions.StationMin as number)?.toFixed(2)),
        max: Number((sessions.StationMax as number)?.toFixed(2)),
      },
      comments: "",
      geophoneX,
      radius: Number(sessions.Radius),
      stations: orderedStations,
    };
  }

  function getStations(reader: MDBReader): Stations[] {
    return <Stations[]>reader
      .getTable("Stations")
      .getData()
      .map((station) => {
        asphaltTemp = +(station.AsphaltTemperature as number)?.toFixed(3);
        surfaceTemp = +(station.SurfaceTemperature as number)?.toFixed(3);
        return {
          stationID: station.StationID,
          station: +(station.Station as number)?.toFixed(3),
          asphalftTemp: asphaltTemp,
          surfaceTemp: +(station.SurfaceTemperature as number)?.toFixed(3),
          airTemp: +(station.AirTemperature as number)?.toFixed(3),
          time: station.Time,
          GPS: {
            long: station.Longitude,
            lat: station.Latitude,
          },
          drops: getDrops(reader, station.StationID as number),
        };
      });
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

    const data = <Drops[]>reader
      .getTable("Drops")
      .getData()
      .filter((drop) => drop.StationID === stationID)
      .map((drop) => {
        const drops = Darr.map((d) => {
          return {
            [d]: +(drop[d] as number).toFixed(2),
          };
        });

        const stress = +(drop.Stress as number)?.toFixed(2);

        const force = +(drop.Force as number)?.toFixed(2);
        const checkedAsphaltTemp = asphaltTemp ? asphaltTemp : surfaceTemp;

        return {
          force,
          stress,
          drops,
          SCI: SCIIndicator(geophoneX, force, checkedAsphaltTemp!, drops),
          BDI: BDIIndicator(geophoneX, force, checkedAsphaltTemp!, drops),
          BCI: BCIIndicator(geophoneX, force, checkedAsphaltTemp!, drops),
        };
      });
    return data;
  }

  return {
    id: randomUUID(),
    sessions: getSessions(reader),
  };
};
