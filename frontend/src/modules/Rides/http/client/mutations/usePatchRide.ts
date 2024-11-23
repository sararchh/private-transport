import { apiConfig } from "@/config/api.config";
import { api } from "@/libs/axios/api-client.lib";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { IRideBody } from "@/modules/Rides/interface/ride.interface";

const patchConfirmRide = async (values: IRideBody) => {
  const { data } = await api.patch(apiConfig.routes.drivers.patch, values);
  return data;
};

export const usePatchConfirmRide = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: patchConfirmRide,
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["rides-list"],
      });
    },
  });
};
