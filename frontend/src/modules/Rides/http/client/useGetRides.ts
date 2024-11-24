import { useQuery } from "@tanstack/react-query";
import { apiConfig } from "@/config/api.config";
import { api } from "@/libs/axios/api-client.lib";

import { IRideParams } from "@/modules/Rides/interface/ride.interface";

const getRides = async (customer_id: string, driver_id?: number) => {
  const params: IRideParams = {};
  if (driver_id) {
    params["driver_id"] = driver_id;
  }

  if(!customer_id) return [];

  const { data } = await api.get(
    apiConfig.routes.drivers.list + `/${customer_id}`,
    {
      params,
    }
  );

  return data;
};

export const useGetRides = (customer_id: string, driver_id?: number, enabled: boolean = true) =>
  useQuery({
    queryKey: ["rides-list", customer_id, driver_id],
    queryFn: () => getRides(customer_id!, driver_id),
    enabled,
    retry: false
  });
