import exchangeSpotifyCode from "@/lib/providers/spotify/exchangeSpotifyCode";
import { NextRequest, NextResponse } from "next/server";
import { createJwt } from "@/lib/jwt";
import { Providers } from "@/types/types";
import { AUTH_COOKIE } from "@/cookies/cookieNames";

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");
  const error = req.nextUrl.searchParams.get("error");

  if (error || !code) {
    return NextResponse.redirect(req.nextUrl.origin + "/sign-in");
  }

  const data = await exchangeSpotifyCode(code);
  if (!data) {
    return NextResponse.redirect(req.nextUrl.origin + "/sign-in");
  }

  console.log("data", data);

  const res = NextResponse.redirect(req.nextUrl.origin + "/profile", {
    status: 303,
  });
  res.cookies.set(
    AUTH_COOKIE,
    createJwt({
      ...data,
      provider: Providers.spotify,
    }),
    {
      httpOnly: true,
      secure: process.env.ENVIRONMENT === "prod",
      path: "/",
      maxAge: 100 * 365 * 24 * 60 * 60 * 1000,
    },
  );

  return res;
}
