import Leaderboard, { LeaderboardProfile } from "@/components/leaderboard";
import { DOMAIN } from "@/domain/domain";

export default async function LeaderboardPage() {
  try {
    const res = await fetch(`${DOMAIN}/api/leaderboard`);
    const users: LeaderboardProfile[] = await res.json();

    return <Leaderboard users={users} />;
  } catch {
    return <p>something went wrong. please try again.</p>;
  }
}
