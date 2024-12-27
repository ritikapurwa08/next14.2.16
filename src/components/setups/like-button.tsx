// components/setups/like-button.tsx
import React, { useState, useEffect } from "react";
import { add_heart, red_heart } from "../../../public/images";
import { UseIncrementLike } from "@/api/setups/use-increment-like";
import Image from "next/image";
import { cn } from "@/lib/utils";
import UseGetCurrentUser from "@/api/auth/getCurrentUser";
import { Id } from "../../../convex/_generated/dataModel";

interface LikeButtonProps {
  setupId: Id<"setups">;
  likedBy?: string[] | undefined;
}

const LikeButton: React.FC<LikeButtonProps> = ({ setupId, likedBy }) => {
  const { user } = UseGetCurrentUser();
  const [liked, setLiked] = useState(false);
  const { mutate: incrementLike, isPending: likingSetup } = UseIncrementLike();

  useEffect(() => {
    if (user && likedBy?.includes(user._id)) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [likedBy, user]);

  const handleLike = () => {
    setLiked(!liked);
    incrementLike(
      { id: setupId },
      {
        onSuccess: (data) => {
          console.log("like incremented", data);
        },
        onError: (error) => {
          console.log("error incrementing like", error);
        },
        onSettled: () => {
          console.log("like mutation settled.");
        },
      }
    );
  };

  return (
    <button
      className="hover:scale-110 transition-transform duration-200"
      onClick={handleLike}
      disabled={likingSetup}
    >
      <Image
        src={liked ? red_heart : add_heart}
        alt="red-hear"
        height={24}
        width={24}
      />
    </button>
  );
};

export default LikeButton;
