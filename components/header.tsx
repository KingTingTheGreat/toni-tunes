import { Box, Typography } from "@mui/material";
import Link from "next/link";
import { ReactNode } from "react";

export default function Header() {
  const NavLink = ({
    href,
    children,
  }: {
    href: string;
    children: ReactNode;
  }) => (
    <Typography>
      <Link
        href={href}
        className="hover:underline m-2 p-2 text-xl transition-all font-medium"
      >
        {children}
      </Link>
    </Typography>
  );

  return (
    <Box
      component="header"
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0.5rem",
      }}
    >
      <Typography>
        <Link href="/" className="text-5xl logo">
          Toni Tunes
        </Link>
      </Typography>
      <Box component="nav" sx={{ display: "flex", padding: "0.5rem" }}>
        <NavLink href="/profile">Profile</NavLink>
        <NavLink href="/leaderboard">Leaderboard</NavLink>
        <NavLink href="/about">About</NavLink>
      </Box>
    </Box>
  );
}
