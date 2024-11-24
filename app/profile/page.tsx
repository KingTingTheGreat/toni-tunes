import { getSessionIdCookie } from "@/cookies/sessionId";
import { DOMAIN } from "@/domain/domain";
import { cookies } from "next/headers";
import { Box } from "@mui/material";
import Profile, { ProfileProps } from "@/components/profile";
import SignIn from "@/components/sign-in";

export default async function ProfilePage() {
  const sessionId = getSessionIdCookie(await cookies());

  const res = await fetch(DOMAIN + `/api/profile?sessionId=${sessionId}`);

  try {
    const profile: ProfileProps = await res.json();

    return (
      <Box>
        <Profile profile={profile} />
      </Box>
    );
  } catch {
    return (
      <Box>
        <SignIn />
      </Box>
    );
  }
}
