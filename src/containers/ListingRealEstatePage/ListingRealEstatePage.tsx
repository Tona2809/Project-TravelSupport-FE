import BackgroundSection from "components/BackgroundSection/BackgroundSection";
import SectionSliderNewCategories from "components/SectionSliderNewCategories/SectionSliderNewCategories";
import SectionSubscribe2 from "components/SectionSubscribe2/SectionSubscribe2";
import { TaxonomyType } from "data/types";
import React, { FC, useEffect } from "react";
import SectionGridFilterCard from "./SectionGridFilterCard";
import { Helmet } from "react-helmet";
import SectionHero2ArchivePage from "components/SectionHero2ArchivePage/SectionHero2ArchivePage";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "redux/store";
import Province from "models/province";
import { getAllProvince } from "redux/slices/provinceSlice";

export interface ListingRealEstatePageProps {
  className?: string;
}

const DEMO_CATS: TaxonomyType[] = [
  {
    id: "1",
    href: "#",
    name: "Enjoy the Beauty of Brazil ",
    taxonomy: "category",
    count: 17288,
    thumbnail:
      "https://images.pexels.com/photos/1118877/pexels-photo-1118877.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
    listingType: "experiences",
  },
  {
    id: "2",
    href: "#",
    name: "Enjoy the Beauty of Paris",
    taxonomy: "category",
    count: 2118,
    thumbnail:
      "https://images.pexels.com/photos/2412609/pexels-photo-2412609.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    listingType: "experiences",
  },
  {
    id: "3",
    href: "#",
    name: "Enjoy the Beauty of Bangkok",
    taxonomy: "category",
    count: 36612,
    thumbnail:
      "https://images.pexels.com/photos/732895/pexels-photo-732895.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    listingType: "experiences",
  },
  {
    id: "5",
    href: "#",
    name: "Enjoy the Beauty of Singapore",
    taxonomy: "category",
    count: 188288,
    thumbnail:
      "https://images.pexels.com/photos/3152124/pexels-photo-3152124.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
    listingType: "experiences",
  },
  {
    id: "4",
    href: "#",
    name: "Enjoy the Beauty of Seoul",
    taxonomy: "category",
    count: 188288,
    thumbnail:
      "https://images.pexels.com/photos/373290/pexels-photo-373290.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    listingType: "experiences",
  },
];

const ListingRealEstatePage: FC<ListingRealEstatePageProps> = ({
  className = "",
}) => {
  useEffect(() => {
    const $body = document.querySelector("body");
    if ($body) {
      $body.className = "theme-cyan-blueGrey";
    }
    return () => {
      if ($body) {
        $body.className = "";
      }
    };
  }, []);

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
      className={`nc-ListingRealEstatePage relative overflow-hidden ${className}`}
      data-nc-id="ListingRealEstatePage"
    >
      <Helmet>
        <title>Chisfis || Booking React Template</title>
      </Helmet>

      <div className="container relative">
        {/* SECTION HERO */}
        <SectionHero2ArchivePage className="" />

        {/* SECTION */}
        <SectionGridFilterCard className="py-24 lg:py-28" />

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
            uniqueClassName="nc-ListingRealEstatePage"
          />
        </div>

        {/* SECTION */}
        <SectionSubscribe2 className="py-24 lg:py-28" />
      </div>
    </div>
  );
};

export default ListingRealEstatePage;
