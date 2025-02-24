"use client";

import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/lib/supabaseClient"; // Ensure this is correctly configured

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

  useEffect(() => {
    const fetchShipment = async () => {
      const { data, error } = await supabase
        .from("shipments") // Make sure your table name is correct
        .select(
          "tracking_number, origin, destination, service_type, weight, dimensions, estimated_delivery"
        )
        .eq("tracking_number", trackingId) // Find the shipment with this tracking number
        .single();

      if (error) {
        console.error("Error fetching shipment:", error);
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

  if (!shipment) {
    return <p className="text-center text-muted-foreground">Shipment not found.</p>;
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
              <TableCell>{shipment.tracking_number}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Origin</TableCell>
              <TableCell>{shipment.origin}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Destination</TableCell>
              <TableCell>{shipment.destination}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Service Type</TableCell>
              <TableCell>{shipment.service_type}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Weight</TableCell>
              <TableCell>{shipment.weight}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Dimensions</TableCell>
              <TableCell>{shipment.dimensions}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Estimated Delivery</TableCell>
              <TableCell>{shipment.estimated_delivery}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
