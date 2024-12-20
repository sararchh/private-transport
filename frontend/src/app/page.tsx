"use client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { HeaderWidgetLP } from "@/modules/LandingPage/ui/HeaderWidget/HeaderWidgetLP";

import { IfRender } from "@/utils/jsx";

import { useRide } from "@/contexts/ride.context";

import FormRide from "@/modules/Rides/ui/FormRide";
import TravelOptions from "@/modules/Rides/ui/TravelOptions";
import RideHistory from "@/modules/Rides/ui/RideHistory";

export default function Home() {
  const { estimate } = useRide();

  return (
    <main className="w-full h-full">
      <HeaderWidgetLP />
      <div className="w-full max-w-[750px] min-h-[450px] h-full lg:bg-[var(--color-white)] sm:bg-transparent md:bg-transparent m-2 mx-auto rounded-lg shadow-sm p-4 sm:p-6 md:p-8 mt-9 ">
        <IfRender condition={estimate.step === 0}>
          <FormRide />
        </IfRender>

        <IfRender condition={estimate.step === 1}>
          <TravelOptions />
        </IfRender>

        <IfRender condition={estimate.step === 2}>
          <RideHistory/>
        </IfRender>
      </div>
      <ToastContainer />
    </main>
  );
}