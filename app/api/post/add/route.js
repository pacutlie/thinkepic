import { db } from "@/db/config";
import { toSlug } from "@/utils/Helper";
import { NextResponse } from "next/server";
import { authOptions } from "@/utils/Auth";
import { getServerSession } from "next-auth";
import { createDir, createFile } from "@/utils/CreateDir";
import saveToLocal from "@/utils/SaveFile";

export const POST = async (req, res) => {
  try {
    const session = await getServerSession(authOptions);
    const formData = await req.formData();
    const author_id = session.user.id;
    const title = formData.get("title");
    const content = formData.get("content");
    const menu_id = parseInt(formData.get("menu"));
    const submenu_id = parseInt(formData.get("submenu"));
    const thumbnail = formData.get("thumbnail");
    const slug = toSlug(title);
    let imagePath = null;
    let originalFilename = null;

    if (thumbnail) {
      const file = await saveToLocal(thumbnail);
      imagePath = file.imagePath;
      originalFilename = file.originalFilename;
    }

    await prisma.$transaction(async () => {
      const media = await db.Media.create({
        data: {
          path: imagePath,
          original_name: originalFilename,
          user_id: session.user.id,
        },
      });

      let data = {
        author_id,
        title,
        content,
        menu_id,
        submenu_id,
        slug,
        thumbnail: media.id,
      };

      switch (session.user.role) {
        case "SUPERADMIN":
        case "ADMIN":
          data.status = "REVIEWED";
          break;
      }

      await db.Post.create({ data });
    });

    return NextResponse.json(
      {
        success: true,
        message: "Postingan telah disimpan!",
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
};
