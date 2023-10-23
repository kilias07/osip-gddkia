"use client";
import UploadFormTest from "@/components/upload-file";
import { useEffect, useState } from "react";
import { DataAfterCalculation } from "@/types/types";
import { DataTable } from "@/components/road-table/data-table";
import { columns } from "@/components/road-table/columns";

const AddResults = () => {
  const [allData, setAllData] = useState<DataAfterCalculation[]>([]);
  useEffect(() => {
    setAllData(
      Object.keys(window.sessionStorage).map((key) =>
        JSON.parse(sessionStorage.getItem(key)!)
      )
    );
  }, []);
  return (
    <div className="mt-20 container">
      <UploadFormTest />
      {!!allData.length && <DataTable data={allData} columns={columns} />}
    </div>
  );
};

export default AddResults;
