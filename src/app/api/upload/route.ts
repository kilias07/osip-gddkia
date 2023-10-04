import { NextRequest, NextResponse } from "next/server";
import { getMDBData } from "./_get-MDB/get-MDB";
import { getFWDData } from "./_get-FWD/get-FWD";
import { writeFile, readdir } from "fs/promises";
import { join } from "path";

export type Data = {
  type: "asc" | "desc";
  roadNumber: number;
  roadwayNumber: number;
  laneNumber: number;
  file: File;
};

export async function POST(request: NextRequest) {
  const data = await request.formData();

  if (!data) {
    return NextResponse.json(
      { success: false, error: "no payload" },
      { status: 400 }
    );
  }
  const userInput = {
    type: data.get("type") as "asc" | "desc",
    roadNumber: +data.get("roadNumber")!,
    roadwayNumber: +data.get("roadwayNumber")!,
    laneNumber: +data.get("laneNumber")!,
  };

  const fileName = `${userInput.roadNumber}_${userInput.roadwayNumber}_${
    userInput.type === "asc" ? "r" : "m"
  }_${userInput.laneNumber}.json`;

  const roadDir = await readdir(join(process.cwd(), "road-files"));
  if (roadDir.includes(fileName)) {
    return NextResponse.json(
      { success: false, error: "File already exists" },
      { status: 400 }
    );
  }

  const formData: Data = {
    file: data.get("file") as File,
    ...userInput,
  };

  const ext = formData.file.name.split(".").pop();
  const path = join(process.cwd(), "road-files", `${fileName}`);

  if (ext === "mdb") {
    const params = await getMDBData(formData);
    const JSONData = JSON.stringify(params);
    await writeFile(path, JSONData);
    return NextResponse.json({ success: true }, { status: 200 });
  }
  if (ext === "fwd") {
    return NextResponse.json({ success: true }, { status: 200 });
  }

  return NextResponse.json(
    { success: false, error: "Invalid file type" },
    { status: 400 }
  );
}
