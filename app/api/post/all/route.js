import { db } from "@/db/config";
import { authOptions } from "@/utils/Auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const session = await getServerSession(authOptions);
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page"));
    const limit = parseInt(searchParams.get("limit"));

    const draft = searchParams.get("draft") === "true" ? "DRAFT" : null;
    const pending = searchParams.get("pending") === "true" ? "PENDING" : null;
    const reviewed = searchParams.get("reviewed") === "true" ? "REVIEWED" : null;
    const rejected = searchParams.get("rejected") === "true" ? "REJECTED" : null;
    const approved = searchParams.get("approved") === "true" ? "APPROVED" : null;

    const status = [draft, pending, reviewed, rejected, approved].filter((e) => e !== null && e !== undefined);

    let query = { status: { in: status } };

    if (session.user.role === "AUTHOR") query.author_id = session.user.id;

    // switch (session.user.role) {
    //   case "AUTHOR":
    //     query.author_id = session.user.id;
    //     break;
    // }

    const [data, count] = await db.$transaction([
      db.Post.findMany({
        where: query,
        orderBy: {
          created_at: "desc",
        },
        take: limit,
        skip: page == 0 ? 0 : limit * (page - 1),
      }),

      db.Post.count({
        where: {
          author_id: session.user.id,
        },
      }),
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
    console.log(error.message);
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
