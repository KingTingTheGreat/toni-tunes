import WavingToni from "@/components/WavingToni";

export default function Home() {
  return (
    <div className="flex flex-col items-center pt-12">
      <h1 className="text-center text-3xl">Welcome to Toni Tunes!</h1>
      <div className="m-2 p-8 flex flex-col md:flex-row items-center">
        <p className="text-xl w-72 m-4">
          Hi, I&apos;m Mr.Toni! Sign in with Spotify, then I will rate your
          music and give you some recomendabababas!{" "}
          <span className="text-2xl">☺</span>
        </p>
        <WavingToni />
      </div>
    </div>
  );
}
