"use client";

import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createSupabaseBrowserClient } from "@/lib/supabaseClient"; // ✅ Corrected import

const supabase = createSupabaseBrowserClient(); // ✅ Ensure client-side Supabase usage

interface ShipmentDetailsProps {
  trackingId: string;
}

interface Shipment {
  tracking_number: string;
  origin: string;
  destination: string;
  serviceType: string;
  weight: string;
  dimensions: string;
  estimatedDelivery: string | null;
  status: string;
  history: { current_location: string; last_updated: string }[]; // ✅ History is an array
}

export function ShipmentDetails({ trackingId }: ShipmentDetailsProps) {
  const [shipment, setShipment] = useState<Shipment | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchShipment = async () => {
      console.log("Fetching shipment for tracking ID:", trackingId); // Debugging

      const { data, error } = await supabase
        .from("shipment") // ✅ Ensure table name is correct
        .select(
          "tracking_number, origin, destination, serviceType, weight, dimensions, estimatedDelivery, status, history"
        ) // ✅ Fetch history instead of current_location/last_updated
        .eq("tracking_number", trackingId)
        .maybeSingle(); // Handle cases where data might not exist

      console.log("Supabase Response:", { data, error }); // Debugging

      if (error || !data) {
        setError("Shipment not found.");
      } else {
        setShipment(data);
      }

      setLoading(false);
    };

    fetchShipment();
  }, [trackingId]);

  if (loading) {
    return <p className="text-center text-muted-foreground">Loading shipment details...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  if (!shipment) {
    return <p className="text-center text-muted-foreground">No shipment data available.</p>;
  }

  // ✅ Extract latest history entry (if available)
  const latestHistory = shipment.history?.length > 0 ? shipment.history[shipment.history.length - 1] : null;
  const latestLocation = latestHistory?.current_location || "N/A";
  const lastUpdated = latestHistory?.last_updated || "N/A";

  return (
    <Card>
      <CardHeader>
        <CardTitle>Shipment Details</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">Tracking Number</TableCell>
              <TableCell>{shipment.tracking_number || "N/A"}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Status</TableCell>
              <TableCell>{shipment.status || "N/A"}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Origin</TableCell>
              <TableCell>{shipment.origin || "N/A"}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Destination</TableCell>
              <TableCell>{shipment.destination || "N/A"}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Service Type</TableCell>
              <TableCell>{shipment.serviceType || "N/A"}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Weight</TableCell>
              <TableCell>{shipment.weight || "N/A"}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Dimensions</TableCell>
              <TableCell>{shipment.dimensions || "N/A"}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Estimated Delivery</TableCell>
              <TableCell>{shipment.estimatedDelivery || "N/A"}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Current Location</TableCell>
              <TableCell>{latestLocation}</TableCell> {/* ✅ Updated to use latest history entry */}
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Last Updated</TableCell>
              <TableCell>{lastUpdated}</TableCell> {/* ✅ Updated to use latest history entry */}
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
