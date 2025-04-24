"use client";
import { useTheme } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";
import { LineChart } from "@mui/x-charts";
import { ScoreElement } from "@/types/types";

export default function ScoreDisplay({
  scoreHistory,
}: {
  scoreHistory: ScoreElement[];
}) {
  const theme = useTheme();

  return (
    <Box>
      <Typography component="h3">
        Current Score: {scoreHistory[scoreHistory.length - 1].score}
      </Typography>
      <LineChart
        xAxis={[
          {
            data: scoreHistory.map((elem, i) => `${i}: ${elem.date}`),
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
            data: scoreHistory.map((elem) => elem.score),
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
