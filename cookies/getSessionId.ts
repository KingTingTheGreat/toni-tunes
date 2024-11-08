import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

const SESSION_ID_COOKIE = "toni-tunes-session-id";

export default function getSessionIdCookie(
  cookieStore: ReadonlyRequestCookies,
): string | null {
  const cookie = cookieStore.get(SESSION_ID_COOKIE);

  if (!cookie) return null;

  return cookie.value;
}
