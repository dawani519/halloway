import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AboutPage() {
  return (
    <div className="container py-10">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">About Halloway</h1>
          <p className="text-xl text-muted-foreground">
            Revolutionizing international shipping with cutting-edge technology
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="text-muted-foreground">
              At Halloway, we're on a mission to simplify and streamline international shipping. By leveraging the
              latest technology and our global network of partners, we aim to make cross-border commerce accessible and
              efficient for businesses of all sizes.
            </p>
          </div>
          <div className="relative h-64 md:h-full">
            <Image
              src="/placeholder.svg?height=300&width=400"
              alt="Halloway Headquarters"
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
        </div>
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Our Values</h2>
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Innovation</CardTitle>
              </CardHeader>
              <CardContent>We constantly push the boundaries of what's possible in shipping and logistics.</CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Reliability</CardTitle>
              </CardHeader>
              <CardContent>We deliver on our promises, ensuring your shipments arrive safely and on time.</CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Sustainability</CardTitle>
              </CardHeader>
              <CardContent>
                We're committed to reducing our environmental impact and promoting eco-friendly practices.
              </CardContent>
            </Card>
          </div>
        </div>
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Our Story</h2>
          <p className="text-muted-foreground">
            Founded in 2020, Halloway emerged from a simple idea: that international shipping should be as easy as
            sending a package across town. Our team of logistics experts and tech innovators came together to create a
            platform that combines advanced tracking technology, a vast network of shipping partners, and a
            user-friendly interface.
          </p>
          <p className="text-muted-foreground">
            Today, we serve thousands of businesses worldwide, helping them expand their reach and grow their global
            presence. As we continue to evolve, our commitment to innovation and customer satisfaction remains at the
            core of everything we do.
          </p>
        </div>
      </div>
    </div>
  )
}

