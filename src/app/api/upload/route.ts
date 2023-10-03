import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import { getMDB } from "./get-MDB/get-MDB";

export async function POST(request: NextRequest) {
  const data = await request.formData();
  const file: File | null = data.get("file") as unknown as File;

  if (!file) {
    return NextResponse.json({ success: false });
  }

  const ext = file.name.split(".").pop();
  switch (ext) {
    case "mdb":
      getMDB(file);
    case "fwd":
      getDataFromFWD(file);
    default:
      return null;
  }

  console.log(file);
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // With the file data in the buffer, you can do whatever you want with it.
  // For this, we'll just write it to the filesystem in a new location
  // const path = `/tmp/${file.name}`;
  // await writeFile(path, buffer);

  return NextResponse.json({ success: true });
}
