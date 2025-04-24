import { SpotifyCreds } from "@/types/spotifyTypes";
import refreshSpotifyToken from "./refreshSpotifyToken";

export default async function spotifyRequest(
  creds: SpotifyCreds,
  endpoint: string,
): Promise<{ data: Response; accessToken: string | null } | null> {
  try {
    let res = await fetch(endpoint, {
      headers: {
        Authorization: `Bearer ${creds.accessToken}`,
      },
    });

    if (res.status !== 401) {
      console.log("not unauthorized, returning after first request");
      return {
        data: res,
        accessToken: null,
      };
    }

    const newAccessToken = await refreshSpotifyToken(creds.refreshToken);
    if (newAccessToken === null) {
      console.log("failed to refresh token");
      return null;
    }

    res = await fetch(endpoint, {
      headers: {
        Authorization: `Bearer ${newAccessToken}`,
      },
    });

    console.log("returning after second request, had to refresh token");
    return { data: res, accessToken: newAccessToken };
  } catch (e) {
    console.log("error fetching from spotify", e);
    return null;
  }
}
