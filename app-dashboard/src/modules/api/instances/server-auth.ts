import { redirectToErrorsPage } from "@/modules/router/helpers";
import axios from "axios";
import { getCSRFToken } from "../helpers";

const APP_SERVER_AUTH_INSTANCE = axios.create({
  baseURL: "/server-account-auth-api",
  responseType: "json",
  headers: {
    "Content-Type": "application/json",
    "X-CSRFToken": getCSRFToken(),
  },
});

APP_SERVER_AUTH_INSTANCE.interceptors.request.use(
  async (configs) => {
    // 没有网络
    if (!navigator.onLine) {
      redirectToErrorsPage(500);
      return Promise.reject(new Error("No Network"));
    }

    return configs;
  },
  (error) => {
    return Promise.reject(error as Error);
  },
);

APP_SERVER_AUTH_INSTANCE.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    return Promise.reject(error as Error);
  },
);

export default APP_SERVER_AUTH_INSTANCE;
