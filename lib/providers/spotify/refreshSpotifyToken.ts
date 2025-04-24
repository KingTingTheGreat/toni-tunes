export default async function refreshSpotifyToken(
  refreshToken: string,
): Promise<string | null> {
  try {
    const queryParams = new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
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

    return data.access_token;
  } catch (e) {
    console.log("error exchanging spotify code", e);
    return null;
  }
}
