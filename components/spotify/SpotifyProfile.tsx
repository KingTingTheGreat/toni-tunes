"use client";
import TrackDisplay from "@/components/TrackDisplay";
import getSpotifyProfile from "@/lib/providers/spotify/getSpotifyProfile";
import { SpotifyTimeRanges } from "@/types/spotifyTypes";
import {
  CircularProgress,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function SpotifyProfile() {
  const [timeRange, setTimeRange] = useState(SpotifyTimeRanges.short_term);

  const tracks = useQuery({
    queryKey: [timeRange],
    queryFn: () => getSpotifyProfile(timeRange),
    staleTime: 5 * 1000 * 60, // five minutes
  });

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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 auto-rows-max">
        {tracks.data.map((t) => (
          <TrackDisplay track={t} key={t.uri} />
        ))}
      </div>
    </div>
  );
}
