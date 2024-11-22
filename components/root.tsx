"use client";
import { Suspense } from "react";
import Header from "@/components/header";
import { ProfileContextProvider } from "@/context/profileContext";

const Root = ({ children }: { children: React.ReactNode }) => {
  return (
    <ProfileContextProvider>
      <html lang="en">
        <body className="antialiased">
          <Suspense fallback={<div>Loading...</div>}>
            <Header />
            {children}
          </Suspense>
        </body>
      </html>
    </ProfileContextProvider>
  );
};

export default Root;
