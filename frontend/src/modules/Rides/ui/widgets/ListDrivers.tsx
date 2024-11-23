import React, { useMemo } from "react";
import { VStack } from "@chakra-ui/react";

import { MapRender } from "@/utils/jsx";

import CardDriver from "./CardDriver";
import { IError, IEstimate, IRideBody } from "../../interface/ride.interface";
import { usePatchConfirmRide } from "../../http/client/mutations/usePatchRide";

import { useRide } from "@/contexts/ride.context";
import { toast } from "react-toastify";

const ordernedData = (data: IEstimate["options"]) => {
  return data.sort((a: IEstimate["options"][0], b: IEstimate["options"][0]) => {
    if (a.value > b.value) {
      return 1;
    }
    if (a.value < b.value) {
      return -1;
    }
    return 0;
  });
};

const ListDrivers: React.FC<{ data: IEstimate["options"] }> = ({ data }) => {
  const {
    mutateAsync: patchConfirmRide,
    isError,
    error,
  }: {
    mutateAsync: (values: IRideBody) => Promise<{ sucess: boolean }>;
    isError: boolean;
    error: IError | null | any;
  } = usePatchConfirmRide();

  const { estimate, handleSetEstimate } = useRide();

  const dataOrdenated = useMemo(() => {
    return ordernedData(data);
  }, [data]);

  const handleChooseDriver = async (driver: IEstimate["options"][0]) => {
    const data = {
      customer_id: estimate.customer_id,
      origin: estimate.origin,
      destination: estimate.destination,
      distance: estimate.estimate?.distance,
      duration: estimate.estimate?.duration,
      driver: {
        id: driver.id,
        name: driver.name,
      },
      value: driver.value,
    } as IRideBody;

    await patchConfirmRide(data);

    if (isError) {
      toast.error(error.response.data.error_description);
      return;
    }

    handleSetEstimate({
      ...estimate,
      step: 2,
    });
  };

  return (
    <VStack w="100%" mt="1rem">
      <MapRender
        items={dataOrdenated}
        render={(item: IEstimate["options"][0], index) => (
          <CardDriver driver={item} key={index} onClick={handleChooseDriver} />
        )}
      />
    </VStack>
  );
};

export default ListDrivers;
