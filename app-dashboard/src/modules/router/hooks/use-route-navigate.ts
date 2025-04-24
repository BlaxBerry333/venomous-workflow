import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

export default function useRouteNavigate() {
  const navigate = useNavigate();

  const router = useMemo(
    () => ({
      back: () => navigate(-1),
      forward: () => navigate(1),
      refresh: () => navigate(0),
      push: (url: string) => navigate(url),
      replace: (url: string) => navigate(url, { replace: true }),
    }),
    [navigate],
  );

  return router;
}
