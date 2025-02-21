import { TrackingSearch } from "@/components/tracking-search"

export default function TrackingPage() {
  return (
    <div className="container py-10">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Track Your Package</h1>
          <p className="text-xl text-muted-foreground">
            Enter your tracking number to get real-time updates on your shipment
          </p>
        </div>
        <TrackingSearch />
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-semibold">How to Track Your Package</h2>
          <ol className="text-left space-y-2">
            <li>1. Enter your tracking number in the search box above</li>
            <li>2. Click on the "Track" button or press Enter</li>
            <li>3. View the current status and location of your package</li>
            <li>4. Check estimated delivery date and any updates</li>
          </ol>
        </div>
      </div>
    </div>
  )
}

