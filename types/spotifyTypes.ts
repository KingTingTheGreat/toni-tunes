export type SpotifyCreds = {
  accessToken: string;
  refreshToken: string;
};

export type SpotifyImage = {
  height: number;
  width: number;
  uri: string;
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
  releaseDate: string;
  totalTracks: number;
  images: SpotifyImage[];
};

export type SpotifyTrack = {
  name: string;
  album: SpotifyAlbum;
  artists: SpotifyArtist[];
  uri: string;
  href: string;
  trackNumber: number;
  popularity: number;
};
