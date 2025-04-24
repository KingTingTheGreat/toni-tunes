import { SpotifyCreds } from "@/types/spotifyTypes";
import spotifyRequest from "./spotifyRequest";

export default async function getSpotifyUser(creds: SpotifyCreds) {
  const res = await spotifyRequest(creds, "https://api.spotify.com/v1/me");
  if (!res) {
    return null;
  }
  return res.data.json();
}
