import { toast } from "react-hot-toast";
import Province from "models/province";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import provinceService from "api/provinceApi";
import { ListResponse } from "types";
import { listResponseDefaultValue } from "contains/defaultValue";

export const getAllProvince = createAsyncThunk(
  "province/getAllProvince",
  async (_, { dispatch }) => {
    try {
      const response = await provinceService.getAllProvince();
      dispatch(setProvinces(response));
      // return response;
    } catch (error) {
      toast.error("Lỗi khi lẫy dữ liệu các địa điểm ! ");
    }
  }
);

type initialStateType = {
  provinces: ListResponse<Province>;
};

const initialState: initialStateType = {
  provinces: listResponseDefaultValue,
};

export const provinceSlice = createSlice({
  name: "province",
  initialState: initialState,
  reducers: {
    setProvinces: (state, action) => {
      state.provinces = action.payload;
    },
  },
  // extraReducers: (builder) => {
  //   builder.addCase(getAllProvince.fulfilled, (state, action) => {
  //     if (state.provinces && action.payload) {
  //       state.provinces = action.payload;
  //     }
  //   });
  // },
});

const { reducer, actions } = provinceSlice;

export const { setProvinces } = actions;
export default reducer;
