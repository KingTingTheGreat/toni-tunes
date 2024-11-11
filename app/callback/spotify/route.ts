import { setSessionIdCookie } from "@/cookies/sessionId";
import { DOMAIN } from "@/domain/domain";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");

  const backendRes = await fetch(DOMAIN + "/api/callback/spotify?code=" + code);

  if (backendRes.status === 500) {
    return NextResponse.json(
      { error: "something went wrong, please try again." },
      { status: 500 },
    );
  } else if (backendRes.status !== 200) {
    return NextResponse.json(
      { message: "please sign in again" },
      { status: 400 },
    );
  }

  const sessionId = await backendRes.text();

  const res = NextResponse.redirect(DOMAIN + "/profile");
  return setSessionIdCookie(res, sessionId);
}
