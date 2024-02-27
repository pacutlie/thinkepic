import { db } from "@/db/config";
import { authOptions } from "@/utils/Auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { z } from "zod";

const postSchema = z.object({
  id: z.string().min(1, "ID postingan tidak ditemukan").max(100),
  title: z.string().min(1, "Judul postingan belum diisi"),
  content: z.string().min(1, "Isi postingan belum diisi"),
  category: z.string().min(1, "Kategori postingan belum dipilih"),
});

export async function POST(req) {
  try {
    // const session = await getServerSession(authOptions);

    const body = await req.json();
    const { id, title, content, category } = postSchema.parse(body);

    const slug = title
      .trim()
      .toLowerCase()
      .replace(/[\W_]+/g, "-")
      .replace(/^-+|-+$/g, "");

    await db.Post.update({
      where: { id },
      data: {
        title,
        content,
        category,
        slug,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Postingan telah diperbarui!",
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
