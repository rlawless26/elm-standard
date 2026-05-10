"use server";

import { revalidatePath } from "next/cache";
import { getAdminClient } from "@/lib/supabase";
import { PRICING_SINGLETON_ID } from "@/lib/pricing";
import { coercePricingFromForm } from "@/lib/pricing-server";
import { requireAdmin } from "@/lib/admin-auth";

export type PricingActionResult =
  | { ok: true }
  | { ok: false; error: string; fieldErrors?: Record<string, string> };

export async function savePricingAction(
  _prev: PricingActionResult | null,
  formData: FormData,
): Promise<PricingActionResult> {
  await requireAdmin();

  const parsed = coercePricingFromForm(formData);
  if (!parsed.ok) {
    return { ok: false, error: "Some fields need a fix.", fieldErrors: parsed.errors };
  }

  let supabase;
  try {
    supabase = getAdminClient();
  } catch (e) {
    return {
      ok: false,
      error: e instanceof Error ? e.message : "Supabase not configured",
    };
  }

  const { error } = await supabase
    .from("pricing_config")
    .update({ ...parsed.patch, updated_at: new Date().toISOString() })
    .eq("id", PRICING_SINGLETON_ID);

  if (error) {
    return { ok: false, error: error.message };
  }

  revalidatePath("/admin/pricing");
  revalidatePath("/quote");
  return { ok: true };
}
