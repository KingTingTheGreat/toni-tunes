import Image from "next/image";
import ScoreDisplay from "./scoreDisplay";
import { Box } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export type ProfileProps = {
  username: string;
  name: string;
  scoreHistory: number[];
  image: string;
};

export default function Profile({ profile }: { profile: ProfileProps }) {
  const dim = 150;

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
      {profile.image ? (
        <Image
          src={profile.image}
          width={dim}
          height={dim}
          alt={profile.username}
          style={{ borderRadius: "50%" }}
        />
      ) : (
        <AccountCircleIcon sx={{ width: dim, height: dim }} />
      )}
      <ScoreDisplay scoreHistory={profile.scoreHistory} />
    </Box>
  );
}
