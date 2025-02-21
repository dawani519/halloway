import { ShippingPartnerManagement } from "@/components/shipping-partner-management"

export default function ShippingPartnersPage() {
  return (
    <div className="space-y-6 p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Shipping Partner Management</h2>
      </div>
      <ShippingPartnerManagement />
    </div>
  )
}

