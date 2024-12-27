"use client";

import UseGetCurrentUser from "@/api/auth/getCurrentUser";
import { UseCreateSetup } from "@/api/setups/create-setup";
import { setupZodSchema, SetupZodSchemaType } from "@/types/setups/setup-types";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Form } from "../ui/form";
import CustomInput from "../validated-inputs/custom-input";
import CustomTextarea from "../validated-inputs/custom-textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PlusIcon, TrashIcon } from "lucide-react";
import { LoaderIcon } from "lucide-react";
import SubmitLoader from "../loaders/submit-loader";

const CreateSetupButton = () => {
  const { user } = UseGetCurrentUser();
  console.log("user:", user);

  const { mutate: createSetup, isPending: creatingSetup } = UseCreateSetup();
  const [open, setOpen] = useState(false);

  const form = useForm<SetupZodSchemaType>({
    resolver: zodResolver(setupZodSchema),
    defaultValues: {
      setupDescription: "",
      setupLikes: 1,
      setupCodeSteps: [
        {
          codeFile: "",
          codeTitle: "",
          codeDescription: "",
          codeLinks: [],
        },
      ],
      setupThumbnail: "",
      setupTitle: "",
      setupUpdatedAt: "",
      setupUserEmail: user?.email || "",
      setupUserName: user?.name || "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "setupCodeSteps",
  });

  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const handleCreateSetup = (values: SetupZodSchemaType) => {
    console.log("Form values on submit", values);
    createSetup(
      {
        setupTitle: values.setupTitle,
        setupDescription: values.setupDescription,
        setupThumbnail: values.setupThumbnail,
        setupUserEmail: user?.email,
        setupUserName: user?.name,
        setupLikes: 0,
        setupUpdatedAt: "",
        setupCodeSteps: values.setupCodeSteps,
      },
      {
        onSuccess(data) {
          console.log("Setup created successfully", data);
          setOpen(false);
          form.reset();
          setCurrentStepIndex(0);
        },
        onError(err) {
          console.log("error creating setup", err);
        },
        onSettled() {
          console.log("Setup creation operation settled.");
        },
      }
    );
  };

  const handleCloseDialog = () => {
    console.log("Close dialog and reset the values");
    setOpen(false);
    form.reset();
    setCurrentStepIndex(0);
  };
  const handleNextStep = () => {
    if (currentStepIndex < fields.length) {
      console.log("next step and index will increase by 1");
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };
  const handlePreviousStep = () => {
    if (currentStepIndex > 0) {
      console.log("previous step and index will decrease by 1");
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const handleRemoveStep = (index: number) => {
    remove(index);
    if (currentStepIndex >= fields.length - 1 && currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    } else if (
      currentStepIndex >= fields.length - 1 &&
      currentStepIndex === 0
    ) {
      setCurrentStepIndex(0);
    } else {
      setCurrentStepIndex(currentStepIndex);
    }
    console.log("remove step and index ", index);
  };

  const isLastStep = currentStepIndex === fields.length;
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Create Setup</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create a New Setup</DialogTitle>
          <DialogDescription>
            Fill the necessary details to create your snippet
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleCreateSetup)}>
            <div className="space-y-4">
              {currentStepIndex === 0 && (
                <>
                  <CustomInput
                    control={form.control}
                    name="setupTitle"
                    label="Setup Title"
                    disabled={creatingSetup}
                    placeholder="Enter title for the setup"
                  />
                  <CustomTextarea
                    control={form.control}
                    name="setupDescription"
                    label="Setup Description"
                    placeholder="Describe your setup"
                  />
                  <CustomInput
                    control={form.control}
                    name="setupThumbnail"
                    label="Thumbnail"
                    disabled={creatingSetup}
                    placeholder="Add thumbnail for setup"
                  />

                  <Button
                    disabled={creatingSetup}
                    onClick={handleNextStep}
                    variant={"secondary"}
                    type="button"
                  >
                    Next Step
                  </Button>
                </>
              )}
              {fields.map((field, index) => {
                return (
                  <div
                    className={cn(currentStepIndex !== index + 1 && "hidden")}
                    key={field.id}
                  >
                    <h1 className="text-xl text-slate-600 font-bold mb-2">
                      Step : {index + 1}
                    </h1>
                    <CustomInput
                      control={form.control}
                      name={`setupCodeSteps.${index}.codeTitle`}
                      label="Step Title"
                      disabled={creatingSetup}
                      placeholder={`Enter step title ${index + 1}`}
                    />
                    <CustomTextarea
                      control={form.control}
                      name={`setupCodeSteps.${index}.codeDescription`}
                      label="Step Description"
                      disabled={creatingSetup}
                      placeholder={`Enter Step Description ${index + 1}`}
                    />
                    <CustomTextarea
                      control={form.control}
                      name={`setupCodeSteps.${index}.codeFile`}
                      label="Code"
                      disabled={creatingSetup}
                      placeholder={`Enter Code For Step ${index + 1}`}
                    />

                    <div className="flex gap-3 mt-3">
                      <Button
                        variant={"secondary"}
                        onClick={handlePreviousStep}
                        disabled={creatingSetup}
                        type="button"
                      >
                        Previous
                      </Button>
                      <Button
                        variant={"destructive"}
                        onClick={() => handleRemoveStep(index)}
                      >
                        Remove
                        <TrashIcon className="ml-2 h-4 w-4" />
                      </Button>
                      <Button
                        variant={"secondary"}
                        onClick={handleNextStep}
                        type="button"
                        disabled={creatingSetup}
                      >
                        Next Step
                      </Button>
                    </div>
                  </div>
                );
              })}
              {isLastStep && (
                <div>
                  <div className="flex items-center justify-between">
                    <Button
                      variant="secondary"
                      onClick={() => {
                        append({
                          codeFile: "",
                          codeDescription: "",
                          codeTitle: "",
                          codeLinks: [],
                        });
                      }}
                    >
                      Add New Steps
                      <PlusIcon className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                  <div className="mt-3">
                    <SubmitLoader
                      defaultText="Create Snippets"
                      loadingIcon={LoaderIcon}
                      loadingState={creatingSetup}
                      loadingText="Creating Snippets"
                    />
                  </div>
                </div>
              )}
              <div className="flex gap-2 mt-4">
                {fields.map((_, index) => (
                  <Button
                    key={index}
                    variant={
                      index + 1 === currentStepIndex || index === 0
                        ? "default"
                        : "secondary"
                    }
                    onClick={() => setCurrentStepIndex(index + 1)}
                    type="button"
                  >
                    {index + 1}
                  </Button>
                ))}
              </div>
            </div>
          </form>
        </Form>
        <DialogClose onClick={handleCloseDialog} asChild>
          <Button variant={"destructive"}>Close</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default CreateSetupButton;
