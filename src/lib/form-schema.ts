import z from "zod";

export const formSchema = z.object({
  // file: z.custom<FileList>().refine((file) => file && file.length > 0, {
  //   message: "Plik jest wymagany",
  // }),
  file: z.any().refine((files) => files?.length === 1, "Plik jest wymagany"),
  // .transform((file) => file.length > 0 && file.item(0)),
  type: z.enum(["asc", "desc"], {
    required_error: "Proszę wybrać kierunek drogi.",
  }),
  // type: z
  //   .union([z.enum(["asc", "desc"]), z.string().nonempty()], {
  //     required_error: "Proszę wybrać kierunek drogi",
  //   })
  // .nullable(),
  roadNumber: z.string().nonempty({
    message: "Numer drogi nie może być pusty.",
  }),
  roadwayNumber: z.string().nonempty({
    message: "Numer jezdni nie może być pusty.",
  }),
  laneNumber: z.string().nonempty({
    message: "Numer pasa nie może być pusty.",
  }),
});
