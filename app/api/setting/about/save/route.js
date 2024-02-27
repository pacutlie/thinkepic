import { db } from "@/db/config";
import saveToLocal from "@/utils/SaveFile";
import { NextResponse } from "next/server";
import { authOptions } from "@/utils/Auth";
import { getServerSession } from "next-auth";

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    const about = await db.About.findFirst();
    const formData = await req.formData();
    const title = formData.get("title");
    const description = formData.get("description");
    const about_us = formData.get("about_us");
    const image = formData.get("image");
    let imagePath = null;
    let originalFilename = null;

    if (!about) {
      if (image) {
        const file = await saveToLocal(image);
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

        await db.About.create({
          data: {
            title,
            description,
            about_us,
            image: media.id,
          },
        });
      });
    } else {
      let data = { title, description, about_us };

      if (typeof image !== "string") {
        const file = await saveToLocal(image);
        imagePath = file.imagePath;
        originalFilename = file.originalFilename;

        const media = await db.Media.create({
          data: {
            path: imagePath,
            original_name: originalFilename,
            user_id: session.user.id,
          },
        });

        data = { ...data, media_id: media.id };
      }

      await db.About.update({
        where: { id: 1 },
        data,
      });
    }

    return NextResponse.json(
      {
        success: true,
        message: "Informasi About telah disimpan",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
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
