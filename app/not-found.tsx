import Link from "next/link";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";

export default function NotFoundPage() {
  return (
    <div className="mt-16 pt-16">
      <h2>Uh oh!</h2>
      <p>The page you&apos;re looking for could not be found.</p>
      <Link
        href="/"
        className="px-3 py-1 rounded-lg inline-block border-2 hover:border-black border-transparent"
      >
        Return Home
        <KeyboardReturnIcon />
      </Link>
    </div>
  );
}
