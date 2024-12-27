"use client";
import { UseGetAllSetups } from "@/api/setups/get-all-setups";
import SetupCard from "@/components/setups/setup-card";
import { Skeleton } from "@/components/ui/skeleton";
import SetupLoadingCard from "./setups-loading-card";

const SetupShowCasePage = () => {
  const { data: setups, isLoading } = UseGetAllSetups();

  if (isLoading) {
    return (
      <div className="grid sm:grid-cols-1 md:grid-cols-2 grid-cols-3 w-full border-red-400 mx-auto gap-4">
        {Array.from({ length: 8 }).map(
          (
            _,
            index // Show 8 loading cards by default.
          ) => (
            <SetupLoadingCard key={index} />
          )
        )}
      </div>
    );
  }

  if (!setups) {
    return <div>No setups found.</div>; // Handle null or undefined data
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 grid-cols-3 mx-auto w-full gap-4">
      {setups.map((item) => (
        <SetupCard
          _id={item._id}
          _creationTime={item._creationTime}
          key={item._id} // Use Convex _id as the key
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
  );
};

export default SetupShowCasePage;
