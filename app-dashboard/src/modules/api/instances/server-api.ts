import axios from "axios";

import { redirectToErrorsPage, redirectToLoginPage } from "@/modules/router/helpers";
import { getCSRFToken, handleTokenRefresh, handleTokenStorage } from "../helpers";

const APP_SERVER_API_INSTANCE = axios.create({
  baseURL: "/server-api",
  responseType: "json",
  headers: {
    "Content-Type": "application/json",
    "X-CSRFToken": getCSRFToken(),
  },
});

APP_SERVER_API_INSTANCE.interceptors.request.use(
  async (configs) => {
    // 没有网络
    if (!navigator.onLine) {
      redirectToErrorsPage(500);
      return Promise.reject(new Error("No Network"));
    }

    const { accessToken } = handleTokenStorage().get();

    // 没有本地缓存的 token
    if (!accessToken) {
      redirectToLoginPage({ hasRedirect: false });
      return Promise.reject(new Error("No Token"));
    }

    // 有本地缓存的 token，但过期了
    // 请求拦截器中不做处理，在响应拦截器中会自动刷新 token
    // do nothing...

    // token 有效
    configs.headers.Authorization = `Bearer ${accessToken}`;
    return configs;
  },
  (error) => {
    return Promise.reject(error as Error);
  },
);

APP_SERVER_API_INSTANCE.interceptors.response.use(
  (res) => {
    return res;
  },
  async (error) => {
    const code = error?.response?.status;
    const config = error?.config;

    if (code === 500) {
      return redirectToErrorsPage(500);
    }

    if (code === 401) {
      if (!config._retry) {
        config._retry = true;
        try {
          await handleTokenRefresh({
            interceptorConfigs: config,
            onSuccess: ({ accessToken }) => {
              config.headers.Authorization = `Bearer ${accessToken}`;
            },
            onError: () => {
              redirectToLoginPage({ hasRedirect: false });
            },
          });
          // 使用新的Token重新发送当前请求
          return APP_SERVER_API_INSTANCE(config);
        } catch (refreshError) {
          return Promise.reject(refreshError as Error);
        }
      } else {
        // 已重试过仍失败，跳转登录
        redirectToLoginPage({ hasRedirect: false });
        return Promise.reject(error as Error);
      }
    }

    return Promise.reject(error as Error);
  },
);

export default APP_SERVER_API_INSTANCE;
