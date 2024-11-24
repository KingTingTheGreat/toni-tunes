"use client";
import { useTheme } from "@mui/material/styles";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
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
  const theme = useTheme();
  const headerStyle = {
    fontSize: "1.25rem",
    border: `2px solid ${theme.palette.primary.main}`,
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
      border: `2px solid ${theme.palette.primary.main}`,
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
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "0.5rem",
        margin: "0.5rem",
      }}
    >
      <Typography
        component="h2"
        sx={{ fontSize: "2.5rem", padding: "0.25rem", margin: "0.25rem" }}
      >
        Leaderboard
      </Typography>
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
    </Box>
  );
}
