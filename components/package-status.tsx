"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, Clock, Package } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createSupabaseBrowserClient } from "@/lib/supabaseClient"; // ✅ Correct import

const supabase = createSupabaseBrowserClient(); // ✅ Ensure client-side Supabase usage

interface PackageStatusProps {
  trackingNumber: string; // ✅ Changed from trackingId
}

interface TrackingStep {
  title: string;
  description: string;
  date: string;
  completed: boolean;
  current: boolean;
}

export function PackageStatus({ trackingNumber }: PackageStatusProps) {
  const [trackingHistory, setTrackingHistory] = useState<TrackingStep[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrackingHistory = async () => {
      console.log("Fetching tracking history for:", trackingNumber); // Debugging

      const { data, error } = await supabase
        .from("shipment") // ✅ Fetching from `shipment`
        .select("history")
        .eq("tracking_number", trackingNumber) // ✅ Using `tracking_number`
        .maybeSingle(); // Expecting one result

      console.log("Supabase Response:", { data, error }); // Debugging

      if (error || !data || !data.history) {
        setError("No tracking history found.");
      } else {
        setTrackingHistory(data.history);
      }

      setLoading(false);
    };

    fetchTrackingHistory();
  }, [trackingNumber]); // ✅ Updated dependency

  if (loading) {
    return <p className="text-center py-10 text-gray-500">Loading tracking history...</p>;
  }

  if (error) {
    return (
      <div className="container py-10 text-center">
        <h1 className="text-2xl font-bold">Tracking Not Found</h1>
        <p className="text-muted-foreground">{error}</p>
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Shipment Progress</CardTitle>
      </CardHeader>
      <CardContent>
        {trackingHistory.length === 0 ? (
          <p className="text-gray-500">No tracking history available.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {trackingHistory.map((step, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted">
                  {step.completed ? (
                    <CheckCircle2 className="h-6 w-6 text-primary" />
                  ) : step.current ? (
                    <Clock className="h-6 w-6 text-primary animate-pulse" />
                  ) : (
                    <Package className="h-6 w-6 text-muted-foreground" />
                  )}
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{step.title}</span>
                    {step.date && <span className="text-sm text-muted-foreground">{step.date}</span>}
                  </div>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
