import React, { useState } from "react";
import { toast } from "react-toastify";
import {
  Button,
  Text,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
  createListCollection,
} from "@chakra-ui/react";
import { useForm, SubmitHandler, Controller, set } from "react-hook-form";

import InputCustom from "@/components/atoms/Input/Input";

import { useGetDrivers } from "../http/client/useGetDrivers";
import { useGetRides } from "../http/client/useGetRides";
import {
  IDriver,
  IError,
  TFormValuesHistory,
} from "../interface/ride.interface";
import { IfRender, MapRender } from "@/utils/jsx";
import ListRides from "./widgets/ListRides";

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
    data: { customerId: string; rides: IDriver[] | undefined } | undefined;
    isError: boolean;
    error: IError | null | any;
  } = useGetRides(customerId, driverId, fetchRides);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TFormValuesHistory>();

  const frameworks = createListCollection({
    items: [
      { id: 0, name: "Todos", value: "Todos" },
      ...(drivers || []).map((driver) => ({
        id: driver.id,
        name: driver.name,
        value: driver.name,
      })),
    ],
  });

  const onSubmit: SubmitHandler<TFormValuesHistory> = async (data) => {
    const driver_id = data.driver.items[0].id;

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

      <div className="relative w-full flex flex-col items-center ">
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

          <Controller
            name="driver"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <SelectRoot
                collection={frameworks}
                size="sm"
                width="100%"
                {...field}
                onValueChange={(value) => field.onChange(value)}
              >
                <SelectLabel fontWeight="600">Motorista</SelectLabel>
                <SelectTrigger
                  width="100%"
                  border="1px solid #6e6e6e60"
                  outline="none"
                  padding="0.5rem"
                >
                  <SelectValueText placeholder="Selecione um motorista" />
                </SelectTrigger>
                <SelectContent padding="0.5rem">
                  {frameworks?.items.map((driver) => (
                    <SelectItem
                      key={driver.name}
                      item={driver}
                      borderBottom="1px solid #6e6e6e20"
                    >
                      {driver.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </SelectRoot>
            )}
          />

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
          items={data?.rides || []}
          key={data?.customerId}
          render={(item: any, index) => (
            <ListRides ride={item} key={index}   />
          )}
        />

        </IfRender>
    </>
  );
};

export default RideHistory;
