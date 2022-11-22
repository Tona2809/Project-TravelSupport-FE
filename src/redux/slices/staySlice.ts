import { toast } from "react-hot-toast";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ListResponse, SearchParams } from "types";
import { listResponseDefaultValue } from "contains/defaultValue";
import Stay from "models/stay";
import stayService from "api/stayApi";

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
export const getStayByProvinceID = createAsyncThunk(
  "stay/getStayByProvinceID",
  async (params: SearchParams, { dispatch }) => {
    try {
      const response = await stayService.getStayByProvinceID(params);
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
