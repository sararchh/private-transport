import { useQuery } from "@tanstack/react-query";
import { apiConfig } from "@/config/api.config";
import { api } from "@/libs/axios/api-client.lib";


const getDrivers = async () => {
  const { data } = await api.get(apiConfig.routes.drivers.listDrivers);

  return data;
};

export const useGetDrivers = () =>
  useQuery({
    queryKey: ["drivers-list"],
    queryFn:  getDrivers,
  });
