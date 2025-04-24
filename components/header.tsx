import { Box, Typography } from "@mui/material";
import Link from "next/link";

export default function Header() {
  const NavLink = ({
    href,
    children,
    prefetch,
  }: {
    href: string;
    children: React.ReactNode;
    prefetch?: boolean;
  }) => (
    <Typography>
      <Link
        href={href}
        prefetch={prefetch}
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
        <NavLink href="/leaderboard">Leaderboard</NavLink>
        <NavLink href="/about">About</NavLink>
      </Box>
    </Box>
  );
}
