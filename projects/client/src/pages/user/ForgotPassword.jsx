import Axios from "axios";
import Swal from "sweetalert2";
import {
  Input,
  Button,
  FormControl,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Stack,
  Text,
  Heading,
} from "@chakra-ui/react";

export const ForgotPasswordPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onSendEmail = async () => {
    try {
      const email = document.getElementById("email").value;
      const result = await Axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/user/forgotPassword`,
        { email: email }
      );

      Swal.fire({
        icon: "error",
        title: "Oops...",
        width: "370px",
        text: `${result.data}`,
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${err.response.data}`,
        width: "370px",
        customClass: {
          container: "my-swal",
        },
      });
    }
  };

  return (
    <div>
       <Button onClick={onOpen} as="u" variant={"unstyled"} color="#5F8D4E">
        Click Here
      </Button>
      <Modal
        colorScheme={"#5F8D4E"}
        isOpen={isOpen}
        onClose={onClose}
        size={"xs"}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Stack
              spacing={4}
              w={"full"}
              maxW={"md"}
              bgColor={"#E5D9B6"}
              rounded={"xl"}
              boxShadow={"dark-lg"}
              p={6}
              my={12}
            >
              <Heading
                textColor={"#5F8D4E"}
                fontSize={{ base: "xl", md: "xl" }}
              >
                Forgot your password?
              </Heading>
              <Text fontSize={{ base: "sm", sm: "md" }} textColor={"#285430"}>
                You&apos;ll get an email with a reset link
              </Text>
              <FormControl id="email">
                <Input
                  placeholder="your-email@example.com"
                  _placeholder={{ color: "#5F8D4E" }}
                  bgColor={"white"}
                  textColor="#285430"
                  borderColor={"#285430"}
                  type="email"
                />
              </FormControl>
              <Stack spacing={6}>
                <Button
                  onClick={onSendEmail}
                  _hover={{
                    bg: "#E5D9B6",
                  }}
                  bgColor={"#A4BE7B"}
                  borderColor="#285430"
                  border="2px"
                  fontSize="18px"
                  color="gray.800"
                  w={"150px"}
                  margin="auto"
                >
                  Request Reset
                </Button>
              </Stack>
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};
