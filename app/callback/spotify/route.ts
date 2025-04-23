import exchangeSpotifyCode from "@/lib/providers/spotify/exchangeSpotifyCode";
import { NextRequest, NextResponse } from "next/server";
import { createJwt } from "@/lib/jwt";
import { Providers } from "@/types";

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");
  const error = req.nextUrl.searchParams.get("error");

  if (error || !code) {
    return NextResponse.redirect("/sign-in");
  }

  const data = await exchangeSpotifyCode(code);
  if (!data) {
    return NextResponse.redirect("/sign-in");
  }

  console.log("data", data);

  const res = NextResponse.redirect(req.nextUrl.origin + "/profile", {
    status: 303,
  });
  res.cookies.set(
    "mycookie",
    createJwt({
      ...data,
      provider: Providers.spotify,
      lastDbEntry: null,
    }),
    {
      httpOnly: true,
      secure: process.env.ENVIRONMENT === "prod",
      path: "/",
    },
  );

  return res;
}
