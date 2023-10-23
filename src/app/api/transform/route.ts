import { NextRequest, NextResponse } from "next/server";
import { getMDBData } from "./_get-MDB/get-MDB";

export type NewData = {
  file: File;
};

export async function POST(request: NextRequest) {
  const data = await request.formData();

  if (!data) {
    return NextResponse.json({ error: "no payload" }, { status: 400 });
  }

  const formData: NewData = {
    file: data.get("file") as File,
  };

  const ext = formData.file.name.split(".").pop();

  if (ext === "mdb" || ext === "MDB") {
    const params = await getMDBData(formData);
    return NextResponse.json(
      { success: true, message: params },
      { status: 200 }
    );
  }

  return NextResponse.json({ error: "Invalid file type" }, { status: 400 });
}
