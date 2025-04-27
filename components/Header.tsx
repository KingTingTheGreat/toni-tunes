import cookieStoreToAuthJwtRes from "@/cookies/cookieStoreToAuthJwtRes";
import { cookies } from "next/headers";
import Link from "next/link";

export default async function Header() {
  const cookieStore = await cookies();
  const authRes = cookieStoreToAuthJwtRes(cookieStore);

  const NavLink = ({
    href,
    children,
    prefetch,
  }: {
    href: string;
    children: React.ReactNode;
    prefetch?: boolean;
  }) => (
    <Link
      href={href}
      prefetch={prefetch}
      className="hover:underline m-2 md:m-4 text-base md:text-xl transition-all font-medium"
    >
      {children}
    </Link>
  );

  return (
    <header className="flex justify-between items-center p-2">
      <Link href="/" className="text-2xl md:text-5xl logo m-1">
        Toni Tunes
      </Link>
      <nav className="flex">
        {!authRes.verified ? (
          <NavLink href="/sign-in">Sign In</NavLink>
        ) : (
          <NavLink href="/profile">
            Profile
            {/* {authRes.claims.picture ? (
              <Image
                src={authRes.claims.picture}
                alt={"profile picture"}
                width={40}
                height={40}
                style={{ borderRadius: "50%" }}
              />
            ) : (
              <AccountCircle />
            )} */}
          </NavLink>
        )}
        <NavLink href="/leaderboard">Leaderboard</NavLink>
        <NavLink href="/about">About</NavLink>
      </nav>
    </header>
  );
}
