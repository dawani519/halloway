import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const jobOpenings = [
  {
    title: "Senior Software Engineer",
    department: "Engineering",
    location: "Remote",
    description:
      "We're looking for an experienced software engineer to join our team and help build the future of global shipping.",
  },
  {
    title: "UX Designer",
    department: "Design",
    location: "New York, NY",
    description: "Join our design team to create intuitive and beautiful user experiences for our shipping platform.",
  },
  {
    title: "Operations Manager",
    department: "Operations",
    location: "London, UK",
    description: "Help manage our global shipping operations and ensure smooth delivery processes for our customers.",
  },
  {
    title: "Customer Support Specialist",
    department: "Customer Service",
    location: "Remote",
    description: "Provide top-notch support to our customers and help resolve shipping-related inquiries.",
  },
]

export default function CareersPage() {
  return (
    <div className="container py-10">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Join Our Team</h1>
          <p className="text-xl text-muted-foreground">Help us revolutionize the global shipping industry</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {jobOpenings.map((job, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{job.title}</CardTitle>
                <CardDescription>
                  {job.department} | {job.location}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">{job.description}</p>
                <Button>Apply Now</Button>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Why Work With Us?</h2>
          <ul className="text-left max-w-2xl mx-auto space-y-2">
            <li>• Competitive salary and benefits package</li>
            <li>• Opportunities for professional growth and development</li>
            <li>• Work with cutting-edge technologies in the shipping industry</li>
            <li>• Collaborative and inclusive work environment</li>
            <li>• Make a real impact on global trade and commerce</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

