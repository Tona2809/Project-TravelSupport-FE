import React, { FC } from "react";
import imagePng from "images/hero-right.png";
import HeroSearchForm from "components/HeroSearchForm/HeroSearchForm";

export interface SectionHeroProps {
  className?: string;
}

const SectionHero: FC<SectionHeroProps> = ({ className = "" }) => {
  return (
    <div
      className={`nc-SectionHero flex flex-col-reverse lg:flex-col relative ${className}`}
      data-nc-id="SectionHero"
    >
      <div className="flex flex-col lg:flex-row lg:items-center">
        <div className="flex-shrink-0 lg:w-1/2 flex flex-col items-start space-y-8 sm:space-y-10 pb-14 lg:pb-64 xl:pr-14 lg:mr-10 xl:mr-0">
          <h2 className="font-medium text-4xl md:text-5xl xl:text-7xl !leading-[114%] ">
            Khám phá & trải nghiệm
          </h2>
          <span className="text-base md:text-lg text-neutral-500 dark:text-neutral-400">
            Đồng hành cùng chúng tôi, bạn sẽ có một chuyến đi đầy trải nghiệm. Với UTEtravel,
            tham khảo, lên kế hoạch, book lịch,...
          </span>
        </div>
        <div className="flex-grow">
          <img className="w-full" src={imagePng} alt="hero" />
        </div>
      </div>
      <div className="hidden lg:block z-10 mb-12 lg:mb-0 lg:-mt-60 w-full">
        <HeroSearchForm />
      </div>
    </div>
  );
};

export default SectionHero;
