"use server";
import { createJwt } from "@/lib/jwt";
import { cookies } from "next/headers";
import spotifyRequest from "./spotifyRequest";
import { SpotifyUser } from "@/types/spotifyTypes";
import { AUTH_COOKIE } from "@/cookies/cookieNames";
import cookieStoreToAuthJwtRes from "@/cookies/cookieStoreToAuthJwtRes";

export default async function getSpotifyUser() {
  const cookieStore = await cookies();
  const authRes = cookieStoreToAuthJwtRes(cookieStore);

  if (!authRes.verified) {
    return null;
  }

  const res = await spotifyRequest(
    {
      accessToken: authRes.claims.accessToken,
      refreshToken: authRes.claims.refreshToken,
    },
    "https://api.spotify.com/v1/me",
  );

  if (!res) {
    return null;
  }

  const data = (await res.data.json()) as SpotifyUser;

  const newJwt = createJwt({
    ...authRes.claims,
    picture: data.images[0].url,
    name: data.display_name,
  });
  cookieStore.set(AUTH_COOKIE, newJwt);

  return data;
}
