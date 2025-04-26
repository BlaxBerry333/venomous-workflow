import { memo, type NamedExoticComponent, type PropsWithChildren } from "react";

import {
  QueryClient as TanstckQueryClient,
  QueryClientProvider as TanstckQueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new TanstckQueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 1,
      gcTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});

const QueryClientProvider: NamedExoticComponent<PropsWithChildren> = memo(({ children }) => {
  return (
    <TanstckQueryClientProvider client={queryClient}>
      {/* Devtools */}
      {process.env.NODE_ENV !== "production" && (
        <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-left" />
      )}

      {children}
    </TanstckQueryClientProvider>
  );
});

QueryClientProvider.displayName = "QueryClientProvider";
export default QueryClientProvider;
