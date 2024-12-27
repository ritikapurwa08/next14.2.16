import { api } from "../../../convex/_generated/api";
import { useQuery } from "convex/react";

export default function UseGetCurrentUser() {
  const user = useQuery(api.users.getCurrentUser);
  const isLoading = user === undefined;

  return {
    user,
    isLoading,
  };
}
