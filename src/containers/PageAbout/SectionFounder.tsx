import Heading from "components/Heading/Heading";
import React from "react";
import NcImage from "shared/NcImage/NcImage";

export interface People {
  id: string;
  name: string;
  job: string;
  avatar: string;
}

const FOUNDER_DEMO: People[] = [
  {
    id: "1",
    name: `Huỳnh Lý Bằng`,
    job: "Back end Developer",
    avatar: "https://pbs.twimg.com/media/E20kWiWVEAAO80Y.png",
  },
  {
    id: "4",
    name: `Võ Văn Song Toàn`,
    job: "Back end Developer",
    avatar: "https://sebastiangarcia.dev/images/Memoji3.png",
  },
];

const SectionFounder = () => {
  return (
    <div className="nc-SectionFounder relative">
      <Heading desc="Chúng tôi là nhóm sinh viên khoa Công nghệ thông tin của trường Đại học Sư Phạm Kỹ Thuật Thành Phố Hồ Chí Minh">
        ⛱ Nhà sáng lập
      </Heading>
      <div className="grid sm:grid-cols-2 gap-x-5 gap-y-8 lg:grid-cols-4 xl:gap-x-8">
        {FOUNDER_DEMO.map((item) => (
          <div key={item.id} className="max-w-sm">
            <NcImage
              containerClassName="relative h-0 aspect-h-1 aspect-w-1 rounded-xl overflow-hidden"
              className="absolute inset-0 object-cover"
              src={item.avatar}
            />
            <h3 className="text-lg font-semibold text-neutral-900 mt-4 md:text-xl dark:text-neutral-200">
              {item.name}
            </h3>
            <span className="block text-sm text-neutral-500 sm:text-base dark:text-neutral-400">
              {item.job}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionFounder;
