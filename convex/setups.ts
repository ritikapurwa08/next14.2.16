// convex/setups.ts
import { getAuthUserId } from "@convex-dev/auth/server";
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { paginationOptsValidator } from "convex/server";

export const createSetup = mutation({
  args: {
    setupTitle: v.string(),
    setupDescription: v.optional(v.string()),
    setupUpdatedAt: v.optional(v.string()),
    setupUserName: v.optional(v.string()),
    setupUserEmail: v.optional(v.string()),
    setupThumbnail: v.string(),
    setupLikes: v.number(),
    setupCodeSteps: v.array(
      v.object({
        codeTitle: v.string(),
        codeFile: v.string(),
        codeDescription: v.string(),
        codeLinks: v.array(v.string()),
      })
    ),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);

    if (!userId) {
      throw new Error("User not authenticated");
    }
    const user = await ctx.db.get(userId);

    if (!user) {
      throw new Error("User not found");
    }

    const now = new Date().toISOString();
    const setupId = await ctx.db.insert("setups", {
      setupTitle: args.setupTitle,
      setupUpdatedAt: now,
      setupCodeSteps: args.setupCodeSteps,
      setupLikes: 0,
      setupThumbnail: args.setupThumbnail,
      setupUserName: user.name,
      setupUserEmail: user.email,
      setupDescription: args.setupDescription,
    });
    return setupId;
  },
});

export const updateSetup = mutation({
  args: {
    id: v.id("setups"),
    setupTitle: v.string(),
    setupDescription: v.optional(v.string()),
    setupUpdatedAt: v.optional(v.string()),
    setupUserName: v.optional(v.string()),
    setupUserEmail: v.optional(v.string()),
    setupThumbnail: v.string(),
    setupLikes: v.number(),
    setupCodeSteps: v.array(
      v.object({
        codeTitle: v.string(),
        codeFile: v.string(),
        codeDescription: v.string(),
        codeLinks: v.array(v.string()),
      })
    ),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("User not authenticated");
    }
    const user = await ctx.db.get(userId);

    if (!user) {
      throw new Error("User not found");
    }

    const now = new Date().toISOString();
    await ctx.db.patch(args.id, {
      setupTitle: args.setupTitle,
      setupUpdatedAt: now,
      setupCodeSteps: args.setupCodeSteps,
      setupLikes: args.setupLikes,
      setupThumbnail: args.setupThumbnail,
      setupUserName: user.name,
      setupUserEmail: user.email,
      setupDescription: args.setupDescription,
    });

    return args.id;
  },
});

export const deleteSetup = mutation({
  args: {
    id: v.id("setups"),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);

    if (!userId) {
      throw new Error("User not authenticated");
    }
    const user = await ctx.db.get(userId);

    if (!user) {
      throw new Error("User not found");
    }
    await ctx.db.delete(args.id);

    return args.id;
  },
});

export const getSetupById = query({
  args: {
    id: v.id("setups"),
  },
  handler: async (ctx, args) => {
    const setup = await ctx.db.get(args.id);
    return setup;
  },
});

export const getAllSetups = query({
  args: {
    paginationOpts: paginationOptsValidator,
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);

    // Example: Check if a user is logged in.
    // you can comment the user check if you want to show public data
    if (!userId) {
      throw new Error("User not authenticated");
    }
    const results = await ctx.db
      .query("setups")
      .order("desc")
      .paginate(args.paginationOpts);

    return results;
  },
});

export const incrementLike = mutation({
  args: {
    id: v.id("setups"),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);

    if (!userId) {
      throw new Error("User not authenticated");
    }

    const user = await ctx.db.get(userId);

    if (!user) {
      throw new Error("User not found");
    }

    const setup = await ctx.db.get(args.id);

    if (!setup) {
      throw new Error("Setup not found");
    }

    const likedBy = setup.likedBy || [];

    const hasLiked = likedBy.includes(userId);

    if (hasLiked) {
      await ctx.db.patch(args.id, {
        setupLikes: setup.setupLikes - 1,
        likedBy: likedBy.filter((id) => id !== userId),
      });
    } else {
      await ctx.db.patch(args.id, {
        setupLikes: setup.setupLikes + 1,
        likedBy: [...likedBy, userId],
      });
    }

    return args.id;
  },
});

export const getCustomSetups = query({
  args: {
    searchQuery: v.optional(v.string()),
    filterByUserName: v.optional(v.string()),
    filterByUserEmail: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const userIdentity = await getAuthUserId(ctx);
    if (!userIdentity) {
      return { page: [] };
    }

    const SearchUserName = await ctx.db
      .query("setups")
      .withIndex("byTitle", (q) =>
        q.eq("setupTitle", args.filterByUserName ?? "")
      )
      .order("desc")
      .collect();
  },
});
