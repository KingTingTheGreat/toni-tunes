import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Link href="/api/sign-in/spotify">Sign In with Spotify</Link>
    </div>
  );
}
