import axios from "axios";
import axiosClient from "./axiosClient";
import { REFRESH_TOKEN, SIGN_IN } from "./baseURL";

export const refreshTokenApi = async (params: { refreshToken: any }) => {
  return axios({
    method: "POST",
    url: REFRESH_TOKEN,
    headers: {
      "Content-Type": "text/plain",
    },
    data: params.refreshToken,
  })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      throw error;
    });
};

export const signInApi = async (params: any) => {
  return axios({
    method: "POST",
    url: SIGN_IN,
    data: params,
  })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      throw error;
    });
};

// export const signOutApi = async (params: { pushToken: any }) => {
//   return axiosClient()({
//     method: "POST",
//     url: SIGN_OUT,
//     params: {
//       pushToken: params.pushToken,
//     },
//   });
// };
