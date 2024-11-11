import getSessionIdCookie from "@/cookies/getSessionId";
import { DOMAIN } from "@/domain/domain";
import { ProfileProps } from "@/types";
import { cookies } from "next/headers";

export default async function Profile() {
  const sessionId = getSessionIdCookie(await cookies());

  const res = await fetch(DOMAIN + `/api/profile?sessionId=${sessionId}`);

  try {
    const profile: ProfileProps = await res.json();
    return (
      <div>
        {profile.scoreHistory.map((score, i) => (
          <p key={i}>{score}</p>
        ))}
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
