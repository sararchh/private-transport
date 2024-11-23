import { Box, Button, Text, Grid, GridItem } from "@chakra-ui/react";
import React from "react";
import { IEstimate } from "../../interface/ride.interface";
import { IoPersonCircleSharp } from "react-icons/io5";

const CardDriver: React.FC<{
  driver: IEstimate["options"][0];
  onClick: (driver: IEstimate["options"][0]) => void;
}> = ({ driver, onClick }) => {
  return (
    <Box w="100%">
      <Grid templateColumns="50px 1fr" gap="0.5rem" alignItems="flex-start">
        <GridItem display="flex" alignItems="center" flexDirection="column">
          <IoPersonCircleSharp width={55} height={55} size={55} />
          <Text textStyle="md" fontWeight="bold">
            {driver.review.rating}/5
          </Text>
        </GridItem>

        <GridItem>
          <span className="flex flex-col">
            <Text textStyle="lg" fontWeight="bold">
              {driver.name.toLocaleUpperCase()}
            </Text>
            <Text textStyle="sm" fontWeight="semibold">
              {driver.vehicle.toLocaleUpperCase()}
            </Text>
          </span>

          <Box
            display={{ base: "flex", sm: "flex", md: "flex", lg: "flex" }}
            flexDirection={{
              base: "column",
              sm: "column",
              md: "column",
              lg: "row",
            }}
            gap={{ base: 1, sm: 1, md: 2, lg: 14 }}
            alignItems={{
              base: "start",
              sm: "start",
              md: "start",
              lg: "center",
            }}
            mt={1}
          >
            {" "}
            <Text textStyle="sm">{driver.description}</Text>
            <span className="flex flex-col lg:items-center md:items-start sm:items-start">
              <Text textStyle="lg" fontWeight="bold" color="orange.500">
                R$ {driver.value.toFixed(2)}
              </Text>
              <Button
                variant="solid"
                bgColor="orange"
                w="10rem"
                borderRadius="5px"
                type="button"
                color="black"
                fontWeight="bold"
                onClick={() => onClick(driver)}
              >
                Escolher
              </Button>
            </span>
          </Box>

          <Text textStyle="sm" mt="1rem">
            <li>{driver.review.comment}</li>
          </Text>
        </GridItem>
      </Grid>

      <Box w="80%" h="1px" bg="gray.200" my="1rem" mx="auto" />
    </Box>
  );
};

export default CardDriver;
