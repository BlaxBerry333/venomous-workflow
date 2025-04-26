import type { InternalAxiosRequestConfig } from "axios";
import { getRefreshAccessToken } from "../hooks/account-auth";
import APP_SERVER_API_INSTANCE from "../instances/server-api";
import type { IAccountAuthToken } from "../types/account-auth";

const MAX_RETRY_COUNT = 3;
let currentRetryCount = 0;
let isRefreshing: boolean = false;
let failedQueue: Array<{
  resolve: (value: unknown) => void;
  reject: (reason?: unknown) => void;
  config: InternalAxiosRequestConfig;
}> = [];

export default async function handleTokenRefresh({
  interceptorConfigs,
  onSuccess,
  onError,
}: {
  interceptorConfigs: InternalAxiosRequestConfig;
  onSuccess: (newToken: IAccountAuthToken) => void;
  onError: (error?: unknown) => void;
}) {
  if (currentRetryCount >= MAX_RETRY_COUNT) {
    currentRetryCount = 0;
    onError(new Error("Max retry count reached"));
    return;
  }

  // 防止多个请求同时刷新 Token
  if (isRefreshing) {
    return new Promise((resolve, reject) => {
      failedQueue.push({ resolve, reject, config: interceptorConfigs });
    });
  }

  isRefreshing = true;
  currentRetryCount++;

  try {
    const newTokens = await getRefreshAccessToken();

    // 处理队列中的所有请求，更新它们的配置
    failedQueue.forEach(({ resolve, config }) => {
      // 创建新配置，避免修改原始对象
      const retryConfig = {
        ...config,
        headers: {
          ...config.headers,
          Authorization: `Bearer ${newTokens.accessToken}`,
        },
        _retry: true, // 标记已重试
      };
      resolve(APP_SERVER_API_INSTANCE(retryConfig));
    });

    onSuccess(newTokens);
    currentRetryCount = 0;
  } catch (err) {
    const error =
      err instanceof Error
        ? new Error(`Failed to refresh token: ${err.message}`)
        : new Error("Failed to refresh token: Unknown error");
    onError(error);

    // 刷新失败，拒绝所有队列请求
    failedQueue.forEach(({ reject }) => reject(err));
  } finally {
    isRefreshing = false;
    failedQueue = []; // 清空队列
  }
}
