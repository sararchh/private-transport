"use client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { HeaderWidgetLP } from "@/modules/LandingPage/ui/HeaderWidget/HeaderWidgetLP";
import FormRide from "@/modules/Rides/ui/FormRide";

import { IfRender, MapRender } from "@/utils/jsx";

import { useRide } from "@/contexts/ride.context";

export default function Home() {
  const { estimate } = useRide();

  return (
    <main className="w-full h-full">
      <HeaderWidgetLP />
      <div className="w-[750px] min-h-[450px] h-full bg-[var(--color-white)] m-0 mx-auto rounded-lg shadow-sm p-8 mt-9">
        <IfRender condition={estimate.step === 0}>
          <FormRide />
        </IfRender>

        <IfRender condition={estimate.step === 1}>
          <div>Step 1</div>
        </IfRender>
      </div>
      <ToastContainer />
    </main>
  );
}
