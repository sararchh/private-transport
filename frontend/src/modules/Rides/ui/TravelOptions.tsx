import { useRide } from "@/contexts/ride.context";
import React from "react";

import { Button, Text } from "@chakra-ui/react";
import { usePatchConfirmRide } from "../http/client/mutations/usePatchRide";
import { IError, IRideBody } from "../interface/ride.interface";

const TravelOptions: React.FC = () => {
  const { estimate, handleSetEstimate } = useRide();
  console.log("🚀 ~ estimate:", estimate);

  const {
    mutateAsync: createEstimateRide,
    isError,
    error,
  }: {
    mutateAsync: (values: IRideBody) => Promise<{ sucess: boolean }>;
    isError: boolean;
    error: IError | null | any;
  } = usePatchConfirmRide();

  return (
    <>
      <Text textStyle="2xl" fontWeight="600" marginBottom="1.2rem">
        Opções de viagem
      </Text>
    </>
  );
};

export default TravelOptions;
