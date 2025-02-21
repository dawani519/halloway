import { PackageStatus } from "@/components/package-status"
import { ShipmentDetails } from "@/components/shipment-details"

interface TrackingPageProps {
  params: {
    id: string
  }
}

export default function TrackingPage({ params }: TrackingPageProps) {
  return (
    <div className="container py-10">
      <div className="mx-auto max-w-4xl space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Track Your Shipment</h1>
          <p className="text-muted-foreground">Tracking Number: {params.id}</p>
        </div>
        <div className="grid gap-6">
          <PackageStatus trackingId={params.id} />
          <ShipmentDetails trackingId={params.id} />
        </div>
      </div>
    </div>
  )
}

