import { SpotifyCreds } from "@/types/spotifyTypes";

export default async function exchangeSpotifyCode(
  code: string,
): Promise<SpotifyCreds | null> {
  try {
    const queryParams = new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: process.env.SPOTIFY_REDIRECT_URI as string,
    });

    const res = await fetch(
      `https://accounts.spotify.com/api/token?${queryParams.toString()}`,
      {
        method: "POST",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          Authorization:
            "Basic " +
            Buffer.from(
              process.env.SPOTIFY_CLIENT_ID +
                ":" +
                process.env.SPOTIFY_CLIENT_SECRET,
            ).toString("base64"),
        },
      },
    );

    const data = await res.json();

    return {
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
    };
  } catch (e) {
    console.log("error exchanging spotify code", e);
    return null;
  }
}
