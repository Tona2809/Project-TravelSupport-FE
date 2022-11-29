import { toast } from "react-hot-toast";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ListResponse, SearchParams } from "types";
import { listResponseDefaultValue } from "contains/defaultValue";
import Stay from "models/stay";
import stayService from "api/stayApi";
import { Booking } from "models/booking";
import authenticationService from "api/authenticationApi";

export const searchStayByCriteria = createAsyncThunk(
  "stay/searchStayByCriteria",
  async (params: SearchParams, { dispatch }) => {
    try {
      const response = await stayService.searchStayByCriteria(params);
      dispatch(setStays(response));
    } catch (error) {
      toast.error("Lỗi khi tìm kiếm ! ");
    }
  }
);
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
export const bookStaySuccessfull = createAsyncThunk(
  "stay/bookStaySuccessfull",
  async (data: any, { dispatch }) => {
    try {
      const response = await stayService.bookStaySuccessfull(data);
      dispatch(setBooking(response));
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
export const likeStayByID = createAsyncThunk(
  "stay/likeStayByID",
  async (id: string, { dispatch }) => {
    try {
      const response = await stayService.likeStay(id);
      toast.success("Thêm vào danh sách yêu thích thành công ! ");
    } catch (error) {
      toast.error("Lỗi khi yêu thích  ! ");
    }
  }
);
export const unlikeStayByID = createAsyncThunk(
  "stay/unlikeStayByID",
  async (id: string, { dispatch }) => {
    try {
      const response = await stayService.unLikeStay(id);
      toast.success("Xóa khỏi danh sách yêu thích thành công ! ");
    } catch (error) {
      toast.error("Lỗi khi ngừng yêu thích ! ");
    }
  }
);

export const getLikeListByUserID = createAsyncThunk(
  "stay/getLikeListByUserID",
  async (_, { dispatch }) => {
    try {
      const response = await authenticationService.getLikeListByUserID();
      dispatch(setStays(response));
    } catch (error) {
      toast.error("Lỗi khi lấy dữ liệu ! ");
    }
  }
);

type initialStateType = {
  stays: ListResponse<Stay>;
  stay: Stay | null;
  booking: any;
};

const initialState: initialStateType = {
  stays: listResponseDefaultValue,
  stay: null,
  booking: null,
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
    setBooking: (state, action) => {
      state.booking = action.payload;
    },
  },
});

const { reducer, actions } = staySlice;

export const { setStays, setStay, setBooking } = actions;
export default reducer;
