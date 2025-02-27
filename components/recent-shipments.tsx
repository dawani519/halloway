"use client";

import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { createSupabaseBrowserClient } from "@/lib/supabaseClient"; // ✅ Corrected import

const supabase = createSupabaseBrowserClient(); // ✅ Ensure client-side Supabase usage

// Define TypeScript type for Shipment
interface Shipment {
  id: string;
  destination: string;
  cost: number;
  status: string;
  createdAt: string; // ✅ Changed from EpochTimeStamp to string
  tracking_number: string;
}

export function RecentShipments() {
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchShipments = async () => {
      const { data, error } = await supabase
        .from("shipments")
        .select("id, destination, cost, status, createdAt, tracking_number");

      if (error) {
        console.error("Error fetching shipments:", error);
        setError("Failed to load shipments.");
      } else {
        setShipments(data || []);
      }
      setLoading(false);
    };

    fetchShipments();
  }, []);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Destination</TableHead>
          <TableHead>Cost</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Timestamp</TableHead>
          <TableHead>Tracking #</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {loading ? (
          <TableRow>
            <TableCell colSpan={6} className="text-center text-muted-foreground">
              Loading...
            </TableCell>
          </TableRow>
        ) : error ? (
          <TableRow>
            <TableCell colSpan={6} className="text-center text-red-500">
              {error}
            </TableCell>
          </TableRow>
        ) : shipments.length === 0 ? (
          <TableRow>
            <TableCell colSpan={6} className="text-center text-muted-foreground">
              No shipments available
            </TableCell>
          </TableRow>
        ) : (
          shipments.map((shipment) => (
            <TableRow key={shipment.id}>
              <TableCell className="font-medium">{shipment.id}</TableCell>
              <TableCell>{shipment.destination}</TableCell>
              <TableCell>${Number(shipment.cost).toFixed(2)}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    shipment.status.toLowerCase() === "delivered"
                      ? "default"
                      : shipment.status.toLowerCase() === "in transit"
                      ? "secondary"
                      : "outline"
                  }
                >
                  {shipment.status}
                </Badge>
              </TableCell>
              <TableCell>{new Date(shipment.createdAt).toLocaleString()}</TableCell>
              <TableCell>{shipment.tracking_number}</TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}
