"use client";
import { Box } from "@mui/material";
import Profile from "@/components/profile";
import { useProfileContext } from "@/context/profileContext";
import { redirect } from "next/navigation";

export default function ProfilePage() {
  const profileContext = useProfileContext();

  if (profileContext.value === null) {
    return redirect("/sign-in");
  }

  return (
    <Box>
      <Profile profile={profileContext.value} />
    </Box>
  );
}
