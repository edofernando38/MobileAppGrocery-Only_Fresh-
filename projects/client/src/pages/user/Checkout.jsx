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
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Axios from "axios";

export const Checkout = () => {
  const [data, setData] = useState([]);
  const [data2, setData2] = useState();
  const [data4, setData4] = useState();
  const [data5, setData5] = useState();
  const [data6, setData6] = useState();
  const params = useParams();

  const getData = async () => {
    try {
      const result = await Axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/transaction/list/${params.id}`
      );
      setData(result.data);
      setData6(result.data.id);
      setData4(result.data);
      const selectedItem = result.data.totalOrder;
      const selectedCharge = result.data.totalCharge;

      let totalOrder = selectedItem + selectedCharge;
      setData2(totalOrder);

      const statusDone = result.data.status;
      setData5(statusDone);
    } catch (err) {
    }
  };

  useEffect(() => {
    getData();
  }, [data6]);

  const toPayment = () => {
    window.location.replace(`/checkout/success/${params.id}`);
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
            <Box as={Link} to={"/cart"}>
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
                CHECKOUT
              </Text>
            </Box>
          </Box>
          <Box
            mt={"80px"}
            className="body"
            bgColor="white"
            h={"100%"}
            pb={"75px"}
            w={"390px"}
          >
            <FormControl>
              <FormLabel mt={"10px"} ml={"10px"} textColor="#285430">
                Payment Detail
              </FormLabel>
              <Flex justify={"space-between"}>
                <Box>
                  <Text mt={"10px"} ml={"10px"} textColor="#285430">
                    Subtotal Produk
                  </Text>
                </Box>
                <Box>
                  <Text mt={"10px"} ml={"10px"} mr="10px" textColor="#285430">
                    {new Intl.NumberFormat("IND", {
                      style: "currency",
                      currency: "IDR",
                    }).format(data4?.totalOrder)}
                  </Text>
                </Box>
              </Flex>
            </FormControl>
            <FormControl>
              <FormLabel mt={"10px"} ml={"10px"} textColor="#285430">
                Payment Subtotal
              </FormLabel>
              <Flex justify={"space-between"}>
                <Text mt={"10px"} ml={"10px"} textColor="#285430">
                  Delivery Charge
                </Text>
                <Text mt={"10px"} ml={"10px"} mr="10px" textColor="#285430">
                {new Intl.NumberFormat("IND", {
                      style: "currency",
                      currency: "IDR",
                    }).format(data4?.totalCharge)}
                </Text>
              </Flex>
            </FormControl>
            <Flex justify={"space-between"}>
              <Text as={"b"} mt={"10px"} ml={"10px"} color="#285430">
                Total
              </Text>
              <Text as={"b"} mt={"10px"} ml={"10px"} mr="10px" color="#285430">
              {new Intl.NumberFormat("IND", {
                      style: "currency",
                      currency: "IDR",
                    }).format(data2)}
              </Text>
            </Flex>
            <Button
              ml={"10px"}
              onClick={toPayment}
              mt={"20px"}
              w={"370px"}
              bgColor={"#A4BE7B"}
              borderColor="#285430"
              border="2px"
              fontSize="16px"
              color="gray.800"
              justifyContent="center"
            >
              Checkout
            </Button>
          </Box>
        </Center>
      </Box>
    </div>
  );
};
