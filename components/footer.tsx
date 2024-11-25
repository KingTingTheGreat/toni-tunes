import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

export default function Footer() {
  const router = useRouter();

  return (
    <Box
      component="footer"
      sx={{ padding: "0.5rem", display: "flex", justifyContent: "center" }}
    >
      <Typography>
        <Button
          href="/api/sign-out"
          onClick={() => router.refresh()}
          className="p-1"
        >
          Sign Out
        </Button>
      </Typography>
    </Box>
  );
}
