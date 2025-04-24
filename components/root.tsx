"use client";
import { Suspense } from "react";
import Header from "@/components/header";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CircularProgress } from "@mui/material";
import Footer from "./footer";

const Root = ({ children }: { children: React.ReactNode }) => {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#050ABF",
      },
      background: {
        default: "#445",
      },
    },
    typography: {
      fontFamily: "Sour Gummy",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <html lang="en">
        <body className="antialiased">
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
    </ThemeProvider>
  );
};

export default Root;
