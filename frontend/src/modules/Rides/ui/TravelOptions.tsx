import React from "react";
import { useRide } from "@/contexts/ride.context";

import { Box, Text } from "@chakra-ui/react";
import ListDrivers from "./widgets/ListDrivers";
import { convertDuration } from "@/utils/convert-duration";

const TravelOptions: React.FC = () => {
  const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string;
  const { estimate } = useRide();

  const origin = `${estimate.estimate?.origin?.latitude},${estimate.estimate?.origin?.longitude}`;
  const destination = `${estimate.estimate?.destination?.latitude},${estimate.estimate?.destination?.longitude}`;
  const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?size=600x400&path=color:blue|weight:5|${origin}|${destination}&markers=color:red|label:A|${origin}&markers=color:green|label:B|${destination}&key=${API_KEY}`;

  return (
    <>
      <Text textStyle="2xl" fontWeight="600" marginBottom="1.2rem">
        Opções de viagem
      </Text>

      <Box>
        <img
          src={mapUrl}
          alt="Mapa Estático com Rota"
          className="w-[100%] object-scale-down"
        />
        <Text textStyle="sm">
          Distância:{" "}
          {estimate.estimate?.distance
            ? `${(estimate.estimate.distance / 1000).toFixed(2)} km`
            : "N/A"}
        </Text>
        <Text textStyle="sm">
          Duração:{" "}
          {estimate.estimate?.duration
            ? convertDuration(estimate.estimate?.duration)
            : "N/A"}
        </Text>
      </Box>

      <Box>
        <ListDrivers data={estimate.estimate?.options || []} />
      </Box>
    </>
  );
};

export default TravelOptions;
