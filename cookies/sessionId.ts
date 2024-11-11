import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { NextResponse } from "next/server";

const SESSION_ID_COOKIE = "toni-tunes-session-id";

export function setSessionIdCookie(res: NextResponse, sessionId: string) {
  res.cookies.set(SESSION_ID_COOKIE, sessionId, {
    httpOnly: true,
    secure: process.env.ENVIRONMENT !== "dev",
    maxAge: 60 * 60 * 24 * 7, // one week
    path: "/",
  });
}

export function getSessionIdCookie(
  cookieStore: ReadonlyRequestCookies,
): string | null {
  const cookie = cookieStore.get(SESSION_ID_COOKIE);

  if (!cookie) {
    console.log("cookie is null");
    return null;
  }

  console.log("cookie not null", cookie.value);
  return cookie.value;
}
