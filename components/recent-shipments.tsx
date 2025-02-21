import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

const shipments = [
  {
    id: "SHP001",
    destination: "London, UK",
    status: "In Transit",
    date: "2024-02-15",
  },
  {
    id: "SHP002",
    destination: "Paris, FR",
    status: "Delivered",
    date: "2024-02-14",
  },
  {
    id: "SHP003",
    destination: "Berlin, DE",
    status: "Processing",
    date: "2024-02-15",
  },
  {
    id: "SHP004",
    destination: "Madrid, ES",
    status: "Delivered",
    date: "2024-02-13",
  },
]

export function RecentShipments() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Destination</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {shipments.map((shipment) => (
          <TableRow key={shipment.id}>
            <TableCell className="font-medium">{shipment.id}</TableCell>
            <TableCell>{shipment.destination}</TableCell>
            <TableCell>
              <Badge
                variant={
                  shipment.status === "Delivered"
                    ? "default"
                    : shipment.status === "In Transit"
                      ? "secondary"
                      : "outline"
                }
              >
                {shipment.status}
              </Badge>
            </TableCell>
            <TableCell>{shipment.date}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

