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
  comments: string;
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
    long: number | undefined;
    lat: number | undefined;
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
    roadCategory: string;
    roadwayNumber: string;
    laneNumber: string;
    dob: Date;
    comments: string;
  };
  data: Params;
  file: {
    name: string;
    size: number;
  };
}

export interface DataForVisualisation {
  id: `${string}-${string}-${string}-${string}-${string}`;
  date: Date;
  name: string;
  originalName: string;
  sessions: {
    length: string;
    stationMinMax: {
      min: number;
      max: number;
    };
    stations: {
      id: number;
      GPS: {
        lat: number | undefined;
        long: number | undefined;
      };
      station: number;
      indicator: {
        BCI: number;
        BDI: number;
        SCI: number;
      };
    }[];
  };
}
