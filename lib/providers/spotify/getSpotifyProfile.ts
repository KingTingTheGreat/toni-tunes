"use server";
import { verifyJwt } from "@/lib/jwt";
import { cookies } from "next/headers";
import spotifyRequest from "./spotifyRequest";

export default async function getSpotifyProfile() {
  const cookieStore = await cookies();

  const d = cookieStore.get("mycookie");

  if (!d) {
    return null;
  }

  const jwtRes = verifyJwt(d.value);
  if (!jwtRes.verified) {
    return null;
  }

  const res = await spotifyRequest(
    {
      accessToken: jwtRes.claims.accessToken,
      refreshToken: jwtRes.claims.refreshToken,
    },
    "https://api.spotify.com/v1/me",
  );

  if (!res) {
    return null;
  }

  const data = await res.data.json();

  console.log("profile data", data);

  return data;
}
