import { Box, Heading, Text, Button, Center, Image } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export const RestrictedPage = () => {
  const navigate = useNavigate();
  const toHome = () => {
    navigate("/account");
  };
  return (
    <div>
      <Center>
        <Box>
          <Box
            textAlign="center"
            py={10}
            px={6}
            bgColor="#E5D9B6"
            w={"390px"}
            h={"820px"}
          >
            <Heading
              className="header"
              display="inline-block"
              as="h2"
              size="3xl"
              backgroundClip="text"
              color={"#285430"}
            >
              403
            </Heading>
            <Text color={"#285430"} fontSize="23px" mt={3} mb={2}>
              Restricted Access
            </Text>
            <Text color={"#285430"} fontSize="18px" mb={6}>
              You don't have authorization to access this page
            </Text>
            <Button
              bgColor={"#A4BE7B"}
              borderColor="#285430"
              border="2px"
              fontSize="18px"
              color="gray.800"
              onClick={toHome}
            >
              Back to Login
            </Button>
            <Box mt={"40px"}>
              <Image
                src={
                  "https://www.shareicon.net/data/512x512/2015/09/19/643274_access-denied_512x512.png"
                }
              />
            </Box>
          </Box>
        </Box>
      </Center>
    </div>
  );
};
