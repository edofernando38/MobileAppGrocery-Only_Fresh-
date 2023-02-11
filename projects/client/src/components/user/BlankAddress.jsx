import { Button } from "@chakra-ui/button";
import {  Flex, Stack, Text } from "@chakra-ui/layout";
import React from "react";

export const BlankAddress = () => {
  return (
    <div>
      <Flex ml={"15px"} pr={"20px"} mt="90px">
        <Stack>
          <Button
            _placeholder={{ color: "#5F8D4E" }}
            w={"370px"}
            backgroundColor="#E5D9B6"
            textColor="#285430"
            border="1px"
            borderColor={"#285430"}
          >
            <Text color={"#285430"}>
            Please Login To Get Your Delivery
            </Text>
          </Button>
        </Stack>
      </Flex>
    </div>
  );
};
