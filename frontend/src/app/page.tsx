"use client";
import { useState } from "react";

import { HeaderWidgetLP } from "@/modules/LandingPage/ui/HeaderWidget/HeaderWidgetLP";
import FormRide from "@/modules/Rides/ui/FormRide";

export default function Home() {
  const [step, setStep] = useState<number>(0);

  return (
    <main className="w-full h-full">
      <HeaderWidgetLP />
      <div className="w-[750px] min-h-[450px] h-full bg-[var(--color-white)] m-0 mx-auto rounded-lg shadow-sm p-8 mt-9">
        {step === 0 && <FormRide />}
      </div>
    </main>
  );
}
