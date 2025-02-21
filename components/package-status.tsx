"use client"

import { useEffect, useState } from "react"
import { CheckCircle2, Clock, Package } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface PackageStatusProps {
  trackingId: string
}

interface StatusStep {
  title: string
  description: string
  date: string
  completed: boolean
  current: boolean
}

export function PackageStatus({ trackingId }: PackageStatusProps) {
  const [steps, setSteps] = useState<StatusStep[]>([])

  useEffect(() => {
    // Simulate fetching tracking data
    const fetchTrackingData = async () => {
      // In a real application, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const mockSteps: StatusStep[] = [
        {
          title: "Order Confirmed",
          description: "Package has been registered in our system",
          date: "2024-02-14 09:00",
          completed: true,
          current: false,
        },
        {
          title: "Package Received",
          description: "Package received at origin facility",
          date: "2024-02-14 14:30",
          completed: true,
          current: false,
        },
        {
          title: "In Transit",
          description: "Package is in transit to destination",
          date: "2024-02-15 10:15",
          completed: false,
          current: true,
        },
        {
          title: "Out for Delivery",
          description: "Package is out for delivery",
          date: "",
          completed: false,
          current: false,
        },
        {
          title: "Delivered",
          description: "Package has been delivered",
          date: "",
          completed: false,
          current: false,
        },
      ]
      setSteps(mockSteps)
    }

    fetchTrackingData()
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Shipment Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          {steps.map((step, index) => (
            <div key={index} className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted">
                {step.completed ? (
                  <CheckCircle2 className="h-6 w-6 text-primary" />
                ) : step.current ? (
                  <Clock className="h-6 w-6 text-primary animate-pulse" />
                ) : (
                  <Package className="h-6 w-6 text-muted-foreground" />
                )}
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{step.title}</span>
                  {step.date && <span className="text-sm text-muted-foreground">{step.date}</span>}
                </div>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

