import React from "react";
import Image from "next/image";

import { useConfig } from "@/contexts/config.context";

export const HeaderWidgetLP = () => {
  const { configApp } = useConfig();

  return (
   <div
     className={`relative w-full h-[80px] bg-[var(--color-primary)] bg-cover bg-center flex items-center pl-8 shadow-md`}
   >
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
  );
};
