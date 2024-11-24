"use client";
import Link from "next/link";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import { Box, Typography } from "@mui/material";

export default function NotFoundPage() {
  return (
    <Box>
      <Typography component="h2">Uh oh!</Typography>
      <Typography component="p">
        The page you&apos;re looking for could not be found.
      </Typography>
      <Typography>
        <Link href="/" className="hover:border-2">
          Return Home
          <KeyboardReturnIcon />
        </Link>
      </Typography>
    </Box>
  );
}
