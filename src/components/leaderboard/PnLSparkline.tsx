"use client";

import { Line, LineChart } from "recharts";

interface Props {
  points: number[];
  positive: boolean;
}

export const PnLSparkline = ({ points, positive }: Props) => {
  const data = points.map((v, i) => ({ x: i, y: v }));

  // Use fixed pixel dimensions to avoid ResponsiveContainer width/height -1 warnings
  return (
    <div className="h-8 w-24">
      <LineChart width={96} height={32} data={data}>
        <Line
          type="monotone"
          dataKey="y"
          stroke={positive ? "#22c55e" : "#fb7185"}
          strokeWidth={1.6}
          dot={false}
          isAnimationActive={false}
        />
      </LineChart>
    </div>
  );
};

