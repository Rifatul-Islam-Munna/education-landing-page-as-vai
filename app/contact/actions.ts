"use server";

import { redirect } from "next/navigation";
import { saveContactMessage } from "@/lib/site";

function text(formData: FormData, name: string) {
  const value = formData.get(name);
  return typeof value === "string" ? value.trim() : "";
}

export async function submitContactAction(formData: FormData) {
  const name = text(formData, "name");
  const email = text(formData, "email");
  const phone = text(formData, "phone");
  const subject = text(formData, "subject");
  const message = text(formData, "message");

  if (!name || !email || !message) {
    redirect("/contact?error=1");
  }

  try {
    await saveContactMessage({ name, email, phone, subject, message });
  } catch {
    redirect("/contact?error=1");
  }

  redirect("/contact?sent=1");
}
