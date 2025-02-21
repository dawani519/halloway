import { OrderManagement } from "@/components/order-management"

export default function OrderManagementPage() {
  return (
    <div className="space-y-6 p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Order Management</h2>
      </div>
      <OrderManagement />
    </div>
  )
}

