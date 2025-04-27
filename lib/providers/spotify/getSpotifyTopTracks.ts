"use server";
import { SpotifyTimeRanges } from "@/types/spotifyTypes";
import spotifyRequest from "./spotifyRequest";
import { SpotifyTrack } from "@/types/spotifyTypes";
import { cookies } from "next/headers";
import cookieStoreToAuthJwtRes from "@/cookies/cookieStoreToAuthJwtRes";

export default async function getSpotifyTopTracks(
  timeRange: SpotifyTimeRanges,
): Promise<SpotifyTrack[] | null> {
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
    `https://api.spotify.com/v1/me/top/tracks?time_range=${timeRange.toString()}&limit=50`,
  );

  if (!res) {
    return null;
  }

  const data = await res.data.json();

  return data.items;
}
