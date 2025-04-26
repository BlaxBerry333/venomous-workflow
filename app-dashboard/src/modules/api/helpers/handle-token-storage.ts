import { handleWebStorage } from "@/modules/tools";
import type { IAccountAuthToken } from "../types/account-auth";

const STORE_JWT_TOKEN_KEY = "__ACCESS_TOKEN__" as const;
const STORE_REFRESH_TOKEN_KEY = "__REFRESH_TOKEN__" as const;

const { get: getToken, set: setToken, remove: removeToken } = handleWebStorage("sessionStorage");

export default function handleTokenStorage() {
  return {
    get: (): IAccountAuthToken => ({
      accessToken: getToken(STORE_JWT_TOKEN_KEY, { defaultValue: "" }),
      refreshToken: getToken(STORE_REFRESH_TOKEN_KEY, { defaultValue: "" }),
    }),

    set: (tokens: IAccountAuthToken): void => {
      setToken(STORE_JWT_TOKEN_KEY, tokens.accessToken);
      setToken(STORE_REFRESH_TOKEN_KEY, tokens.refreshToken);
    },

    remove: (): void => {
      removeToken(STORE_JWT_TOKEN_KEY);
      removeToken(STORE_REFRESH_TOKEN_KEY);
    },
  };
}
