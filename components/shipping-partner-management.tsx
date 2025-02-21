"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal } from "lucide-react"

const initialPartners = [
  { id: 1, name: "FastShip Inc.", type: "Air Freight", coverage: "Global", performance: "Excellent" },
  { id: 2, name: "SeaWave Logistics", type: "Sea Freight", coverage: "International", performance: "Good" },
  { id: 3, name: "RoadRunner Express", type: "Ground", coverage: "Domestic", performance: "Very Good" },
  { id: 4, name: "Sky High Cargo", type: "Air Freight", coverage: "International", performance: "Excellent" },
]

export function ShippingPartnerManagement() {
  const [partners, setPartners] = useState(initialPartners)
  const [searchTerm, setSearchTerm] = useState("")

  const filteredPartners = partners.filter(
    (partner) =>
      partner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      partner.type.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleDeletePartner = (partnerId: number) => {
    setPartners(partners.filter((partner) => partner.id !== partnerId))
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Input
          placeholder="Search partners..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Button>Add Partner</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Coverage</TableHead>
            <TableHead>Performance</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredPartners.map((partner) => (
            <TableRow key={partner.id}>
              <TableCell className="font-medium">{partner.name}</TableCell>
              <TableCell>{partner.type}</TableCell>
              <TableCell>{partner.coverage}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    partner.performance === "Excellent"
                      ? "default"
                      : partner.performance === "Very Good"
                        ? "secondary"
                        : "outline"
                  }
                >
                  {partner.performance}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem>Edit Partner</DropdownMenuItem>
                    <DropdownMenuItem>View Performance</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => handleDeletePartner(partner.id)}>Delete Partner</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

