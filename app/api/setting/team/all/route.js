import { db } from "@/db/config";
import { NextResponse } from "next/server";
import { authOptions } from "@/utils/Auth";
import { getServerSession } from "next-auth";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    const data = await db.Team.findMany({
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
