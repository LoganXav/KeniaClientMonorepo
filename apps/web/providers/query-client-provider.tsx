"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

interface SiteProps {
  children: React.ReactNode;
}

export const QueryClientContextProvider = ({ children }: SiteProps) => {
  const queryClient = new QueryClient();

  return (
    <div>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </div>
  );
};

export default QueryClientContextProvider;
