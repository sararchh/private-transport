"use client";
import React, { useEffect } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import customThemeChakra from "@/styles/themeChakra";

import { queryClient } from "@/config/query-client.config";
import { ConfigProvider } from "@/contexts/config.context";
import { EstimateProvider } from "@/contexts/ride.context";

const ClientRootProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles?.parentElement) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <ChakraProvider value={customThemeChakra}>
      <ConfigProvider>
        <EstimateProvider>
          <QueryClientProvider client={queryClient}>
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </EstimateProvider>
      </ConfigProvider>
    </ChakraProvider>
  );
};

export default ClientRootProvider;
