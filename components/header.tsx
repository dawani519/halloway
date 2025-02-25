"use client"

import Link from "next/link"
import { Package2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { ThemeToggle } from "@/components/theme-toggle"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <Package2 className="h-6 w-6 text-rainbow-blue" />
            <span className="text-lg font-bold rainbow-text">Halloway</span>
          </Link>
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent hover:bg-rainbow-blue hover:text-white">
                  Services
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <Link
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-rainbow-blue to-rainbow-indigo p-6 no-underline outline-none focus:shadow-md"
                          href="/"
                        >
                          <Package2 className="h-6 w-6 text-white" />
                          <div className="mb-2 mt-4 text-lg font-medium text-white">Express Delivery</div>
                          <p className="text-sm leading-tight text-white/90">
                            Fast and secure international shipping to over 200 countries
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-rainbow-blue/20 hover:text-rainbow-blue focus:bg-rainbow-blue/20 focus:text-rainbow-blue"
                          href="/tracking"
                        >
                          <div className="text-sm font-medium leading-none">Tracking</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Track your shipment status in real-time
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-rainbow-blue/20 hover:text-rainbow-blue focus:bg-rainbow-blue/20 focus:text-rainbow-blue"
                          href="/calculator"
                        >
                          <div className="text-sm font-medium leading-none">Calculator</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Get instant shipping quotes
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/tracking" legacyBehavior passHref>
                  <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-rainbow-blue hover:text-white focus:bg-rainbow-blue focus:text-white focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                    Track Package
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/support" legacyBehavior passHref>
                  <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-rainbow-blue hover:text-white focus:bg-rainbow-blue focus:text-white focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                    Support
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Button
            variant="outline"
            asChild
            className="border-rainbow-blue text-rainbow-blue hover:bg-rainbow-blue hover:text-white"
          >
            <Link href="auth/login">Sign In</Link>
          </Button>
          <Button asChild className="bg-rainbow-blue text-white hover:bg-rainbow-indigo">
            <Link href="auth/register">Get Started</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}

