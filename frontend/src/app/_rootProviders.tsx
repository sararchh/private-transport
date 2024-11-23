"use client";
import React, { useEffect } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import customThemeChakra from "@/styles/themeChakra";

import { queryClient } from "@/config/query-client.config";
import { ConfigProvider } from "@/contexts/config.context";
import { EstimateProvider } from "@/contexts/ride.context";

import { APIProvider, Map } from "@vis.gl/react-google-maps";

const ClientRootProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles?.parentElement) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string;

  return (
    <APIProvider
      solutionChannel="GMP_devsite_samples_v3_rgmbasicmap"
      apiKey={API_KEY}
    >
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
    </APIProvider>
  );
};

export default ClientRootProvider;
