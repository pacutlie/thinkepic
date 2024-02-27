import { db } from "@/db/config";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    // const page = parseInt(searchParams.get("page"));
    const limit = parseInt(searchParams.get("limit"));

    const [data, count] = await db.$transaction([
      db.Post.findMany({
        where: { status: "APPROVED" },
        orderBy: { created_at: "desc" },
        take: limit,
        include: {
          media: true,
        },
      }),

      db.Post.count({ where: { status: "APPROVED" } }),
    ]);

    return NextResponse.json(
      {
        success: true,
        data,
        count,
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
