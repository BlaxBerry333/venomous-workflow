import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { handleTokenStorage } from "../helpers";
import APP_SERVER_API_INSTANCE from "../instances/server-api";
import APP_SERVER_AUTH_INSTANCE from "../instances/server-auth";
import type {
  IAccountAuthToken,
  IAccountSigninParameter,
  IAccountSignupParameter,
} from "../types/account-auth";

export const ACCOUNT_AUTH_API_ENTRYPOINTS = {
  SIGNIN: {
    url: "/account/signin/",
  },
  SIGNUP: {
    url: "/account/signup/",
  },
  SIGNOUT: {
    url: "/account/signout/",
  },
  REFRESH_ASSCEES_TOKEN: {
    url: "/account/refresh-accesstoken/",
  },
} as const;

export async function getRefreshAccessToken(): Promise<IAccountAuthToken> {
  const { refreshToken } = handleTokenStorage().get();
  if (!refreshToken) {
    throw new Error("No Refresh Token");
  }
  const url = ACCOUNT_AUTH_API_ENTRYPOINTS.REFRESH_ASSCEES_TOKEN.url;
  const response = await APP_SERVER_AUTH_INSTANCE.post<IAccountAuthToken>(url, {
    refresh_token: refreshToken,
  });

  const { data } = response;
  handleTokenStorage().set(data);
  return data;
}

export function useAccountSignin<T = IAccountAuthToken, P = IAccountSigninParameter>() {
  const url = ACCOUNT_AUTH_API_ENTRYPOINTS.SIGNIN.url;
  return useMutation<T, AxiosError, P>({
    mutationKey: [url],
    mutationFn: async (params) => {
      const { data } = await APP_SERVER_AUTH_INSTANCE.post(url, params);
      return data;
    },
    onSuccess: (data) => {
      handleTokenStorage().set(data as IAccountAuthToken);
    },
  });
}

export function useAccountSignup<T = IAccountAuthToken, P = IAccountSignupParameter>() {
  const url = ACCOUNT_AUTH_API_ENTRYPOINTS.SIGNUP.url;
  return useMutation<T, AxiosError, P>({
    mutationKey: [url],
    mutationFn: async (params) => {
      const { data } = await APP_SERVER_AUTH_INSTANCE.post(url, params);
      return data;
    },
    onSuccess: (data) => {
      handleTokenStorage().set(data as IAccountAuthToken);
    },
  });
}

export function useAccountSignout<T = { message: string }, P = void>() {
  const url = ACCOUNT_AUTH_API_ENTRYPOINTS.SIGNOUT.url;
  return useMutation<T, AxiosError, P>({
    mutationKey: [url],
    mutationFn: async () => {
      const { accessToken } = handleTokenStorage().get();
      const { data } = await APP_SERVER_API_INSTANCE.post(url, null, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return data;
    },
    onSuccess: () => {
      handleTokenStorage().remove();
    },
  });
}
