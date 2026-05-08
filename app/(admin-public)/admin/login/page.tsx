import { loginAction } from "./actions";

export const metadata = { title: "Admin login — Elm Standard" };

type SearchParams = Promise<{ error?: string }>;

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { error } = await searchParams;
  const message =
    error === "1"
      ? "Wrong password."
      : error === "config"
        ? "Admin auth isn't configured. Set ADMIN_PASSWORD and ADMIN_TOKEN."
        : null;

  return (
    <main
      style={{
        minHeight: "70vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "96px 0",
      }}
    >
      <div
        className="container"
        style={{
          maxWidth: 420,
          display: "flex",
          flexDirection: "column",
          gap: 18,
        }}
      >
        <span className="overline">Admin</span>
        <div className="rule-strong" />
        <h1
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: 40,
            fontWeight: 400,
            margin: 0,
            letterSpacing: "-0.02em",
          }}
        >
          Sign in.
        </h1>

        <form
          action={loginAction}
          style={{ display: "flex", flexDirection: "column", gap: 14 }}
        >
          <label style={{ display: "block" }}>
            <span className="field-label">Password</span>
            <input
              className="field-input"
              type="password"
              name="password"
              autoComplete="current-password"
              required
              autoFocus
            />
          </label>

          {message ? (
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 12,
                color: "var(--oxide)",
                margin: 0,
              }}
            >
              {message}
            </p>
          ) : null}

          <button
            type="submit"
            className="btn-primary"
            style={{ alignSelf: "flex-start", marginTop: 8 }}
          >
            Sign in →
          </button>
        </form>
      </div>
    </main>
  );
}
