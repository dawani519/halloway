"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PackageStatus } from "@/components/package-status";
import { ShipmentDetails } from "@/components/shipment-details";
import { createSupabaseBrowserClient } from "@/lib/supabaseClient"; // ✅ Correct import

const supabase = createSupabaseBrowserClient(); // ✅ Ensure client-side Supabase usage

interface TrackingPageProps {
  params: {
    id: string;
  };
}

export default function TrackingPage({ params }: TrackingPageProps) {
  const router = useRouter();
  const [shipment, setShipment] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchShipment = async () => {
      console.log("Fetching shipment for tracking number:", params.id); // Debugging

      const { data, error } = await supabase
        .from("shipments")
        .select("*")
        .eq("tracking_number", params.id)
        .single(); // Expecting one result

      console.log("Supabase Response:", { data, error }); // Debugging

      if (error || !data) {
        setError("Shipment not found");
      } else {
        setShipment(data);
      }
      setLoading(false);
    };

    fetchShipment();
  }, [params.id]);

  if (loading) {
    return <p className="text-center py-10 text-gray-500">Loading shipment details...</p>;
  }

  if (error) {
    return (
      <div className="container py-10 text-center">
        <h1 className="text-2xl font-bold">Tracking Not Found</h1>
        <p className="text-muted-foreground">{error}</p>
        <button
          onClick={() => router.push("/tracking")}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="container py-10">
      <div className="mx-auto max-w-4xl space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Track Your Shipment</h1>
          <p className="text-muted-foreground">Tracking Number: {params.id}</p>
        </div>
        <div className="grid gap-6">
          <PackageStatus trackingId={shipment.tracking_number} /> {/* Pass fetched shipment data */}
          <ShipmentDetails trackingId={shipment.tracking_number} /> {/* Pass fetched shipment data */}
        </div>
      </div>
    </div>
  );
}
