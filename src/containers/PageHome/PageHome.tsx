import SectionHero from "components/SectionHero/SectionHero";
import SectionSliderNewCategories from "components/SectionSliderNewCategories/SectionSliderNewCategories";
import React, { useEffect, useState } from "react";
import SectionSubscribe2 from "components/SectionSubscribe2/SectionSubscribe2";
import SectionOurFeatures from "components/SectionOurFeatures/SectionOurFeatures";
import SectionGridFeaturePlaces from "./SectionGridFeaturePlaces";
import SectionHowItWork from "components/SectionHowItWork/SectionHowItWork";
import BackgroundSection from "components/BackgroundSection/BackgroundSection";
import BgGlassmorphism from "components/BgGlassmorphism/BgGlassmorphism";
import SectionBecomeAnAuthor from "components/SectionBecomeAnAuthor/SectionBecomeAnAuthor";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "redux/store";
import Province from "models/province";
import { getAllProvince } from "redux/slices/provinceSlice";
import { getStayByProvinceID } from "redux/slices/staySlice";
import { searchParamsDefault } from "contains/defaultValue";

function PageHome() {
  const dispatch = useDispatch<AppDispatch>();

  const provinces = useSelector<RootState, Province[]>(
    (state) => state.provinceStore.provinces.content
  );

  useEffect(() => {
    loadAllProvince();
    loadStayByProvinceID();
  }, []);

  const loadAllProvince = async () => {
    try {
      await dispatch(getAllProvince());
    } catch (error) {
      console.log(error);
    }
  };

  const loadStayByProvinceID = async () => {
    try {
      await dispatch(
        getStayByProvinceID({
          ...searchParamsDefault,
          provinceId: provinces[0].id,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="nc-PageHome relative overflow-hidden">
      {/* GLASSMOPHIN */}
      <BgGlassmorphism />

      <div className="container relative space-y-24 mb-24 lg:space-y-28 lg:mb-28">
        {/* SECTION HERO */}
        <SectionHero className="pt-5 lg:pt-5 lg:pb-5" />
        {/* SECTION 1 */}
        <SectionSliderNewCategories
          categories={provinces}
          uniqueClassName="PageHome_s1"
        />
        {/* SECTION2 */}
        <SectionOurFeatures />
        {/* SECTION */}
        <div className="relative py-16">
          <BackgroundSection />
          <SectionGridFeaturePlaces tabs={provinces} />
        </div>
        {/* SECTION */}
        <SectionHowItWork />
        {/* SECTION 1
        <div className="relative py-16">
          <BackgroundSection className="bg-orange-50 dark:bg-black dark:bg-opacity-20 " />
          <SectionSliderNewCategories
            categories={DEMO_CATS_2}
            categoryCardType="card4"
            itemPerRow={4}
            heading="Suggestions for discovery"
            subHeading="Popular places to stay that Chisfis recommends for you"
            sliderStyle="style2"
            uniqueClassName="PageHome_s2"
          />
        </div> */}
        {/* SECTION */}
        {/* <SectionGridCategoryBox /> */}
        {/* Top 10 
        <div className="relative py-16">
          <BackgroundSection className="bg-orange-50 dark:bg-black dark:bg-opacity-20 " />
          <SectionGridAuthorBox />
        </div> */}
        {/* SECTION */}
        <div className="relative py-16">
          <BackgroundSection />
          <SectionBecomeAnAuthor />
        </div>
        {/* SECTION */}
        <SectionSubscribe2 /> //Hợp tác
        {/* SECTION 1
        <SectionSliderNewCategories
          heading="Explore by types of stays"
          subHeading="Explore houses based on 10 types of stays"
          categoryCardType="card5"
          itemPerRow={5}
          uniqueClassName="PageHome_s3"
        /> */}
        {/* SECTION
        <SectionVideos /> */}
        {/* SECTION */}
        {/* <div className="relative py-16">
          <BackgroundSection />
          <SectionClientSay uniqueClassName="PageHome_" />
        </div> */}
      </div>
    </div>
  );
}

export default PageHome;
