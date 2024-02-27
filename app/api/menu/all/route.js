import { db } from "@/db/config";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await db.Menu.findMany({
      include: {
        submenu: {
          include: {
            media: true,
          },
        },
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
