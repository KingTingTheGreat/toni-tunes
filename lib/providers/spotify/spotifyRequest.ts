import { SpotifyCreds } from "@/types/spotifyTypes";
import refreshSpotifyToken from "./refreshSpotifyToken";

export default async function spotifyRequest(
  creds: SpotifyCreds,
  endpoint: string,
): Promise<{ data: Response; refreshToken: string | null } | null> {
  try {
    let res = await fetch(endpoint, {
      headers: {
        Authorization: `Bearer ${creds.accessToken}`,
      },
    });

    if (res.status !== 401) {
      return {
        data: res,
        refreshToken: null,
      };
    }

    const newRefreshToken = await refreshSpotifyToken(creds.refreshToken);
    if (newRefreshToken === null) {
      return null;
    }

    res = await fetch(endpoint, {
      headers: {
        Authorization: `Bearer ${creds.accessToken}`,
      },
    });

    return { data: res, refreshToken: newRefreshToken };
  } catch (e) {
    console.log("error fetching from spotify", e);
    return null;
  }
}
