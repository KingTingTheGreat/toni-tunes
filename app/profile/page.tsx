"use client";
import { Box } from "@mui/material";
import SignIn from "@/components/sign-in";
import Profile from "@/components/profile";
import { useProfileContext } from "@/context/profileContext";

export default function ProfilePage() {
  const profileContext = useProfileContext();

  return (
    <Box>
      {profileContext.value ? (
        <Profile profile={profileContext.value} />
      ) : (
        <SignIn />
      )}
    </Box>
  );
}
