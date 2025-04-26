"use client";
import { LineChart } from "@mui/x-charts";
import { ScoreElement } from "@/types/types";

export default function ScoreDisplay({
  scoreHistory,
}: {
  scoreHistory: ScoreElement[];
}) {
  return (
    <div>
      <h3>Current Score: {scoreHistory[scoreHistory.length - 1].score}</h3>
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
