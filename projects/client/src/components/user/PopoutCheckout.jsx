import { Center, Flex, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useEffect } from "react";
import Axios from "axios";
import { useSelector } from "react-redux";

export const PopoutCheckout = ({ props }) => {
  const [data, setData] = useState([]);
  const [totalCheckout, setTotalCheckout] = useState(0);
  const [totalWeight, setTotalWeight] = useState(0);
  const { id } = useSelector((state) => state.userSlice.value);

  const getData = async () => {
    try {
      const res = await Axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/cart/findCheckout/${id}`
      );
      const selectedItem = res.data
        .filter((item) => item.status === true)
        .map((item) => item.totalCheckout)
        .reduce((a, b) => a + b);

      const selectedWeight = res.data
        .filter((item) => item.status === true)
        .map((item) => item.totalWeight)
        .reduce((a, b) => a + b);
      setTotalCheckout(selectedItem);
      setTotalWeight(selectedWeight);
      setData(res.data);
    } catch (err) {
    }
  };

  useEffect(() => {
    getData();
  }, [id, props]);

  return (
    <div>
      <Center>
        <Flex
          as={"b"}
          textColor="#285430"
          border={"1px"}
          borderRadius="md"
          borderColor={"#285430"}
          justifyContent="space-evenly"
          align="center"
          w={"370px"}
        >
          <Flex justify={"space-between"}>
            <Text>
              {new Intl.NumberFormat("IND", {
                style: "currency",
                currency: "IDR",
              }).format(totalCheckout)}
            </Text>
          </Flex>
        </Flex>
      </Center>
    </div>
  );
};
