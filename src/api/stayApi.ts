import { SearchParams } from "./../types/index";
import axios from "axios";
import Stay from "models/stay";
import { ListResponse } from "types";
import axiosService from "./axiosClient";
import { SEARCH_STAY_BY_PROVINCE, STAY } from "./baseURL";

const stayService = {
  getAllStay: async (): Promise<ListResponse<Stay>> => {
    return await axios({
      method: "GET",
      url: `${STAY}`,
    })
      .then((res) => res.data)
      .catch((error) => {
        throw error;
      });
  },
  getStayByProvinceID: async (
    params: SearchParams
  ): Promise<ListResponse<Stay>> => {
    return await axios({
      method: "GET",
      url: `${SEARCH_STAY_BY_PROVINCE}/${params.provinceId}`,
      params: {
        pageSize: params.pageSize,
        pageIndex: params.pageIndex,
      },
    })
      .then((res) => res.data)
      .catch((error) => {
        throw error;
      });
  },
  createStay: async (data: Stay) => {
    return (await axiosService())({
      method: "POST",
      url: `${STAY}`,
      data: data,
    })
      .then((res) => res.data)
      .catch((error) => {
        throw error;
      });
  },
  updateStay: async (data: Stay) => {
    return (await axiosService())({
      method: "PATCH",
      url: `${STAY}`,
      data: data,
    })
      .then((res) => res.data)
      .catch((error) => {
        throw error;
      });
  },
  deleteStay: async (id: string) => {
    return (await axiosService())({
      method: "DELETE",
      url: `${STAY}`,
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

export default stayService;
