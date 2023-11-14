import { DataAfterCalculation } from "@/types/types";
import { createContext } from "react";

export const DataContext = createContext<DataAfterCalculation[]>([]);
