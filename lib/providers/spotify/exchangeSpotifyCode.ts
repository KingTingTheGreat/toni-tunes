export default async function exchangeSpotifyCode(
  code: string,
): Promise<{ accessToken: string; refreshToken: string } | null> {
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

export async function exchangeGoogleCode(code: string): Promise<string> {
  const queryParams = new URLSearchParams({
    grant_type: "authorization_code",
    code,
    client_id: process.env.GOOGLE_CLIENT_ID as string,
    client_secret: process.env.GOOGLE_CLIENT_SECRET as string,
    redirect_uri: process.env.GOOGLE_REDIRECT_URI as string,
  });
  const res = await fetch(
    `https://oauth2.googleapis.com/token?${queryParams.toString()}`,
    {
      method: "POST",
    },
  );
  const data = await res.json();

  return data.access_token as string;
}
