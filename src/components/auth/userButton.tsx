"use client";

import React, { useState } from "react";
import UseGetCurrentUser from "@/api/auth/getCurrentUser";
import { useAuthActions } from "@convex-dev/auth/react";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Loader2, LogOut } from "lucide-react";
import { cn } from "@/lib/utils"; // Assuming you have this for conditional classes

const UserButton = () => {
  const { signOut } = useAuthActions();
  const router = useRouter();
  const { isLoading, user } = UseGetCurrentUser();

  const [loading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignOut = async () => {
    setIsLoading(true);
    setError("");

    try {
      await signOut();
    } catch (err) {
      setError("Failed to sign out. Please try again.");
      console.error("Sign Out Error:", err);
    } finally {
      setIsLoading(false); // Ensure loading is set to false
      router.push("./auth");
    }
  };

  const userNameTextIcon = user?.name?.charAt(0)?.toUpperCase() || "?"; // Handle undefined name

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                className="h-9 w-9 p-0 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
                variant={"ghost"}
              >
                <Avatar>
                  {user?.image ? (
                    <AvatarImage src={user.image} alt={user.name} />
                  ) : (
                    <AvatarFallback>{userNameTextIcon}</AvatarFallback>
                  )}
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="bottom" className="w-60 mt-2 p-2">
              <DropdownMenuItem className="cursor-default ">
                <div className="text-sm font-medium">
                  {user?.name ? user.name : "Guest User"}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {user?.email || "No email provided"}
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={handleSignOut}
                className="hover:bg-gray-100 dark:hover:bg-gray-700 focus:bg-gray-100 dark:focus:bg-gray-700 "
              >
                <div className="flex items-center gap-1">
                  <LogOut className="w-4 h-4" /> Sign Out
                  {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                </div>
              </DropdownMenuItem>
              {error && (
                <DropdownMenuItem className="text-xs text-red-500 hover:bg-transparent cursor-default">
                  {error}
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </TooltipTrigger>
        <TooltipContent>
          <p>User Menu</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default UserButton;
