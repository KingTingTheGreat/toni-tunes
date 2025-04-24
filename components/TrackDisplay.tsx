import { Track } from "@/types/types";
import { OpenInNew } from "@mui/icons-material";
import Image from "next/image";
import Link from "next/link";

export default function TrackDisplay({ track }: { track: Track }) {
  return (
    <div
      key={track.uri}
      className="border-2 rounded-lg flex flex-col justify-around p-4 shadow-md"
    >
      <div>
        <Link href={track.external_urls.spotify} target="_blank">
          <OpenInNew />
        </Link>
        <p>{track.name}</p>
        <p>{track.album.name}</p>
        <p>Popularity: {track.popularity}</p>
        <div>
          {track.artists.map((a) => (
            <p key={a.uri}>{a.name}</p>
          ))}
        </div>
      </div>
      {track.album.images.length > 0 && (
        <div className="m-8 aspect-square bg-blue-100 flex justify-center items-center box-content">
          <Image
            src={track.album.images[0].url}
            alt={track.album.name}
            width={300}
            height={300}
          />
        </div>
      )}
    </div>
  );
}
