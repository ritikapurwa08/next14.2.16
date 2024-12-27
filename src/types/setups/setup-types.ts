// // src/utils/schemas.ts or src/lib/schemas.ts
// import { z } from "zod";

import { z } from "zod";
import { Id } from "../../../convex/_generated/dataModel";

// export const setupStepSchema = z.object({
//   title: z.string().min(1, "Title is required"),
//   code: z.string().min(10, "Code is required"),
//   description: z.string().optional(),
//   links: z.array(z.string()),
// });

// export type SetupStep = z.infer<typeof setupStepSchema>;

// export const setupZodSchema = z.object({
//   setupTitle: z.string().min(1, "Title is required"),
//   setupCreatedAt: z.string(),
//   setupUpdatedAt: z.string(),
//   setupSteps: z.array(setupStepSchema),
//   setupLikes: z.number().int().nonnegative(),
//   setupThumbnail: z.string().min(1, "Thumbnail URL is required"),
//   setupUserName: z.string().min(1, "User id is required"),
//   setupUserEmail: z.string().min(1, "User id is required"),
//   setupDescription: z.string().optional(),
// });

// export type SetupZodType = z.infer<typeof setupZodSchema>;

const codeStepLinkSchema = z.array(z.string());

const codeStepSchema = z.object({
  codeTitle: z.string(),
  codeFile: z.string(),
  codeDescription: z.string(),
  codeLinks: codeStepLinkSchema,
});

export const setupZodSchema = z.object({
  setupTitle: z.string(),
  setupDescription: z.string().optional(),
  setupThumbnail: z.string(),
  setupUpdatedAt: z.string().optional(),
  setupUserName: z.string().optional(),
  setupUserEmail: z.string().optional(),

  setupLikes: z.number(),
  setupCodeSteps: z.array(codeStepSchema),
});

export type SetupZodSchemaType = z.infer<typeof setupZodSchema>;
export type CodeStepSchemaType = z.infer<typeof codeStepSchema>;
export type codeStepLinkType = z.infer<typeof codeStepLinkSchema>;

export interface CodeStep {
  codeTitle: string;
  codeFile: string;
  codeDescription: string;
  codeLinks: string[];
}

export interface SetupCardType {
  _id: Id<"setups">;
  _creationTime: number;
  setupTitle: string;
  setupDescription?: string;
  setupThumbnail: string | undefined;
  setupUpdatedAt?: string;
  setupUserName?: string;
  setupUserEmail?: string;
  setupLikes: number;
  setupCodeSteps: CodeStep[];
  likedBy?: string[];
}
