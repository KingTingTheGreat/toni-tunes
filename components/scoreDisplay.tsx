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
        xAxis={[{ data: scoreHistory.map((_, i) => i + 1) }]}
        series={[
          {
            data: scoreHistory.map((score) => score),
          },
        ]}
        width={500}
        height={300}
      />
    </div>
  );
}
