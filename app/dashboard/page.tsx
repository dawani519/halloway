"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabaseClient";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Overview } from "@/components/overview";
import { RecentShipments } from "@/components/recent-shipments";
import { Shipment } from "@/types/shipment";

export default function DashboardPage() {
  const router = useRouter();
  const supabase = createSupabaseBrowserClient();
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [email, setEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUserSession = async () => {
      setLoading(true);

      const { data, error } = await supabase.auth.getSession(); // ✅ Get full session
      console.log("🔍 Supabase session:", data);

      const userEmail = data?.session?.user?.email; // ✅ Check if email exists

      if (error || !userEmail) {
        console.warn("❌ No user email found, redirecting...");
        router.replace("/auth/login");
        return;
      }

      setEmail(userEmail); // ✅ Store email in state
      setLoading(false);
    };

    checkUserSession();
  }, [router, supabase]);

  useEffect(() => {
    if (email) {
      const fetchShipments = async () => {
        const { data, error } = await supabase
          .from("shipments")
          .select("id, destination, cost, status, createdAt, tracking_number");

        if (!error && data) {
          setShipments(data as Shipment[]);
        }
      };

      fetchShipments();
    }
  }, [email, supabase]);

  if (loading) {
    return <p className="text-center text-gray-500">Checking authentication...</p>;
  }

  if (!email) return null; // ✅ Prevent flickering UI before redirect

  const totalShipments = shipments.length;
  const activeShipments = shipments.filter((s) => s.status.toLowerCase() === "in_transit").length;
  const completedShipments = shipments.filter((s) => s.status.toLowerCase() === "delivered").length;
  const totalRevenue = shipments.reduce((acc, curr) => acc + (curr.cost || 0), 0);

  return (
    <div className="space-y-8 p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Shipments" value={totalShipments} description="Total shipments recorded" />
        <StatCard title="Active Shipments" value={activeShipments} description="Currently in transit" />
        <StatCard title="Total Revenue" value={`$${totalRevenue.toFixed(2)}`} description="Total revenue from shipments" />
        <StatCard title="Completed" value={completedShipments} description="Successfully delivered" />
      </div>

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
    </div>
  );
}

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
