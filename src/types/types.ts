export type Params = {
  id: `${string}-${string}-${string}-${string}-${string}`;
  sessions: Sessions;
};

export interface Sessions {
  date: string;
  length: string;
  stationMinMax: {
    min: number;
    max: number;
  };
  geophoneX: Array<{ name: `X${number}`; value: number }>;
  radius: number;
  stations: Stations[];
}

export interface Stations {
  stationID: number;
  station: number;
  asphalftTemp: number | null;
  surfaceTemp: number | null;
  airTemp: number | null;
  time: string;
  GPS: {
    long: number;
    lat: number;
  };
  drops: Drops[];
}

export interface Drops {
  force: number;
  stress: number;
  drops: Array<{ [key: `D${number}`]: number }>;
  SCI: number;
  BDI: number;
  BCI: number;
}

export interface DataAfterCalculation {
  userInput: {
    type: "asc" | "desc";
    roadNumber: string;
    roadwayNumber: string;
    laneNumber: string;
    dob: Date;
  };
  data: Params;
  file: {
    name: string;
    size: number;
    filePath: string;
  };
}
