"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const formSchema = z.object({
  file: z
    .custom<FileList>()
    .refine((file) => file && file.length > 0, {
      message: "Plik jest wymagany",
    })
    .transform((file) => file.length > 0 && file.item(0)),
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

const UploadForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      roadNumber: "",
      roadwayNumber: "",
      laneNumber: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    // try {
    //   const data = new FormData();
    //   data.set("file", file);
    //   const res = await fetch("/api/upload", {
    //     method: "POST",
    //     body: data,
    //   });
    //   // handle the error
    //   if (!res.ok) throw new Error(await res.text());
    // } catch (e: any) {
    //   // Handle errors here
    //   console.error(e);
    // }
  }

  // if (!file) return;

  return (
    <div className="w-2/3">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="">
          <FormField
            control={form.control}
            name="file"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Prześlij plik</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept=".mdb"
                    disabled={form.formState.isSubmitting}
                    placeholder="Wybierz plik"
                    ref={field.ref}
                    onChange={(e) => field.onChange(e.target.files)}
                  />
                </FormControl>
                <FormDescription>
                  Prześlij plik z wynikami w formacie .mdb lub .fwd
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-between my-10 gap-4">
            <FormField
              control={form.control}
              name="roadNumber"
              render={({ field }) => (
                <FormItem className="grow">
                  <FormLabel>Numer drogi</FormLabel>
                  <FormControl>
                    <Input placeholder="np. 32" type="number" {...field} />
                  </FormControl>
                  <FormDescription>Wpisz numer drogi</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="roadwayNumber"
              render={({ field }) => (
                <FormItem className="grow">
                  <FormLabel>Numer jezdni</FormLabel>
                  <FormControl>
                    <Input placeholder="np. 32" type="number" {...field} />
                  </FormControl>
                  <FormDescription>Wpisz numer jezdni</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="laneNumber"
              render={({ field }) => (
                <FormItem className="grow">
                  <FormLabel>Numer pasa</FormLabel>
                  <FormControl>
                    <Input placeholder="np. 1" type="number" {...field} />
                  </FormControl>
                  <FormDescription>Wpisz numer pasa</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Wybierz kierunek drogi</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex pt-2"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="desc" />
                        </FormControl>
                        <FormLabel className="font-normal">Malejący</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="asc" />
                        </FormControl>
                        <FormLabel className="font-normal">Rosnący</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit" disabled={form.formState.isSubmitting}>
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default UploadForm;
