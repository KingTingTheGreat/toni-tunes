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
  short_term = "short_term",
  medium_term = "medium_term",
  long_term = "long_term",
}

export type SpotifyUser = {
  display_name: string;
  email: string;
  external_urls: { spotify: string };
  href: string;
  id: string;
  images: SpotifyImage[];
  type: string;
  uri: string;
};
