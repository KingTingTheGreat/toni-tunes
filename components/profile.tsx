import ScoreDisplay from "./scoreDisplay";
import { Box } from "@mui/material";

export type ProfileProps = {
  username: string;
  name: string;
  scoreHistory: number[];
};

export default function Profile({ profile }: { profile: ProfileProps }) {
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
      <ScoreDisplay scoreHistory={profile.scoreHistory} />
    </Box>
  );
}
