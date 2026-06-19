import { readFile } from "fs/promises";
import path from "path";
import { getSiteContent } from "@/lib/site";
import { getPublicDir, resolvePublicFile } from "@/lib/upload-paths";

export const dynamic = "force-dynamic";

const contentTypes: Record<string, string> = {
  ".ico": "image/x-icon",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
};

export default async function Icon() {
  const content = await getSiteContent();
  const iconPath = content.siteIcon || "/favicon.ico";
  const publicDir = getPublicDir();
  const filePath = resolvePublicFile(iconPath);

  if (!filePath) {
    return new Response(null, { status: 404 });
  }

  const fallbackPath = path.join(publicDir, "favicon.ico");
  const sourcePath = await readFile(filePath)
    .then(() => filePath)
    .catch(() => fallbackPath);
  const ext = path.extname(sourcePath).toLowerCase();
  const bytes = await readFile(sourcePath);

  return new Response(bytes, {
    headers: {
      "Cache-Control": "no-store",
      "Content-Type": contentTypes[ext] || "image/png",
    },
  });
}
