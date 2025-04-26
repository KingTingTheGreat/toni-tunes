"use server";
import { createJwt, verifyJwt } from "@/lib/jwt";
import { cookies } from "next/headers";
import spotifyRequest from "./spotifyRequest";
import { SpotifyUser } from "@/types/spotifyTypes";
import { AUTH_COOKIE } from "@/cookie";

export default async function getSpotifyUser() {
  const cookieStore = await cookies();

  const d = cookieStore.get(AUTH_COOKIE);

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

  const data = (await res.data.json()) as SpotifyUser;

  const newJwt = createJwt({
    ...jwtRes.claims,
    picture: data.images[0].url,
    name: data.display_name,
  });
  cookieStore.set(AUTH_COOKIE, newJwt);

  return data;
}
