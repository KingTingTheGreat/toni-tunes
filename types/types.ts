import { SpotifyTrack } from "./spotifyTypes";

export enum Providers {
  spotify = "spotify",
}

export type Track = SpotifyTrack;

export type JwtClaims = {
  accessToken: string;
  refreshToken: string;
  provider: Providers;
  expiration?: Date;
  lastDbEntry?: Date;
  lastScore?: number;
  topSongs?: Track;
  lastFetched?: Date;
};

export type VerifyJwtRes =
  | {
      verified: true;
      claims: JwtClaims;
    }
  | { verified: false };
