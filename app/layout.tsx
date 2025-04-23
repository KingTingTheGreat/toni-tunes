import type { Metadata } from "next";
import "./globals.css";
import Root from "@/components/root";
import { cookies } from "next/headers";
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
  // const res = await fetch(DOMAIN + `/api/profile?sessionId=${sessionId}`);
  let profile: ProfileProps | null = null;
  // try {
  // profile = await res.json();
  // } catch (e) {
  // console.log(e);
  // }

  return <Root profile={profile}>{children}</Root>;
}
