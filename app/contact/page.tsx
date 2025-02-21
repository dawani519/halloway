import { ContactForm } from "@/components/contact-form"

export default function ContactPage() {
  return (
    <div className="container py-10">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Contact Us</h1>
          <p className="text-xl text-muted-foreground">We're here to help with any questions or concerns</p>
        </div>
        <ContactForm />
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-semibold">Other Ways to Reach Us</h2>
          <div>
            <h3 className="font-medium">Customer Support</h3>
            <p>support@halloway.com</p>
            <p>+1 (800) 123-4567</p>
          </div>
          <div>
            <h3 className="font-medium">Business Inquiries</h3>
            <p>business@halloway.com</p>
            <p>+1 (800) 987-6543</p>
          </div>
          <div>
            <h3 className="font-medium">Office Address</h3>
            <p>123 Shipping Lane</p>
            <p>Global City, Earth 12345</p>
          </div>
        </div>
      </div>
    </div>
  )
}

