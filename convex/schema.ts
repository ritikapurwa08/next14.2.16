// convex/schema.ts
import { authTables } from "@convex-dev/auth/server";
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

const Schema = defineSchema({
  ...authTables,
  setups: defineTable({
    setupTitle: v.string(),
    setupThumbnail: v.optional(v.string()),
    setupUpdatedAt: v.optional(v.string()),
    setupDescription: v.optional(v.string()),
    setupUserName: v.optional(v.string()),
    setupUserEmail: v.optional(v.string()),
    setupLikes: v.number(),
    setupCodeSteps: v.array(
      v.object({
        codeTitle: v.string(),
        codeFile: v.string(),
        codeDescription: v.string(),
        codeLinks: v.array(v.string()),
      })
    ),
    likedBy: v.optional(v.array(v.string())), // Add the likedBy field here
  }),
});

export default Schema;
