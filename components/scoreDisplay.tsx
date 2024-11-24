"use client";
import { useTheme } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";
import { LineChart } from "@mui/x-charts";

export default function ScoreDisplay({
  scoreHistory,
}: {
  scoreHistory: number[];
}) {
  const theme = useTheme();

  return (
    <Box>
      <Typography component="h3">
        Current Score: {scoreHistory[scoreHistory.length - 1]}
      </Typography>
      <LineChart
        xAxis={[
          {
            data: scoreHistory.map((_, i) => i + 1),
            scaleType: "point",
            tickLabelStyle: { fontSize: 16 },
          },
        ]}
        yAxis={[
          {
            tickLabelStyle: {
              fontSize: 16,
            },
            min: 0,
            max: 100,
          },
        ]}
        series={[
          {
            data: scoreHistory.map((score) => score),
            color: theme.palette.primary.main,
          },
        ]}
        width={500}
        height={300}
        slotProps={{
          noDataOverlay: { message: "No Toni scores!" },
        }}
        sx={{ backgroundColor: "white" }}
      />
    </Box>
  );
}
