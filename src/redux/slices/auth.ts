import { toast } from "react-hot-toast";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import User from "models/user";
import authenticationService, { Register, SignIn } from "api/authenticationApi";
import { useNavigate } from "react-router-dom";

const setDataLocal = (value: {
  user: User;
  accessToken: string;
  refreshToken: string;
}) => {
  // const A_MONTH_TO_MILISECONDS = 2592000000;
  // const A_12_HOURS_TO_MILISECONDS = 43200000;

  localStorage.setItem("token-UTEtravel", value.accessToken);
  localStorage.setItem("refreshToken-UTEtravel", value.refreshToken);
  localStorage.setItem("user-UTEtravel", JSON.stringify(value.user));
  // if (isChecked) {
  //   localStorage.setItem(
  //     "expiry-remember-me-UTEtravel",
  //     new Date().getTime() + A_MONTH_TO_MILISECONDS
  //   );
  // } else {
  //   localStorage.setItem(
  //     "expiry-remember-me-UTEtravel",
  //     new Date().getTime() + A_12_HOURS_TO_MILISECONDS
  //   );
  // }
};

export const login = createAsyncThunk(
  "authentication/login",
  async (data: SignIn, { dispatch }) => {
    try {
      const response = await authenticationService.signIn({
        email: data.email,
        password: data.password,
      });
      setDataLocal(response?.data);
      dispatch(setUser(response.data.user));
      toast.success("Đăng nhập thành công !");
      return response;
    } catch (error: any) {
      let message = "Lỗi khi đăng  nhập !";
      switch (error?.response?.data?.message) {
        case "USER_NOT_FOUND":
          message = "Tài khoản bạn nhập không tồn tại ! ";
          break;
        case "INVALID_PASSWORD":
          message = "Mật khẩu không đúng rồi bạn ơi ! ";
          break;
      }
      toast.error(message);
      return error?.response?.data?.message;
    }
  }
);
export const registerForCustomer = createAsyncThunk(
  "authentication/registerForCustomer",
  async (data: Register) => {
    try {
      const response = await authenticationService.registerForCustomer({
        email: data.email,
        password: data.password,
      });
      toast.success("Đăng kí thành công rồi đấy bạn !");
      toast("Bạn vui lòng kiểm tra mail để kích hoạt tài khoản nha !", {
        duration: 10000,
        icon: "👏",
      });
      return response;
    } catch (error: any) {
      let message = "Lỗi khi đăng ký tài khoản";
      switch (error?.response?.data?.message) {
        case "EMAIL_EXISTS":
          message = "Tài khoản đã được đăng ký rồi bạn ơi";
          break;
        case "Password phải từ 8 kí tự trở lên":
          message = "Mật khẩu phải từ 8 kí tự trở lên nha bạn ơi";
          break;
      }
      toast.error(message);
      return error?.response?.data?.message;
    }
  }
);

type initialStateType = {
  user: User;
  accessToken: string;
  refreshToken: string;
};

const initialState: initialStateType = {
  user: {},
  accessToken: "",
  refreshToken: "",
};

export const staySlice = createSlice({
  name: "stay",
  initialState: initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

const { reducer, actions } = staySlice;

export const { setUser } = actions;
export default reducer;
