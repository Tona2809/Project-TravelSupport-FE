import { Tab } from "@headlessui/react";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import React, { FC, Fragment, useEffect, useState } from "react";
import visaPng from "images/vis.png";
import mastercardPng from "images/mastercard.svg";
import Input from "shared/Input/Input";
import Label from "components/Label/Label";
import Textarea from "shared/Textarea/Textarea";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import NcImage from "shared/NcImage/NcImage";
import StartRating from "components/StartRating/StartRating";
import NcModal from "shared/NcModal/NcModal";
import ModalSelectDate from "components/ModalSelectDate";
import moment from "moment";
import { DateRage } from "components/HeroSearchForm/StaySearchForm";
import converSelectedDateToString from "utils/converSelectedDateToString";
import ModalSelectGuests from "components/ModalSelectGuests";
import { GuestsObject } from "components/HeroSearchForm2Mobile/GuestsInput";
import { useParams } from "react-router-dom";
import { AppDispatch, RootState } from "redux/store";
import { useDispatch, useSelector } from "react-redux";
import { getRatingByStay } from "redux/slices/rating";
import Stay from "models/stay";
import { getStayByID } from "redux/slices/staySlice";
import stayService from "api/stayApi";

export interface CheckOutPageProps {
  className?: string;
}

const CheckOutPage: FC<CheckOutPageProps> = ({ className = "" }) => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const [rangeDates, setRangeDates] = useState<DateRage>({
    startDate: null,
    endDate: null,
  });
  const [dates, setDates] = useState<any>({
    startDate: null,
    endDate: null,
  });
  const [guests, setGuests] = useState<string>("0");
  const stay = useSelector<RootState, Stay>((state) => state.stayStore.stay);

  useEffect(() => {
    if (id) {
      const data: string[] = id?.split("&");
      setDates({ startDate: data[1], endDate: data[2] });
      setRangeDates({ startDate: moment(data[1]), endDate: moment(data[2]) });
      setGuests(data[3]);
      dispatch(getStayByID(data[0] || ""));
    }
  }, [id]);

  const handleBooking = async () => {
    const response = await stayService.bookStay({
      checkinDate: dates.startDate,
      checkoutDate: dates.endDate,
      stayId: stay.id,
      totalPeople: Number(guests),
    });
    window.open(response);
  };

  const renderSidebar = () => {
    return (
      <div className="w-full flex flex-col sm:rounded-2xl lg:border border-neutral-200 dark:border-neutral-700 space-y-6 sm:space-y-8 px-0 sm:p-6 xl:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center">
          <div className="flex-shrink-0 w-full sm:w-40">
            <div className=" aspect-w-4 aspect-h-3 sm:aspect-h-4 rounded-2xl overflow-hidden">
              {stay?.stayImage && <NcImage src={stay?.stayImage[0].imgLink} />}
            </div>
          </div>
          <div className="py-5 sm:px-5 space-y-3">
            <div>
              <span className="text-sm text-neutral-500 dark:text-neutral-400 line-clamp-1">
                {stay?.type || ""} in {stay?.addressDescription || ""}
              </span>
              <span className="text-base font-medium mt-1 block">
                {stay?.name || ""}
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col space-y-4">
          <h3 className="text-2xl font-semibold">Chi tiết</h3>
          <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
            <span>
              <>
                {stay?.price} x{" "}
                {moment(rangeDates.endDate).diff(
                  moment(rangeDates.startDate),
                  "days"
                )}
              </>
            </span>
            <span>
              {" "}
              <span>
                ${" "}
                {Number(stay?.price) *
                  moment(rangeDates.endDate).diff(
                    moment(rangeDates.startDate),
                    "days"
                  )}
              </span>
            </span>
          </div>

          <div className="border-b border-neutral-200 dark:border-neutral-700"></div>
          <div className="flex justify-between font-semibold">
            <span>Tổng tiền cần thanh toán</span>
            <span>
              ${" "}
              {Number(stay?.price) *
                moment(rangeDates.endDate).diff(
                  moment(rangeDates.startDate),
                  "days"
                )}
            </span>
          </div>
        </div>
      </div>
    );
  };

  const renderMain = () => {
    return (
      <div className="w-full flex flex-col sm:rounded-2xl sm:border border-neutral-200 dark:border-neutral-700 space-y-8 px-0 sm:p-6 xl:p-8">
        <h2 className="text-3xl lg:text-4xl font-semibold">
          Xác nhận và thanh toán
        </h2>
        <div className="border-b border-neutral-200 dark:border-neutral-700"></div>
        <div>
          <div>
            <h3 className="text-2xl font-semibold">Lịch đặt</h3>
            {/* <NcModal
              renderTrigger={(openModal) => (
                <span
                  onClick={() => openModal()}
                  className="block lg:hidden underline  mt-1 cursor-pointer"
                >
                  View booking details
                </span>
              )}
              renderContent={renderSidebar}
              modalTitle="Booking details"
            /> */}
          </div>
          <div className="mt-6 border border-neutral-200 dark:border-neutral-700 rounded-3xl flex flex-col sm:flex-row divide-y sm:divide-x sm:divide-y-0 divide-neutral-200 dark:divide-neutral-700">
            <button
              className="text-left flex-1 p-5 flex justify-between space-x-5 "
              type="button"
            >
              <div className="flex flex-col">
                <span className="text-sm text-neutral-400">Ngày</span>
                <span className="mt-1.5 text-lg font-semibold">
                  {converSelectedDateToString(rangeDates)}
                </span>
              </div>
            </button>

            <button
              type="button"
              className="text-left flex-1 p-5 flex justify-between space-x-5"
            >
              <div className="flex flex-col">
                <span className="text-sm text-neutral-400">Số người</span>
                <span className="mt-1.5 text-lg font-semibold">
                  <span className="line-clamp-1">{`${guests}  người`}</span>
                </span>
              </div>
            </button>
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-semibold">Thanh toán với</h3>
          <div className="w-14 border-b border-neutral-200 dark:border-neutral-700 my-5"></div>

          <div className="mt-6">
            <Tab.Group>
              <Tab.List className="flex my-5">
                {/* <Tab as={Fragment}>
                  {({ selected }) => (
                    <button
                      className={`px-4 py-1.5 sm:px-6 sm:py-2.5 rounded-full focus:outline-none ${
                        selected
                          ? "bg-neutral-800 dark:bg-neutral-300 text-white dark:text-neutral-900"
                          : "text-neutral-6000 dark:text-neutral-400"
                      }`}
                    >
                      Paypal
                    </button>
                  )}
                </Tab> */}
                <Tab as={Fragment}>
                  {({ selected }) => (
                    <button
                      className={`px-4 py-1.5 sm:px-6 sm:py-2.5  rounded-full flex items-center justify-center focus:outline-none  ${
                        selected
                          ? "bg-neutral-800 dark:bg-neutral-300 text-white dark:text-neutral-900"
                          : " text-neutral-6000 dark:text-neutral-400"
                      }`}
                    >
                      <span className="mr-2.5"> Paypal</span>
                    </button>
                  )}
                </Tab>
              </Tab.List>

              {/* <Tab.Panels>
                <Tab.Panel className="space-y-5">
                  <div className="space-y-1">
                    <Label>Card number </Label>
                    <Input defaultValue="111 112 222 999" />
                  </div>
                  <div className="space-y-1">
                    <Label>Card holder </Label>
                    <Input defaultValue="JOHN DOE" />
                  </div>
                  <div className="flex space-x-5  ">
                    <div className="flex-1 space-y-1">
                      <Label>Expiration date </Label>
                      <Input type="date" defaultValue="MM/YY" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <Label>CVC </Label>
                      <Input />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Label>Messager for author </Label>
                    <Textarea placeholder="..." />
                    <span className="text-sm text-neutral-500 block">
                      Write a few sentences about yourself.
                    </span>
                  </div>
                </Tab.Panel>
                <Tab.Panel className="space-y-5">
                  <div className="space-y-1">
                    <Label>Email </Label>
                    <Input type="email" defaultValue="example@gmail.com" />
                  </div>
                  <div className="space-y-1">
                    <Label>Password </Label>
                    <Input type="password" defaultValue="***" />
                  </div>
                  <div className="space-y-1">
                    <Label>Messager for author </Label>
                    <Textarea placeholder="..." />
                    <span className="text-sm text-neutral-500 block">
                      Write a few sentences about yourself.
                    </span>
                  </div>
                </Tab.Panel>
              </Tab.Panels> */}
            </Tab.Group>
            <div className="pt-8">
              <ButtonPrimary onClick={handleBooking}>
                Xác nhận và thanh toán
              </ButtonPrimary>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`nc-CheckOutPage ${className}`} data-nc-id="CheckOutPage">
      <main className="container mt-11 mb-24 lg:mb-32 flex flex-col-reverse lg:flex-row">
        <div className="w-full lg:w-3/5 xl:w-2/3 lg:pr-10 ">{renderMain()}</div>
        <div className="hidden lg:block flex-grow">{renderSidebar()}</div>
      </main>
    </div>
  );
};

export default CheckOutPage;
