// import Leaderboard, { LeaderboardProfile } from "@/components/leaderboard";
import { Box, Typography } from "@mui/material";

export const dynamic = "force-dynamic";

export default async function LeaderboardPage() {
  // try {
  //   const res = await fetch(`${DOMAIN}/api/leaderboard`);
  //   const users: LeaderboardProfile[] = await res.json();
  //
  //   return (
  //     <Box>
  //       <Leaderboard users={users} />;
  //     </Box>
  //   );
  // } catch {
  return (
    <Box>
      <Typography component="p">
        something went wrong. please try again.
      </Typography>
    </Box>
  );
  // }
}
