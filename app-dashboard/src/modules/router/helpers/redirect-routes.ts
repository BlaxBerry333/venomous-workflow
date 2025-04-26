import ROUTE_PATHS from "../paths";

/**
 * 强制跳转到登录页面
 */
export const redirectToLoginPage = (options: { hasRedirect?: boolean }): void => {
  const redirectUrl: string = options.hasRedirect
    ? `?redirect=${window.location.pathname + window.location.search}`
    : "";

  return window.location.replace(ROUTE_PATHS.AUTH.SIGNIN + redirectUrl);
};

/**
 * 强制跳转到错误页面
 */
export const redirectToErrorsPage = (errorCode: number): void => {
  switch (errorCode) {
    case 403:
      return window.location.replace(ROUTE_PATHS.ERRORS[403]);
    case 500:
      return window.location.replace(ROUTE_PATHS.ERRORS[500]);
    case 404:
    default:
      return window.location.replace(ROUTE_PATHS.ERRORS[404]);
  }
};
