import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { TransformedData } from "./upload-file";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { DateInput } from "@/components/ui/date-input";
import { toast } from "sonner";
import { InfoIcon } from "lucide-react";
import { DataAfterCalculation } from "@/types/types";
import { useData } from "@/lib/store-zustand";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Textarea } from "@/components/ui/textarea";
import { formSchema, getDirection } from "./form-file-elements";

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

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      dob: new Date(transformedData.sessions.date),
      type: getDirection(transformedData),
      comments: transformedData.sessions.comments,
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
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="border rounded-xl p-8 bg-white shadow-md w-full"
      >
        <div className="flex gap-8 lg:gap-10 flex-wrap pl-8">
          <FormField
            control={form.control}
            name="roadNumber"
            render={({ field }) => (
              <FormItem className="w-full sm:w-fit">
                <FormLabel>Numer drogi / Nazwa obiektu</FormLabel>
                <FormControl>
                  <Input
                    placeholder="np. 32"
                    value={field.value || ""}
                    onChange={field.onChange}
                    type="number"
                  />
                </FormControl>
                <FormDescription>Wpisz numer drogi</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="roadCategory"
            render={({ field }) => (
              <FormItem className="w-full sm:w-fit">
                <FormLabel>Kategoria ruchu</FormLabel>
                <FormControl>
                  <Input
                    placeholder="np. 1"
                    value={field.value || ""}
                    onChange={field.onChange}
                    type="number"
                    min={0}
                    max={7}
                  />
                </FormControl>
                <FormDescription>Wpisz kategorię ruchu</FormDescription>
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
                <FormLabel className="flex items-center gap-2">
                  <span>Data pomiarów</span>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger className="cursor-default">
                        <InfoIcon className="w-5 h-5 mb-1" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <span>Odczytane na podstawie pliku</span>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </FormLabel>
                <FormControl>
                  <DateInput onChange={field.onChange} value={field.value} />
                </FormControl>
                <FormDescription>
                  <span>Rok / Miesiąc / Dzień</span>
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem className="w-full sm:w-fit">
                <FormLabel
                  htmlFor="asc_desc"
                  className="flex gap-2 items-center"
                >
                  <span>Kilometraż</span>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger className="cursor-default">
                        <InfoIcon className="w-5 h-5 mb-1" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <span>Odczytane na podstawie pliku</span>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </FormLabel>

                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    id="asc_desc"
                    {...form.register("type")}
                    className="flex py-2"
                    defaultValue={getDirection(transformedData)}
                  >
                    <FormItem className="flex items-center space-y-0 pl-2">
                      <FormControl className="mr-3">
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
                    <FormItem className="flex items-center space-y-0">
                      <FormControl className="mr-3">
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

          <FormField
            control={form.control}
            name="comments"
            render={({ field }) => (
              <FormItem className="w-full max-w-lg">
                <FormLabel className="flex gap-2 items-center">
                  <span>Komentarze</span>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger className="cursor-default">
                        <InfoIcon className="w-5 h-5 mb-1" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <span>Odczytane na podstawie pliku</span>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="np. Wszystko ok"
                    className="resize-y min-h-[12rem]"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Edytuj lub dodaj własne komentarze
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end">
          <Button type="submit" disabled={form.formState.isSubmitting}>
            Zatwierdź
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default FormFileData;

{
  /* <FormField
control={form.control}
name="placeName"
render={({ field }) => (
  <FormItem className="w-full sm:w-fit">
    <FormLabel>Nazwa obiektu</FormLabel>
    <FormControl>
      <Input
        placeholder="np. terminal"
        type="text"
        value={field.value || ""}
        onChange={field.onChange}
      />
    </FormControl>
    <FormDescription>Wpisz nazwę obiektu</FormDescription>
    <FormMessage />
  </FormItem>
)}
/> */
}
