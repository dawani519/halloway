import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function FAQPage() {
  return (
    <div className="container py-10">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Frequently Asked Questions</h1>
          <p className="text-xl text-muted-foreground">Find answers to common questions about our shipping services</p>
        </div>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="tracking" id="tracking">
            <AccordionTrigger>How do I track my package?</AccordionTrigger>
            <AccordionContent>
              To track your package, simply enter your tracking number on our tracking page or in the search bar at the
              top of our website. You'll be able to see real-time updates on your package's location and estimated
              delivery date.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="shipping-times" id="shipping-times">
            <AccordionTrigger>What are the estimated shipping times?</AccordionTrigger>
            <AccordionContent>
              Shipping times vary depending on the destination and service level chosen. Generally, our express shipping
              takes 1-3 business days for domestic deliveries and 3-5 business days for international shipments.
              Standard shipping may take 5-7 business days domestically and 7-14 business days internationally.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="international-shipping" id="international-shipping">
            <AccordionTrigger>Do you offer international shipping?</AccordionTrigger>
            <AccordionContent>
              Yes, we offer international shipping to over 200 countries worldwide. Our global network of partners
              allows us to provide efficient and reliable cross-border shipping solutions for businesses of all sizes.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="returns" id="returns">
            <AccordionTrigger>What is your return policy?</AccordionTrigger>
            <AccordionContent>
              Our return policy depends on the specific terms agreed upon with the sender. In general, we facilitate
              returns by providing return labels and coordinating pickup or drop-off options. Please contact our
              customer support team for detailed information about returning a specific package.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="customs">
            <AccordionTrigger>How do customs and duties work for international shipments?</AccordionTrigger>
            <AccordionContent>
              For international shipments, customs duties and taxes may apply depending on the destination country and
              the value of the goods. These fees are typically paid by the recipient upon delivery. We provide customs
              documentation assistance to help ensure smooth clearance of your packages.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="insurance">
            <AccordionTrigger>Do you offer shipping insurance?</AccordionTrigger>
            <AccordionContent>
              Yes, we offer shipping insurance for an additional fee. This covers loss, damage, or theft of your package
              up to a declared value. We recommend insurance for high-value or fragile items. You can add insurance
              during the shipping process on our website or app.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="packaging">
            <AccordionTrigger>What are your packaging guidelines?</AccordionTrigger>
            <AccordionContent>
              Proper packaging is crucial for safe delivery. Use a sturdy box that's slightly larger than your item,
              wrap items individually, use cushioning material to fill empty spaces, and seal all seams with packing
              tape. For detailed guidelines, please visit our Packaging Tips page in the Shipping Resources section.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="payment">
            <AccordionTrigger>What payment methods do you accept?</AccordionTrigger>
            <AccordionContent>
              We accept various payment methods including major credit cards (Visa, MasterCard, American Express),
              PayPal, and cryptocurrencies such as Bitcoin. For business accounts, we also offer invoicing options.
              Contact our sales team for more information on payment terms for high-volume shipping.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  )
}

