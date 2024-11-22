import { useQuery } from '@tanstack/react-query';
import { api } from '@/libs/axios/apiClient';
import { apiConfig } from '@/config/api';

const getDrivers = async () => {
   const { data } = await api.get(apiConfig.routes.drivers.list, {
      params: {
         page: 1,
         limit: 10,
      },
   });

   return data.data;
};

export const useGetDrivers = () =>
   useQuery({
      queryKey: ['drivers-list'], // key que controla cache
      queryFn: getDrivers, // função que será executada
      // onSettled: () => {
      //   alert("Lista de motoristas carregada com sucesso!");
      // }, // função que será executada após a execução da query
   });
