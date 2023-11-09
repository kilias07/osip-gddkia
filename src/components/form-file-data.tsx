"use client";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { TransformedData } from "./upload-file";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { DateInput } from "./ui/date-input";
import { toast } from "sonner";
import { DataAfterCalculation } from "@/types/types";
import { useData } from "@/lib/store-zustand";

const formSchema = z.object({
  type: z.enum(["asc", "desc"], {
    invalid_type_error: "Proszę wybrać kierunek drogi.",
  }),
  roadNumber: z.string({
    required_error: "Numer drogi jest wymagany.",
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
});

interface FormFileDataProps {
  transformedData: TransformedData["message"];
  fileData: File | null;
  reset: () => void;
}

const FormFileData = ({
  transformedData,
  fileData,
  reset,
}: FormFileDataProps) => {
  const { setData } = useData((state) => state);

  const numberOfKm = fileData?.name.split(" ")[0];
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      dob: new Date(transformedData.sessions.date),
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!values) return;
    const response: DataAfterCalculation = {
      userInput: { ...values },
      data: { ...transformedData },
      file: {
        name: fileData!.name.toString(),
        size: Number(fileData?.size),
        // filePath: fileData!.path.toString(),
      },
    };

    try {
      setData(response);
      toast.success("Plik został przesłany");
    } catch (e) {
      toast.error("Plik o takiej nazwie już istnieje");

      reset();
    }

    //Reset additional current form
    form.reset();
    //Reset form from parent component
    reset();
  }
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex my-10 gap-8 lg:gap-10 flex-wrap">
            <FormField
              control={form.control}
              name="roadNumber"
              render={({ field }) => (
                <FormItem className="w-full sm:w-fit">
                  <FormLabel>Numer drogi</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="np. 32"
                      type="number"
                      value={field.value || ""}
                      onChange={field.onChange}
                    />
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
                    <Input
                      placeholder="np. 32"
                      type="number"
                      onChange={field.onChange}
                      value={field.value || ""}
                    />
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
                    <Input
                      placeholder="np. 1"
                      type="number"
                      value={field.value || ""}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormDescription>Wpisz numer pasa</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dob"
              render={({ field }) => (
                <FormItem className="w-full sm:w-fit">
                  <FormLabel>Data pomiarów</FormLabel>
                  <FormControl>
                    <DateInput onChange={field.onChange} value={field.value} />
                  </FormControl>
                  <FormDescription>Rok / Miesiąc / Dzień</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem className="space-y-3 w-full sm:w-fit">
                  <FormLabel htmlFor="asc_desc">
                    Wybierz kierunek drogi
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      id="asc_desc"
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
                        <FormLabel
                          htmlFor="input_desc"
                          className="text-sm font-medium leading-none cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
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
                        <FormLabel
                          htmlFor="input_asc"
                          className="text-sm cursor-pointer font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
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
          <p className="flex gap-2">
            <span>Kilometr</span>
            <span>{numberOfKm}</span>
          </p>
          <Button type="submit" disabled={form.formState.isSubmitting}>
            Zatwierdź
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default FormFileData;
