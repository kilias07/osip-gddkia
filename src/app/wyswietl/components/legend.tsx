import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const LegendBDI = () => {
  return (
    <div className="w-full md:w-64">
      <CardHeader className="pt-0 pb-6 pl-1">
        <CardTitle>Podbudowa</CardTitle>
      </CardHeader>
      <CardDescription className="text-slate-950 pt-0">
        Legenda BDI
      </CardDescription>

      <ul>
        <li className="flex gap-2 items-center my-2 text-xs">
          <span className="bg-[#00ff00] shrink-0 w-5 h-5 rounded-full inline-block" />
          <p>0-120 dobry stan techniczny</p>
        </li>
        <li className="flex gap-2 items-center my-2 text-xs">
          <span className="bg-[#006600] shrink-0 w-5 h-5 rounded-full inline-block" />
          <p>121 - 160 stan techniczny zadowalający</p>
        </li>
        <li className="flex gap-2 items-center my-2 text-xs">
          <span className="bg-[#ff9900] shrink-0 w-5 h-5 rounded-full inline-block" />
          <p>161 - 200 stan ostrzegawczy</p>
        </li>
        <li className="flex gap-2 items-center my-2 text-xs">
          <span className="bg-[#cc3300] shrink-0 w-5 h-5 rounded-full inline-block" />
          <p>201 - 240 stan zły </p>
        </li>
        <li className="flex gap-2  items-center my-2 text-xs">
          <span className="bg-[#ff0000] shrink-0 w-5 h-5 rounded-full inline-block" />
          <p> {">"} 240 konieczny remont/przebudowa</p>
        </li>
      </ul>
    </div>
  );
};

const LegendBCI = () => {
  return (
    <div className="w-full md:w-64">
      <CardHeader className="pt-0 pb-6 pl-1">
        <CardTitle>Podłoże</CardTitle>
      </CardHeader>
      <CardDescription className="text-slate-950 pt-0">
        Legenda BCI
      </CardDescription>

      <ul>
        <li className="flex gap-2 items-center my-2 text-xs">
          <span className="bg-[#00ff00] w-5 h-5 shrink-0 rounded-full inline-block" />
          <p>0 - 45 dobry stan techniczny</p>
        </li>
        <li className="flex gap-2 items-center my-2 text-xs">
          <span className="bg-[#006600] w-5 h-5 shrink-0 rounded-full inline-block" />
          <p>46 - 60 stan techniczny zadowalający</p>
        </li>
        <li className="flex gap-2 items-center my-2 text-xs">
          <span className="bg-[#ff9900] w-5 h-5 shrink-0 rounded-full inline-block" />
          <p>61 - 75 stan ostrzegawczy</p>
        </li>
        <li className="flex gap-2 items-center my-2 text-xs">
          <span className="bg-[#cc3300] w-5 h-5 shrink-0 rounded-full inline-block" />
          <p>76 - 90 stan zły</p>
        </li>
        <li className="flex gap-2 items-center my-2 text-xs">
          <span className="bg-[#ff0000] w-5 h-5 shrink-0 rounded-full inline-block" />
          <p> {">"} 90 konieczny remont/przebudowa</p>
        </li>
      </ul>
    </div>
  );
};

const LegendSCIKr_1 = () => {
  return (
    <div className="w-full md:w-64">
      <CardHeader className="pt-0 pb-6 pl-1">
        <CardTitle>Pakiet warstw bitumicznych</CardTitle>
      </CardHeader>
      <CardDescription className="text-slate-950 pt-0">
        Legenda SCI
      </CardDescription>
      <ul>
        <li className="flex gap-2 items-center my-2 text-xs">
          <span className="bg-[#00ff00] shrink-0 w-5 h-5 rounded-full inline-block" />
          <p>0-115 dobry stan techniczny</p>
        </li>
        <li className="flex gap-2 items-center my-2 text-xs">
          <span className="bg-[#006600] shrink-0 w-5 h-5 rounded-full inline-block" />
          <p>116 - 165 stan techniczny zadowalający</p>
        </li>
        <li className="flex gap-2 items-center my-2 text-xs">
          <span className="bg-[#ff9900] shrink-0 w-5 h-5 rounded-full inline-block" />
          <p>166 - 240 stan ostrzegawczy</p>
        </li>
        <li className="flex gap-2 items-center my-2 text-xs">
          <span className="bg-[#ff0000] shrink-0 w-5 h-5 rounded-full inline-block" />
          <p> {">"} 241 konieczny remont/przebudowa</p>
        </li>
      </ul>
    </div>
  );
};

const LegendSCIKr_3 = () => {
  return (
    <div className="w-full md:w-64">
      <CardHeader className="pt-0 pb-6 pl-1">
        <CardTitle>Pakiet warstw bitumicznych</CardTitle>
      </CardHeader>
      <CardDescription className="text-slate-950 pt-0">
        Legenda SCI
      </CardDescription>
      <ul>
        <li className="flex gap-2 items-center my-2 text-xs">
          <span className="bg-[#00ff00] shrink-0 w-5 h-5 rounded-full inline-block" />
          <p>0-70 dobry stan techniczny</p>
        </li>
        <li className="flex gap-2 items-center my-2 text-xs">
          <span className="bg-[#006600] shrink-0 w-5 h-5 rounded-full inline-block" />
          <p>71 - 110 stan techniczny zadowalający</p>
        </li>
        <li className="flex gap-2 items-center my-2 text-xs">
          <span className="bg-[#ff9900] shrink-0 w-5 h-5 rounded-full inline-block" />
          <p>111 - 190 stan ostrzegawczy</p>
        </li>
        <li className="flex gap-2 items-center my-2 text-xs">
          <span className="bg-[#ff0000] shrink-0 w-5 h-5 rounded-full inline-block" />
          <p> {">"} 191 konieczny remont/przebudowa</p>
        </li>
      </ul>
    </div>
  );
};

const LegendSCIKr_4 = () => {
  return (
    <div className="w-full md:w-64">
      <CardHeader className="pt-0 pb-6 pl-1">
        <CardTitle>Pakiet warstw bitumicznych</CardTitle>
      </CardHeader>
      <CardDescription className="text-slate-950 pt-0">
        Legenda SCI
      </CardDescription>
      <ul>
        <li className="flex gap-2 items-center my-2 text-xs">
          <span className="bg-[#00ff00] shrink-0 w-5 h-5 rounded-full inline-block" />
          <p>0-50 dobry stan techniczny</p>
        </li>
        <li className="flex gap-2 items-center my-2 text-xs">
          <span className="bg-[#006600] shrink-0 w-5 h-5 rounded-full inline-block" />
          <p>51 - 80 stan techniczny zadowalający</p>
        </li>
        <li className="flex gap-2 items-center my-2 text-xs">
          <span className="bg-[#ff9900] shrink-0 w-5 h-5 rounded-full inline-block" />
          <p>81 - 140 stan ostrzegawczy</p>
        </li>
        <li className="flex gap-2 items-center my-2 text-xs">
          <span className="bg-[#ff0000] shrink-0 w-5 h-5 rounded-full inline-block" />
          <p> {">"} 141 konieczny remont/przebudowa</p>
        </li>
      </ul>
    </div>
  );
};

const LegendSCIKr_5 = () => {
  return (
    <div className="w-full md:w-64">
      <CardHeader className="pt-0 pb-6 pl-1">
        <CardTitle>Pakiet warstw bitumicznych</CardTitle>
      </CardHeader>
      <CardDescription className="text-slate-950 pt-0">
        Legenda SCI
      </CardDescription>
      <ul>
        <li className="flex gap-2 items-center my-2 text-xs">
          <span className="bg-[#00ff00] shrink-0 w-5 h-5 rounded-full inline-block" />
          <p>0-40 dobry stan techniczny</p>
        </li>
        <li className="flex gap-2 items-center my-2 text-xs">
          <span className="bg-[#006600] shrink-0 w-5 h-5 rounded-full inline-block" />
          <p>41 - 60 stan techniczny zadowalający</p>
        </li>
        <li className="flex gap-2 items-center my-2 text-xs">
          <span className="bg-[#ff9900] shrink-0 w-5 h-5 rounded-full inline-block" />
          <p>61 - 100 stan ostrzegawczy</p>
        </li>
        <li className="flex gap-2 items-center my-2 text-xs">
          <span className="bg-[#ff0000] shrink-0 w-5 h-5 rounded-full inline-block" />
          <p> {">"} 101 konieczny remont/przebudowa</p>
        </li>
      </ul>
    </div>
  );
};

const LegendSCIKr_6 = () => {
  return (
    <div className="w-full md:w-64">
      <CardHeader className="pt-0 pb-6 pl-1">
        <CardTitle>Pakiet warstw bitumicznych</CardTitle>
      </CardHeader>
      <CardDescription className="text-slate-950 pt-0">
        Legenda SCI
      </CardDescription>
      <ul>
        <li className="flex gap-2 items-center my-2 text-xs">
          <span className="bg-[#00ff00] shrink-0 w-5 h-5 rounded-full inline-block" />
          <p>0-30 dobry stan techniczny</p>
        </li>
        <li className="flex gap-2 items-center my-2 text-xs">
          <span className="bg-[#006600] shrink-0 w-5 h-5 rounded-full inline-block" />
          <p>31 - 50 stan techniczny zadowalający</p>
        </li>
        <li className="flex gap-2 items-center my-2 text-xs">
          <span className="bg-[#ff9900] shrink-0 w-5 h-5 rounded-full inline-block" />
          <p>51 - 80 stan ostrzegawczy</p>
        </li>
        <li className="flex gap-2 items-center my-2 text-xs">
          <span className="bg-[#ff0000] shrink-0 w-5 h-5 rounded-full inline-block" />
          <p> {">"} 81 konieczny remont/przebudowa</p>
        </li>
      </ul>
    </div>
  );
};
export {
  LegendBCI,
  LegendBDI,
  LegendSCIKr_1,
  LegendSCIKr_3,
  LegendSCIKr_4,
  LegendSCIKr_5,
  LegendSCIKr_6,
};
