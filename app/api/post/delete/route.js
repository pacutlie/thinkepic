import { db } from "@/db/config";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { id } = await req.json();

    await db.Post.delete({ where: { id } });

    return NextResponse.json(
      {
        success: true,
        message: "Postingan telah dihapus!",
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
