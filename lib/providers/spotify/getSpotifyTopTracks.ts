import { SpotifyCreds } from "@/types/spotifyTypes";
import spotifyRequest from "./spotifyRequest";
import { SpotifyTrack } from "@/types/spotifyTypes";

export default async function getSpotifyTopTracks(
  creds: SpotifyCreds,
): Promise<SpotifyTrack[] | null> {
  const res = await spotifyRequest(
    creds,
    "https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=50",
  );

  if (!res) {
    return null;
  }

  const data = await res.data.json();

  console.log("data", data);

  return data.items;
}
