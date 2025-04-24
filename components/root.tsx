"use client";
import { Suspense } from "react";
import Header from "@/components/header";
import { CircularProgress } from "@mui/material";
import Footer from "./footer";
import { Chewy } from "next/font/google";

const chewy = Chewy({ subsets: ["latin"], weight: ["400"] });

const Root = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className={chewy.className}>
        <Suspense fallback={<CircularProgress />}>
          <div className="flex flex-col justify-between min-h-screen">
            <div>
              <Header />
              {children}
            </div>
            <Footer />
          </div>
        </Suspense>
      </body>
    </html>
  );
};

export default Root;
