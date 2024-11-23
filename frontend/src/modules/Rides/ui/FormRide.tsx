import React from "react";
import { Button, Text } from "@chakra-ui/react";
import { useForm, SubmitHandler } from "react-hook-form";

import InputCustom from "@/components/atoms/Input/Input";

import { useCreateEstimateRide } from "../http/client/mutations/useCreateRide";

import {
  IError,
  IEstimate,
  IEstimateRide,
  TFormValues,
} from "../interface/ride.interface";
import { toast } from "react-toastify";

import { useRide } from "@/contexts/ride.context";

const FormRide: React.FC = () => {
  const {
    mutateAsync: createEstimateRide,
    isError,
    error,
  }: {
    mutateAsync: (values: IEstimateRide) => Promise<IEstimate>;
    isError: boolean;
    error: IError | null | any;
  } = useCreateEstimateRide();


  const { estimate, handleSetEstimate } = useRide();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TFormValues>();

  const onSubmit: SubmitHandler<TFormValues> = async (data) => {
    if (data.destination.trim() === data.origin.trim()) {
      toast.error("Origem e destino não podem ser iguais");
      return;
    }

    const estimate = await createEstimateRide(data);

    if (isError) {
      toast.error(error.response.data.error_description);
      return;
    }

    handleSetEstimate({ step: 1, estimate, customer_id: data.customer_id });
  };

  return (
    <>
      <Text textStyle="2xl" fontWeight="600" marginBottom="1.2rem">
        {" "}
        Solicitação de viagem
      </Text>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center w-full"
      >
        <InputCustom
          id="customer_id"
          label="ID Cliente"
          placeholder="Digite o ID do cliente"
          invalid={!!errors.customer_id}
          errorText={errors.customer_id ? "Campo inválido" : ""}
          register={register("customer_id", { required: true, minLength: 1 })}
        />
        <InputCustom
          id="origin"
          label="Origem"
          placeholder="Digite o endereço de origem"
          invalid={!!errors.origin}
          errorText={errors.origin ? "Campo inválido" : ""}
          register={register("origin", { required: true, minLength: 3 })}
        />
        <InputCustom
          id="destination"
          label="Destino"
          placeholder="Digite o endereço de destino"
          invalid={!!errors.destination}
          errorText={errors.destination ? "Campo inválido" : ""}
          register={register("destination", { required: true, minLength: 3 })}
        />

        <Button
          variant="solid"
          bgColor="orange"
          w="10rem"
          borderRadius="5px"
          type="submit"
          color="black"
          fontWeight="bold"
        >
          Buscar
        </Button>
      </form>
    </>
  );
};

export default FormRide;
