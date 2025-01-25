"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

interface SiteProps {
  children: React.ReactNode;
}

export const QueryClientContextProvider = ({ children }: SiteProps) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false, // Prevent refetch on window focus globally
        staleTime: 5 * 60 * 1000, // Keep data fresh for 5 minutes globally
      },
    },
  });

  return (
    <div>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </div>
  );
};

export default QueryClientContextProvider;
