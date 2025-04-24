import type { Metadata } from "next";
import "./globals.css";
import Root from "@/components/root";

export const metadata: Metadata = {
  title: "Toni Tunes",
  description: "What does Mr.Toni think about your music taste?",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <Root>{children}</Root>;
}
