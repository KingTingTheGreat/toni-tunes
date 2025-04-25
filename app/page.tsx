import { Box, Typography } from "@mui/material";
import { SentimentSatisfiedAlt } from "@mui/icons-material";
import SignIn from "@/components/SignIn";

export default function Home() {
  return (
    <Box>
      <Typography
        component="h1"
        align="center"
        sx={{
          fontSize: "3rem",
        }}
      >
        Welcome to Toni Tunes!
      </Typography>
      <Box sx={{ margin: "0.5rem", padding: "2rem" }}>
        <Typography component="p" sx={{ fontSize: "1.5rem", width: "400px" }}>
          Hi, I&apos;m Mr.Toni! Sign in with Spotify, then I will rate your
          music and give you some recomendabababas!
        </Typography>
        <SentimentSatisfiedAlt fontSize="large" />
        <SignIn />
      </Box>
    </Box>
  );
}
