import React, { useMemo, useState } from "react";
import { toast } from "react-toastify";
import { Button, Text } from "@chakra-ui/react";
import { useForm, SubmitHandler } from "react-hook-form";

import InputCustom from "@/components/atoms/Input/Input";

import { useGetDrivers } from "../http/client/useGetDrivers";
import { useGetRides } from "../http/client/useGetRides";

import { IDriver, IError, IRideBody, TFormValuesHistory } from "../interface/ride.interface";

import { IfRender, MapRender } from "@/utils/jsx";
import ListRides from "./widgets/ListRides";

const ordernedData = (data: IRideBody[]) => {
  return data.sort((a: IRideBody[][0], b: IRideBody[][0]) => {
    if (a.date < b.date) {
      return 1;
    }
    if (a.date > b.date) {
      return -1;
    }
    return 0;
  });
};

const RideHistory: React.FC = () => {
  const [customerId, setCustomerId] = useState("");
  const [driverId, setDriverId] = useState<number | undefined>(undefined);
  const [fetchRides, setFetchRides] = useState(false);

  const { data: drivers }: { data: IDriver[] | undefined } = useGetDrivers();
  const {
    data,
    isError,
    error,
  }: {
    data: { customerId: string; rides: IRideBody[] | undefined } | undefined;
    isError: boolean;
    error: IError | null | any;
  } = useGetRides(customerId, driverId, fetchRides);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TFormValuesHistory>();

  const dataOrdenated = useMemo(() => {
    return ordernedData(data?.rides || []);
  }, [data?.rides]);

  const onSubmit: SubmitHandler<TFormValuesHistory> = async (data) => {
    const driver_id = parseInt(data.driver_id);

    setCustomerId(data.customer_id);
    if (driver_id === 0) {
      setDriverId(undefined);
    } else {
      setDriverId(driver_id);
    }
    setFetchRides(true);

    if (isError) {
      toast.error(error.response.data.error_description);
    }
  };

  return (
    <>
      <Text textStyle="2xl" fontWeight="600" marginBottom="1.2rem">
        Histórico de viagens
      </Text>

      <div className="relative w-full flex flex-col items-center mb-11 ">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col items-center"
          style={{ paddingBottom: "5rem" }}
        >
          <InputCustom
            id="customer_id"
            label="ID Cliente"
            placeholder="Digite o ID do cliente"
            invalid={!!errors.customer_id}
            errorText={errors.customer_id ? "Campo inválido" : ""}
            register={register("customer_id", { required: true, minLength: 1 })}
          />

          <div className="w-full">
            <label className="font-semibold">Motorista</label>
            <select
                {...register("driver_id")}
                className="w-full border border-gray-300 bg-transparent py-2 pl-2 text-left shadow-sm focus:outline-none sm:text-sm rounded-[5px]"
              >
              <option value={0}>Todos</option>
              {drivers?.map((driver) => (
                <option key={driver.id} value={driver.id}>
                  {driver.name}
                </option>
              ))}
            </select>
          </div>

          <Button
            variant="solid"
            bgColor="orange"
            w="10rem"
            mt="5rem"
            borderRadius="5px"
            type="submit"
            color="black"
            fontWeight="bold"
            position="absolute"
            top="8rem"
          >
            Filtrar
          </Button>
        </form>
      </div>

      <IfRender condition={!!data?.rides && data?.rides.length > 0}>
        <MapRender
          items={dataOrdenated || []}
          key={data?.customerId}
          render={(item: IRideBody, index) => <ListRides ride={item} key={index} />}
        />
      </IfRender>
    </>
  );
};

export default RideHistory;