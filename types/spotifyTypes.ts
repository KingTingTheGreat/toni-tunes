export type SpotifyCreds = {
  accessToken: string;
  refreshToken: string;
};

export type SpotifyImage = {
  height: number;
  width: number;
  url: string;
};

export type SpotifyArtist = {
  name: string;
  href: string;
  uri: string;
};

export type SpotifyAlbum = {
  name: string;
  href: string;
  uri: string;
  artists: SpotifyArtist[];
  release_date: string;
  total_tracks: number;
  images: SpotifyImage[];
};

export type SpotifyTrack = {
  name: string;
  album: SpotifyAlbum;
  artists: SpotifyArtist[];
  uri: string;
  href: string;
  track_number: number;
  popularity: number;
  external_urls: { spotify: string };
};

export enum SpotifyTimeRanges {
  shortTerm = "short_term",
  mediumTerm = "medium_term",
  longTerm = "long_term",
}
