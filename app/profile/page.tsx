import QueryWrapper from "@/components/QueryWrapper";
import SpotifyProfile from "@/components/spotify/profile";
import { verifyJwt } from "@/lib/jwt";
import { Providers } from "@/types/types";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const cookieStore = await cookies();

  const d = cookieStore.get("mycookie");

  if (!d) {
    return redirect("/");
  }

  const res = verifyJwt(d.value);
  if (!res.verified) {
    return redirect("/");
  }

  let Content: React.ReactNode;
  switch (res.claims.provider) {
    case Providers.spotify:
      Content = <SpotifyProfile />;
      break;
    default:
      Content = <p>nothing to display</p>;
  }

  return <QueryWrapper>{Content}</QueryWrapper>;
}
