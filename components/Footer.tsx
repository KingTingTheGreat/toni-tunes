import Link from "next/link";

export default function Footer() {
  return (
    <footer className="flex justify-center p-2">
      <Link prefetch={false} href="/api/sign-out" className="p-1">
        Sign Out
      </Link>
    </footer>
  );
}
