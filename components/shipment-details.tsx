import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface ShipmentDetailsProps {
  trackingId: string
}

export function ShipmentDetails({ trackingId }: ShipmentDetailsProps) {
  // In a real application, you would fetch the shipment details based on the trackingId
  // For now, we'll use mock data
  const shipmentDetails = {
    origin: "New York, United States",
    destination: "London, United Kingdom",
    serviceType: "Express International",
    weight: "2.5 kg",
    dimensions: "30 x 20 x 15 cm",
    estimatedDelivery: "February 17, 2024",
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
              <TableCell>{trackingId}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Origin</TableCell>
              <TableCell>{shipmentDetails.origin}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Destination</TableCell>
              <TableCell>{shipmentDetails.destination}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Service Type</TableCell>
              <TableCell>{shipmentDetails.serviceType}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Weight</TableCell>
              <TableCell>{shipmentDetails.weight}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Dimensions</TableCell>
              <TableCell>{shipmentDetails.dimensions}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Estimated Delivery</TableCell>
              <TableCell>{shipmentDetails.estimatedDelivery}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

