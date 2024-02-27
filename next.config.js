/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    loader: "custom",
    loaderFile: "./utils/Loader.js",
    domains: ["drive.google.com"],
  },
  env: {
    BASE_URL: process.env.BASE_URL,
    SECRET_TOKEN: process.env.SECRET_TOKEN,
    GOOGLE_ID: process.env.GOOGLE_ID,
    GOOGLE_SECRET: process.env.GOOGLE_SECRET,
    GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
    GOOGLE_DRIVE_TOKEN: process.env.GOOGLE_DRIVE_TOKEN,
    FILE_MANAGER_LICENSE: process.env.FILE_MANAGER_LICENSE,
  },
};

module.exports = nextConfig;
