import { randomUUID } from "crypto";
import { Data } from "../route";

const test =
  "R32        20111024podbudow36F20\r\n" +
  "70     08002-108 88770  10  60 .\r\n" +
  " 150   0 300 600 900120015001800\r\n" +
  "C:Program FilesDynatestFw.FWD\r\n" +
  "odcinek                         \r\n" +
  "";

export const getFWDData = async (data: Data) => {
  const bytes = await data.file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const file = buffer.toString().split("S");

  //First page where is date stored and geophones
  const firstSection = file[0].split("\r\n");
  console.log(firstSection[2]);

  // const geophonesX = file[2];
  // console.log(geophonesX.split(".\r\n")[0].split("\r\n"));

  const params = {
    type: data.type,
    roadNumber: data.roadNumber,
    roadwayNumber: data.roadwayNumber,
    laneNumber: data.laneNumber,
    id: randomUUID(),
    sessions: {
      date: getDate(firstSection[0]),
      length: "",
      stationMinMax: {
        min: "",
        max: "",
      },
    },
  };
  // console.log(params);
  return params;
};

// string with Date look like this
function getDate(stringWithDate: string) {
  // dateString extract only the numbers 8 digit long the output should be eg.20111024
  const dateString = stringWithDate.match(/\d{8}/)![0];

  const year = parseInt(dateString.substring(0, 4), 10);
  const month = parseInt(dateString.substring(4, 6), 10) - 1; // Months are zero-indexed in JS
  const day = parseInt(dateString.substring(6, 8), 10);

  return new Date(year, month, day);
}
