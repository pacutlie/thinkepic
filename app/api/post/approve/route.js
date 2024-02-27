import { db } from "@/db/config";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { id } = await req.json();

    const post = await db.Post.findUnique({ where: { id } });

    if (post.status !== "APPROVED") {
      await db.Post.update({
        where: { id },
        data: {
          status: "APPROVED",
        },
      });
    }

    return NextResponse.json(
      {
        success: true,
        message: "Postingan telah disetujui!",
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
