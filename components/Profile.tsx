import Image from "next/image";
import ScoreDisplay from "./ScoreDisplay";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { ProfileProps } from "@/types/types";

export default function Profile({ profile }: { profile: ProfileProps }) {
  const dim = 150;

  return (
    <div className="flex flex-col items-center p-2 m-2">
      {profile.image ? (
        <Image
          src={profile.image}
          width={dim}
          height={dim}
          alt={profile.username}
          style={{ borderRadius: "50%" }}
        />
      ) : (
        <AccountCircleIcon sx={{ width: dim, height: dim }} />
      )}
      {profile.scoreHistory && (
        <ScoreDisplay scoreHistory={profile.scoreHistory} />
      )}
    </div>
  );
}
