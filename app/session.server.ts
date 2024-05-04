import { createCookieSessionStorage } from "@remix-run/node";
import { createThemeSessionResolver } from "remix-themes";

const isProduction = process.env.NODE_ENV === "production";

if (typeof process.env.SESSION_THEME_SECRET !== "string") {
  throw new Error("Missing env: SESSION_THEME_SECRET");
}

if (typeof process.env.SESSION_LOGIN_SECRET !== "string") {
  throw new Error("Missing env: SESSION_LOGIN_SECRET");
}

const themeSessionStorage = createCookieSessionStorage({
  cookie: {
    name: "theme",
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    secrets: [process.env.SESSION_THEME_SECRET],
    // Set domain and secure only if in production
    ...(isProduction ? { domain: "poschuler.com", secure: true } : {}),
  },
});

export const authSessionStorage = createCookieSessionStorage({
  cookie: {
    name: "auth",
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    secrets: [process.env.SESSION_LOGIN_SECRET],
    ...(isProduction ? { domain: "poschuler.com", secure: true } : {}),
  },
});

export const themeSessionResolver =
  createThemeSessionResolver(themeSessionStorage);

export const {
  getSession: getAuthSession,
  commitSession: commitAuthSession,
  destroySession: destroyAuthSession,
} = authSessionStorage;
