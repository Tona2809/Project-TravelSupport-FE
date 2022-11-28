import { toast } from "react-hot-toast";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Rating from "models/rating";
import ratingService from "api/ratingApi";

export const getRatingByStay = createAsyncThunk(
  "rating/getRatingByStay",
  async (id: string, { dispatch }) => {
    try {
      const response = await ratingService.getRatingByStayID(id);
      dispatch(setRatings(response.content));
    } catch (error) {
      toast.error("Lỗi khi lẫy dữ liệu các đánh giá ! ");
    }
  }
);
export const createRating = createAsyncThunk(
  "rating/createRating",
  async (data: Rating, { dispatch }) => {
    try {
      const response = await ratingService.createRating(data);
      toast.success("Đánh giá thành công !");
      dispatch(addRatings(response));
    } catch (error) {
      toast.error("Lỗi khi đánh giá ! ");
    }
  }
);

type initialStateType = {
  ratings: Rating[];
};

const initialState: initialStateType = {
  ratings: [],
};

export const ratingSlice = createSlice({
  name: "ratings",
  initialState: initialState,
  reducers: {
    setRatings: (state, action) => {
      state.ratings = action.payload;
    },
    addRatings: (state, action) => {
      state.ratings = [...state.ratings, action.payload];
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

const { reducer, actions } = ratingSlice;

export const { setRatings, addRatings } = actions;
export default reducer;
