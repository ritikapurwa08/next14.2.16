"use client";

import CreateSetupButton from "@/components/setups/create-setup-button";
import { Hint } from "@/components/ui/hint";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react"; // Import filter icon
import { useState } from "react";

interface SetupsLayoutProps {
  children: React.ReactNode;
}

const SetupsLayout = ({ children }: SetupsLayoutProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const handleFilterToggle = () => {
    setIsFilterOpen((prev) => !prev);
  };
  return (
    <div className="flex flex-col w-full items-center justify-center py-6">
      <div
        id="setup-header"
        className="flex flex-row w-full items-center justify-between mb-4 px-4"
      >
        {/* Left Side: Title and Description*/}
        <div className="flex flex-col">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Setups
          </h1>
          <p className="mt-1 text-lg text-gray-500 dark:text-gray-400">
            Explore and discover amazing setups.
          </p>
        </div>
        {/*Middle Section: Searchbar*/}
        <div className="max-w-sm w-full mx-4">
          <Input
            type="search"
            placeholder="Search setups..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="rounded-full border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        {/* Right Side:  Filter and Create Setup button */}
        <div className="flex items-center space-x-2">
          <Hint side="left" label="filter setups">
            <Button variant="outline" size="icon" onClick={handleFilterToggle}>
              <Filter className="h-5 w-5" />
            </Button>
          </Hint>
          <Hint side="left" label="create setup">
            <div>
              <CreateSetupButton />
            </div>
          </Hint>
        </div>
      </div>
      {/*Filter section*/}
      {isFilterOpen && (
        <div className="w-full max-w-3xl mx-auto bg-gray-100 dark:bg-gray-800 p-4 rounded-md shadow-md transition-all duration-300 ease-in-out ">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
            Filter Options
          </h3>
          {/* Put your filter options here */}
          <p className="text-gray-500 dark:text-gray-400">Coming Soon...</p>
        </div>
      )}
      <div className="p-4 w-full  ">{children}</div>
    </div>
  );
};
export default SetupsLayout;
