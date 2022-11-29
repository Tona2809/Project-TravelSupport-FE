import React, { FC } from "react";
import StayCard from "components/StayCard/StayCard";
import { DEMO_STAY_LISTINGS } from "data/listings";
import { StayDataType } from "data/types";
import Pagination from "shared/Pagination/Pagination";
import TabFilters from "./TabFilters";
import Heading2 from "components/Heading/Heading2";
import HeroSearchForm, {
  SearchTab,
} from "components/HeroSearchForm/HeroSearchForm";

export interface SectionGridFilterCardProps {
  className?: string;
  data?: StayDataType[];
  currentPage?: "Địa điểm" | "Khách sạn" | "Phương tiện";
  currentTab?: SearchTab;
}

const DEMO_DATA: StayDataType[] = DEMO_STAY_LISTINGS.filter((_, i) => i < 8);

const SectionGridFilterCard: FC<SectionGridFilterCardProps> = ({
  className = "",
  currentPage,
  currentTab,
  data = DEMO_DATA,
}) => {
  return (
    <>
      <div className="hidden lg:flow-root w-full">
        <div className="z-10 lg:-mt-40 xl:-mt-56 w-full">
          <HeroSearchForm currentPage={currentPage} currentTab={currentTab} />
        </div>
      </div>
      {/* <div
        className={`nc-SectionGridFilterCard ${className}`}
        data-nc-id="SectionGridFilterCard"
      >
        <Heading2 heading={"Địa điểm "} />

        <div className="mb-8 lg:mb-11">
          <TabFilters />
        </div>
        <div className="grid grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {data.map((stay) => (
          <StayCard key={stay.id} data={stay} />
        ))}
        </div>
        <div className="flex mt-16 justify-center items-center">
          <Pagination />
        </div>
      </div>  */}
    </>
  );
};

export default SectionGridFilterCard;
