"use server";
import { verifyJwt } from "@/lib/jwt";
import { cookies } from "next/headers";
import getSpotifyTopTracks from "./getSpotifyTopTracks";

export default async function getSpotifyProfile() {
  const cookieStore = await cookies();

  const d = cookieStore.get("mycookie");

  if (!d) {
    return null;
  }

  const res = verifyJwt(d.value);
  if (!res.verified) {
    return null;
  }

  const creds = {
    accessToken: res.claims.accessToken,
    refreshToken: res.claims.refreshToken,
  };

  console.log("creds", creds);
  const tracks = await getSpotifyTopTracks(creds);
  console.log("tracks after get", tracks);

  if (!tracks) {
    return null;
  }

  return tracks;
}
