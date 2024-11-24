import { getSessionIdCookie } from "@/cookies/sessionId";
import { DOMAIN } from "@/domain/domain";
import { cookies } from "next/headers";
import Link from "next/link";
import { Box, Typography } from "@mui/material";
import Profile, { ProfileProps } from "@/components/profile";

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
        <Typography>
          <Link href="/">please sign in</Link>
        </Typography>
      </Box>
    );
  }
}
