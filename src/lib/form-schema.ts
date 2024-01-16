import z from "zod";

export const formSchema = z.object({
  file: z.any().refine((files) => files?.length === 1, "Plik jest wymagany"),
  type: z.enum(["asc", "desc"], {
    required_error: "Proszę wybrać kierunek drogi.",
  }),
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
