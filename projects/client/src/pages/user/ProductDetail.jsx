import {
  Box,
  Center,
  Flex,
  Heading,
  Image,
  List,
  ListItem,
  Stack,
  Text,
} from "@chakra-ui/react";
import Axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowBackIcon } from "@chakra-ui/icons";

export const ProductDetail = () => {
  const [data, setData] = useState([]);
  const params = useParams();

  const getProduct = async () => {
    try {
      const result = await Axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/product/list/${params.id}`
      );
      setData(result.data);
    } catch (err) {
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

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
            zIndex="2"
          >
            <Box as={Link} to={"/"}>
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
                PRODUCT DETAIL
              </Text>
            </Box>
          </Box>
          <Box
            mt={"80px"}
            pt={"30px"}
            className="body"
            bgColor="white"
            h={"90vh"}
            w={"390px"}
            border="2px"
          >
            <Box ml="10px" textColor={"#285430"}>
              <Flex>
                <Image
                  rounded={"md"}
                  alt={data?.productName}
                  src={`${process.env.REACT_APP_API_BASE_URL}/` + data?.picture}
                  fit={"fill"}
                  boxSize="280px"
                  margin={"auto"}
                />
              </Flex>
              <Stack spacing={{ base: 6, md: 6 }}>
                <Center>
                  <Heading
                    mt={"20px"}
                    ml={"10px"}
                    width="370px"
                    lineHeight={1.1}
                    fontWeight={400}
                    fontSize="4xl"
                  >
                    {data?.productName}
                  </Heading>
                </Center>
                <Text
                  pl={"10px"}
                  color={"#285430"}
                  fontWeight={300}
                  fontSize={"2xl"}
                >
                  Berat: {data?.weight} g
                </Text>
                <Stack spacing={{ base: 4, sm: 6 }} direction={"column"}>
                  <Box>
                    <Text
                      ml={"10px"}
                      fontSize={{ base: "16px", lg: "18px" }}
                      color={"#285430"}
                      as="b"
                      fontWeight={"500"}
                      textTransform={"uppercase"}
                    >
                      Description
                    </Text>

                    <List spacing={2}>
                      <ListItem
                        border="1px"
                        borderRadius={"xl"}
                        mt="10px"
                        w="365px"
                        p="10px"
                      >
                        {data?.description}
                      </ListItem>
                    </List>
                  </Box>
                </Stack>
              </Stack>
            </Box>
          </Box>
        </Center>
      </Box>
    </div>
  );
};