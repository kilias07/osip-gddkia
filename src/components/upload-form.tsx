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
import { formSchema } from "@/lib/form-schema";

const UploadForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      file: null,
      roadNumber: "",
      roadwayNumber: "",
      laneNumber: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!values) return;

    const {
      file: { 0: file },
      roadNumber,
      roadwayNumber,
      laneNumber,
      type,
    } = values;

    try {
      const data = new FormData();
      data.append("file", file);
      data.append("roadNumber", roadNumber);
      data.append("roadwayNumber", roadwayNumber);
      data.append("laneNumber", laneNumber);
      data.append("type", type!);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: data,
      });
      // @todo handle errors
      console.log(res);
      if (!res.ok) throw new Error(await res.text());
      if (res.ok) {
        // form.reset(); only for development processs
      }
    } catch (e: any) {
      console.error(e);
    }
  }

  return (
    <div className="w-2/3">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="file"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="file">Prześlij plik</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept=".mdb, .fwd"
                    {...form.register("file")}
                    defaultValue={field.value}
                    multiple={false}
                    disabled={form.formState.isSubmitting}
                    placeholder="Wybierz plik"
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
                      {...form.register("type")}
                      className="flex pt-2"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="desc" ref={field.ref} />
                        </FormControl>
                        <FormLabel className="font-normal">Malejący</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="asc" ref={field.ref} />
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
