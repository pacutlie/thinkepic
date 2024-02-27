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
    const menu_id = parseInt(formData.get("id"));
    const name = formData.get("name");
    const banner = formData.get("banner");
    const description = formData.get("description");
    const layout = formData.get("layout");
    const url = "/" + toSlug(name);
    let imagePath = null;
    let originalFilename = null;

    // check if submenu exists
    const menu = await db.Menu.findUnique({ where: { id: menu_id } });
    const menuName = toSlug(menu.name);
    const submenu = await db.Submenu.findUnique({ where: { url } });

    if (submenu) {
      return NextResponse.json(
        {
          success: false,
          message: "Submenu sudah ada!",
        },
        { status: 200 }
      );
    }

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

      const newSubmenu = await db.Submenu.create({
        data: {
          menu_id,
          name,
          url,
          description,
          layout,
          banner: media.id,
        },
      });

      // Creating page for new submenu
      const path = `/app/(home)/(dynamic-page)/${menuName}`;
      let filePath = path + url;

      if (createDir(filePath)) {
        filePath += "/page.jsx";
        const submenuName = toSlug(name);
        const page = RenderLayout(layout, submenuName, {
          menuId: menu_id,
          submenuId: newSubmenu.id,
          menuName: newSubmenu.name,
          description: newSubmenu.description,
          banner: newSubmenu.banner,
        });

        createFile(filePath, page);
      }
    });

    return NextResponse.json(
      {
        success: true,
        message: "Submenu telah disimpan!",
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
