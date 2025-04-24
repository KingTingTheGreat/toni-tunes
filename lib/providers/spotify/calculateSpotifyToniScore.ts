import { SpotifyTrack } from "@/types/spotifyTypes";

export default function calculateSpotifyToniScore(tracks: SpotifyTrack[]) {
  if (tracks.length === 0) {
    return null;
  }

  const total = tracks.reduce((sum, t) => sum + (100 - t.popularity), 0);

  return total / tracks.length;
}
