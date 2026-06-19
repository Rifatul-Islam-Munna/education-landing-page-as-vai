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

function isRemoteUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export default async function Icon() {
  const content = await getSiteContent();
  const iconPath = content.siteIcon || "/favicon.ico";
  const publicDir = getPublicDir();

  if (isRemoteUrl(iconPath)) {
    const fallbackPath = path.join(publicDir, "favicon.ico");
    const response = await fetch(iconPath, { cache: "no-store" }).catch(() => null);

    if (response?.ok) {
      const bytes = await response.arrayBuffer();
      return new Response(bytes, {
        headers: {
          "Cache-Control": "no-store",
          "Content-Type": response.headers.get("Content-Type") || "image/png",
        },
      });
    }

    const bytes = await readFile(fallbackPath);
    return new Response(new Uint8Array(bytes), {
      headers: {
        "Cache-Control": "no-store",
        "Content-Type": "image/x-icon",
      },
    });
  }

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

  return new Response(new Uint8Array(bytes), {
    headers: {
      "Cache-Control": "no-store",
      "Content-Type": contentTypes[ext] || "image/png",
    },
  });
}
