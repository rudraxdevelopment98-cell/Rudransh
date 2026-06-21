"use client";

import { useFormState, useFormStatus } from "react-dom";
import { login } from "@/app/admin/actions";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="btn-primary mt-8 w-full disabled:opacity-50"
    >
      {pending ? "Signing in…" : "Sign in"}
    </button>
  );
}

export function LoginForm() {
  const [state, formAction] = useFormState(login, {});

  return (
    <form action={formAction}>
      <label className="block">
        <span className="label">Username</span>
        <input
          name="username"
          required
          autoComplete="username"
          className="mt-2 w-full border border-ink/20 bg-warmwhite px-4 py-3 focus:border-gold focus:outline-none"
        />
      </label>
      <label className="mt-6 block">
        <span className="label">Password</span>
        <input
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="mt-2 w-full border border-ink/20 bg-warmwhite px-4 py-3 focus:border-gold focus:outline-none"
        />
      </label>
      {state?.error && <p className="mt-4 text-sm text-clay">{state.error}</p>}
      <SubmitButton />
    </form>
  );
}
