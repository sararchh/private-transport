import { useQuery } from "@tanstack/react-query";
import { apiConfig } from "@/config/api.config";
import { api } from "@/libs/axios/api-client.lib";

import { IRideParams } from "@/modules/Rides/interface/ride.interface";

const getRides = async (customer_id: string, driver_id?: number) => {
  const params: IRideParams = {};
  if (driver_id) {
    params["driver_id"] = driver_id;
  }

  const { data } = await api.get(
    apiConfig.routes.drivers.list + `/${customer_id}`,
    {
      params,
    }
  );

  return data.data;
};

export const useGetRides = (customer_id: string, driver_id: number) =>
  useQuery({
    queryKey: ["rides-list", customer_id, driver_id],
    queryFn: () => getRides(customer_id, driver_id),
    // onSettled: () => {
    //   alert("Lista de motoristas carregada com sucesso!");
    // }, 
  });
