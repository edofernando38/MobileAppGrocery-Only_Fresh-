import { Link } from "react-router-dom";
import { Box, Center, Text } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { AddAddress } from "../../components/user/AddAddress";

export const AddressPage = () => {

  return (
    <>
       <Center>
        <Box w={"390px"} h={"844px"} bgColor="white">
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
            <Box as={Link} to={"/account/address"}>
              <ArrowBackIcon
                mt={"20px"}
                ml={"20px"}
                pos={"fixed"}
                color="#285430"
                fontSize={"25px"}
              />
            </Box>
              <Box margin={"auto"} alignItems={"center"} textColor="#285430">
                <Text as={"b"} fontSize="xl">
                  ADD ADDRESS
                </Text>
              </Box>
          </Box>
          <Box
            mt={"100px"}
            className="body"
            bgColor="white"
            h={"125vh"}
            w={"390px"}
          >
            <AddAddress />
          </Box>
        </Box>
      </Center>
    </>
  );
};
