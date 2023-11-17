import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const Legend = () => {
  return (
    <div className="sm:w-3/12 min-w-[16rem]">
      <Card className="sm:sticky sm:top-10">
        <CardHeader className="pb-0">
          <CardTitle>Legenda</CardTitle>
        </CardHeader>

        <div>
          <CardDescription className="pl-6 mt-5">SCI</CardDescription>
          <CardContent>
            <ul>
              <li className="flex gap-2 items-center my-2 text-xs">
                <span className="bg-[#00ff00] w-5 h-5 rounded-full inline-block" />
                <p>0-120 dobry stan techniczny</p>
              </li>
              <li className="flex gap-2 items-center my-2 text-xs">
                <span className="bg-[#006600] w-5 h-5 rounded-full inline-block" />
                <p>121 - 160 stan techniczny zadowalający</p>
              </li>
              <li className="flex gap-2 items-center my-2 text-xs">
                <span className="bg-[#ff9900] w-5 h-5 rounded-full inline-block" />
                <p>161 - 200 stan ostrzegawczy</p>
              </li>
              <li className="flex gap-2 items-center my-2 text-xs">
                <span className="bg-[#cc3300] w-5 h-5 rounded-full inline-block" />
                <p>201 - 240 stan zły </p>
              </li>
              <li className="flex gap-2 items-center my-2 text-xs">
                <span className="bg-[#ff0000] w-5 h-5 rounded-full inline-block" />
                <p> {">"} 240 konieczny remont/przebudowa</p>
              </li>
            </ul>
          </CardContent>
        </div>

        <Separator />

        <div>
          <CardDescription className="pl-6 mt-5">BDI</CardDescription>
          <CardContent>
            <ul>
              <li className="flex gap-2 items-center my-2 text-xs">
                <span className="bg-[#00ff00] w-5 h-5 rounded-full inline-block" />
                <p>0-90 dobry stan techniczny</p>
              </li>
              <li className="flex gap-2 items-center my-2 text-xs">
                <span className="bg-[#006600] w-5 h-5 rounded-full inline-block" />
                <p>91 - 120 stan techniczny zadowalający</p>
              </li>
              <li className="flex gap-2 items-center my-2 text-xs">
                <span className="bg-[#ff9900] w-5 h-5 rounded-full inline-block" />
                <p>121 - 150 stan ostrzegawczy</p>
              </li>
              <li className="flex gap-2 items-center my-2 text-xs">
                <span className="bg-[#cc3300] w-5 h-5 rounded-full inline-block" />
                <p>150 - 180 stan zły </p>
              </li>
              <li className="flex gap-2 items-center my-2 text-xs">
                <span className="bg-[#ff0000] w-5 h-5 rounded-full inline-block" />
                <p> {">"} 180 konieczny remont/przebudowa</p>
              </li>
            </ul>
          </CardContent>
        </div>

        <Separator />

        <div>
          <CardDescription className="pl-6 mt-5">BCI</CardDescription>
          <CardContent>
            <ul>
              <li className="flex gap-2 items-center my-2 text-xs">
                <span className="bg-[#00ff00] w-5 h-5 rounded-full inline-block" />
                <p>0 - 45 dobry stan techniczny</p>
              </li>
              <li className="flex gap-2 items-center my-2 text-xs">
                <span className="bg-[#006600] w-5 h-5 rounded-full inline-block" />
                <p>46 - 60 stan techniczny zadowalający</p>
              </li>
              <li className="flex gap-2 items-center my-2 text-xs">
                <span className="bg-[#ff9900] w-5 h-5 rounded-full inline-block" />
                <p>61 - 75 stan ostrzegawczy</p>
              </li>
              <li className="flex gap-2 items-center my-2 text-xs">
                <span className="bg-[#cc3300] w-5 h-5 rounded-full inline-block" />
                <p>76 - 90 stan zły</p>
              </li>
              <li className="flex gap-2 items-center my-2 text-xs">
                <span className="bg-[#ff0000] w-5 h-5 rounded-full inline-block" />
                <p> {">"} 90 konieczny remont/przebudowa</p>
              </li>
            </ul>
          </CardContent>
        </div>
      </Card>
    </div>
  );
};

export default Legend;
