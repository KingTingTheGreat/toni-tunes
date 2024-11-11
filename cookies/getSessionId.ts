import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

const SESSION_ID_COOKIE = "toni-tunes-session-id";

export default function getSessionIdCookie(
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
