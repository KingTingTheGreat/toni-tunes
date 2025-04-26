// import Leaderboard, { LeaderboardProfile } from "@/components/leaderboard";

export const dynamic = "force-dynamic";

export default async function LeaderboardPage() {
  // try {
  //   const res = await fetch(`${DOMAIN}/api/leaderboard`);
  //   const users: LeaderboardProfile[] = await res.json();
  //
  //   return (
  //   <div>
  //       <Leaderboard users={users} />;
  //   </div>
  //   );
  // } catch {
  return (
    <div>
      <p>something went wrong. please try again.</p>
    </div>
  );
  // }
}
