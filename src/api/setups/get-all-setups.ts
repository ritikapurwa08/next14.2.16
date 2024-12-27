// components/hooks/use-get-setups.ts
"use client";
import { usePaginatedQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

const BATCH_SIZE = 6; // Define your desired batch size

export type GetSetupsReturnType =
  (typeof api.setups.getAllSetups._returnType)["page"];

export const useGetSetups = () => {
  const { results, status, loadMore, isLoading } = usePaginatedQuery(
    api.setups.getAllSetups,
    {},
    { initialNumItems: BATCH_SIZE }
  );
  const statusCanLoadMore = status === "CanLoadMore";
  const isLoadingMore = status === "LoadingMore";
  const isExhausted = status === "Exhausted";
  const isLoadingFirstPage = status === "LoadingFirstPage";

  return {
    results,
    loadMore: () => loadMore(BATCH_SIZE),
    isLoading,
    statusCanLoadMore,
    isLoadingMore,
    isExhausted,
    isLoadingFirstPage,
  };
};
