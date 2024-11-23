import { apiConfig } from "@/config/api.config";
import { api } from "@/libs/axios/api-client.lib";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  IEstimateRide,
  IRideLocalStorage,
} from "@/modules/Rides/interface/ride.interface";
import useLocalStorage from "@/hooks/useLocalStorage";

const createEstimateRide = async (values: IEstimateRide) => {
  const { data } = await api.post(apiConfig.routes.drivers.create, values);
  return data;
};

export const useCreateEstimateRide = () => {
  const [estimate, setEstimate] = useLocalStorage<IRideLocalStorage>(
    "@router-estimate",
    {
      step: 0,
    } as any
  );

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createEstimateRide,
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["rides-list"],
      });
    },
  });
};
