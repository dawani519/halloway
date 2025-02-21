import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

const orders = [
  {
    id: "ORD001",
    customer: "John Doe",
    status: "Processing",
    total: "$150.00",
  },
  {
    id: "ORD002",
    customer: "Jane Smith",
    status: "Shipped",
    total: "$230.50",
  },
  {
    id: "ORD003",
    customer: "Bob Johnson",
    status: "Delivered",
    total: "$75.20",
  },
  {
    id: "ORD004",
    customer: "Alice Brown",
    status: "Processing",
    total: "$420.00",
  },
]

export function RecentOrders() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Order ID</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Total</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => (
          <TableRow key={order.id}>
            <TableCell className="font-medium">{order.id}</TableCell>
            <TableCell>{order.customer}</TableCell>
            <TableCell>
              <Badge
                variant={
                  order.status === "Delivered" ? "default" : order.status === "Shipped" ? "secondary" : "outline"
                }
              >
                {order.status}
              </Badge>
            </TableCell>
            <TableCell>{order.total}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

