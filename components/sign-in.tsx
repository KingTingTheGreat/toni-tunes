import { Box, Typography } from "@mui/material";
import Link from "next/link";

export default function SignIn() {
  return (
    <Box>
      <Typography>
        <Link href="/api/sign-in/spotify">Sign In with Spotify</Link>
      </Typography>
    </Box>
  );
}
