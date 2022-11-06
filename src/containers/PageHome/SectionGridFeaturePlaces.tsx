import React, { FC, ReactNode, useEffect, useState } from "react";
import { DEMO_STAY_LISTINGS } from "data/listings";
import { StayDataType } from "data/types";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import HeaderFilter from "./HeaderFilter";
import StayCard from "components/StayCard/StayCard";
import Province from "models/province";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "redux/store";
import Stay from "models/stay";
import { SearchParams } from "types";
import { getStayByProvinceID } from "redux/slices/staySlice";
import { searchParamsDefault } from "contains/defaultValue";

// OTHER DEMO WILL PASS PROPS
const DEMO_DATA: StayDataType[] = DEMO_STAY_LISTINGS.filter((_, i) => i < 8);

//
export interface SectionGridFeaturePlacesProps {
  stayListings?: StayDataType[];
  gridClass?: string;
  heading?: ReactNode;
  subHeading?: ReactNode;
  headingIsCenter?: boolean;
  tabs: Province[];
}

const SectionGridFeaturePlaces: FC<SectionGridFeaturePlacesProps> = ({
  stayListings = DEMO_DATA,
  gridClass = "",
  heading = "Những nơi nghỉ ngơi nổi bật",
  subHeading = "Những nơi phổ biến mà UTEtravel gọi ý cho bạn nè",
  headingIsCenter,
  tabs,
}) => {
  const stays = useSelector<RootState, Stay[]>(
    (state) => state.stayStore.stays.content
  );

  const renderCard = (stay: Stay) => {
    return <StayCard key={stay.id} data={stay} />;
  };

  return (
    <div className="nc-SectionGridFeaturePlaces relative">
      <HeaderFilter
        tabActive={tabs[0]?.name || ""}
        subHeading={subHeading}
        tabs={tabs}
        heading={heading}
        onClickTab={(item) => {}}
      />
      <div
        className={`grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ${gridClass}`}
      >
        {stays.map((stay) => renderCard(stay))}
      </div>
      {/* <div className="flex mt-16 justify-center items-center">
        <ButtonPrimary loading>Xem thêm nữa nè</ButtonPrimary>
      </div> */}
    </div>
  );
};

export default SectionGridFeaturePlaces;
