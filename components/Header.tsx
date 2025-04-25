import { verifyJwt } from "@/lib/jwt";
import { Box, Typography } from "@mui/material";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { cookies } from "next/headers";
import Link from "next/link";

function isSignedIn(
  cookieStore: ReadonlyRequestCookies,
): { signedIn: false } | { signedIn: true; picture: string | null } {
  const d = cookieStore.get("mycookie");
  if (!d) {
    return { signedIn: false };
  }

  const jwtRes = verifyJwt(d.value);
  if (!jwtRes.verified) {
    return { signedIn: false };
  }

  if (jwtRes.claims.picture) {
    return { signedIn: true, picture: jwtRes.claims.picture };
  }

  return { signedIn: true, picture: null };
}

export default async function Header() {
  const cookieStore = await cookies();
  const d = isSignedIn(cookieStore);

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
        {!d.signedIn ? (
          <NavLink href="/sign-in">Sign In</NavLink>
        ) : (
          <NavLink href="/profile">
            Profile
            {/*{d.picture ? (
              <Image
                src={d.picture}
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
      </Box>
    </Box>
  );
}
