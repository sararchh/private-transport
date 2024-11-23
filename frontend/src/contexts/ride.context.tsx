import useLocalStorage from "@/hooks/useLocalStorage";
import { IRideLocalStorage } from "@/modules/Rides/interface/ride.interface";
import React, { createContext, useContext, ReactNode } from "react";

interface RideContextProps {
  estimate: IRideLocalStorage;
  handleSetEstimate: (data: IRideLocalStorage) => void;
}

export const RideContext = createContext<RideContextProps>(
  {} as RideContextProps
);

export const EstimateProvider = ({ children }: { children: ReactNode }) => {
  const [estimate, setEstimate] = useLocalStorage<IRideLocalStorage>(
    "@router-estimate",
    { step: 0 } as IRideLocalStorage
  );

  const [step, setStep] = React.useState<number>(estimate.step);

  const handleSetEstimate = (data: IRideLocalStorage) => {
    setEstimate({ ...estimate, ...data } as IRideLocalStorage);
  };

  return (
    <RideContext.Provider value={{ estimate, handleSetEstimate }}>
      {children}
    </RideContext.Provider>
  );
};

export const useRide = () => useContext(RideContext);
