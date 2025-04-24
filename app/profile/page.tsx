import { Box } from "@mui/material";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { verifyJwt } from "@/lib/jwt";
import getSpotifyTopTracks from "@/lib/providers/spotify/getSpotifyTopTracks";
import Image from "next/image";
import TrackDisplay from "@/components/TrackDisplay";

export default async function ProfilePage() {
  const cookieStore = await cookies();

  const d = cookieStore.get("mycookie");

  if (!d) {
    return redirect("/sign-in");
  }

  const res = verifyJwt(d.value);
  if (!res.verified) {
    return redirect("/sign-in");
  }

  const creds = {
    accessToken: res.claims.accessToken,
    refreshToken: res.claims.refreshToken,
  };

  const tracks = await getSpotifyTopTracks(creds);
  console.log("tracks", tracks);

  if (!tracks) {
    return (
      <div>
        <p>could not get your top tracks</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center px-32 py-12">
      <div className="grid grid-cols-5 gap-6 auto-rows-max">
        {tracks.map((t) => (
          <TrackDisplay track={t} key={t.uri} />
        ))}
      </div>
    </div>
  );
}
