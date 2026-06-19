import path from "path";

export const uploadLimitBytes = 10 * 1024 * 1024;
export const uploadLimitLabel = "10MB";

export function getPublicDir() {
  return path.join(process.cwd(), "public");
}

export function getUploadsDir() {
  return path.resolve(process.env.UPLOADS_DIR || path.join(getPublicDir(), "uploads"));
}

export function resolvePublicFile(publicPath: string) {
  const publicDir = getPublicDir();
  const filePath = path.resolve(publicDir, publicPath.replace(/^\/+/, ""));

  if (filePath !== publicDir && !filePath.startsWith(`${publicDir}${path.sep}`)) {
    return null;
  }

  return filePath;
}
