import { getAuthUserId } from "@convex-dev/auth/server";
import { query } from "../convex/_generated/server";

export const getCurrentUser = query({
  args: {},
  handler: async (ctx) => {
    const user = await getAuthUserId(ctx);

    if (!user) {
      return null;
    }

    const userId = await ctx.db.get(user);

    return userId;
  },
});
