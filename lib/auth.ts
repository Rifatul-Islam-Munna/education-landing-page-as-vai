import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

const cookieName = "shinro_admin";

function secret() {
  return process.env.ADMIN_SESSION_SECRET || "dev-admin-session-secret";
}

function sign(value: string) {
  return createHmac("sha256", secret()).update(value).digest("hex");
}

export async function isAdmin() {
  const store = await cookies();
  const raw = store.get(cookieName)?.value;
  if (!raw) return false;

  const [email, signature] = raw.split(".");
  if (!email || !signature) return false;

  const expected = sign(email);
  const left = Buffer.from(signature);
  const right = Buffer.from(expected);
  return left.length === right.length && timingSafeEqual(left, right);
}

export async function createAdminSession(email: string) {
  const store = await cookies();
  store.set(cookieName, `${email}.${sign(email)}`, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8,
  });
}

export async function clearAdminSession() {
  const store = await cookies();
  store.delete(cookieName);
}
