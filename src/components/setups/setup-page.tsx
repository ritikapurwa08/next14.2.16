// components/SetupsList.tsx
"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetSetups } from "@/api/setups/get-all-setups";
import SetupCard from "./setup-card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useState, useMemo } from "react";

const ITEMS_PER_PAGE = 6;

const SetupsList = () => {
  const {
    results,
    loadMore,
    isLoading,
    statusCanLoadMore,
    isLoadingMore,
    isExhausted,
    isLoadingFirstPage,
  } = useGetSetups();
  const [currentPage, setCurrentPage] = useState(1);
  const [loadedPages, setLoadedPages] = useState<number[]>([1]);

  const totalPages = useMemo(() => {
    if (!results) return 0;
    return Math.ceil(results.length / ITEMS_PER_PAGE);
  }, [results]);

  const displayedPages = useMemo(() => {
    if (!results) return [];
    const total = Math.ceil(results.length / ITEMS_PER_PAGE);
    return Array.from({ length: total }, (_, i) => i + 1);
  }, [results]);

  const paginatedResults = useMemo(() => {
    if (!results) return [];
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return results.slice(startIndex, endIndex);
  }, [results, currentPage]);

  const handlePageChange = async (page: number) => {
    setCurrentPage(page);

    if (!loadedPages.includes(page)) {
      if (statusCanLoadMore) {
        setLoadedPages((prev) => [...prev, page]);
        await loadMore();
      }
    }
  };

  const isInitialLoading = isLoadingFirstPage && !results;
  const hasData = !!results && results.length > 0;
  const isLoadMoreDisabled =
    isLoading || isLoadingMore || (isExhausted && currentPage === totalPages);
  const canLoadMore = statusCanLoadMore;

  const handlePreviousPage = () => {
    if (currentPage > 1 && !isLoading) {
      handlePageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (!isLoadMoreDisabled) {
      handlePageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {isInitialLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
            <div
              key={`skeleton-${index}`}
              className="border p-4 rounded-md shadow-md"
            >
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-1/3" />
                  <Skeleton className="h-4 w-1/4" />
                </div>
                <Skeleton className="h-32 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
              </div>
            </div>
          ))}
        </div>
      )}
      {hasData && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {paginatedResults.map((item) => (
              <SetupCard
                _id={item._id}
                _creationTime={item._creationTime}
                key={item._id}
                setupCodeSteps={item.setupCodeSteps}
                setupUpdatedAt={item.setupUpdatedAt}
                setupLikes={item.setupLikes}
                setupThumbnail={item.setupThumbnail}
                setupTitle={item.setupTitle}
                setupUserName={item.setupUserName}
                setupUserEmail={item.setupUserEmail}
                setupDescription={item.setupDescription}
              />
            ))}
          </div>
          <Pagination className="self-center  mt-4">
            <PaginationPrevious onClick={handlePreviousPage} />
            <PaginationContent>
              {displayedPages.map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    isActive={currentPage === page}
                    onClick={() => {
                      handlePageChange(page);
                    }}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}
            </PaginationContent>
            <PaginationNext onClick={handleNextPage} />
          </Pagination>
        </>
      )}
      {isLoadingFirstPage && results?.length === 0 && (
        <div>Error loading setups</div>
      )}
      {isExhausted && results?.length === 0 && <div>No more setups found.</div>}
    </div>
  );
};

export default SetupsList;
