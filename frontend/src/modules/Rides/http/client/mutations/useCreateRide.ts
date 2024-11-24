import { apiConfig } from "@/config/api.config";
import { api } from "@/libs/axios/api-client.lib";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  IEstimateRide,
} from "@/modules/Rides/interface/ride.interface";

const createEstimateRide = async (values: IEstimateRide) => {
  const { data } = await api.post(apiConfig.routes.drivers.create, values);
  return data;
};

export const useCreateEstimateRide = () => {
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
