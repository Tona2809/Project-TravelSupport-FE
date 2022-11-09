import BackgroundSection from "components/BackgroundSection/BackgroundSection";
import BgGlassmorphism from "components/BgGlassmorphism/BgGlassmorphism";
import SectionHeroArchivePage from "components/SectionHeroArchivePage/SectionHeroArchivePage";
import SectionSliderNewCategories from "components/SectionSliderNewCategories/SectionSliderNewCategories";
import SectionSubscribe2 from "components/SectionSubscribe2/SectionSubscribe2";
import { TaxonomyType } from "data/types";
import React, { FC, useEffect } from "react";
import SectionGridFilterCard from "./SectionGridFilterCard";
import { Helmet } from "react-helmet";
import { getAllProvince } from "redux/slices/provinceSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "redux/store";
import Province from "models/province";

export interface ListingExperiencesPageProps {
  className?: string;
}

const ListingExperiencesPage: FC<ListingExperiencesPageProps> = ({
  className = "",
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const provinces = useSelector<RootState, Province[]>(
    (state) => state.provinceStore.provinces.content
  );

  useEffect(() => {
    loadAllProvince();
  }, []);

  const loadAllProvince = async () => {
    try {
      await dispatch(getAllProvince());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={`nc-ListingExperiencesPage relative overflow-hidden ${className}`}
      data-nc-id="ListingExperiencesPage"
    >
      <Helmet>
        <title>UTEtravel | Du lịch trong tầm tay</title>
      </Helmet>
      <BgGlassmorphism />

      <div className="container relative">
        {/* SECTION HERO */}
        <SectionHeroArchivePage
          currentPage="Khách sạn"
          currentTab="Khách sạn"
          listingType={
            <>
              <i className="text-2xl las la-umbrella-beach"></i>
              <span className="ml-2.5">1599 experiences</span>
            </>
          }
          className="pt-10 pb-24 lg:pb-28 lg:pt-16 "
        />

        {/* SECTION */}
        <SectionGridFilterCard className="pb-24 lg:pb-28" />

        {/* SECTION 1 */}
        <div className="relative py-16">
          <BackgroundSection />
          <SectionSliderNewCategories
            heading="Explore top destination ✈"
            subHeading="Explore thousands of destinations around the world"
            categoryCardType="card4"
            itemPerRow={4}
            categories={provinces}
            sliderStyle="style2"
            uniqueClassName="ListingExperiencesPage"
          />
        </div>

        {/* SECTION */}
        <SectionSubscribe2 className="py-24 lg:py-28" />
      </div>
    </div>
  );
};

export default ListingExperiencesPage;
