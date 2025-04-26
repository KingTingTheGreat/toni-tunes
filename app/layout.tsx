import type { Metadata } from "next";
import "./globals.css";
import { Suspense } from "react";
import Header from "@/components/Header";
import { CircularProgress } from "@mui/material";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Toni Tunes",
  description: "What does Mr.Toni think about your music taste?",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Suspense fallback={<CircularProgress />}>
          <div className="flex flex-col justify-between min-h-screen">
            <div>
              <Header />
              <div className="flex justify-center">{children}</div>
            </div>
            <Footer />
          </div>
        </Suspense>
      </body>
    </html>
  );
}
