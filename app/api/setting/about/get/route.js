import { db } from "@/db/config";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await db.About.findFirst({
      include: {
        media: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        data,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error.message);
    return NextResponse.json(
      {
        success: false,
        message: "Upps, sepertinya server sedang bermasalah!",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
