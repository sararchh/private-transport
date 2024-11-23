import React, { useMemo } from "react";
import { IEstimate } from "../../interface/ride.interface";
import { Box, VStack } from "@chakra-ui/react";
import { MapRender } from "@/utils/jsx";
import CardDriver from "./CardDriver";

const ordernedData = (data: IEstimate["options"]) => {
  return data.sort((a: IEstimate["options"][0], b: IEstimate["options"][0]) => {
    if (a.value > b.value) {
      return 1;
    }
    if (a.value < b.value) {
      return -1;
    }
    return 0;
  });
};

const ListDrivers: React.FC<{ data: IEstimate["options"] }> = ({ data }) => {
  const dataOrdenated = useMemo(() => {
    return ordernedData(data);
  }, [data]);

  const handleChooseDriver = (driver: IEstimate["options"][0]) => {
    console.log("Driver chosen:", driver);
  };

  return (
    <VStack w="100%" mt="1rem">
      <MapRender
        items={dataOrdenated}
        render={(item: IEstimate["options"][0], index) => (
          <CardDriver driver={item} key={index} onClick={handleChooseDriver} />
        )}
      />
    </VStack>
  );
};

export default ListDrivers;
