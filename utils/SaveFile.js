import { createDir, createFile } from "@/utils/CreateDir";
import { authOptions } from "@/utils/Auth";
import { getServerSession } from "next-auth";
import { customAlphabet } from "nanoid";
import { getFileExtension } from "@/utils/Helper";
const nanoid = customAlphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", 10);

export default async function saveToLocal(file) {
  const session = await getServerSession(authOptions);

  const originalFilename = file.name;
  const buffer = Buffer.from(await file.arrayBuffer());
  const fileExtension = getFileExtension(originalFilename);
  const filename = nanoid(25) + "." + fileExtension;
  const dirPath = `/public/assets/media/${session.user.role}_${session.user.id}`;
  if (createDir(dirPath)) createFile(`${dirPath}/${filename}`, buffer);

  const imagePath = `/assets/media/${session?.user.role}_${session?.user.id}/${filename}`;

  return { originalFilename, imagePath };
}
