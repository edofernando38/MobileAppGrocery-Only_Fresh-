import {
  Heading,
  Box,
  Center,
  Image,
  Flex,
  Text,
  Stack,
} from "@chakra-ui/react";
import { RegisterUser } from "../../components/user/Register";

export const RegisterPage = () => {
  return (
    <>
       <Box>
        <Center>
          <Box className="body" bgColor="#E5D9B6" h={"100%"} w={"390px"}>
            <Flex align={"center"} justify={"center"}>
              <Stack mx={"auto"} maxW={"auto"} py={3} px={6}>
                <Stack align={"center"}>
                  <Image
                    src={`${process.env.REACT_APP_API_BASE_URL}/upload/PIMG-167324294561798293.png`}
                    height="150px"
                  />
                  <Heading textColor={"#285430"} fontSize={"2xl"}>
                    Create your account
                  </Heading>
                  <Text fontSize={"lg"} color={"#285430"}>
                    to start your freshness{" "}
                  </Text>
                </Stack>
                <Box rounded={"2xl"} p={3}>
                  <RegisterUser />
                </Box>
              </Stack>
            </Flex>
          </Box>
        </Center>
      </Box>
    </>
  );
};
