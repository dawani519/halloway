import { ShippingCalculator } from "@/components/shipping-calculator"

export default function CalculatorPage() {
  return (
    <div className="container py-10">
      <div className="mx-auto max-w-3xl space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Shipping Cost Calculator</h1>
          <p className="text-muted-foreground">Get instant shipping quotes for your international deliveries</p>
        </div>
        <ShippingCalculator />
      </div>
    </div>
  )
}

