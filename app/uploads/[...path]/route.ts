import { readFile, stat } from "fs/promises";
import path from "path";
import { getPublicDir, getUploadsDir } from "@/lib/upload-paths";

export const dynamic = "force-dynamic";

const fallbackImage = path.join(getPublicDir(), "seed", "shinro-reference.jpeg");

const contentTypes: Record<string, string> = {
  ".gif": "image/gif",
  ".ico": "image/x-icon",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
};

function safePath(baseDir: string, parts: string[]) {
  const filePath = path.resolve(baseDir, ...parts);
  return filePath === baseDir || filePath.startsWith(`${baseDir}${path.sep}`) ? filePath : null;
}

async function existingFile(filePath: string) {
  try {
    const info = await stat(filePath);
    return info.isFile();
  } catch {
    return false;
  }
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path: fileParts } = await params;
  const uploadsDir = getUploadsDir();
  const filePath = safePath(uploadsDir, fileParts);

  const source = filePath && (await existingFile(filePath)) ? filePath : fallbackImage;
  const body = await readFile(source);
  const ext = path.extname(source).toLowerCase();

  return new Response(new Uint8Array(body), {
    headers: {
      "Cache-Control": "no-store",
      "Content-Type": contentTypes[ext] || "application/octet-stream",
    },
  });
}
