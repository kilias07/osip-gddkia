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
import { useData } from "@/lib/store-zustand";

function formatDate(date = new Date()) {
  const year = date.toLocaleString("default", { year: "numeric" });
  const month = date.toLocaleString("default", {
    month: "2-digit",
  });
  const day = date.toLocaleString("default", { day: "2-digit" });

  return [year, month, day].join("-");
}

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
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const roadTesting = row.original;
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { deleteData } = useData((state) => state);

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
              onClick={() => {
                const copyData = {
                  roadNumber: roadTesting.userInput.roadNumber,
                  roadwayNumber: roadTesting.userInput.roadwayNumber,
                  laneNumber: roadTesting.userInput.laneNumber,
                  type: roadTesting.userInput.type === "asc" ? "r" : "m",
                  dob: formatDate(new Date(roadTesting.userInput.dob)),
                };

                const data = Object.values(copyData).join("_");
                return navigator.clipboard.writeText(data);
              }}
            >
              Kopiuj nazwę do schowka
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-red-500 focus:text-red-500"
              onClick={() => deleteData(roadTesting.data.id)}
            >
              Usuń
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
