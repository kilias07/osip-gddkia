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
  geophoneX: Array<{ [key: `X${number}`]: number }>;
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
}

export interface Drops {
  dropID: number;
  force: number;
  stress: number;
  d: Array<{ [key: `D${number}`]: number }>;
}
