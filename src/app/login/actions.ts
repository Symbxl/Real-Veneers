"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  AUTH_COOKIE,
  AUTH_TOKEN,
  LEADS_USERNAME,
  LEADS_PASSWORD,
} from "@/lib/auth";

export type LoginState = { error?: string };

/** Verify credentials, set the session cookie, and go to /leads. */
export async function loginAction(
  _prev: LoginState,
  formData: FormData
): Promise<LoginState> {
  const username = String(formData.get("username") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (username !== LEADS_USERNAME || password !== LEADS_PASSWORD) {
    return { error: "Incorrect username or password." };
  }

  const jar = await cookies();
  jar.set(AUTH_COOKIE, AUTH_TOKEN, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8, // 8 hours
  });

  redirect("/leads");
}

/** Clear the session cookie and return to the login page. */
export async function logoutAction(): Promise<void> {
  const jar = await cookies();
  jar.delete(AUTH_COOKIE);
  redirect("/login");
}
