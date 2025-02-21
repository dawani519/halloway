import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function SupportPage() {
  return (
    <div className="container py-10">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Customer Support</h1>
          <p className="text-xl text-muted-foreground">We're here to help with any questions or issues you may have</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li>
                  <Link href="/faq#tracking" className="text-blue-600 hover:underline">
                    How do I track my package?
                  </Link>
                </li>
                <li>
                  <Link href="/faq#shipping-times" className="text-blue-600 hover:underline">
                    What are the estimated shipping times?
                  </Link>
                </li>
                <li>
                  <Link href="/faq#international-shipping" className="text-blue-600 hover:underline">
                    Do you offer international shipping?
                  </Link>
                </li>
                <li>
                  <Link href="/faq#returns" className="text-blue-600 hover:underline">
                    What is your return policy?
                  </Link>
                </li>
              </ul>
              <Button className="mt-4" asChild>
                <Link href="/faq">View All FAQs</Link>
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Contact Us</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p>Email: support@v0global.com</p>
              <p>Phone: +1 (800) 123-4567</p>
              <p>Hours: Monday - Friday, 9am - 5pm EST</p>
              <Button className="mt-2" asChild>
                <Link href="/contact">Contact Form</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Shipping Resources</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li>
                <Link href="/resources/shipping-guide" className="text-blue-600 hover:underline">
                  Comprehensive Shipping Guide
                </Link>
              </li>
              <li>
                <Link href="/resources/packaging-tips" className="text-blue-600 hover:underline">
                  Packaging Tips for Safe Delivery
                </Link>
              </li>
              <li>
                <Link href="/resources/customs-information" className="text-blue-600 hover:underline">
                  International Customs Information
                </Link>
              </li>
              <li>
                <Link href="/resources/shipping-calculator" className="text-blue-600 hover:underline">
                  Shipping Cost Calculator
                </Link>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

