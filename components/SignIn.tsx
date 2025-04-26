import Link from "next/link";

export default async function SignIn() {
  return (
    <div>
      <Link
        href={`https://accounts.spotify.com/authorize?client_id=${process.env.SPOTIFY_CLIENT_ID}&response_type=code&redirect_uri=${process.env.SPOTIFY_REDIRECT_URI}&scope=user-top-read user-read-email`}
      >
        Sign In with Spotify
      </Link>
    </div>
  );
}
