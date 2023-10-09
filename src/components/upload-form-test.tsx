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

import { toast } from "sonner";
import { useState } from "react";

export const formSchema = z.object({
  file: z.any().refine((files) => files?.length === 1, "Plik jest wymagany"),
});

const UploadFormTest = () => {
  const [transformedData, setTransformedData] = useState(null);
  console.log(transformedData?.message);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      file: null,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!values) return;

    const {
      file: { 0: file },
    } = values;

    const data = new FormData();
    data.append("file", file);

    try {
      const res = await fetch("/api/transform", {
        method: "POST",
        body: data,
      });
      if (!res.ok) throw new Error(await res.text());
      if (res.ok) {
        setTransformedData(await res.json());
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
          <Button type="submit" disabled={form.formState.isSubmitting}>
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default UploadFormTest;
