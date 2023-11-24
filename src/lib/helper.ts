import { Stations } from "@/types/types";

const avgOffDropsIndicator = (stationDrops: Stations["drops"]) => {
  const sum = stationDrops.reduce(
    (acc, cur) => {
      return {
        BDI: acc.BDI + cur.BDI,
        SCI: acc.SCI + cur.SCI,
        BCI: acc.BCI + cur.BCI,
      };
    },
    {
      BDI: 0,
      SCI: 0,
      BCI: 0,
    }
  );
  const length = stationDrops.length;

  return {
    BDI: sum.BDI / length,
    SCI: sum.SCI / length,
    BCI: sum.BCI / length,
  };
};

export default avgOffDropsIndicator;
