"use client";
import UploadFormTest from "@/app/dodaj/components/upload-file";
import { DataTable } from "@/app/dodaj/components/data-table";
import { columns } from "@/app/dodaj/components/columns";
import { useData } from "@/lib/store-zustand";
import useStore from "@/lib/use-store";

const AddResults = () => {
  const allData = useStore(useData, (state) => state.allData);

  return (
    <div className="mt-10 container">
      <UploadFormTest />
      {!!allData?.length && <DataTable data={allData} columns={columns} />}
    </div>
  );
};

export default AddResults;
