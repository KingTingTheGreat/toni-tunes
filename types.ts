export enum Providers {
  spotify = "spotify",
}

export type JwtClaims = {
  accessToken: string;
  refreshToken: string;
  provider: Providers;
  expiration?: Date;
  lastDbEntry: Date | null;
};

export type VerifyJwtRes =
  | {
      verified: true;
      claims: JwtClaims;
    }
  | { verified: false };
