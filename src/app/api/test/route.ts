import { FormidableError, parseForm } from "@/components/parse-form";
import { NextRequest, NextResponse } from "next/server";

export type NewData = {
  file: File;
};

export async function POST(req: NextRequest, res: NextResponse) {
  const data = await req.formData();

  try {
    const { fields, files } = await parseForm(req: NextRequest);

    const file = files.media;
    let url = Array.isArray(file) ? file.map((f) => f.filepath) : file.filepath;

    res.status(200).json({
      data: {
        url,
      },
      error: null,
    });
  } catch (e) {
    if (e instanceof FormidableError) {
      res.status(e.httpCode || 400).json({ data: null, error: e.message });
    } else {
      console.error(e);
      res.status(500).json({ data: null, error: "Internal Server Error" });
    }
  }

  return NextResponse.json({ message: "success" }, { status: 200 });
}
