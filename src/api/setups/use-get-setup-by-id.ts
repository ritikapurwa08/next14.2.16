import { useQuery } from "convex/react";

import { api } from "@/../convex/_generated/api";
import type { Id } from "@/../convex/_generated/dataModel";

interface UseGetSetupByIdProps {
  id: Id<"setups">;
}

export const UseGetSetupById = ({ id }: UseGetSetupByIdProps) => {
  const data = useQuery(api.setups.getSetupById, { id });
  const isLoading = data === undefined;

  return { data, isLoading };
};
