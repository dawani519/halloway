import Link from "next/link"
import { ArrowRight, Package, Shield, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrackingSearch } from "@/components/tracking-search"

export default function Home() {
  return (
    <>
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 rainbow-bg">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-white">
                  Global Shipping Made Simple
                </h1>
                <p className="max-w-[600px] text-white md:text-xl">
                  Fast, secure, and reliable international delivery to over 200 countries. Pay with cryptocurrency and
                  track your shipments in real-time.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button
                  size="lg"
                  asChild
                  className="bg-white text-rainbow-blue hover:bg-rainbow-yellow hover:text-white"
                >
                  <Link href="/calculator">
                    Get a Quote <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="bg-transparent text-white border-white hover:bg-white hover:text-rainbow-blue"
                >
                  <Link href="/learn">Learn More</Link>
                </Button>
              </div>
            </div>
            <div className="flex flex-col gap-4 rounded-lg bg-white/90 p-6 backdrop-blur-sm">
              <div className="flex flex-col gap-2">
                <h2 className="text-2xl font-bold text-rainbow-blue">Track Your Package</h2>
                <p className="text-sm text-muted-foreground">
                  Enter your tracking number to get real-time updates on your shipment.
                </p>
              </div>
              <TrackingSearch />
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-rainbow-blue to-rainbow-indigo">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
            <Card className="bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <Package className="h-10 w-10 mb-4 text-rainbow-red" />
                <CardTitle className="text-rainbow-red">Door-to-Door Service</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  We handle everything from pickup to delivery, ensuring your package arrives safely at its destination.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <Shield className="h-10 w-10 mb-4 text-rainbow-green" />
                <CardTitle className="text-rainbow-green">Secure Payments</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Pay securely with your preferred cryptocurrency. We support multiple chains and tokens.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <Truck className="h-10 w-10 mb-4 text-rainbow-violet" />
                <CardTitle className="text-rainbow-violet">Global Network</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Our extensive network covers over 200 countries, with local expertise in customs and regulations.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  )
}

