import type { Metadata } from "next";
import "./globals.css";
import Root from "@/components/root";
import { getSessionIdCookie } from "@/cookies/sessionId";
import { cookies } from "next/headers";
import { DOMAIN } from "@/domain/domain";
import { ProfileProps } from "@/components/profile";

export const metadata: Metadata = {
  title: "Toni Tunes",
  description: "What does Mr.Toni think about your music taste?",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const sessionId = getSessionIdCookie(await cookies());

  const res = await fetch(DOMAIN + `/api/profile?sessionId=${sessionId}`);
  let profile: ProfileProps | null = null;
  try {
    profile = await res.json();
  } catch (e) {
    console.log(e);
  }

  return <Root profile={profile}>{children}</Root>;
}
