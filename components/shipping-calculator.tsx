"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Bitcoin, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

const formSchema = z.object({
  fromCountry: z.string().min(1, "Please select origin country"),
  toCountry: z.string().min(1, "Please select destination country"),
  weight: z.string().min(1, "Weight is required"),
  length: z.string().min(1, "Length is required"),
  width: z.string().min(1, "Width is required"),
  height: z.string().min(1, "Height is required"),
})

const countries = [
  { value: "us", label: "United States" },
  { value: "gb", label: "United Kingdom" },
  { value: "ca", label: "Canada" },
  { value: "au", label: "Australia" },
  { value: "de", label: "Germany" },
]

export function ShippingCalculator() {
  const [isCalculating, setIsCalculating] = useState(false)
  const [quote, setQuote] = useState<{ cost: number; trackingNumber: string } | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fromCountry: "",
      toCountry: "",
      weight: "",
      length: "",
      width: "",
      height: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsCalculating(true)
    // Simulate API call for shipping cost calculation
    await new Promise((resolve) => setTimeout(resolve, 1500))
    // Calculate mock shipping cost based on weight and dimensions
    const weight = Number.parseFloat(values.weight)
    const volume = Number.parseFloat(values.length) * Number.parseFloat(values.width) * Number.parseFloat(values.height)
    const baseRate = 10
    const cost = Number.parseFloat((weight * baseRate + volume * 0.01).toFixed(2))

    // Generate a mock tracking number
    const trackingNumber = `HLW${Math.random().toString(36).substr(2, 9).toUpperCase()}`

    setQuote({ cost, trackingNumber })
    setIsCalculating(false)
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid gap-4">
            <FormField
              control={form.control}
              name="fromCountry"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Origin Country</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select origin country" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {countries.map((country) => (
                        <SelectItem key={country.value} value={country.value}>
                          {country.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="toCountry"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Destination Country</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select destination country" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {countries.map((country) => (
                        <SelectItem key={country.value} value={country.value}>
                          {country.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid gap-4">
            <FormField
              control={form.control}
              name="weight"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Weight (kg)</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.1" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid gap-4 sm:grid-cols-3">
              <FormField
                control={form.control}
                name="length"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Length (cm)</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="width"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Width (cm)</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="height"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Height (cm)</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <Button type="submit" className="w-full" disabled={isCalculating}>
            {isCalculating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Calculate Shipping Cost
          </Button>
        </form>
      </Form>
      {quote && (
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <h3 className="text-xl font-bold">Shipping Quote</h3>
              <div className="flex items-center justify-between border-b pb-4">
                <span className="text-muted-foreground">Estimated Cost</span>
                <span className="text-2xl font-bold">${quote.cost}</span>
              </div>
              <div className="flex items-center justify-between border-b pb-4">
                <span className="text-muted-foreground">Tracking Number</span>
                <span className="text-lg font-semibold">{quote.trackingNumber}</span>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">Accepted Payment Methods</h4>
                <div className="flex gap-2">
                  <Bitcoin className="h-6 w-6" />
                  <span className="text-sm text-muted-foreground">Bitcoin and other major cryptocurrencies</span>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Proceed to Payment</Button>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}

