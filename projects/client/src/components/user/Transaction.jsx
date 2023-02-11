import { Badge, Box, Center, HStack, Stack, Text } from "@chakra-ui/react";
import Axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export const TransactionComp = () => {
  const [data, setData] = useState();
  const [data2, setData2] = useState();
  const { id } = useSelector((state) => state.userSlice.value);

  let dateNow = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate() + 2
  ).toLocaleString("en-EN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const getData = async () => {
    try {
      const result = await Axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/transaction/findById/${id}`
      );
      setData(result.data);
      setData2(result.data[1]?.id);
    } catch (err) {}
  };

  useEffect(() => {
    getData();
  }, [id]);

  return (
    <div>
      {data?.map((item) => {
        return (
          <Center>
            <Box
              w={"370px"}
              mb="10px"
              boxShadow={"md"}
              border="1px"
              borderRadius="10px"
              borderColor={"#285430"}
            >
              <Stack textColor={"#285430"} ml={"10px"} spacing={5} mb={2}>
                <Box as={Link} to={`/transaction/${item.id}`}>
                  <Text align={"left"} mt={"10px"}>
                    Order No. {item.id_order}
                  </Text>
                  <Text align={"left"}>Delivered Date: {dateNow}</Text>
                </Box>

                <HStack>
                  <Badge color={"#285430"} mb={"10px"}>{item.status}</Badge>
                </HStack>
                <Box>
                  <Text align={"left"}>
                    {new Intl.NumberFormat("IND", {
                      style: "currency",
                      currency: "IDR",
                    }).format(item.totalOrder)}
                  </Text>
                </Box>
              </Stack>
            </Box>
          </Center>
        );
      })}
    </div>
  );
};
