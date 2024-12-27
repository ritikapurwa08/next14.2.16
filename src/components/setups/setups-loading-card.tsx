// components/setups/setup-loading-card.tsx
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const SetupLoadingCard = () => {
  return (
    <div className="setup-card border min-w-full w-full rounded-lg shadow-md flex flex-col animate-pulse">
      <div className="thumbnail h-48 w-full relative rounded-t-lg">
        <Skeleton className="h-full w-full rounded-t-lg" />
      </div>
      <div className="p-4 flex flex-col h-[150px] justify-between flex-grow">
        <div>
          <Skeleton className="h-8 w-full mb-2 rounded-md" />
          <Skeleton className="h-4 w-full mb-2 rounded-md" />
        </div>
        <div className="flex justify-between items-center mt-2">
          <div className="flex flex-col">
            <Skeleton className="h-4 w-full rounded-md" />
            <Skeleton className="h-4 w-full rounded-md mt-2" />
          </div>
          <div className="flex items-center space-x-2">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-8 w-14 rounded-md" />
          </div>
        </div>
      </div>
      <div className="p-4 border-t flex justify-between items-center border-t-gray-300">
        <Skeleton className="h-8 w-24 rounded-md" />
        <Skeleton className="h-8 w-8 rounded-full" />
      </div>
    </div>
  );
};

export default SetupLoadingCard;
