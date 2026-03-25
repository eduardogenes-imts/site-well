"use client";

import { useState } from "react";
import { loginAction } from "./actions";

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError(null);
    const res = await loginAction(formData);
    if (res?.error) {
      setError(res.error);
      setLoading(false);
    }
  }

  return (
    <div className="relative flex min-h-[100dvh] items-center justify-center bg-foreground">
      {/* Watermark */}
      <span
        className="pointer-events-none absolute select-none font-bold leading-none text-white/[0.03]"
        style={{ fontSize: "clamp(8rem, 15vw, 20rem)", letterSpacing: "0.08em" }}
      >
        W.
      </span>

      {/* Login form */}
      <div className="relative z-10 w-full max-w-[400px] px-8">
        <label
          htmlFor="password"
          className="mb-4 block text-micro uppercase tracking-[0.22em]"
          style={{ color: "hsl(var(--accent))" }}
        >
          Acesso
        </label>

        <form action={handleSubmit} className="space-y-6">
          <input
            id="password"
            name="password"
            type="password"
            placeholder="••••••••"
            required
            className="w-full border-0 border-b bg-transparent pb-3 text-lg tracking-[0.2em] text-white outline-none transition-colors placeholder:text-white/10 focus:border-white"
            style={{ borderColor: "hsl(var(--accent) / 0.3)" }}
          />

          {error && (
            <p className="text-micro uppercase tracking-[0.22em] text-red-400/80">
              [ {error} ]
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 text-caption uppercase tracking-[0.18em] text-white transition-opacity hover:opacity-60 disabled:opacity-30"
          >
            {loading ? "Aguarde..." : "Entrar"}
            {!loading && (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
