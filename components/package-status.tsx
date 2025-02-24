"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, Clock, Package } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/lib/supabaseClient"; // Ensure Supabase client is imported

interface PackageStatusProps {
  trackingId: string;
}

interface StatusStep {
  title: string;
  description: string;
  date: string;
  completed: boolean;
  current: boolean;
}

export function PackageStatus({ trackingId }: PackageStatusProps) {
  const [steps, setSteps] = useState<StatusStep[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrackingData = async () => {
      console.log("Fetching data for tracking ID:", trackingId); // Debugging

      const { data, error } = await supabase
        .from("tracking_status")
        .select("title, description, date, completed, current")
        .eq("tracking_number", trackingId)
        .order("date", { ascending: true }); // Ensure steps are in order

      if (error) {
        console.error("Error fetching tracking data:", error);
      } else {
        console.log("Fetched tracking data:", data); // Debugging
        setSteps(data || []);
      }

      setLoading(false);
    };

    fetchTrackingData();
  }, [trackingId]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Shipment Progress</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <p>Loading tracking details...</p>
        ) : steps.length === 0 ? (
          <p>No tracking data found for this tracking number.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {steps.map((step, index) => (
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
