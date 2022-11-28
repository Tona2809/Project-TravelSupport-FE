import { toast } from "react-hot-toast";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ListResponse, SearchParams } from "types";
import { listResponseDefaultValue } from "contains/defaultValue";
import Stay from "models/stay";
import stayService from "api/stayApi";
import { Booking } from "models/booking";

export const bookStay = createAsyncThunk(
  "stay/bookStay",
  async (params: Booking, { dispatch }) => {
    try {
      const response = await stayService.bookStay(params);
      toast.success("Book lịch thành công! ");
    } catch (error) {
      toast.error("Lỗi khi Book lịch  ! ");
    }
  }
);
export const getAllStay = createAsyncThunk(
  "stay/getAllStay",
  async (_, { dispatch }) => {
    try {
      const response = await stayService.getAllStay();
      dispatch(setStays(response));
    } catch (error) {
      toast.error("Lỗi khi lẫy dữ liệu các nơi nghỉ ngơi ! ");
    }
  }
);
export const getStayByCriteria = createAsyncThunk(
  "stay/getStayByProvinceID",
  async (params: SearchParams, { dispatch }) => {
    try {
      const response = await stayService.getStayByCriteria(params);
      dispatch(setStays(response));
    } catch (error) {
      toast.error("Lỗi khi lẫy dữ liệu các nơi nghỉ ngơi ! ");
    }
  }
);
export const getStayByID = createAsyncThunk(
  "stay/getStayByID",
  async (id: string, { dispatch }) => {
    try {
      const response = await stayService.getStayByID(id);
      dispatch(setStay(response));
    } catch (error) {
      toast.error("Lỗi khi lẫy dữ liệu các nơi nghỉ ngơi ! ");
    }
  }
);

type initialStateType = {
  stays: ListResponse<Stay>;
  stay: Stay | null;
};

const initialState: initialStateType = {
  stays: listResponseDefaultValue,
  stay: null,
};

export const staySlice = createSlice({
  name: "stay",
  initialState: initialState,
  reducers: {
    setStays: (state, action) => {
      state.stays = action.payload;
    },
    setStay: (state, action) => {
      state.stay = action.payload;
    },
  },
});

const { reducer, actions } = staySlice;

export const { setStays, setStay } = actions;
export default reducer;
