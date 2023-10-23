"use client";

import { columns } from "@/components/road-table/columns";
import { DataTable } from "@/components/road-table/data-table";
import { DataAfterCalculation } from "@/types/types";
import { useEffect, useState } from "react";

const ShowResults = () => {
  const [allData, setAllData] = useState<DataAfterCalculation[]>([]);
  useEffect(() => {
    setAllData(
      Object.keys(window.sessionStorage).map((key) =>
        JSON.parse(sessionStorage.getItem(key)!)
      )
    );
  }, []);
  // console.log(allData);

  return (
    <div className="flex flex-col gap-32 justify-center items-center mt-[10rem]">
      <DataTable data={allData} columns={columns} />
    </div>
  );
};

export default ShowResults;
