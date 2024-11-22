import { QueryClient, type QueryClientConfig } from '@tanstack/react-query';
import { ONE_HOUR_IN_MS } from '@/utils/date';

const ERROR_REGEX = /(404)/;

export const queryClientDefaultOptions: QueryClientConfig['defaultOptions'] = {
  queries: {
    staleTime: ONE_HOUR_IN_MS,
    retryDelay: 0,
    refetchOnWindowFocus: false,
    retry: (count, error) => {
      const notFoundError = ERROR_REGEX.test((error as QueryError).message);
      return !notFoundError && count < 3;
    },
  },
};

export const queryClient = new QueryClient({
  defaultOptions: queryClientDefaultOptions,
});

type QueryError = {
  message: string;
};
