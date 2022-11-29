import { SearchParams } from "./../types/index";
import axios from "axios";
import Stay from "models/stay";
import { ListResponse } from "types";
import axiosService from "./axiosClient";
import Rating from "models/rating";
import { STAY_RATING } from "./baseURL";

const ratingService = {
  getRatingByStayID: async (id: string): Promise<ListResponse<Stay>> => {
    return await axios({
      method: "GET",
      url: `${STAY_RATING}/getByStay/${id}`,
    })
      .then((res) => res.data)
      .catch((error) => {
        throw error;
      });
  },

  createRating: async (data: Rating) => {
    return (await axiosService())({
      method: "POST",
      url: `${STAY_RATING}`,
      data: data,
    })
      .then((res) => res.data)
      .catch((error) => {
        throw error;
      });
  },
  updateRating: async (data: Rating) => {
    return (await axiosService())({
      method: "PATCH",
      url: `${STAY_RATING}`,
      data: data,
    })
      .then((res) => res.data)
      .catch((error) => {
        throw error;
      });
  },
  deleteRating: async (id: Rating) => {
    return (await axiosService())({
      method: "DELETE",
      url: `${STAY_RATING}`,
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

export default ratingService;
