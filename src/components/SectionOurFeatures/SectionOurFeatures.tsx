import React, { FC } from "react";
import rightImgPng from "images/our-features.png";
import NcImage from "shared/NcImage/NcImage";
import Badge from "shared/Badge/Badge";

export interface SectionOurFeaturesProps {
  className?: string;
  rightImg?: string;
  type?: "type1" | "type2";
}

const SectionOurFeatures: FC<SectionOurFeaturesProps> = ({
  className = "lg:py-14",
  rightImg = rightImgPng,
  type = "type1",
}) => {
  return (
    <div
      className={`nc-SectionOurFeatures relative flex flex-col items-center ${type === "type1" ? "lg:flex-row" : "lg:flex-row-reverse"
        } ${className}`}
      data-nc-id="SectionOurFeatures"
    >
      <div className="flex-grow">
        <NcImage src={rightImg} />
      </div>
      <div
        className={`max-w-2xl flex-shrink-0 mt-10 lg:mt-0 lg:w-2/5 ${type === "type1" ? "lg:pl-16" : "lg:pr-16"
          }`}
      >
        <span className="uppercase text-sm text-gray-400 tracking-widest">
          Nổi bật
        </span>
        <h2 className="font-semibold text-4xl mt-5">Du lịch cùng UTEtravel</h2>

        <ul className="space-y-10 mt-16">
          <li className="space-y-4">
            <Badge name="Khám phá" />
            <span className="block text-xl font-semibold">
              Khám phá
            </span>
            <span className="block mt-5 text-neutral-500 dark:text-neutral-400">
              Du lịch, tham quan qua màn ảnh nhỏ với UTEtravel. Bạn có thể tìm hiểu về cuộc sống xung quanh ta và có thể dần thực hiện ước mơ đặt chân đến những nơi mình chưa từng đến chỉ bằng một cú click chuột.
            </span>
          </li>
          <li className="space-y-4">
            <Badge color="green" name="Tinh tế" />
            <span className="block text-xl font-semibold">
              An tâm và đơn giản
            </span>
            <span className="block mt-5 text-neutral-500 dark:text-neutral-400">
              UTEtravel mang lại cho bạn sự an tâm và dễ dàng nhất trong việc đặt phòng và thanh toán trực tuyến.
            </span>
          </li>
          <li className="space-y-4">
            <Badge color="red" name="Cá nhân" />
            <span className="block text-xl font-semibold">
              Cá nhân hoá chuyến đi
            </span>
            <span className="block mt-5 text-neutral-500 dark:text-neutral-400">
              Với UTEtravel, bạn có thể cá nhân hoá lịch trình du lịch của mình một cách thật đơn giản.
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SectionOurFeatures;
