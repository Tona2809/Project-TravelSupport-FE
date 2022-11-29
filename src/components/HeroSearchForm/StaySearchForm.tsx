import React, { useEffect, useState } from "react";
import LocationInput from "./LocationInput";
import GuestsInput, { GuestsInputProps } from "./GuestsInput";
import { FocusedInputShape } from "react-dates";
import StayDatesRangeInput from "./StayDatesRangeInput";
import moment from "moment";
import { FC } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "redux/store";
import { searchStayByCriteria } from "redux/slices/staySlice";
import toast from "react-hot-toast";

export interface DateRage {
  startDate: moment.Moment | null;
  endDate: moment.Moment | null;
}

export interface StaySearchFormProps {
  haveDefaultValue?: boolean;
}

// DEFAULT DATA FOR ARCHIVE PAGE
const defaultLocationValue = "Tokyo, Jappan";
const defaultDateRange = {
  startDate: moment(),
  endDate: moment().add(4, "days"),
};
const defaultGuestValue: GuestsInputProps["defaultValue"] = {
  guestAdults: 2,
  guestChildren: 2,
  guestInfants: 1,
};

const StaySearchForm: FC<StaySearchFormProps> = ({
  haveDefaultValue = false,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [dateRangeValue, setDateRangeValue] = useState<DateRage>({
    startDate: null,
    endDate: null,
  });
  const [dateRange, setDateRange] = useState<any>({
    startDate: null,
    endDate: null,
  });
  const [maxPeople, setMaxPeople] = useState<number>();
  const [guestValue, setGuestValue] = useState({});
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [dateFocused, setDateFocused] = useState<FocusedInputShape | null>(
    null
  );

  useEffect(() => {
    if (haveDefaultValue) {
      setDateRangeValue(defaultDateRange);
      // setLocationInputValue(defaultLocationValue);
      setGuestValue(defaultGuestValue);
    }
  }, []);
  //
  useEffect(() => {
    if (haveDefaultValue) {
      setDateRangeValue(defaultDateRange);
      // setLocationInputValue(defaultLocationValue);
      setGuestValue(defaultGuestValue);
    }
  }, []);

  useEffect(() => {
    if (!dateRange.startDate && !dateRange.endDate && !maxPeople) {
      toast.error("Vui lòng điền thông tin");
    } else {
      if (!dateRange.startDate && !dateRange.endDate) {
        toast.error("Vui lòng chọn ngày");
      } else {
        if (!maxPeople) {
          toast.error("Vui lòng chọn tổng số người");
        } else {
          searchStay();
        }
      }
    }
  }, [isSubmit]);

  const searchStay = async () => {
    await dispatch(
      searchStayByCriteria({
        checkInDate: dateRange.startDate,
        checkOutDate: dateRange.endDate,
        hidden: false,
        maxPeople: maxPeople,
        maxPrice: 2000,
        minPrice: 0,
        order: "DESCENDING",
        pageIndex: 0,
        pageSize: 10,
        sort: "PRICE",
        status: "NULL",
      })
    );
  };
  const changeDate = async (data: any) => {
    setDateRangeValue(data);
    setDateRange({
      startDate: moment(data.startDate).format("YYYY-MM-DDTHH:mm"),
      endDate: moment(data.endDate).format("YYYY-MM-DDTHH:mm"),
    });
  };
  const changeMaxPeople = async (data: any) => {
    setGuestValue(data);
    const peoples = Object.values(data).reduce((accumulator, current) => {
      return Number(accumulator) + Number(current);
    }, 0);
    peoples && setMaxPeople(Number(peoples));
  };

  const renderForm = () => {
    return (
      <form className="w-full relative mt-8 flex rounded-full shadow-xl dark:shadow-2xl bg-white dark:bg-neutral-800 ">
        {/* <LocationInput
          defaultValue={locationInputValue}
          onChange={(e) => setLocationInputValue(e)}
          onInputDone={() => setDateFocused("startDate")}
          className="flex-[1.5]"
        /> */}
        <StayDatesRangeInput
          defaultValue={dateRangeValue}
          defaultFocus={dateFocused}
          onChange={(data) => changeDate(data)}
          className="flex-[2]"
        />
        <GuestsInput
          defaultValue={guestValue}
          onChange={(data) => changeMaxPeople(data)}
          className="flex-[1.2]"
          onSubmit={() => setIsSubmit(!isSubmit)}
        />
      </form>
    );
  };

  return renderForm();
};

export default StaySearchForm;
