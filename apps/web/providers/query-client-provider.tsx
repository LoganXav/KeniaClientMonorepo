"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { isMockApisMode } from "@/lib/utils";
interface SiteProps {
  children: React.ReactNode;
}

export const QueryClientContextProvider = ({ children }: SiteProps) => {
  const isMockMode = isMockApisMode();
  
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false, // Prevent refetch on window focus globally
        staleTime: isMockMode ? 0 : 5 * 60 * 1000, // Disable cache in mock mode, otherwise keep data fresh for 5 minutes globally
        gcTime: isMockMode ? 0 : undefined, // Disable garbage collection time in mock mode (React Query v5)
        retry: false,
      },
    },
  });

  return (
    <div>
      <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </div>
  );
};

export default QueryClientContextProvider;
