"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  ADMIN_COOKIE,
  ADMIN_COOKIE_MAX_AGE,
  checkPassword,
} from "@/lib/admin-auth";

export async function loginAction(formData: FormData): Promise<void> {
  const submitted = String(formData.get("password") ?? "");
  const token = process.env.ADMIN_TOKEN;
  if (!token || !process.env.ADMIN_PASSWORD) {
    redirect("/admin/login?error=config");
  }
  if (!checkPassword(submitted)) {
    redirect("/admin/login?error=1");
  }
  const jar = await cookies();
  jar.set(ADMIN_COOKIE, token!, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: ADMIN_COOKIE_MAX_AGE,
  });
  redirect("/admin");
}
