import { SentimentSatisfiedAlt } from "@mui/icons-material";
import SignIn from "@/components/SignIn";
import WavingToni from "@/components/WavingToni";

export default function Home() {
  return (
    <div>
      <h1 className="text-center text-3xl">Welcome to Toni Tunes!</h1>
      <div className="m-2, p-8">
        <p className="text-xl w-64">
          Hi, I&apos;m Mr.Toni! Sign in with Spotify, then I will rate your
          music and give you some recomendabababas!
        </p>
        <SentimentSatisfiedAlt fontSize="large" />
        <WavingToni />
        <SignIn />
      </div>
    </div>
  );
}
