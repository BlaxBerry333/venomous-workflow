import { useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";

type SearchParams = Record<string, string>;

type Props<T extends SearchParams> = {
  callback: (searchParams: T) => void;
};

export default function useRouteSearch<S extends SearchParams>(props?: Props<S>): S {
  const { search } = useLocation();

  const searchParams = useMemo<S>(() => {
    const _searchParams: URLSearchParams = new URLSearchParams(search);
    return Object.fromEntries(_searchParams.entries()) as S;
  }, [search]);

  useEffect(() => {
    if (!props?.callback) return;
    props?.callback(searchParams);
  }, [searchParams, props?.callback]);

  return searchParams;
}
