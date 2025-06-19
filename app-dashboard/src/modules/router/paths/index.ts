const ROUTE_PATHS = {
  AUTH: {
    ROOT: "/auth",
    SIGNIN: "/auth/signin",
    SIGNUP: "/auth/signup",
  },

  ERRORS: {
    403: "/errors/403",
    404: "/errors/404",
    500: "/errors/500",
  },

  ADMIN: {
    ROOT: "/admin",
    ANALYSIS: "/admin/analysis",

    WORKFLOW_LIST: "/admin/workflow/list",
    WORKFLOW_CREATE: "/admin/workflow/create",
    WORKFLOW_DETAIL: "/admin/workflow/detail",

    CONNECTION_STORAGE: "/admin/connection/storage",
  },
} as const;

export default ROUTE_PATHS;
