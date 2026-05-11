"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin-auth";
import { getAdminClient } from "@/lib/supabase";
import { ORDER_STATUSES, type OrderStatus } from "@/lib/order-schema";

export async function updateOrder(formData: FormData): Promise<void> {
  await requireAdmin();
  const id = String(formData.get("id") ?? "").trim();
  if (!id) throw new Error("Missing id");

  const status = String(formData.get("status") ?? "");
  if (!ORDER_STATUSES.includes(status as OrderStatus)) {
    throw new Error("Invalid status");
  }

  const internal_notes = String(formData.get("internal_notes") ?? "")
    .slice(0, 5000);

  const supabase = getAdminClient();
  const { error } = await supabase
    .from("orders")
    .update({ status, internal_notes: internal_notes || null })
    .eq("id", id);

  if (error) {
    console.error("[admin orders] update failed", id, error);
    throw new Error("Update failed");
  }

  revalidatePath(`/admin/orders/${id}`);
  revalidatePath("/admin/orders");
}
