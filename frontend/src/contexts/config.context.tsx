"use client";
import { ConfigApp as configsApp } from "@/config/app.config";
import { ConfigJSONProps } from "@/modules/Core/interface/config-app.type";
//
import { usePathname } from "next/navigation";
import React, { useContext } from "react";

const DefaultConfigApp: ConfigJSONProps | any = {
  nameApp: "",
  domain: "",
  description: "",
  keywords: "",
  appUrl: "",
};

interface ConfigContextData {
  isMobile: boolean;
  configApp: ConfigJSONProps;
}

interface ConfigProviderProps {
  children: React.ReactNode;
}

export const ConfigContext = React.createContext({} as ConfigContextData);

export function ConfigProvider({ children, ...rest }: ConfigProviderProps) {
  const pathname = usePathname();

  const [loading, setLoading] = React.useState(true);
  const [isMobile, setIsMobile] = React.useState(false);
  const [configApp, setConfigApp] =
    React.useState<typeof DefaultConfigApp>(DefaultConfigApp);

  React.useEffect(() => {
    loadConfig();
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1100);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const loadConfig = async () => {
    setConfigApp(configsApp);
    setTimeout(() => {
      setLoading(false);
    }, 100);
  };

  return (
    <ConfigContext.Provider
      value={{
        isMobile,
        configApp,
      }}
    >
      <>
        {loading && <div>Carregando...</div>}
        {!loading && children}
      </>
    </ConfigContext.Provider>
  );
}

export const useConfig = () => useContext(ConfigContext);
