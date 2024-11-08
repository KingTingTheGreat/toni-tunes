export const DOMAIN =
  (process.env.ENVIRONMENT as string) === "dev"
    ? "http://localhost:3000"
    : "https://accessiscan.vercel.app";
