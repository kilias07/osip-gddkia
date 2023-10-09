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
import { toast } from "sonner";

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

    const data = new FormData();
    data.append("file", file);
    data.append("roadNumber", roadNumber);
    data.append("roadwayNumber", roadwayNumber);
    data.append("laneNumber", laneNumber);
    data.append("type", type!);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: data,
      });
      if (!res.ok) throw new Error(await res.text());
      if (res.ok) {
        form.reset();
        toast.success("Plik został przesłany");
      }
    } catch (e: any) {
      console.error(e);
      const { error } = JSON.parse(e.message);
      toast.error(
        error === "File already exists"
          ? "Plik o podanych parametrach już istnieje"
          : error
      );
    }
  }

  return (
    <div className="max-w-screen-xl">
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
          <div className="flex my-10 gap-8 lg:gap-10 flex-wrap">
            <FormField
              control={form.control}
              name="roadNumber"
              render={({ field }) => (
                <FormItem className="w-full sm:w-fit">
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
                <FormItem className="w-full sm:w-fit">
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
                <FormItem className="w-full sm:w-fit">
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
                <FormItem className="space-y-3 w-full sm:w-fit">
                  <FormLabel>Wybierz kierunek drogi</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      {...form.register("type")}
                      className="flex pt-2"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem
                            value="desc"
                            id="input_desc"
                            ref={field.ref}
                          />
                        </FormControl>
                        <FormLabel className="font-normal" htmlFor="input_desc">
                          Malejący
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem
                            id="input_asc"
                            value="asc"
                            ref={field.ref}
                          />
                        </FormControl>
                        <FormLabel className="font-normal" htmlFor="input_asc">
                          Rosnący
                        </FormLabel>
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
