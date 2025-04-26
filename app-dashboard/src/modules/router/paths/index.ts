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
    DRAFT_FLOW_LIST: "/admin/draft-flow",
    DRAFT_FLOW_CREATE: "/admin/draft-flow/create",
    DRAFT_FLOW_DETAIL: "/admin/draft-flow/detail",
    LOGIC_FLOW_LIST: "/admin/logic-flow",
    LOGIC_FLOW_CREATE: "/admin/logic-flow/create",
    LOGIC_FLOW_DETAIL: "/admin/logic-flow/detail",
    PPT_FLOW_LIST: "/admin/ppt-flow",
    PPT_FLOW_CREATE: "/admin/ppt-flow/create",
    PPT_FLOW_DETAIL: "/admin/ppt-flow/detail",
  },
} as const;

export default ROUTE_PATHS;
