import { SymbolType } from "recharts/types/util/types";

export const getShape = (i: number) => {
  let shape: SymbolType = "circle";
  switch (i) {
    case 0:
      shape = "circle";
      break;
    case 1:
      shape = "triangle";
      break;
    case 2:
      shape = "square";
      break;
    case 3:
      shape = "star";
      break;
    case 4:
      shape = "diamond";
      break;
    case 5:
      shape = "cross";
      break;
    case 6:
      shape = "wye";
      break;
  }
  return shape;
};
