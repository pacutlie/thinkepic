import { db } from "@/db/config";
import { authOptions } from "@/utils/Auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    // const session = await getServerSession(authOptions);
    // const { searchParams } = new URL(req.url);
    // const page = parseInt(searchParams.get("page"));
    // const limit = parseInt(searchParams.get("limit"));

    const [data, count] = await db.$transaction([
      db.User.findMany({
        where: {
          role: {
            not: "SUPERADMIN",
          },
        },
        orderBy: {
          created_at: "asc",
        },
        // take: limit,
        // skip: page == 0 ? 0 : limit * page,
      }),

      db.User.count({
        where: {
          role: {
            not: "SUPERADMIN",
          },
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
