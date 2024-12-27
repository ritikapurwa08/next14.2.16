import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

export const UseGetAllSetups = () => {
  const data = useQuery(api.setups.getAllSetups);
  const isLoading = data === undefined;
  return {
    data,
    isLoading,
  };
};
