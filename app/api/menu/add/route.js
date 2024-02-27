import { db } from "@/db/config";
import { toSlug } from "@/utils/Helper";
import { NextResponse } from "next/server";
import { createDir, createFile, readFile } from "@/utils/CreateDir";
import { authOptions } from "@/utils/Auth";
import { getServerSession } from "next-auth";
import RenderLayout from "@/utils/RenderLayout";
import saveToLocal from "@/utils/SaveFile";

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    const formData = await req.formData();
    const name = formData.get("name");
    const external_url = formData.get("externalUrl");
    const description = formData.get("description");
    const banner = formData.get("banner");
    const layout = formData.get("layout");
    const url = formData.get("url") ? formData.get("url") : "/" + toSlug(name);
    let imagePath = null;
    let originalFilename = null;

    if (banner) {
      const file = await saveToLocal(banner);
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

      const newMenu = await db.Menu.create({
        data: {
          name,
          url,
          external_url,
          description,
          layout,
          banner: media.id,
        },
      });

      // Creating page for new menu
      const path = "/app/(home)/(dynamic-page)";
      let filePath = path + url;

      if (createDir(filePath)) {
        filePath += "/page.jsx";
        const menuName = toSlug(name);
        const page = RenderLayout(layout, menuName, {
          menuId: newMenu.id,
          menuName: newMenu.name,
          description: newMenu.description,
          banner: newMenu.banner,
        });

        createFile(filePath, page);
      }
    });

    return NextResponse.json(
      {
        success: true,
        message: "Kategori telah disimpan!",
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
