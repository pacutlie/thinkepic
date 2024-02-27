import { db } from "@/db/config";
import { NextResponse } from "next/server";
import { z } from "zod";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/Auth";

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);

    let rules = {
      value: z.string().min(1, "Konten belum diisi"),
      type: z.string().min(1, "Konten belum diisi"),
    };

    const termOfUse = z.object(rules);

    const { value, type } = termOfUse.parse(await req.json());

    await db.Setting.update({
      where: {
        type,
      },
      data: {
        value,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Konten telah disimpan",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        message: error.issues[0].message,
        error,
      },
      { status: 500 }
    );
  }
}
