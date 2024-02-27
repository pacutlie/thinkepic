import { db } from "@/db/config";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type");
    console.log(type);

    const data = await db.Setting.findUnique({ where: { type } });

    return NextResponse.json(
      {
        success: true,
        data,
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
