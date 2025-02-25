"use client";

import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { MoreHorizontal, Loader2, Plus, Trash2 } from "lucide-react";
import { toast } from "react-hot-toast";

export function OrderManagement() {
  const supabase = createClientComponentClient();
  const [shipments, setShipments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [newShipment, setNewShipment] = useState({
    origin: "",
    destination: "",
    weight: "",
    dimensions: "",
    expected_delivery: "",
  });

  useEffect(() => {
    async function fetchShipments() {
      setLoading(true);
      const { data, error } = await supabase.from("shipment").select("*");

      if (error) {
        toast.error("Failed to load shipments.");
      } else {
        setShipments(data);
      }
      setLoading(false);
    }

    fetchShipments();
  }, []);

  const generateTrackingId = () => Math.random().toString(36).substring(2, 10).toUpperCase();

  const handleAddShipment = async (e: any) => {
    e.preventDefault();

    if (!newShipment.origin || !newShipment.destination || !newShipment.weight || !newShipment.dimensions) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const shipmentData = {
      id: crypto.randomUUID(),
      tracking_number: generateTrackingId(),
      origin: newShipment.origin.trim(),
      destination: newShipment.destination.trim(),
      status: "Processing",
      weight: parseFloat(newShipment.weight),
      dimensions: newShipment.dimensions.trim(),
      created_at: new Date().toISOString(),
      expected_delivery: newShipment.expected_delivery || null,
    };

    const { error } = await supabase.from("shipment").insert([shipmentData]);

    if (error) {
      toast.error("Failed to add shipment.");
      return;
    }

    toast.success("Shipment added successfully.");
    setShipments([...shipments, shipmentData]);
    setNewShipment({
      origin: "",
      destination: "",
      weight: "",
      dimensions: "",
      expected_delivery: "",
    });
  };

  const handleDeleteShipment = async (shipmentId: string) => {
    const { error } = await supabase.from("shipment").delete().eq("id", shipmentId);

    if (error) {
      toast.error("Failed to delete shipment.");
      return;
    }

    toast.success("Shipment deleted.");
    setShipments(shipments.filter((shipment) => shipment.id !== shipmentId));
  };

  const filteredShipments = shipments.filter(
    (shipment) =>
      shipment.tracking_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shipment.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shipment.origin.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      {/* Search & Add Shipment */}
      <div className="flex items-center justify-between">
        <Input
          placeholder="Search shipments..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Shipment
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Shipment</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddShipment} className="grid grid-cols-2 gap-4">
              <Input value={generateTrackingId()} disabled />
              <Input
                placeholder="Origin"
                required
                onChange={(e) => setNewShipment({ ...newShipment, origin: e.target.value })}
              />
              <Input
                placeholder="Destination"
                required
                onChange={(e) => setNewShipment({ ...newShipment, destination: e.target.value })}
              />
              <Input
                placeholder="Weight (kg)"
                type="number"
                required
                onChange={(e) => setNewShipment({ ...newShipment, weight: e.target.value })}
              />
              <Input
                placeholder="Dimensions (e.g. 50x40x30 cm)"
                required
                onChange={(e) => setNewShipment({ ...newShipment, dimensions: e.target.value })}
              />
              <Input
                placeholder="Expected Delivery (YYYY-MM-DD)"
                type="date"
                onChange={(e) => setNewShipment({ ...newShipment, expected_delivery: e.target.value })}
              />
              <div className="col-span-2">
                <Button type="submit" className="w-full">
                  Create Shipment
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Table */}
      {loading ? (
        <div className="flex justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-gray-600" />
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tracking ID</TableHead>
              <TableHead>Origin</TableHead>
              <TableHead>Destination</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Weight (kg)</TableHead>
              <TableHead>Dimensions</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Expected Delivery</TableHead>
              <TableHead className="text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredShipments.length > 0 ? (
              filteredShipments.map((shipment) => (
                <TableRow key={shipment.id}>
                  <TableCell>{shipment.tracking_number}</TableCell>
                  <TableCell>{shipment.origin}</TableCell>
                  <TableCell>{shipment.destination}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{shipment.status}</Badge>
                  </TableCell>
                  <TableCell>{shipment.weight}</TableCell>
                  <TableCell>{shipment.dimensions}</TableCell>
                  <TableCell>{new Date(shipment.created_at).toLocaleDateString()}</TableCell>
                  <TableCell>
                    {shipment.expected_delivery
                      ? new Date(shipment.expected_delivery).toLocaleDateString()
                      : "—"}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => handleDeleteShipment(shipment.id)}
                          className="text-red-600"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={9} className="text-center py-4">
                  No shipments found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
