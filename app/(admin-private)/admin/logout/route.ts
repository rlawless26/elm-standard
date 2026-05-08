import { cookies } from "next/headers";
import { ADMIN_COOKIE } from "@/lib/admin-auth";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const jar = await cookies();
  jar.delete(ADMIN_COOKIE);
  const url = new URL("/admin/login", req.url);
  return Response.redirect(url, 303);
}
