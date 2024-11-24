import { Typography } from "@mui/material";
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
        className="hover:underline m-2 p-1 text-xl transition-all font-medium"
      >
        {children}
      </Link>
    </Typography>
  );

  return (
    <header className="p-2 flex justify-between items-center">
      <Typography>
        <Link href="/" className="text-5xl logo">
          Toni Tunes
        </Link>
      </Typography>
      <nav className="p-2 flex">
        <NavLink href="/profile">Profile</NavLink>
        <NavLink href="/leaderboard">Leaderboard</NavLink>
        <NavLink href="/about">About</NavLink>
      </nav>
    </header>
  );
}
