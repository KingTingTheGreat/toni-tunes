import { getSessionIdCookie } from "@/cookies/sessionId";
import { DOMAIN } from "@/domain/domain";
import { ProfileProps } from "@/types";
import { cookies } from "next/headers";
import ScoreDisplay from "@/components/scoreDisplay";

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
        <p>please sign in</p>
      </div>
    );
  }
}
