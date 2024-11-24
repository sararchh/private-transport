import React from "react";
import Image from "next/image";

import { useConfig } from "@/contexts/config.context";
import { useRide } from "@/contexts/ride.context";

import { Button } from "@chakra-ui/react";

export const HeaderWidgetLP = () => {
  const { configApp } = useConfig();
  const { handleSetEstimate } = useRide();

  const handleCleanEstimate = () => {
    handleSetEstimate({
      step: 0,
      estimate: undefined,
      customer_id: "",
      origin: "",
      destination: "",
    });
  };

  return (
    <div
      className={`w-full h-[80px] bg-[var(--color-primary)] bg-cover bg-center pl-8 pr-8 shadow-md flex justify-between items-center`}
    >
      <div className="flex items-center">
        <Image
          src="/assets/logo.png"
          className="object-cover"
          alt="Logo do aplicativo de busca de táxi"
          objectFit="cover"
          width={70}
          height={70}
        />
        <h1 className=" text-2xl font-bold">{configApp.nameApp}</h1>
      </div>

      <Button
        variant="solid"
        bgColor="orange"
        w="12rem"
        borderRadius="5px"
        type="button"
        color="black"
        fontWeight="bold"
        onClick={handleCleanEstimate}
      >
        Solicitar nova viagem
      </Button>
    </div>
  );
};
