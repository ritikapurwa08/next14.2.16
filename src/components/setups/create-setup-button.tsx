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
  const { mutate: createSetup, isPending: creatingSetup } = UseCreateSetup();
  const [open, setOpen] = useState(false);

  const [showSetupDescription, setShowSetupDescription] = useState(false);
  const [showThumnailInput, setShowThumnailInput] = useState(false);
  const [showCodeSetupDesction, setShowCodeSetupDesction] = useState(false);
  const [showCodeSetupLinks, setShowCodeSetupLinks] = useState(false);

  const handleShowSetupDescription = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowSetupDescription((prev) => !prev);
  };
  const handleShowThumnailInput = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowThumnailInput((prev) => !prev);
  };
  const handleShowCodeSetupDesction = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowCodeSetupDesction((prev) => !prev);
  };
  const handleShowCodeSetupLinks = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowCodeSetupLinks((prev) => !prev);
  };

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
    setOpen(false);
    form.reset();
  };

  const handleRemoveStep = (index: number) => {
    remove(index);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Create Setup</Button>
      </DialogTrigger>
      <DialogContent className=" max-h-[80%]  overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create a New Setup</DialogTitle>
          <DialogDescription>
            Fill the necessary details to create your snippet
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleCreateSetup)}>
            <div className="space-y-4">
              <div className="">
                <CustomInput
                  control={form.control}
                  name="setupTitle"
                  label="Setup Title"
                  disabled={creatingSetup}
                  placeholder="Enter title for the setup"
                />
              </div>

              <div className="flex flex-row gap-x-2">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleShowThumnailInput}
                  className="h-10 w-fit px-4 text-sm"
                  asChild
                >
                  <p>
                    {showThumnailInput ? "Hide Thumbnail" : "Add Thumbnail"}
                  </p>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleShowSetupDescription}
                  asChild
                >
                  <p>
                    {showSetupDescription
                      ? "Hide Description"
                      : "Show Description"}
                  </p>
                </Button>
              </div>

              {showSetupDescription && (
                <CustomTextarea
                  control={form.control}
                  name="setupDescription"
                  label="Setup Description"
                  placeholder="Describe your setup"
                />
              )}
              {showThumnailInput && (
                <CustomInput
                  control={form.control}
                  name="setupThumbnail"
                  label="Thumbnail URL"
                  disabled={creatingSetup}
                  placeholder="Add thumbnail URL"
                />
              )}

              {fields.map((field, index) => {
                return (
                  <div key={field.id}>
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
                      name={`setupCodeSteps.${index}.codeFile`}
                      label="Code"
                      disabled={creatingSetup}
                      placeholder={`Enter Code For Step ${index + 1}`}
                    />

                    <div>
                      <div className="flex flex-row my-2 gap-x-2">
                        <Button
                          variant="outline"
                          size="lg"
                          onClick={handleShowCodeSetupDesction}
                          type="button"
                        >
                          {showCodeSetupDesction
                            ? "Hide Description"
                            : "Show Description"}
                        </Button>
                        <Button
                          variant="outline"
                          size="lg"
                          onClick={handleShowCodeSetupLinks}
                          type="button"
                        >
                          {showCodeSetupLinks
                            ? "Hide CodeLinks"
                            : "Show CodeLinks"}
                        </Button>
                      </div>
                    </div>

                    <div>
                      {showCodeSetupDesction && (
                        <CustomTextarea
                          control={form.control}
                          name={`setupCodeSteps.${index}.codeDescription`}
                          label="Step Description"
                          disabled={creatingSetup}
                          placeholder={`Enter Step Description ${index + 1}`}
                        />
                      )}
                      {showCodeSetupLinks && (
                        <CustomInput
                          control={form.control}
                          name={`setupCodeSteps.${index}.codeLinks`}
                          label="Link"
                          disabled={creatingSetup}
                          placeholder={`Enter Link For Step ${index + 1}`}
                        />
                      )}
                    </div>

                    <div className="flex gap-3 mt-3">
                      <Button
                        variant={"destructive"}
                        onClick={() => handleRemoveStep(index)}
                        type="button"
                      >
                        Remove
                        <TrashIcon className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                );
              })}
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
                    type="button"
                  >
                    Add Step
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
