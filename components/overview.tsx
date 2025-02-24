"use client";

import { useMemo } from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

interface Shipment {
  id: string;
  destination: string;
  tracking_number: string;
  status: string;
  cost: number;
  createdAt: EpochTimeStamp; // Assuming it's an ISO string
}

interface OverviewProps {
  shipments: Shipment[];
}

export function Overview({ shipments }: OverviewProps) {
  // Process shipments data into monthly totals
  const data = useMemo(() => {
    const monthlyTotals: { [key: string]: number } = {};

    shipments.forEach((shipment) => {
      const month = new Date(shipment.createdAt).toLocaleString("en-US", {
        month: "short",
      });

      if (!monthlyTotals[month]) {
        monthlyTotals[month] = 0;
      }
      monthlyTotals[month] += shipment.cost;
    });

    return Object.entries(monthlyTotals).map(([name, total]) => ({
      name,
      total,
    }));
  }, [shipments]);

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value.toLocaleString()}`}
        />
        <Bar dataKey="total" fill="currentColor" radius={[4, 4, 0, 0]} className="fill-primary" />
      </BarChart>
    </ResponsiveContainer>
  );
}
