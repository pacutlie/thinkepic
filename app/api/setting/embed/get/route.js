import { db } from "@/db/config";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await db.Homesetting.findUnique({
      where: { id: 1 },
    });

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
