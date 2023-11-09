"use client";
import UploadFormTest from "@/components/upload-file";
import { DataTable } from "@/components/road-table/data-table";
import { columns } from "@/components/road-table/columns";
import { useData } from "@/lib/store-zustand";
import useStore from "@/lib/use-store";

const AddResults = () => {
  const allData = useStore(useData, (state) => state.allData);

  return (
    <div className="mt-20 container">
      <UploadFormTest />
      {!!allData?.length && <DataTable data={allData} columns={columns} />}
    </div>
  );
};

export default AddResults;
