/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataAfterCalculation } from "@/types/types";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useData, useFilteredRow } from "@/lib/store-zustand";
import { format } from "date-fns";

export const columns: ColumnDef<DataAfterCalculation>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "userInput.roadNumber",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nr drogi
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    id: "roadNumber",
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("roadNumber")}</div>
    ),
  },
  {
    id: "roadwayNumber",
    accessorKey: "userInput.roadwayNumber",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nr jezdni
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("roadwayNumber")}</div>
    ),
  },
  {
    accessorKey: "userInput.laneNumber",
    header: "Nr pasa",
    id: "laneNumber",
  },
  {
    accessorKey: "userInput.type",
    header: "Kilometraż",
    id: "type",
    cell: ({ row }) => {
      const type = row.getValue("type");
      return (
        <div className="capitalize">
          {type === "asc" ? "rosnący" : "malejący"}
        </div>
      );
    },
  },
  {
    accessorKey: "userInput.dob",
    header: "Data",
    id: "dob",
    cell: ({ row }) => {
      const dateString = new Date(row.getValue("dob")).toLocaleDateString();
      return <div className="lowercase">{dateString}</div>;
    },
  },
  {
    accessorKey: "name",
    header: "Nazwa",
    id: "name",
    cell: ({ row }) => {
      const roadTesting = row.original;
      const { getData } = useData((state) => state);
      const road = getData(row.original.data.id);
      const timeMeasurement =
        road &&
        format(
          new Date(road?.data.sessions.stations[0].time!),
          "yyyyMMdd_HHmm"
        );
      const ext = road?.file.name.split(".").pop();

      const copyData = {
        roadNumber: roadTesting.userInput.roadNumber,
        roadwayNumber: roadTesting.userInput.roadwayNumber,
        laneNumber: roadTesting.userInput.laneNumber,
        type: roadTesting.userInput.type === "asc" ? "r" : "m",
        dob: timeMeasurement,
      };

      const data = Object.values(copyData).join("_") + "." + ext?.toLowerCase();
      return <div className="lowercase">{data}</div>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const roadTesting = row.original;

      const { deleteData } = useData((state) => state);
      const { deleteRowSelection } = useFilteredRow((state) => state);

      const roadTime = row.original.data.sessions.stations[0].time;
      const roadOriginalName = row.original.file.name;
      const timeMeasurement =
        roadTime && format(new Date(roadTime), "yyyyMMdd_HHmm");
      const ext = roadOriginalName.split(".").pop();
      const dataForName = {
        roadNumber: roadTesting.userInput.roadNumber,
        roadwayNumber: roadTesting.userInput.roadwayNumber,
        laneNumber: roadTesting.userInput.laneNumber,
        type: roadTesting.userInput.type === "asc" ? "r" : "m",
        dob: timeMeasurement,
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Akcje</DropdownMenuLabel>
            <DropdownMenuItem
              className="flex-col items-start"
              onClick={() => {
                const dataForNameAll =
                  Object.values(dataForName).join("_") + "." + ext;
                return navigator.clipboard.writeText(dataForNameAll);
              }}
            >
              <span>kopiuj plik z wygenerowaną</span>
              <span>nazwą wraz z rozszerzeniem</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="flex-col items-start"
              onClick={() =>
                navigator.clipboard.writeText(roadTesting.file.name)
              }
            >
              <span>kopiuj nazwę</span>
              <span>pliku źródłowego</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-red-500 focus:text-red-500"
              onClick={() => {
                deleteRowSelection(row.index);
                deleteData(roadTesting.data.id);
              }}
            >
              Usuń
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
