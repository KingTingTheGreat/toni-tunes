"use client";
import Link from "next/link";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";

export default function NotFoundPage() {
  return (
    <div>
      <h2>Uh oh!</h2>
      <p>The page you&apos;re looking for could not be found.</p>
      <Link href="/" className="hover:border-2">
        Return Home
        <KeyboardReturnIcon />
      </Link>
    </div>
  );
}
