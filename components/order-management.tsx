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
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { MoreHorizontal, Loader2, Plus } from "lucide-react";
import { toast } from "react-hot-toast";

export function OrderManagement() {
  const supabase = createClientComponentClient();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isOrderModalOpen, setOrderModalOpen] = useState(false);
  const [newOrder, setNewOrder] = useState({
    original_location: "",
    destination: "",
    weight: "",
    dimensions: "",
    expected_delivery: "",
  });

  useEffect(() => {
    async function fetchOrders() {
      setLoading(true);
      const { data, error } = await supabase.from("Orders").select("*");

      if (error) {
        toast.error("Failed to load orders.");
      } else {
        setOrders(data);
      }
      setLoading(false);
    }

    fetchOrders();
  }, [supabase]);

  const handleUpdateStatus = async (orderId: string, newStatus: string) => {
    const { error } = await supabase
      .from("Orders")
      .update({ status: newStatus, start_date: newStatus === "Shipped" ? new Date().toISOString() : null })
      .eq("id", orderId);

    if (error) {
      toast.error("Failed to update status.");
      return;
    }

    toast.success(`Order marked as ${newStatus}.`);
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus, start_date: newStatus === "Shipped" ? new Date().toISOString() : order.start_date } : order
      )
    );
  };

  const generateTrackingId = () => {
    return Math.random().toString(36).substring(2, 10).toUpperCase();
  };

  const handleAddOrder = async (e: any) => {
    e.preventDefault();
    const orderData = {
      id: crypto.randomUUID(),
      tracking_id: generateTrackingId(),
      original_location: newOrder.original_location,
      destination: newOrder.destination,
      status: "Processing",
      weight: parseFloat(newOrder.weight),
      dimensions: newOrder.dimensions,
      created_at: new Date().toISOString(),
      expected_delivery: newOrder.expected_delivery,
    };

    const { error } = await supabase.from("Orders").insert([orderData]);

    if (error) {
      toast.error("Failed to add order.");
      return;
    }

    toast.success("Order added successfully.");
    setOrders([...orders, orderData]);
    setOrderModalOpen(false);
  };

  const filteredOrders = orders.filter(
    (order) =>
      order.tracking_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.original_location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      {/* Search (Left) & Add Order (Right) */}
      <div className="flex items-center justify-between">
        <Input placeholder="Search orders..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="max-w-sm" />
        <Dialog open={isOrderModalOpen} onOpenChange={setOrderModalOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Order
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Order</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddOrder} className="grid grid-cols-2 gap-4">
              <Input value={generateTrackingId()} disabled />
              <Input placeholder="Shipping From" required onChange={(e) => setNewOrder({ ...newOrder, original_location: e.target.value })} />
              <Input placeholder="Destination" required onChange={(e) => setNewOrder({ ...newOrder, destination: e.target.value })} />
              <Input placeholder="Weight (kg)" type="number" required onChange={(e) => setNewOrder({ ...newOrder, weight: e.target.value })} />
              <Input placeholder="Dimensions (e.g. 50x40x30 cm)" required onChange={(e) => setNewOrder({ ...newOrder, dimensions: e.target.value })} />
              <Input placeholder="Expected Delivery (YYYY-MM-DD)" type="date" onChange={(e) => setNewOrder({ ...newOrder, expected_delivery: e.target.value })} />
              <div className="col-span-2">
                <Button type="submit" className="w-full">Create Order</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <div className="flex justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-gray-600" />
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tracking ID</TableHead>
              <TableHead>Shipping From</TableHead>
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
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.tracking_id}</TableCell>
                  <TableCell>{order.original_location}</TableCell>
                  <TableCell>{order.destination}</TableCell>
                  <TableCell><Badge variant="outline">{order.status}</Badge></TableCell>
                  <TableCell>{order.weight}</TableCell>
                  <TableCell>{order.dimensions}</TableCell>
                  <TableCell>{new Date(order.created_at).toLocaleDateString()}</TableCell>
                  <TableCell>{order.expected_delivery ? new Date(order.expected_delivery).toLocaleDateString() : "—"}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost"><MoreHorizontal className="h-4 w-4" /></Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : <TableRow><TableCell colSpan={9} className="text-center py-4">No orders found.</TableCell></TableRow>}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
