import type React from "react"
import { SidebarNav } from "@/components/sidebar-nav"

const sidebarNavItems = [
  {
    title: "Overview",
    href: "/admin",
  },
  {
    title: "User Management",
    href: "/admin/users",
  },
  {
    title: "Order Management",
    href: "/admin/orders",
  },
  {
    title: "Analytics",
    href: "/admin/analytics",
  },
  {
    title: "Shipping Partners",
    href: "/admin/partners",
  },
]

interface AdminLayoutProps {
  children: React.ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="container flex-1 items-start md:grid md:grid-cols-[220px_1fr] md:gap-6 lg:grid-cols-[240px_1fr] lg:gap-10">
      <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto border-r md:sticky md:block">
        <div className="py-6 pr-6 lg:py-8">
          <SidebarNav items={sidebarNavItems} />
        </div>
      </aside>
      <main className="flex w-full flex-col overflow-hidden">{children}</main>
    </div>
  )
}

