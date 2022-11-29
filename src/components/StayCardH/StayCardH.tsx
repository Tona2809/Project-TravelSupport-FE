import React, { FC, useState } from "react";
import GallerySlider from "components/GallerySlider/GallerySlider";
import { DEMO_STAY_LISTINGS } from "data/listings";
import { StayDataType } from "data/types";
import StartRating from "components/StartRating/StartRating";
import { Link } from "react-router-dom";
import BtnLikeIcon from "components/BtnLikeIcon/BtnLikeIcon";
import SaleOffBadge from "components/SaleOffBadge/SaleOffBadge";
import Badge from "shared/Badge/Badge";
import Stay from "models/stay";
import NoImage from "../../images/no-image.jpg";

export interface StayCardHProps {
  className?: string;
  userliked?: boolean;
  data: Stay;
}

const DEMO_DATA = DEMO_STAY_LISTINGS[0];

const StayCardH: FC<StayCardHProps> = ({ className = "", data, userliked }) => {
  const {
    name,
    addressDescription,
    price,
    bedNumber,
    bedroomNumber,
    maxPeople,
    bathNumber,
    type,
    stayImage,
    id,
  } = data;
  const [liked, setLiked] = useState(userliked);

  const renderSliderGallery = () => {
    return (
      <div className="relative flex-shrink-0 w-full md:w-72 ">
        {/* <GallerySlider
          ratioClass="aspect-w-6 aspect-h-5"
          galleryImgs={galleryImgs}
          uniqueID={`StayCardH_${id}`}
          href={href}
        /> */}
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
        <BtnLikeIcon isLiked={liked} className="absolute right-3 top-3" />
        {/* {saleOff && <SaleOffBadge className="absolute left-3 top-3" />} */}
      </div>
    );
  };

  const renderTienIch = () => {
    return (
      <div className="hidden sm:grid grid-cols-3 gap-2">
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <i className="las la-user text-lg"></i>
            <span className="text-sm text-neutral-500 dark:text-neutral-400">
              <>{maxPeople} người</>
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <i className="las la-bed text-lg"></i>
            <span className="text-sm text-neutral-500 dark:text-neutral-400">
              <>{bedroomNumber} phòng ngủ</>
            </span>
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <i className="las la-bath text-lg"></i>
            <span className="text-sm text-neutral-500 dark:text-neutral-400">
              <>{bathNumber} phòng tắm</>
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <i className="las la-smoking-ban text-lg"></i>
            <span className="text-sm text-neutral-500 dark:text-neutral-400">
              Không hút thuốc
            </span>
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <i className="las la-door-open text-lg"></i>
            <span className="text-sm text-neutral-500 dark:text-neutral-400">
              <>{bedNumber} giường</>
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <i className="las la-wifi text-lg"></i>
            <span className="text-sm text-neutral-500 dark:text-neutral-400">
              Wifi
            </span>
          </div>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    return (
      <div className="flex-grow p-3 sm:p-5 flex flex-col">
        <div className="space-y-2">
          <div className="text-sm text-neutral-500 dark:text-neutral-400">
            <span>
              {type} in {addressDescription}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <h2 className="text-lg font-medium capitalize">
              <span className="line-clamp-1">{name}</span>
            </h2>
          </div>
        </div>
        <div className="hidden sm:block w-14 border-b border-neutral-100 dark:border-neutral-800 my-4"></div>
        {renderTienIch()}
        <div className="w-14 border-b border-neutral-100 dark:border-neutral-800 my-4"></div>
        <div className="flex justify-between items-end">
          {/* <StartRating reviewCount={reviewCount} point={reviewStart} /> */}
          <span className="text-base font-semibold text-secondary-500">
            <>
              ${price}
              {` `}
              <span className="text-sm text-neutral-500 dark:text-neutral-400 font-normal">
                /đêm
              </span>
            </>
          </span>
        </div>
      </div>
    );
  };

  return (
    <div
      className={`nc-StayCardH group relative bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-2xl overflow-hidden hover:shadow-xl transition-shadow will-change-transform ${className}`}
      data-nc-id="StayCardH"
    >
      <Link to={`/listing-stay/stay/${id}`} className="absolute inset-0"></Link>
      <div className="grid grid-cols-1 md:flex md:flex-row ">
        {renderSliderGallery()}
        {renderContent()}
      </div>
    </div>
  );
};

export default StayCardH;
