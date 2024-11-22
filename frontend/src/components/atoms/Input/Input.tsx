import React from "react";
import { Box, Input, Text } from "@chakra-ui/react";
import { UseFormRegisterReturn } from "react-hook-form";

interface InputProps {
  id: string;
  label: string;
  placeholder: string;
  invalid: boolean;
  errorText: string;
  register: UseFormRegisterReturn;
}

const InputCustom: React.FC<InputProps> = ({
  id,
  label,
  placeholder,
  invalid,
  errorText,
  register,
}) => {
  return (
    <Box w="100%">
      <label className="font-semibold" htmlFor={id}>
        {label}
      </label>
      <Input
        id={id}
        placeholder={placeholder}
        w="100%"
        border={invalid ? "1px solid red" : "1px solid #6e6e6e60"}
        outline="none"
        p="0.5rem"
        {...register}
      />
      {invalid && <Text color="red.500">{errorText}</Text>}
      {!invalid && <Text color="transparent">{"_"}</Text>}
    </Box>
  );
};

export default InputCustom;
