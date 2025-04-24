import { Box } from "@mui/material";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { verifyJwt } from "@/lib/jwt";

export default async function ProfilePage() {
  const cookieStore = await cookies();

  const d = cookieStore.get("mycookie");

  if (!d) {
    return redirect("/sign-in");
  }

  const res = verifyJwt(d.value);
  if (!res.verified) {
    return redirect("/sign-in");
  }

  return (
    <Box>
      <p>{JSON.stringify(res.claims)}</p>
    </Box>
  );
}
