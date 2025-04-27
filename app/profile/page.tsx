import QueryWrapper from "@/components/QueryWrapper";
import SpotifyProfile from "@/components/spotify/SpotifyProfile";
import cookieStoreToAuthJwtRes from "@/cookies/cookieStoreToAuthJwtRes";
import { Providers } from "@/types/types";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const cookieStore = await cookies();
  const authRes = cookieStoreToAuthJwtRes(cookieStore);

  if (!authRes.verified) {
    return redirect("/");
  }

  let Content: React.ReactNode;
  switch (authRes.claims.provider) {
    case Providers.spotify:
      Content = <SpotifyProfile />;
      break;
    default:
      return redirect("/");
  }

  return <QueryWrapper>{Content}</QueryWrapper>;
}
