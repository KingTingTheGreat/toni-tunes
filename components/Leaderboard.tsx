"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

export type LeaderboardProfile = {
  id: string;
  username: string;
  score: number;
};

export default function Leaderboard({
  users,
}: {
  users: LeaderboardProfile[];
}) {
  const headerStyle = {
    fontSize: "1.25rem",
    border: `2px solid`,
  };

  const LeaderboardRow = ({
    rank,
    username,
    score,
  }: {
    rank: number;
    username: string;
    score: number;
  }) => {
    const contentStyle = {
      fontSize: "1rem",
      border: `2px solid`,
    };

    return (
      <TableRow>
        <TableCell
          sx={{
            ...contentStyle,
            color:
              rank === 1
                ? "#D4AF37"
                : rank === 2
                  ? "#C0C0C0"
                  : rank === 3
                    ? "#CD7F32"
                    : "",
          }}
          align="center"
        >
          {rank}
        </TableCell>
        <TableCell sx={contentStyle} align="center">
          {username}
        </TableCell>
        <TableCell sx={contentStyle} align="center">
          {score}
        </TableCell>
      </TableRow>
    );
  };

  return (
    <div className="flex flex-col items-center m-2 p-2">
      <h2 className="text-4xl p-1 m-1">Leaderboard</h2>
      <Table sx={{ width: 200 }}>
        <TableHead>
          <TableRow>
            <TableCell sx={headerStyle}>Rank</TableCell>
            <TableCell sx={headerStyle}>Username</TableCell>
            <TableCell sx={headerStyle}>Score</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user, i) => (
            <LeaderboardRow
              key={i}
              rank={i + 1}
              username={user.username}
              score={user.score}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
