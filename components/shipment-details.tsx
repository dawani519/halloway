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
  service_type: string;
  weight: string;
  dimensions: string;
  estimated_delivery: string;
}

export function ShipmentDetails({ trackingId }: ShipmentDetailsProps) {
  const [shipment, setShipment] = useState<Shipment | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchShipment = async () => {
      const { data, error } = await supabase
        .from("shipments") // ✅ Ensure table name is correct
        .select(
          "tracking_number, origin, destination, service_type, weight, dimensions, estimated_delivery"
        )
        .eq("tracking_number", trackingId) // ✅ Ensure query is correct
        .single();

      if (error) {
        console.error("Error fetching shipment:", error);
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
              <TableCell className="font-medium">Origin</TableCell>
              <TableCell>{shipment.origin || "N/A"}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Destination</TableCell>
              <TableCell>{shipment.destination || "N/A"}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Service Type</TableCell>
              <TableCell>{shipment.service_type || "N/A"}</TableCell>
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
              <TableCell>{shipment.estimated_delivery || "N/A"}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
