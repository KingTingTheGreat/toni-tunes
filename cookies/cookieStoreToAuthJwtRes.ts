import { AUTH_COOKIE } from "@/cookies/cookieNames";
import { verifyJwt } from "@/lib/jwt";
import { VerifyJwtRes } from "@/types/types";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

export default function cookieStoreToAuthJwtRes(
  cookieStore: ReadonlyRequestCookies,
): VerifyJwtRes {
  const c = cookieStore.get(AUTH_COOKIE);

  if (!c) {
    return { verified: false };
  }

  return verifyJwt(c.value);
}
