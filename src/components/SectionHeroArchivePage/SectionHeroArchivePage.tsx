import React, { FC, ReactNode } from "react";
import imagePng from "images/hero-right.png";
import HeroSearchForm, {
  SearchTab,
} from "components/HeroSearchForm/HeroSearchForm";

export interface SectionHeroArchivePageProps {
  className?: string;
  listingType?: ReactNode;
  currentPage: "Địa điểm" | "Khách sạn" | "Phương tiện";
  currentTab: SearchTab;
  rightImage?: string;
}

const SectionHeroArchivePage: FC<SectionHeroArchivePageProps> = ({
  className = "",
  listingType,
  currentPage,
  currentTab,
  rightImage = imagePng,
}) => {
  return (
    <div
      className={`nc-SectionHeroArchivePage flex flex-col relative ${className}`}
      data-nc-id="SectionHeroArchivePage"
    >
      <div className="flex flex-col lg:flex-row lg:items-center">
        <div className="flex-shrink-0 lg:w-1/2 flex flex-col items-start space-y-6 lg:space-y-10 pb-14 lg:pb-64 xl:pb-80 xl:pr-14 lg:mr-10 xl:mr-0">
          <h2 className="font-medium text-4xl md:text-5xl xl:text-7xl leading-[110%]">
            Việt Nam ơi
          </h2>
          <div className="flex items-center text-base md:text-lg text-neutral-500 dark:text-neutral-400">
            {/* <i className="text-2xl las la-map-marked"></i> */}
            {/* <span className="ml-2.5">Jappan </span>
            <span className="mx-5"></span>
            {listingType ? (
              listingType
            ) : (
              <>
                <i className="text-2xl las la-home"></i>
                <span className="ml-2.5">112 properties</span>
              </>
            )} */}
            <span className="text-base md:text-lg text-neutral-500 dark:text-neutral-400">
              Bạn có nghe âm thanh gì không... Từ núi xanh băng qua biển đông
              Hào khí cha ông ta muôn đời... Bao la, bao la nước non quê hương
              Việt Nam ơi Giờ đứng đây phất cao cờ bay. Dòng nước Nam tung muôn
              ngàn mây. Thề khó khăn gian nguy nào, hiên ngang bước chân ta
              về...
            </span>
          </div>
        </div>
        <div className="flex-grow">
          <img className="w-full" src={rightImage} alt="hero" />
        </div>
      </div>
    </div>
  );
};

export default SectionHeroArchivePage;
