import { db } from "@/db/config";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const id = parseInt(params.id);

    const data = await db.Submenu.findMany({ where: { menu_id: id } });

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
