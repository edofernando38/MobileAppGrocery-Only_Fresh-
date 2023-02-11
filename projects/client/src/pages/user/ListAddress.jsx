import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Box, Button, Center, Text } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { ListAddress } from "../../components/user/ListAddress";

export const ListAddressPage = () => {
  const { id } = useSelector((state) => state.userSlice.value);
  const navigate = useNavigate();

  const toAddAddress = () => {
    navigate(`/account/address/add/${id}`);
  };

  return (
    <div>
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
            <Box as={Link} to={"/account"}>
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
                MY ADDRESS
              </Text>
            </Box>
          </Box>
          <Box
            mt={"80px"}
            pt={"3px"}
            className="body"
            bgColor="white"
            h={"740px"}
            w={"390px"}
          >
            <ListAddress />
            <Center>
              <Button
                mt="8"
                onClick={toAddAddress}
                bgColor={"#A4BE7B"}
                borderColor="#285430"
                border="2px"
                fontSize="18px"
                color="gray.800"
                width={"160px"}
                justifyContent="center"
              >
                Add Address
              </Button>
            </Center>
          </Box>
        </Box>
      </Center>
    </div>
  );
};
