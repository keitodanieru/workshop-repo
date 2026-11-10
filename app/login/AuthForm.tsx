"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { login, register } from "@/app/auth/actions";
import { Button, Card, Feedback, Field, FormRow } from "@/app/_components/ui";

/**
 * AuthForm — sign in, or create an account, with one form.
 *
 * Calls the server actions in app/auth/actions.ts. Every new account starts
 * as USER / NON_MEMBER (the database sets that, not this form).
 */

type Mode = "signin" | "register";

type State =
  | { phase: "idle" }
  | { phase: "submitting" }
  | { phase: "error"; message: string }
  | { phase: "check-email" };

const MIN_PASSWORD = 6;

export function AuthForm({ initialNote }: { initialNote?: string }) {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("signin");
  const [state, setState] = useState<State>({ phase: "idle" });
  const [fieldErrors, setFieldErrors] = useState<{
    email?: string;
    password?: string;
  }>({});

  const submitting = state.phase === "submitting";
  const isRegister = mode === "register";

  function switchMode(next: Mode) {
    setMode(next);
    setState({ phase: "idle" });
    setFieldErrors({});
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = String(data.get("email") ?? "").trim();
    const password = String(data.get("password") ?? "");

    const errors: { email?: string; password?: string } = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Enter a valid email address.";
    }
    if (password.length < MIN_PASSWORD) {
      errors.password = `Use at least ${MIN_PASSWORD} characters.`;
    }
    setFieldErrors(errors);
    if (errors.email || errors.password) {
      return;
    }

    setState({ phase: "submitting" });
    try {
      const result = isRegister
        ? await register(email, password)
        : await login(email, password);

      if (!result.ok) {
        setState({ phase: "error", message: result.error });
        return;
      }
      if (result.needsEmailConfirmation) {
        setState({ phase: "check-email" });
        return;
      }
      // Signed in. Reload server components so the nav shows the new state.
      router.push("/");
      router.refresh();
    } catch {
      setState({
        phase: "error",
        message: "We couldn't reach the server. Please try again.",
      });
    }
  }

  if (state.phase === "check-email") {
    return (
      <Card className="panel-narrow">
        <Feedback tone="info">
          <span>Check your inbox for a confirmation link.</span>
          <span>
            Workshop tip: you can turn off &quot;Confirm email&quot; in Supabase
            so new accounts can sign in right away.
          </span>
        </Feedback>
      </Card>
    );
  }

  return (
    <Card className="panel-narrow">
      <form onSubmit={onSubmit} noValidate>
        <div className="stack-3">
          <div className="filter-bar" role="tablist" aria-label="Account">
            <button
              type="button"
              role="tab"
              aria-selected={!isRegister}
              className={`filter-chip${isRegister ? "" : " filter-chip--active"}`}
              onClick={() => switchMode("signin")}
            >
              Sign in
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={isRegister}
              className={`filter-chip${isRegister ? " filter-chip--active" : ""}`}
              onClick={() => switchMode("register")}
            >
              Create account
            </button>
          </div>

          {initialNote ? <Feedback tone="info">{initialNote}</Feedback> : null}
          {state.phase === "error" ? (
            <Feedback tone="error">{state.message}</Feedback>
          ) : null}

          <FormRow
            actions={
              <Button type="submit" block disabled={submitting}>
                {submitting
                  ? "Please wait…"
                  : isRegister
                    ? "Create account"
                    : "Sign in"}
              </Button>
            }
          >
            <Field
              id="email"
              name="email"
              type="email"
              label="Email"
              autoComplete="email"
              required
              error={fieldErrors.email}
            />
            <Field
              id="password"
              name="password"
              type="password"
              label="Password"
              autoComplete={isRegister ? "new-password" : "current-password"}
              required
              hint={isRegister ? `At least ${MIN_PASSWORD} characters.` : undefined}
              error={fieldErrors.password}
            />
          </FormRow>
        </div>
      </form>
    </Card>
  );
}
