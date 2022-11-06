import axios from "axios";
import toast from "react-hot-toast";
import { refreshTokenApi } from "./authenticationApi";
import { BASE_URL } from "./baseURL";
import jwt_decode, { JwtPayload } from "jwt-decode";

export const checkExpToken = (token: string) => {
  let date = new Date().getTime() / 1000;
  let expToken = jwt_decode<JwtPayload>(token).exp;
  if (expToken && expToken > date) {
    return true;
  }
  return false;
};

// closure: to save the refreshTokenRequest
let refreshTokenRequest: any = null;

const axiosClient = () => {
  const token = localStorage.getItem("token-crm") || "";
  const refreshToken = localStorage.getItem("refreshToken-crm") || "";

  const loadRefreshToken = async () => {
    try {
      const response = await refreshTokenApi({
        refreshToken: refreshToken,
      });
      return response;
    } catch (error) {
      throw error;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token-crm");
    localStorage.removeItem("refreshToken-crm");
    localStorage.removeItem("user-crm");
    localStorage.removeItem("remember-me-crm");
  };

  const axiosOption = axios.create({
    baseURL: BASE_URL,
    headers: {
      "content-type": "application/json",
      Authorization: "Bearer " + token,
    },
  });

  axiosOption.interceptors.request.use(
    async (config) => {
      if (!checkExpToken(token)) {
        refreshTokenRequest = refreshTokenRequest
          ? refreshTokenRequest
          : loadRefreshToken();
        try {
          const response = await refreshTokenRequest;
          if (response) {
            localStorage.setItem("token-crm", response.data.accessToken);
            config.headers = {
              "content-type": "application/json",
              Authorization: "Bearer " + response.data.accessToken,
            };
            // reset token request for the next expiration
            refreshTokenRequest = null;
          }
        } catch (error: any) {
          refreshTokenRequest = null;
          if (!error.response) {
            toast.error("Không có kết nối đến server!");
          } else if (error?.response?.status === 400) {
            window.location.replace("/login");
            handleLogout();
            toast.error("Phiên đăng nhập lỗi, vui lòng đăng nhập lại!");
          } else {
            toast.error("Lỗi phiên đăng nhập");
          }
        }
        return config;
      }
      return config;
    },
    (error) => {
      Promise.reject(error);
    }
  );

  axiosOption.interceptors.response.use(
    (response) => {
      return response;
    },
    function (error) {
      if (error?.response?.status === 401) {
        window.location.replace("/login");
        handleLogout();
        toast.error("Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại!");
        throw error;
      } else {
        throw error;
      }
    }
  );

  return axiosOption;
};

export default axiosClient;
