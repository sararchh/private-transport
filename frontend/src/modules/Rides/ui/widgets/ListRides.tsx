import React from "react";
import { IRideBody } from "../../interface/ride.interface";
import { Box, Text } from "@chakra-ui/react";
import { convertDuration } from "@/utils/convert-duration";

const ListRides: React.FC<{ ride: IRideBody }> = ({ ride }) => {
  const [date, time] = ride.date.split(" ");
  const [year, month, day] = date.split("-");
  const formattedDate = `${day}/${month}/${year}`;

  return (
    <Box marginBottom="1rem" fontWeight="semibold">
      <Text fontSize="sm">
        {formattedDate} - {time}
      </Text>

      <Text fontSize="sm" color="gray.500">
        {ride.driver.name}
      </Text>
      <Text fontSize="sm" color="gray.500">
        {ride.origin}
      </Text>
      <Text fontSize="sm" color="gray.500">
        {ride.destination}
      </Text>
      <Text fontSize="sm" color="gray.500">
        {ride.distance} m
      </Text>
      <Text textStyle="sm" color="gray.500">
        {ride.duration ? convertDuration(ride.duration) : "N/A"}
      </Text>

      <Text fontSize="sm" color="orange.500" fontWeight="semibold">
        R$ {ride.value.toFixed(2)}
      </Text>

      <Box w="80%" h="1px" bg="gray.200" my="1rem" mx="auto" />
    </Box>
  );
};

export default ListRides;
