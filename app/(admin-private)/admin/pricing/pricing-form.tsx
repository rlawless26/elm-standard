"use client";

import { useActionState, useState } from "react";
import { savePricingAction, type PricingActionResult } from "./actions";
import type { PricingConfig } from "@/lib/pricing";

type GroupField = {
  key: keyof PricingConfig;
  label: string;
  hint?: string;
  step?: string;
  prefix?: string;
  suffix?: string;
};

const GROUPS: Array<{ heading: string; fields: GroupField[] }> = [
  {
    heading: "Cover base",
    fields: [
      {
        key: "base_rate_per_sqin",
        label: "Base rate per sq. inch of front face",
        hint: "Length × height × this number = the cover's base price (before style multiplier).",
        step: "0.01",
        prefix: "$",
      },
      {
        key: "price_floor",
        label: "Price floor",
        hint: "No order can quote under this number, no matter what the formula spits out.",
        step: "1",
        prefix: "$",
      },
      {
        key: "material_spike_multiplier",
        label: "Material spike multiplier",
        hint: "Set to 1.10 to add 10% across the board after a wood/MDF cost spike. Reset to 1.00 when prices stabilize.",
        step: "0.01",
      },
    ],
  },
  {
    heading: "Style multipliers",
    fields: [
      {
        key: "shaker_multiplier",
        label: "Shaker",
        hint: "Multiplier on the base. 1.00 = baseline.",
        step: "0.01",
      },
      {
        key: "modern_multiplier",
        label: "Modern",
        step: "0.01",
      },
      {
        key: "traditional_multiplier",
        label: "Traditional",
        hint: "Higher because of the moulding work.",
        step: "0.01",
      },
    ],
  },
  {
    heading: "Screen + depth",
    fields: [
      {
        key: "brass_screen_upcharge",
        label: "Brass screen upcharge",
        hint: "Flat $ added when 'Grecian, painted brass' is selected.",
        step: "1",
        prefix: "$",
      },
      {
        key: "depth_threshold_in",
        label: "Depth surcharge threshold",
        hint: "Inches above which a per-inch surcharge kicks in.",
        step: "0.5",
        suffix: "in",
      },
      {
        key: "depth_surcharge_per_inch",
        label: "Depth surcharge per inch",
        hint: "$ per inch over the threshold.",
        step: "1",
        prefix: "$",
      },
    ],
  },
  {
    heading: "Delivery fees",
    fields: [
      {
        key: "delivery_local_fee",
        label: "Local install (Greater Boston)",
        hint: "Includes measure + build + delivery + install on site.",
        step: "1",
        prefix: "$",
      },
      {
        key: "delivery_flatpack_fee",
        label: "Flat-pack ships nationally",
        hint: "Pre-cut, pre-primed panels + hardware + assembly guide.",
        step: "1",
        prefix: "$",
      },
    ],
  },
  {
    heading: "Dimension caps",
    fields: [
      {
        key: "dim_max_length_in",
        label: "Max length",
        hint: "Anything longer routes to a custom-quote form instead of instant price.",
        step: "1",
        suffix: "in",
      },
      {
        key: "dim_max_height_in",
        label: "Max height",
        step: "1",
        suffix: "in",
      },
      {
        key: "dim_max_depth_in",
        label: "Max depth",
        step: "0.5",
        suffix: "in",
      },
    ],
  },
];

export function PricingForm({
  initial,
  disabled,
}: {
  initial: PricingConfig;
  disabled: boolean;
}) {
  const [state, formAction, pending] = useActionState<
    PricingActionResult | null,
    FormData
  >(savePricingAction, null);

  return (
    <form
      action={formAction}
      style={{ display: "flex", flexDirection: "column", gap: 32 }}
    >
      {GROUPS.map((group) => (
        <fieldset
          key={group.heading}
          style={{
            border: "1px solid var(--hairline)",
            background: "var(--paper)",
            padding: 24,
            display: "flex",
            flexDirection: "column",
            gap: 20,
            margin: 0,
          }}
        >
          <legend
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--ink-3)",
              padding: "0 8px",
            }}
          >
            {group.heading}
          </legend>
          {group.fields.map((f) => (
            <PricingField
              key={f.key as string}
              field={f}
              defaultValue={String(initial[f.key])}
              error={state?.ok === false ? state.fieldErrors?.[f.key as string] : undefined}
            />
          ))}
        </fieldset>
      ))}

      {state?.ok === false ? (
        <Alert tone="error">{state.error}</Alert>
      ) : null}
      {state?.ok === true ? (
        <Alert tone="success">Saved. /quote will use these values.</Alert>
      ) : null}

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          gap: 16,
          paddingTop: 8,
          borderTop: "1px solid var(--hairline)",
        }}
      >
        {disabled ? (
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              color: "var(--ink-3)",
              letterSpacing: "0.04em",
            }}
          >
            APPLY THE SCHEMA SQL TO ENABLE EDITING
          </span>
        ) : null}
        <button
          type="submit"
          className="btn-primary"
          disabled={pending || disabled}
          style={{ opacity: pending || disabled ? 0.5 : 1 }}
        >
          {pending ? "Saving..." : "Save pricing"}
        </button>
      </div>
    </form>
  );
}

function PricingField({
  field,
  defaultValue,
  error,
}: {
  field: GroupField;
  defaultValue: string;
  error?: string;
}) {
  const [value, setValue] = useState(defaultValue);
  const id = `f-${String(field.key)}`;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <label
        htmlFor={id}
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: 14,
          fontWeight: 500,
          color: "var(--ink)",
        }}
      >
        {field.label}
      </label>
      {field.hint ? (
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: 13,
            color: "var(--ink-3)",
            margin: 0,
            lineHeight: 1.5,
          }}
        >
          {field.hint}
        </p>
      ) : null}
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: 8,
          borderBottom: error ? "1px solid var(--oxide)" : "1px solid var(--ink)",
          paddingBottom: 4,
          maxWidth: 320,
        }}
      >
        {field.prefix ? (
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 14,
              color: "var(--ink-3)",
            }}
          >
            {field.prefix}
          </span>
        ) : null}
        <input
          id={id}
          name={String(field.key)}
          type="number"
          inputMode="decimal"
          step={field.step ?? "any"}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          style={{
            border: "none",
            outline: "none",
            background: "transparent",
            fontFamily: "var(--font-mono)",
            fontSize: 16,
            color: "var(--ink)",
            padding: "6px 0",
            flex: 1,
            minWidth: 0,
          }}
        />
        {field.suffix ? (
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              color: "var(--ink-3)",
              letterSpacing: "0.04em",
            }}
          >
            {field.suffix}
          </span>
        ) : null}
      </div>
      {error ? (
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            color: "var(--oxide)",
            letterSpacing: "0.04em",
          }}
        >
          {error}
        </span>
      ) : null}
    </div>
  );
}

function Alert({
  tone,
  children,
}: {
  tone: "error" | "success";
  children: React.ReactNode;
}) {
  const isError = tone === "error";
  return (
    <div
      role="alert"
      style={{
        background: "var(--paper)",
        border: `1px solid ${isError ? "var(--oxide)" : "var(--moss)"}`,
        padding: 14,
        fontFamily: "var(--font-sans)",
        fontSize: 14,
        color: "var(--ink)",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          color: isError ? "var(--oxide)" : "var(--moss)",
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          marginRight: 8,
        }}
      >
        {isError ? "Error" : "Saved"}
      </span>
      {children}
    </div>
  );
}
