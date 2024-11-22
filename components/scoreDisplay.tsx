"use client";
import { LineChart } from "@mui/x-charts";

export default function ScoreDisplay({
  scoreHistory,
}: {
  scoreHistory: number[] | null;
}) {
  return scoreHistory === null || scoreHistory.length === 0 ? (
    <p>no scores to display</p>
  ) : (
    <div>
      <h3>Current Score: {scoreHistory[scoreHistory.length - 1]}</h3>
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
            color: "#060",
          },
        ]}
        width={500}
        height={300}
        slotProps={{
          noDataOverlay: { message: "No Toni scores!" },
        }}
        sx={{ backgroundColor: "white" }}
      />
    </div>
  );
}
