// Auth constants for the /leads dashboard.
//
// This is a deliberately simple session: a fixed username/password and a
// single cookie value. It is meant to be replaced by Supabase Auth later
// — at which point the proxy checks a Supabase session instead of this
// cookie, and the login form calls Supabase instead of `loginAction`.

export const AUTH_COOKIE = "rv_leads_session";

// Placeholder session token written to the cookie on a successful login.
export const AUTH_TOKEN = "authenticated";

export const LEADS_USERNAME = "realveneers";
export const LEADS_PASSWORD = "password";
