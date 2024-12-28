"use client";

import Image from "next/image";
import Link from "next/link"; // Import Next.js Link
import React, { useState, useEffect } from "react";
import { logo } from "../../../public/images";
import UserButton from "../auth/userButton";
import { ModeToggle } from "../theme-provider/mode-toggle";
import { cn } from "@/lib/utils"; // Utility for class merging from shadcn
import { usePathname } from "next/navigation"; // Hook for active route
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"; // shadcn nav menu
// Icon from Radix
import { Button } from "@/components/ui/button"; // Button from shadcn
import { MenuIcon, XIcon } from "lucide-react";

const NavbarLg = () => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const Navigation = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "Setups",
      href: "/setups",
    },
  ];

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <nav className="sticky top-0 z-50 w-full bg-background/80  backdrop-blur-sm border-b border-border/60 py-2">
      <div className="container flex items-center justify-between px-4 mx-auto  md:px-6">
        {/* Logo and Brand Name */}
        <div id="logo" className="flex items-center space-x-2">
          <Image
            src={logo}
            alt="logo"
            width={32}
            height={32}
            className="dark:invert"
          />
          <h1 className="text-xl font-semibold">HopeDreams</h1>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center  md:space-x-4">
          <NavigationMenu>
            <NavigationMenuList className="gap-x-4">
              {Navigation.map((navItem) => (
                <NavigationMenuItem key={navItem.name}>
                  <Link href={navItem.href} legacyBehavior passHref>
                    <NavigationMenuLink
                      className={cn(
                        "text-sm font-medium transition-colors hover:text-foreground/80",
                        pathname === navItem.href
                          ? "text-foreground font-semibold"
                          : "text-foreground/60"
                      )}
                    >
                      {navItem.name}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* User Actions and Theme Toggle (Desktop) */}
        <div className="hidden md:flex items-center space-x-2 rounded-xl">
          <div>
            <UserButton />
          </div>
          <div>
            <ModeToggle />
          </div>
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={handleMobileMenuToggle}>
            {isMobileMenuOpen ? <XIcon /> : <MenuIcon />}
          </Button>
        </div>

        {/* Mobile Navigation (Collapsible) */}
        {isMobileMenuOpen && (
          <div className=" absolute top-full left-0 w-full bg-background/95 backdrop-blur-md  flex flex-col py-2 border-b border-border/40 mt-1">
            <div className="flex flex-col">
              {Navigation.map((navItem) => (
                <Link
                  key={navItem.name}
                  href={navItem.href}
                  className={cn(
                    "px-4 py-2 text-sm font-medium transition-colors hover:text-foreground/80",
                    pathname === navItem.href
                      ? "text-foreground font-semibold bg-accent/10"
                      : "text-foreground/60"
                  )}
                >
                  {navItem.name}
                </Link>
              ))}
            </div>
            <div className=" flex justify-center items-center space-x-2 mt-2">
              <UserButton />
              <ModeToggle />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavbarLg;
