export type IAccountSigninParameter = {
  email: string;
  password: string;
};

export type IAccountSignupParameter = {
  name: string;
  email: string;
  password: string;
};

export type IAccountAuthToken = {
  accessToken: string;
  refreshToken: string;
};

export type IAccountAuthTokenDecoded = {
  exp: number;
  iat: number;
  jti: string;
  token_type: "access" | "refresh";
  user_id: string;
};
