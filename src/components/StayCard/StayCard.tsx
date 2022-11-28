import React, { FC, useEffect, useState } from "react";
import GallerySlider from "components/GallerySlider/GallerySlider";
import { Link } from "react-router-dom";
import BtnLikeIcon from "components/BtnLikeIcon/BtnLikeIcon";
import SaleOffBadge from "components/SaleOffBadge/SaleOffBadge";
import Badge from "shared/Badge/Badge";
import Stay from "models/stay";
import NoImage from "../../images/no-image.jpg";
import { useSelector } from "react-redux";
import User from "models/user";
import { RootState } from "redux/store";

export interface StayCardProps {
  className?: string;
  data: Stay;
  size?: "default" | "small";
}

const StayCard: FC<StayCardProps> = ({
  size = "default",
  className = "",
  data,
}) => {
  const {
    name,
    addressDescription,
    price,
    bedNumber,
    type,
    stayImage,
    id,
    userLiked,
  } = data;

  const user = useSelector<RootState, User>((state) => state.userStore.user);

  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const index = userLiked?.findIndex((item) => item.id === user.id);
    if (index && index > -1) {
      setLiked(true);
    }
  }, [user, userLiked]);
  // console.log(userLiked?.findIndex((item) => item.id == user.id));

  const renderSliderGallery = () => {
    return (
      <div className="relative w-full">
        <GallerySlider
          uniqueID={`StayCard_${id}`}
          ratioClass="aspect-w-4 aspect-h-3 "
          galleryImgs={
            stayImage.length > 0
              ? stayImage
              : [{ imgId: "19110052", imgLink: NoImage }]
          }
          href={`/stay/${id}`}
        />
        <BtnLikeIcon isLiked={liked} className="absolute right-3 top-3 z-[1]" />
        {/* {saleOff && <SaleOffBadge className="absolute left-3 top-3" />} */}
      </div>
    );
  };

  const renderContent = () => {
    return (
      <div className={size === "default" ? "p-4 space-y-4" : "p-3 space-y-2"}>
        <div className="space-y-2">
          <span className="text-sm text-neutral-500 dark:text-neutral-400">
            <>
              {type} · {bedNumber} giường
            </>
          </span>
          <div className="flex items-center space-x-2">
            {/* {isAds && <Badge name="ADS" color="green" />} */}
            <h2
              className={` font-medium capitalize ${
                size === "default" ? "text-lg" : "text-base"
              }`}
            >
              <span className="line-clamp-1">{name}</span>
            </h2>
          </div>
          <div className="flex items-center text-neutral-500 dark:text-neutral-400 text-sm space-x-2">
            {size === "default" && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            )}
            <span className="">{addressDescription}</span>
          </div>
        </div>
        <div className="w-14 border-b border-neutral-100 dark:border-neutral-800"></div>
        <div className="flex justify-between items-center">
          <span className="text-base font-semibold">
            <>
              ${price}
              {` `}
              {size === "default" && (
                <span className="text-sm text-neutral-500 dark:text-neutral-400 font-normal">
                  /ngày
                </span>
              )}
            </>
          </span>
          {/* {!!reviewStart && (
            <StartRating reviewCount={reviewCount} point={reviewStart} />
          )} */}
        </div>
      </div>
    );
  };

  return (
    <div
      className={`nc-StayCard group relative bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-2xl overflow-hidden will-change-transform hover:shadow-xl transition-shadow ${className}`}
      data-nc-id="StayCard"
    >
      {renderSliderGallery()}
      <Link to={`/listing-stay/stay/${id}`}>{renderContent()}</Link>
    </div>
  );
};

export default StayCard;
