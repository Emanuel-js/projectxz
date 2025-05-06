import { QueryClient } from '@tanstack/react-query';

/**
 * Configure the QueryClient with default options
 * 
 * These settings apply to all queries unless overridden
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Don't refetch on window focus by default
      refetchOnWindowFocus: false,
      // Retry failed queries 1 time by default
      retry: 1,
      // Cache data for 5 minutes by default
      staleTime: 5 * 60 * 1000,
      // Consider data fresh for 30 seconds
      gcTime: 10 * 60 * 1000,
    },
    mutations: {
      // Retry failed mutations 1 time by default
      retry: 1,
    },
  },
});
