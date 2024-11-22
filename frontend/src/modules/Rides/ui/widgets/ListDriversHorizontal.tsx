import React, { useMemo } from 'react';
import CardDriver from '../CardDriver';
import { useGetDrivers } from '../../http/client/useGetDrivers';
import { useCreateDriver } from '../../http/client/mutations/useCreateDriver';

// import { Container } from './styles';

const ListDriversHorizontal: React.FC = () => {
   const { mutate: createDriver } = useCreateDriver();
   const { data = [], isLoading, isFetching, isError } = useGetDrivers();

   const dataOrdenated = useMemo(() => {
      return ordernedData(data);
   }, [data]);

   const submit = () => {
      createDriver({});
   };

   return (
      <div>
         <button onClick={submit}>Criar</button>
         {dataOrdenated.map((_: any) => (
            <CardDriver key={crypto.randomUUID()} />
         ))}
      </div>
   );
};

export default ListDriversHorizontal;

const ordernedData = (data: any) => {
   return data.sort((a: any, b: any) => {
      if (a.name > b.name) {
         return 1;
      }
      if (a.name < b.name) {
         return -1;
      }
      return 0;
   });
};
