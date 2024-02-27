import { db } from "@/db/config";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const embedVideo = await db.Homesetting.findUnique({ where: { id: 1 } });
    const { embed } = await req.json();

    if (!embedVideo) {
      await db.Homesetting.create({
        data: { embed },
      });
    } else {
      await db.Homesetting.update({
        where: { id: 1 },
        data: { embed },
      });
    }

    return NextResponse.json(
      {
        success: true,
        message: "Video telah disimpan",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        message: error.issues[0].message,
        error,
      },
      { status: 500 }
    );
  }
}
