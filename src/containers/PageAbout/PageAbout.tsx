import rightImg from "images/about-hero-right.png";
import React, { FC } from "react";
import SectionFounder from "./SectionFounder";
import SectionStatistic from "./SectionStatistic";
import { Helmet } from "react-helmet";
import SectionSubscribe2 from "components/SectionSubscribe2/SectionSubscribe2";
import BgGlassmorphism from "components/BgGlassmorphism/BgGlassmorphism";
import BackgroundSection from "components/BackgroundSection/BackgroundSection";
import SectionHero from "./SectionHero";
import SectionClientSay from "components/SectionClientSay/SectionClientSay";

export interface PageAboutProps {
  className?: string;
}

const PageAbout: FC<PageAboutProps> = ({ className = "" }) => {
  return (
    <div
      className={`nc-PageAbout overflow-hidden relative ${className}`}
      data-nc-id="PageAbout"
    >
      <Helmet>
        <title>UTEtravel | Du lịch trong tầm tay</title>
      </Helmet>

      {/* ======== BG GLASS ======== */}
      <BgGlassmorphism />

      <div className="container py-16 lg:py-28 space-y-16 lg:space-y-28">
        <SectionHero
          rightImg={rightImg}
          heading="👋 Chào bạn,"
          btnText=""
          subHeading="Với sự đam mê về du lịch cũng như là đam mê lập trình, chúng tôi đã tạo ra UTEtravel để có thể giúp đỡ mọi người du lịch thoả thích qua màn hình nhỏ và có thể tạo những chuyến đi thực tế cho mình..."
        />

        <SectionFounder />
        {/* <div className="relative py-16">
          <BackgroundSection />
          <SectionClientSay uniqueClassName="PageAbout_" />
        </div>

        <SectionStatistic /> */}
      </div>
    </div>
  );
};

export default PageAbout;
