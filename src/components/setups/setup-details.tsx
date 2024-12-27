// components/setups/setup-detail.tsx

"use client";

import React from "react";

import { Id } from "../../../convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { UseGetSetupById } from "@/api/setups/use-get-setup-by-id";
import SetupCodeDisplay from "./setup-code-display";
interface SetupDetailProps {
  id: Id<"setups">;
}

const SetupDetail: React.FC<SetupDetailProps> = ({ id }) => {
  const { data: setup, isLoading } = UseGetSetupById({ id });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!setup) {
    return <div>Setup not found</div>;
  }

  return (
    <div className=" w-full  p-6 space-y-4">
      <Link href="/setups">
        <Button variant={"ghost"}>
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Setups
        </Button>
      </Link>
      <h1 className="text-3xl font-bold mb-4">{setup.setupTitle}</h1>
      {setup.setupDescription && (
        <p className="text-gray-700 mb-4">{setup.setupDescription}</p>
      )}
      {setup.setupCodeSteps &&
        setup.setupCodeSteps.map((step, index) => (
          <div key={index} className="mb-6 border  rounded-md p-4">
            <h2 className="text-xl font-semibold mb-2">
              Step {index + 1}: {step.codeTitle}
            </h2>
            {step.codeDescription && (
              <p className="text-gray-600 mb-2">{step.codeDescription}</p>
            )}
            <div className=" p-4 w-full rounded-md overflow-x-auto whitespace-pre-wrap">
              <SetupCodeDisplay codeFile={step.codeFile} />
            </div>
          </div>
        ))}
    </div>
  );
};

export default SetupDetail;
