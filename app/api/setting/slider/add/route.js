import { db } from "@/db/config";
import { NextResponse } from "next/server";
import { authOptions } from "@/utils/Auth";
import { getServerSession } from "next-auth";
import saveToLocal from "@/utils/SaveFile";

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    const formData = await req.formData();
    const title = formData.get("title");
    const caption = formData.get("caption");
    const image = formData.get("image");
    let imagePath = null;
    let originalFilename = null;

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

      await db.Slider.create({
        data: {
          title,
          caption,
          image: media.id,
        },
      });
    });

    return NextResponse.json(
      {
        success: true,
        message: "Slide telah disimpan!",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error.message);
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
