import type { Metadata } from "next";
import LoginForm from "@/components/LoginForm";

export const metadata: Metadata = {
  title: "Sign in",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6 py-16">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <div className="text-xs uppercase tracking-[0.22em] text-accent">
            RealVeneers
          </div>
          <h1 className="mt-2 font-display text-3xl tracking-tight text-foreground">
            Leads Dashboard
          </h1>
          <p className="mt-2 text-sm text-foreground-muted">
            Sign in to view consultation requests.
          </p>
        </div>

        <div className="rounded-2xl bg-surface p-7 ring-1 ring-line shadow-[0_20px_50px_-25px_rgba(15,15,16,0.25)]">
          <LoginForm />
        </div>
      </div>
    </main>
  );
}
