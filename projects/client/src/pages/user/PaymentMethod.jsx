import { ArrowBackIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

export const PaymentMethod = () => {
  const navigate = useNavigate();

  const toPayMethod = () => {
    navigate("/checkout/payment/success");
  };

  return (
    <div>
      <Box>
        <Center>
          <Box
            className="header"
            w={"390px"}
            h={"80px"}
            bgColor="#E5D9B6"
            display={"flex"}
            justifyContent="space-between"
            pt={"10px"}
            pl={"1px"}
            pos="fixed"
            top={"0"}
            zIndex={"2"}
          >
            <Box as={Link} to={"/checkout"}>
              <ArrowBackIcon
                mt={"20px"}
                ml={"20px"}
                pos={"fixed"}
                color="#285430"
                fontSize={"25px"}
              />
            </Box>
            <Box margin={"auto"} alignItems={"center"} textColor="#285430">
              <Text m="100px" as={"b"} fontSize="xl">
                PAYMENT METHOD
              </Text>
            </Box>
          </Box>
          <Box
            mt={"100px"}
            className="body"
            bgColor="white"
            h={"100%"}
            w={"390px"}
          >
            <FormControl>
              <FormLabel>Payment Detail</FormLabel>
              <Flex justify={"space-between"}>
                <Box>
                  <Text>Order Total</Text>
                  <Text>Delivery Charge</Text>
                </Box>
                <Box>
                  <Text>xx.xxx</Text>
                  <Text>xx.xxx</Text>
                </Box>
              </Flex>
            </FormControl>
            <Flex justify={"space-between"}>
              <Text as={"b"}>Total</Text>
              <Text as={"b"}>xx.xxx</Text>
            </Flex>
            <FormControl>
              <FormLabel>Order</FormLabel>
              <Flex>
                <Text>qty</Text>
                <Text>productName</Text>
                <Text>price</Text>
              </Flex>
            </FormControl>

            <Flex justify={"space-between"}></Flex>
            <Button onClick={toPayMethod} w={"100%"}>
              Pay
            </Button>
          </Box>
        </Center>
      </Box>
    </div>
  );
};
