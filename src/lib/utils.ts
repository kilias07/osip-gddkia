import { type ClassValue, clsx } from "clsx";
import { Value } from "mdb-reader/lib/types/types";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type Obj = {
  [key: string]: number | Value;
};

export function getNonZeroValArr(obj: Obj) {
  const keys = Object.keys(obj).reverse();
  for (let i = 0; i < keys.length; i++) {
    if (obj[keys[i]] !== 0) {
      return keys.slice(i).reverse();
    }
  }
}
