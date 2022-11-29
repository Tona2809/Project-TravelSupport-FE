import { StarIcon } from "@heroicons/react/24/solid";
import Rating from "models/rating";
import moment from "moment";
import React, { FC } from "react";
import Avatar from "shared/Avatar/Avatar";

export interface CommentListingProps {
  className?: string;
  data?: Rating;
  hasListingTitle?: boolean;
}

const CommentListing: FC<CommentListingProps> = ({
  className = "",
  data,
  hasListingTitle,
}) => {
  return (
    <div
      className={`nc-CommentListing flex space-x-4 ${className}`}
      data-nc-id="CommentListing"
    >
      <div className="pt-0.5">
        <Avatar
          sizeClass="h-10 w-10 text-lg"
          radius="rounded-full"
          userName={data?.userRating?.fullName}
          imgUrl={data?.userRating?.imgLink}
        />
      </div>
      <div className="flex-grow">
        <div className="flex justify-between space-x-3">
          <div className="flex flex-col">
            <div className="text-sm font-semibold">
              <span>{data?.userRating?.fullName}</span>
              {hasListingTitle && (
                <>
                  <span className="text-neutral-500 dark:text-neutral-400 font-normal">
                    {` review in `}
                  </span>
                  <a href="/">The Lounge & Bar</a>
                </>
              )}
            </div>
            <span className="text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">
              {data?.created_at &&
                moment(data?.created_at).format("DD/MM/YYYY HH:mm")}
            </span>
          </div>
          <div className="flex text-yellow-500">
            {Array(data?.rate)
              .fill(0)
              .map((_, i) => (
                <StarIcon className="w-4 h-4" />
              ))}
          </div>
        </div>
        <span className="block mt-3 text-neutral-6000 dark:text-neutral-300">
          {data?.message}
        </span>
      </div>
    </div>
  );
};

export default CommentListing;
