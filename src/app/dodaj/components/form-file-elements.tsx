import { z } from "zod";
import { TransformedData } from "./upload-file";

export const formSchema = z.object({
  type: z.enum(["asc", "desc"], {
    invalid_type_error: "Proszę podać kilometraż.",
  }),
  roadCategory: z.string({
    required_error: "Kategoria drogi jest wymagana.",
  }),
  roadNumber: z.string({
    required_error: "To pole jest wymagane",
  }),
  roadwayNumber: z.string({
    required_error: "Numer jezdni jest wymagany.",
  }),
  laneNumber: z.string({
    required_error: "Numer pasa jest wymagany.",
  }),
  dob: z.date({
    required_error: "Data pomiarów jest wymagana.",
  }),
  comments: z.string(),
});

export const getDirection = (transformedData: TransformedData["message"]) => {
  const firstStation = transformedData.sessions.stations.find(
    (station) => station.stationID === 1
  )?.station!;
  const lastStation = transformedData.sessions.stations.find(
    (station) => station.stationID === transformedData.sessions.stations.length
  )?.station!;
  return firstStation - lastStation < 0 ? "asc" : "desc";
};
