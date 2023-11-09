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
import FormFileData from "./form-file-data";
import { Params } from "@/types/types";

export type TransformedData = {
  success: boolean;
  message: Params;
};

export const formSchema = z.object({
  file: z.any().refine((files) => files?.length === 1, "Plik jest wymagany"),
});

const UploadFormTest = () => {
  const [transformedData, setTransformedData] =
    useState<TransformedData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [fileData, setFileData] = useState<File | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      file: null,
    },
  });

  const reset = () => {
    setTransformedData(null);
    setFileData(null);
    form.reset();
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!values) return;

    const {
      file: { 0: file },
    } = values;

    setFileData(file);
    setLoading(true);

    const data = new FormData();
    data.append("file", file);

    const res = await fetch("/api/transform", {
      method: "POST",
      body: data,
    });
    if (res.ok) {
      setTransformedData(await res.json());
      setLoading(false);
    } else {
      setLoading(false);
      const { error } = await res.json();
      toast.error(error);
      reset();
    }
  }

  return (
    <div className="max-w-screen-xl">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex items gap-4 h-[128px]"
        >
          <FormField
            control={form.control}
            name="file"
            render={({ field }) => (
              <FormItem className="grow">
                <FormLabel htmlFor="fileInput">Prześlij plik</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept=".mdb, .fwd"
                    {...form.register("file")}
                    defaultValue={field.value}
                    multiple={false}
                    // onChange={(e) => {
                    //   const file = e.target.files![0];
                    //   file && setFileData(file);
                    // }}
                    disabled={form.formState.isSubmitting}
                    placeholder="Wybierz plik"
                    id="fileInput"
                    className="grow"
                  />
                </FormControl>
                <FormDescription>
                  Prześlij plik z wynikami w formacie .mdb lub .fwd
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            className="self-center mb-6"
            variant={"secondary"}
            type="submit"
            disabled={form.formState.isSubmitting}
          >
            Wczytaj
          </Button>
        </form>
      </Form>

      {loading ? (
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Ładuję...
          </span>
        </div>
      ) : (
        " "
      )}

      {transformedData && (
        <FormFileData
          transformedData={transformedData.message}
          fileData={fileData}
          reset={reset}
        />
      )}
    </div>
  );
};

export default UploadFormTest;
