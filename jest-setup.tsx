import '@testing-library/react-native/extend-expect';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import React from "react";

jest.mock('@expo/vector-icons', () => ({
  Ionicons: 'Ionicons',
}));

export const getQueryWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: Infinity
      },
    },
  })

  return ({children}: React.ReactNode ) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}