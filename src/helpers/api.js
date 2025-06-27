import axios from "axios";
import Cookies from "js-cookie";
import { API } from "../../config";

let api_token = "";

class Api {
  constructor() {
    this.api_token = null;
    this.client = null;
    this.api_url = `${API}`;
  }

  init = (type) => {
    // Get token
    api_token = Cookies.get("token");

    let headers;
    if (type === "multipart/form-data") {
      headers = {
        "Content-Type": "multipart/form-data",
      };
    } else {
      headers = {
        Accept: "application/json",
      };
    }

    if (this.api_token) {
      headers.Authorization = `Bearer ${this.api_token}`;
    }

    this.client = axios.create({
      baseURL: this.api_url,
      timeout: 31000,
      headers: headers,
    });

    this.client.interceptors.request.use(
      (config) => {
        config.headers["Authorization"] = `Bearer ${api_token}`;
        return config;
      },
      (error) => {
        throw error;
      }
    );

    return this.client;
  };

  // --------

  adminLogin = (data) => {
    return this.init().post(`/adminSignin`, data);
  };

  getAppCoachesWithReviewReq = () => {
    return this.init().get(`/admin/fetch/CoachesWithReviewReq`);
  };

  addAppCoachRatingReview = (data) => {
    return this.init().put(`/admin/addCoachRatingReview`, data);
  };

  registerInterestedCoach = (data) => {
    return this.init().post(`/registerInterestedCoach`, data);
  };

  getTopAppCoaches = () => {
    return this.init().get(`/admin/fetch/TopAppCoaches`);
  };
  exportAppCoaches = (data) => {
    return this.init().post(`/admin/app-coaches/export`, data);
  };
}

const apiInstance = new Api();
export default apiInstance;
