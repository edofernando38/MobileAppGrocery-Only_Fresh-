import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Text,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import Axios from "axios";
import { useEffect, useState } from "react";

export const OrderSuccess = () => {
  const [data, setData] = useState();
  const [data2, setData2] = useState();
  const [data5, setData5] = useState();
  const [data6, setData6] = useState();
  const navigate = useNavigate();
  const params = useParams();

  const getData = async () => {
    try {
      const result = await Axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/transaction/list/${params.id}`
      );
      setData(result.data);

      setData6(result.data.id);
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

  window.onload = function () {
    var minute = 4;
    var sec = 59;
    setInterval(function () {
      document.getElementById("timer").innerHTML = minute + ":" + sec;
      sec--;

      if (sec === 0) {
        minute--;
        sec = 59;

        if (minute === 0) {
          minute = 4;
        }
      }
    }, 1000);
  };

  const toHome = () => {
    navigate("/");
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
            <Box margin={"auto"} alignItems={"center"} textColor="#285430">
              <Text m="100px" as={"b"} fontSize="xl">
                ORDER SUCCESS
              </Text>
            </Box>
          </Box>
          <Box
            mt={"80px"}
            className="body"
            bgColor="white"
            h={"100vh"}
            w={"390px"}
          >
            <FormControl>
              <FormLabel mt="10px" ml="10px" textColor="#285430">
                Time Limit
              </FormLabel>
              <Text ml="10px" textColor="#285430">
                <span id="timer">5:00</span>
              </Text>
            </FormControl>
            <FormControl>
              <FormLabel mt="10px" ml="10px" textColor="#285430">
                Total Bill
              </FormLabel>
              <Text  ml="10px" color="#285430">
                {new Intl.NumberFormat("IND", {
                  style: "currency",
                  currency: "IDR",
                }).format(data2)}{" "}
              </Text>
              <FormControl>
              <FormLabel mt="10px" ml="10px" textColor="#285430">
              Invoice
              </FormLabel>
              <Text mt="10px" ml="10px" textColor="#285430">
                {data?.id_order}
              </Text>
              </FormControl>
            </FormControl>
            <Button onClick={toHome}  mt={"20px"} ml={"10px"}
            w={"370px"}
            bgColor={"#A4BE7B"}
            borderColor="#285430"
            border="2px"
            fontSize="16px"
            color="gray.800"
            justifyContent="center">
              Back to Home
            </Button>
          </Box>
        </Center>
      </Box>
    </div>
  );
};