import React, { FC, ReactNode, useEffect, useState } from "react";
import { DEMO_STAY_LISTINGS } from "data/listings";
import { StayDataType } from "data/types";

import HeaderFilter from "./HeaderFilter";
import StayCard from "components/StayCard/StayCard";
import Province from "models/province";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "redux/store";
import Stay from "models/stay";
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
  tabs?: Province[];
}

const SectionGridFeaturePlaces: FC<SectionGridFeaturePlacesProps> = ({
  stayListings = DEMO_DATA,
  gridClass = "",
  heading = "Những nơi nghỉ ngơi nổi bật",
  subHeading = "Những nơi phổ biến mà UTEtravel gọi ý cho bạn nè",
  headingIsCenter,
  tabs,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const stays = useSelector<RootState, Stay[]>(
    (state) => state.stayStore.stays.content
  );
  const provinces = useSelector<RootState, Province[]>(
    (state) => state.provinceStore.provinces.content
  );

  const [activeProvince, setActiveProvince] = useState<Province>(provinces[0]);

  const renderCard = (stay: Stay) => {
    return <StayCard key={stay.id} data={stay} />;
  };

  useEffect(() => {
    setActiveProvince(provinces[0]);
  }, [provinces]);

  useEffect(() => {
    loadStayByProvinceID();
  }, [activeProvince]);

  const loadStayByProvinceID = async () => {
    try {
      dispatch(
        getStayByProvinceID({
          ...searchParamsDefault,
          provinceId: activeProvince.id,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="nc-SectionGridFeaturePlaces relative">
      <HeaderFilter
        tabActive={activeProvince?.name}
        subHeading={subHeading}
        tabs={provinces}
        heading={heading}
        onClickTab={(province) => setActiveProvince(province)}
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
