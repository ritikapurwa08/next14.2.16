import Image from "next/image";
import React from "react";
import { logo, red_heart } from "../../../public/images";
import Link from "next/link";
import { formatDistance, parseISO } from "date-fns";
import UpdateSetupButton from "./update-setup-button";
import { cn } from "@/lib/utils";

import LikeButton from "./like-button";
import { SetupCardType } from "@/types/setups/setup-types";
import DeleteSetupDialog from "./delete-setup-button";

const SetupCard: React.FC<SetupCardType> = ({
  setupTitle,
  setupUpdatedAt,
  _creationTime,
  _id,
  setupLikes,
  likedBy,
  setupUserName,
  setupDescription,
}) => {
  const formattedUpdateTime = setupUpdatedAt
    ? formatDistance(parseISO(setupUpdatedAt), new Date(), {
        addSuffix: true,
      })
    : null;

  const formattedCreationTime = formatDistance(
    new Date(_creationTime),
    new Date(),
    {
      addSuffix: true,
    }
  );

  return (
    <div className="setup-card border rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out flex flex-col">
      <Link href={`/setups/${_id}`} className="block">
        <div className=" h-auto w-full overflow-hidden p-4 max-h-40  relative">
          <Image
            src={logo}
            alt={`${setupTitle} Thumbnail`}
            className="rounded-t-lg h-full aspect-video  w-auto object-cover"
            height={150}
            width={150}
          />
        </div>
      </Link>
      <div className="p-4 flex flex-col h-[150px] justify-between flex-grow">
        <div>
          <Link href={`/setups/${_id}`} className="block">
            <h2 className="text-xl font-bold mb-2 line-clamp-2 hover:text-blue-500 transition-colors duration-300">
              {setupTitle}
            </h2>
          </Link>
          {setupDescription && (
            <p className="text-gray-700 text-sm line-clamp-2 mb-2">
              {setupDescription}
            </p>
          )}
        </div>
        <div className="flex justify-between items-center mt-2">
          <div className="flex flex-col">
            <p className="text-gray-500 text-xs">
              {formattedUpdateTime
                ? `Updated ${formattedUpdateTime}`
                : `Created ${formattedCreationTime}`}
            </p>
            <p className="text-gray-600 text-xs">by {setupUserName}</p>
          </div>
          <div className="flex items-center space-x-2">
            {/*  Like Button*/}
            <LikeButton setupId={_id} likedBy={likedBy} />
            <div className="flex items-center bg-gray-100 px-2 py-1 rounded-md">
              <Image src={red_heart} alt="red-hear" height={16} width={16} />
              <span className="text-blue-600 ml-1 text-sm">{setupLikes}</span>
            </div>
          </div>
        </div>
      </div>
      <div
        className={cn(
          "p-4 border-t flex justify-between items-center",
          formattedUpdateTime && "border-t-gray-300"
        )}
      >
        <UpdateSetupButton id={_id} />
        <DeleteSetupDialog id={_id} />
      </div>
    </div>
  );
};

export default SetupCard;
