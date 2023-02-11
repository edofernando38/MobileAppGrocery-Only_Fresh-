import { Input, Box } from "@chakra-ui/react";

export const SearchComp = () => {
  return (
    <div>
      <Box pr={"20px"} pt="13px">
        <Input
          placeholder="Only Fresh Here..."
          _placeholder={{ color: "#5F8D4E" }}
          bgColor={"white"}
          textColor="black"
          borderColor={"#285430"}
          border={"2px"}
          w={"230px"}
        />
      </Box>
    </div>
  );
};
