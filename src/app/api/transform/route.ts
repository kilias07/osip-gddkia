import { NextRequest, NextResponse } from "next/server";
import { getMDBData } from "./_get-MDB/get-MDB";
import { getFWDData } from "./_get-FWD/get-FWD";

export type IncomingData = {
  file: File;
};

export async function POST(request: NextRequest) {
  const data = await request.formData();

  if (!data) {
    return NextResponse.json({ error: "no payload" }, { status: 400 });
  }

  const formData: IncomingData = {
    file: data.get("file") as File,
  };

  const ext = formData.file.name.split(".").pop()?.toLowerCase();

  switch (ext) {
    case "fwd": {
      try {
        const params = await getFWDData(formData);
        return NextResponse.json(
          { success: true, message: params },
          { status: 200 }
        );
      } catch (error) {
        if (error instanceof Error)
          return NextResponse.json({ error: error.message }, { status: 501 });
      }
    }
    case "mdb": {
      const params = await getMDBData(formData);
      return NextResponse.json(
        { success: true, message: params },
        { status: 200 }
      );
    }
    default:
      return NextResponse.json(
        { error: "Nieprawidłowy typ pliku" },
        { status: 400 }
      );
  }
}
