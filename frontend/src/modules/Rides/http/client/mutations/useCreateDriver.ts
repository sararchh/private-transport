import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/libs/axios/apiClient';
import { apiConfig } from '@/config/api';

const createDriver = async (values: any) => {
   await api.post(apiConfig.routes.drivers.create, values);
};

export const useCreateDriver = () => {
   const queryClient = useQueryClient();
   return useMutation({
      mutationFn: createDriver,
      onSettled: () => {
         // função que será executada após a execução da query
         queryClient.invalidateQueries({
            queryKey: ['drivers-list'],
         });
      },
   });
};
