import { db } from "@/db/config";
import { NextResponse } from "next/server";
import { authOptions } from "@/utils/Auth";
import { getServerSession } from "next-auth";
import saveToLocal from "@/utils/SaveFile";

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    const formData = await req.formData();
    const id = parseInt(formData.get("id"));
    const name = formData.get("name");
    const about = formData.get("about");
    const image = formData.get("image");
    let imagePath = null;
    let originalFilename = null;

    await prisma.$transaction(async () => {
      let data = { name, about };

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

      await db.Team.update({
        where: { id },
        data,
      });
    });

    return NextResponse.json(
      {
        success: true,
        message: "Informasi tim telah diperbarui!",
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
