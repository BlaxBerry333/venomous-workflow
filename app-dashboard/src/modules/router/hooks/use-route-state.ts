import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function useRouteState<T extends Record<string, unknown>>() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const router = useMemo(
    () => ({
      pushWithState: (url: string, state: T) => navigate(url, { state }),
      replaceWithState: (url: string, state: T) => navigate(url, { replace: true, state }),
    }),
    [navigate],
  );

  return {
    ...router,
    state: state as T,
  };
}
