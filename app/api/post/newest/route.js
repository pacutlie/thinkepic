import { db } from "@/db/config";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const limit = 5;
    const data = await db.Post.findMany({
      where: { status: "APPROVED" },
      orderBy: { created_at: "desc" },
      take: limit,
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
