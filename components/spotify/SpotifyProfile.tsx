"use client";
import TrackDisplay from "@/components/TrackDisplay";
import calculateSpotifyToniScore from "@/lib/providers/spotify/calculateSpotifyToniScore";
import getSpotifyTopTracks from "@/lib/providers/spotify/getSpotifyTopTracks";
import getSpotifyUser from "@/lib/providers/spotify/getSpotifyUser";
import { SpotifyTimeRanges, SpotifyUser } from "@/types/spotifyTypes";
import {
  CircularProgress,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export default function SpotifyProfile() {
  const queryClient = useQueryClient();
  const [timeRange, setTimeRange] = useState(SpotifyTimeRanges.short_term);
  const [user, setUser] = useState<SpotifyUser | null>(null);

  const tracks = useQuery({
    queryKey: [timeRange],
    queryFn: () => getSpotifyTopTracks(timeRange),
    staleTime: 5 * 1000 * 60, // five minutes
  });

  // prefetch other time ranges
  // reverse since first one is called by default
  useEffect(() => {
    Object.keys(SpotifyTimeRanges)
      .reverse()
      .forEach((range) => {
        queryClient.prefetchQuery({
          queryKey: [range],
          queryFn: () => getSpotifyTopTracks(range as SpotifyTimeRanges),
          staleTime: 5 * 60 * 1000,
        });
      });
  }, [queryClient]);

  useEffect(() => {
    getSpotifyUser().then((p) => setUser(p));
  }, []);

  return (
    <div className="flex flex-col items-center px-32 py-12">
      <div className="p-1 m-0.5 flex flex-col sm:flex-row justify-center">
        <ToggleButtonGroup
          color="primary"
          value={timeRange}
          exclusive
          onChange={(_, newTimeRange) => {
            if (!newTimeRange) {
              return;
            }
            setTimeRange(newTimeRange as SpotifyTimeRanges);
          }}
        >
          {Object.keys(SpotifyTimeRanges).map((tr) => (
            <ToggleButton key={tr} value={tr}>
              {tr}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </div>

      {tracks.data ? (
        <div>
          <p>Toni Score: {calculateSpotifyToniScore(tracks.data)}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 auto-rows-max">
            {tracks.data.map((t) => (
              <TrackDisplay track={t} key={t.uri} />
            ))}
          </div>
        </div>
      ) : (
        <div>
          <p>loading your profile..</p>
          <CircularProgress />
        </div>
      )}
    </div>
  );
}
