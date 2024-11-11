import { getSessionIdCookie } from "@/cookies/sessionId";
import { DOMAIN } from "@/domain/domain";
import { ProfileProps } from "@/types";
import { cookies } from "next/headers";
import ScoreDisplay from "@/components/scoreDisplay";
import Link from "next/link";

export default async function Profile() {
  const sessionId = getSessionIdCookie(await cookies());

  const res = await fetch(DOMAIN + `/api/profile?sessionId=${sessionId}`);

  try {
    const profile: ProfileProps = await res.json();
    return (
      <div>
        <ScoreDisplay scoreHistory={profile.scoreHistory} />
      </div>
    );
  } catch {
    return (
      <div>
        <Link href="/">please sign in</Link>
      </div>
    );
  }
}
