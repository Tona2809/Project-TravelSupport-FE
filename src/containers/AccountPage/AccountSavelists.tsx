import { Tab } from "@headlessui/react";
import StayCard from "components/StayCard/StayCard";
import Stay from "models/stay";
import User from "models/user";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getLikeListByUserID,
  likeStayByID,
  unlikeStayByID,
} from "redux/slices/staySlice";
import { AppDispatch, RootState } from "redux/store";
import CommonLayout from "./CommonLayout";

const AccountSavelists = () => {
  const dispatch = useDispatch<AppDispatch>();

  const stays = useSelector<RootState, Stay[]>(
    (state) => state.stayStore.stays.content
  );
  const user = useSelector<RootState, User>((state) => state.userStore.user);
  const [isReload, setIsReload] = useState<boolean>(false);
  let [categories] = useState(["Khách sạn"]);

  useEffect(() => {
    loadStayByUser();
  }, [isReload]);

  const loadStayByUser = async () => {
    await dispatch(getLikeListByUserID());
  };

  const handleLikeOrUnlikeStay = async (id: string, isLike: boolean) => {
    if (isLike) {
      await dispatch(likeStayByID(id));
      setIsReload(!isReload);
    } else {
      await dispatch(unlikeStayByID(id));
      setIsReload(!isReload);
    }
  };

  const renderCard = (stay: Stay) => {
    let liked = false;
    if (user) {
      const item = stay?.userLiked?.filter((item) => item.id === user.id);
      if (item && item?.length > 0) {
        liked = true;
      }
    }
    return (
      <StayCard
        key={stay.id}
        data={stay}
        userliked={liked}
        onLike={(id, isLike) => handleLikeOrUnlikeStay(id, isLike)}
      />
    );
  };

  const renderSection1 = () => {
    return (
      <div className="space-y-6 sm:space-y-8">
        <div>
          <h2 className="text-3xl font-semibold">Danh sách yêu thích</h2>
        </div>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>

        <div>
          <Tab.Group>
            <Tab.List className="flex space-x-1 overflow-x-auto">
              {categories.map((item) => (
                <Tab key={item} as={Fragment}>
                  {({ selected }) => (
                    <button
                      className={`flex-shrink-0 block !leading-none font-medium px-5 py-2.5 text-sm sm:text-base sm:px-6 sm:py-3 capitalize rounded-full focus:outline-none ${
                        selected
                          ? "bg-secondary-900 text-secondary-50 "
                          : "text-neutral-500 dark:text-neutral-400 dark:hover:text-neutral-100 hover:text-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                      } `}
                    >
                      {item}
                    </button>
                  )}
                </Tab>
              ))}
            </Tab.List>
            <Tab.Panels>
              <Tab.Panel className="mt-8">
                <div className="grid grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {stays.map((stay) => renderCard(stay))}
                </div>
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
    );
  };

  return (
    <div>
      <CommonLayout>{renderSection1()}</CommonLayout>
    </div>
  );
};

export default AccountSavelists;
