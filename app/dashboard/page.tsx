"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient"; // Ensure this is correctly set up
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Overview } from "@/components/overview";
import { RecentShipments } from "@/components/recent-shipments";
import { Shipment } from "@/types/shipment";

// Define User Type
interface User {
  id: string;
  email: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const checkUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error || !data?.user) {
        router.push("/auth/login"); // Redirect if not logged in
      } else {
        setUser({
          id: data.user.id,
          email: data.user.email ?? "",
        });
      }
    };

    const fetchShipments = async () => {
      const { data, error } = await supabase
        .from("shipments")
        .select("id, destination, cost, status, createdAt, tracking_number");

      if (!error && data) {
        setShipments(data as Shipment[]);
      }
      setLoading(false);
    };

    checkUser();
    fetchShipments();
  }, [router]);

  // 📊 Dynamic Stats Calculation
  const totalShipments = shipments.length;
  const activeShipments = shipments.filter((s) => s.status.toLowerCase() === "in_transit").length;
  const completedShipments = shipments.filter((s) => s.status.toLowerCase() === "delivered").length;
  const totalRevenue = shipments.reduce((acc, curr) => acc + (curr.cost || 0), 0);

  return (
    <div className="space-y-8 p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading data...</p>
      ) : (
        <>
          {/* Statistics Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <StatCard title="Total Shipments" value={totalShipments} description="Total shipments recorded" />
            <StatCard title="Active Shipments" value={activeShipments} description="Currently in transit" />
            <StatCard title="Total Revenue" value={`$${totalRevenue.toFixed(2)}`} description="Total revenue from shipments" />
            <StatCard title="Completed" value={completedShipments} description="Successfully delivered" />
          </div>

          {/* Overview & Recent Shipments */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Overview</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <Overview shipments={shipments} />
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Recent Shipments</CardTitle>
              </CardHeader>
              <CardContent>
                <RecentShipments />
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  );
}

// 📌 Stat Card Component
interface StatCardProps {
  title: string;
  value: string | number;
  description: string;
}

function StatCard({ title, value, description }: StatCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}
