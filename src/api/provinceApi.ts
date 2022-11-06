import axios from "axios";
import Province from "models/province";
import { ListResponse } from "types";
import axiosService from "./axiosClient";
import { PROVINCE } from "./baseURL";

const provinceService = {
  getAllProvince: async (): Promise<ListResponse<Province>> => {
    return await axios({
      method: "GET",
      url: `${PROVINCE}`,
    })
      .then((res) => res.data)
      .catch((error) => {
        throw error;
      });
  },
  createProvince: async (data: Province) => {
    return (await axiosService())({
      method: "POST",
      url: `${PROVINCE}`,
      data: data,
    })
      .then((res) => res.data)
      .catch((error) => {
        throw error;
      });
  },
  updateProvince: async (data: Province) => {
    return (await axiosService())({
      method: "PATCH",
      url: `${PROVINCE}`,
      data: data,
    })
      .then((res) => res.data)
      .catch((error) => {
        throw error;
      });
  },
  deleteProvince: async (id: string) => {
    return (await axiosService())({
      method: "DELETE",
      url: `${PROVINCE}`,
      params: {
        ids: id,
      },
    })
      .then((res) => res.data)
      .catch((error) => {
        throw error;
      });
  },
};

export default provinceService;
