import getSessionIdCookie from "@/cookies/getSessionId";
import { DOMAIN } from "@/domain/domain";
import { cookies } from "next/headers";

export default async function Profile() {
  const sessionId = getSessionIdCookie(await cookies());

  const res = await fetch(DOMAIN + `/api/profile?sessionId=${sessionId}`);

  console.log(await res.text());

  return (
    <div>
      <p>Profile</p>
    </div>
  );
}
