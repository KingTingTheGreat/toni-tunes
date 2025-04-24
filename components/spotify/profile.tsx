"use client";
import TrackDisplay from "@/components/TrackDisplay";
import getSpotifyProfile from "@/lib/providers/spotify/getSpotifyProfile";
import { CircularProgress } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

export default function SpotifyProfile() {
  const tracks = useQuery({
    queryKey: ["hi"],
    queryFn: getSpotifyProfile,
    staleTime: 5 * 1000 * 60, // five minutes
  });

  // useEffect(() => {
  //   getSpotifyProfile().then((t) => setTracks(t));
  // }, []);

  if (!tracks.data) {
    return (
      <div>
        <p>Loading your profile...</p>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center px-32 py-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 auto-rows-max">
        {tracks.data.map((t) => (
          <TrackDisplay track={t} key={t.uri} />
        ))}
      </div>
    </div>
  );
}
