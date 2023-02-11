import Axios from "axios";
import { useState, useRef } from "react";
import { Navigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import {
  Button,
  FormControl,
  Flex,
  Stack,
  HStack,
  Box,
  Center,
  Heading,
  PinInput,
  PinInputField,
} from "@chakra-ui/react";

export const VerificationPage = () => {
  const params = useParams();
  const [move, setMove] = useState(false);
  const otp1 = useRef("");
  const otp2 = useRef("");
  const otp3 = useRef("");
  const otp4 = useRef("");
  const otp5 = useRef("");
  const otp6 = useRef("");

  const onVerification = async () => {
    try {
      const otp = `${otp1.current.value}${otp2.current.value}${otp3.current.value}${otp4.current.value}${otp5.current.value}${otp6.current.value}`;

      const res = await Axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/user/verification`,
        { code_otp: otp },
        {
          headers: {
            Authorization: `Bearer ${params.token}`,
          },
        }
      );

      Swal.fire({
        icon: "success",
        text: `${res.data.message}`,
        width: "370px",
      });
      setMove(true);
    } catch (err) {
      Swal.fire({
        icon: "error",
        text: `${err.response.data}`,
        width: "370px",
        customClass: {
          container: "my-swal",
        },
      });
    }
  };

  return move ? (
    <Navigate to="/" />
  ) : (
    <>
      <Box>
        <Center>
          <Box>
            <Flex
              minH={"100vh"}
              align={"center"}
              justify={"center"}
              bg={"#E5D9B6"}
              h={"844px"}
              w={"390px"}
            >
              <Stack
                spacing={4}
                w={"full"}
                maxW={"sm"}
                bg={"#E5D9B6"}
                p={6}
                my={10}
                mt="-380px"
              >
                <Center>
                  <Heading
                    color={"#285430"}
                    lineHeight={1.1}
                    fontSize={{ base: "2xl", md: "3xl" }}
                  >
                    Verify your Email
                  </Heading>
                </Center>
                <Center
                  textColor={"#285430"}
                  fontSize={{ base: "sm", sm: "md" }}
                >
                  We have sent code to your email
                </Center>
                <FormControl>
                  <Center>
                    <HStack>
                      <PinInput>
                        <PinInputField
                          type={"password"}
                          ref={otp1}
                          size="xl"
                          textColor="gray.800"
                          border="2px"
                          borderColor={"#285430"}
                        />
                        <PinInputField
                          type={"password"}
                          ref={otp2}
                          size="xl"
                          textColor="gray.800"
                          border="2px"
                          borderColor={"#285430"}
                        />
                        <PinInputField
                          type={"password"}
                          ref={otp3}
                          size="xl"
                          textColor="gray.800"
                          border="2px"
                          borderColor={"#285430"}
                        />
                        <PinInputField
                          type={"password"}
                          ref={otp4}
                          size="xl"
                          textColor="gray.800"
                          border="2px"
                          borderColor={"#285430"}
                        />
                        <PinInputField
                          type={"password"}
                          ref={otp5}
                          size="xl"
                          textColor="gray.800"
                          border="2px"
                          borderColor={"#285430"}
                        />
                        <PinInputField
                          type={"password"}
                          ref={otp6}
                          size="xl"
                          textColor="gray.800"
                          border="2px"
                          borderColor={"#285430"}
                        />
                      </PinInput>
                    </HStack>
                  </Center>
                </FormControl>
                <Stack spacing={6}>
                  <Button
                    onClick={onVerification}
                    bgColor={"#A4BE7B"}
                    borderColor="#285430"
                    fontSize="18px"
                    color="gray.800"
                    border="2px"
                  >
                    Verify
                  </Button>
                </Stack>
              </Stack>
            </Flex>
          </Box>
        </Center>
      </Box>
    </>
  );
};
