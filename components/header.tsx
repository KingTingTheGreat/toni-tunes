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
    <Link
      href={href}
      className="hover:underline m-2 p-1 text-xl transition-all font-medium"
    >
      {children}
    </Link>
  );

  return (
    <header className="p-2 flex justify-between items-center">
      <Link href="/" className="p-1 text-5xl font-semibold">
        Toni Tunes
      </Link>
      <nav className="p-2">
        <NavLink href="/profile">Profile</NavLink>
        <NavLink href="/about">About</NavLink>
      </nav>
    </header>
  );
}
