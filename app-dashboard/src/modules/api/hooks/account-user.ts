import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useMemo } from "react";
import { getDecodeJWT, handleTokenStorage } from "../helpers";
import APP_SERVER_API_INSTANCE from "../instances/server-api";
import type { IAccountAuthTokenDecoded } from "../types/account-auth";
import type { IAccountUser } from "../types/account-user";

export const ACCOUNT_USER_API_ENTRYPOINTS = {
  LIST: {
    url: "/account/users/",
  },
  CREATE: {
    url: "/account/users/",
  },
  DETAIL: {
    url: "/account/users/:id/",
  },
  EDIT: {
    url: "/account/users/:id/",
  },
  DELETE: {
    url: "/account/users/:id/",
  },
} as const;

export function useAccountUserId() {
  const { accessToken } = handleTokenStorage().get();
  const decodedToken = getDecodeJWT<IAccountAuthTokenDecoded>(accessToken);
  const id = decodedToken?.user_id || "";
  return id;
}

export function useAccountUserList<T = IAccountUser>() {
  const url = ACCOUNT_USER_API_ENTRYPOINTS.LIST.url;
  return useQuery<T, AxiosError>({
    queryKey: [url],
    queryFn: async () => {
      const { data } = await APP_SERVER_API_INSTANCE.get(url);
      return data;
    },
  });
}

export function useAccountUserDetail<T = IAccountUser>() {
  const userId = useAccountUserId();
  const url = useMemo<string>(
    () => ACCOUNT_USER_API_ENTRYPOINTS.DETAIL.url.replace(":id", userId),
    [userId],
  );
  return useQuery<T, AxiosError>({
    queryKey: [url],
    queryFn: async () => {
      const { data } = await APP_SERVER_API_INSTANCE.get(url);
      return data;
    },
  });
}
