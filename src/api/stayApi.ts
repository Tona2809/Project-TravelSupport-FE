import { SearchParams } from "./../types/index";
import axios from "axios";
import Stay from "models/stay";
import { ListResponse } from "types";
import axiosService from "./axiosClient";
import { SEARCH_STAY_BY_CRITERIA, STAY } from "./baseURL";

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
  getStayByID: async (id: string): Promise<ListResponse<Stay>> => {
    return await axios({
      method: "GET",
      url: `${STAY}/${id}`,
    })
      .then((res) => res.data)
      .catch((error) => {
        throw error;
      });
  },

  getStayByCriteria: async (
    params: SearchParams
  ): Promise<ListResponse<Stay>> => {
    return await axios({
      method: "GET",
      url: `${SEARCH_STAY_BY_CRITERIA}`,
      params: params,
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
