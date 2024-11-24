import { Box, Typography } from "@mui/material";
import Link from "next/link";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{ padding: "0.5rem", display: "flex", justifyContent: "center" }}
    >
      <Typography>
        <Link href="/api/sign-out" className="p-1">
          Sign Out
        </Link>
      </Typography>
    </Box>
  );
}
