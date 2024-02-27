import fs from "fs";
import path from "path";

export function createDir(dirPath) {
  const dir = process.cwd() + dirPath;

  if (!fs.existsSync(dir)) {
    try {
      fs.mkdirSync(dir, { recursive: true });
      return {
        success: true,
        message: "New directory is created",
      };
    } catch (error) {
      console.log(error);
      return {
        success: false,
        message: error.message,
      };
    }
  }

  return {
    success: true,
    message: "Folder already exists.",
  };
}

export function createFile(filePath, fileContent) {
  // const filePath = process.cwd() + path.join("/app/(home)", filePath);
  const dirPath = path.join(process.cwd(), filePath);

  fs.writeFile(dirPath, fileContent, (error) => {
    if (error) {
      console.log(error);
      return {
        success: false,
        message: error.message,
      };
    } else {
      return {
        success: true,
        message: "New file is created",
      };
    }
  });
}

export function readFile(fileName) {
  const filePath = process.cwd() + fileName;
  return fs.readFileSync(filePath, "utf8");
}

// using them:
// createDir('/about')
// createFile('/about', 'page.jsx')
