import { db } from "@/db/config";
import { NextResponse } from "next/server";
import { z } from "zod";

const postSchema = z.object({
  id: z.number().min(1, "ID Kategori tidak boleh kosong"),
});

export async function POST(req) {
  try {
    const body = await req.json();
    const { id } = postSchema.parse(body);

    await db.Submenu.delete({ where: { id } });

    return NextResponse.json(
      {
        success: true,
        message: "Submenu telah dihapus!",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Upps, sepertinya server sedang bermasalah!",
        error,
      },
      { status: 500 }
    );
  }
}
