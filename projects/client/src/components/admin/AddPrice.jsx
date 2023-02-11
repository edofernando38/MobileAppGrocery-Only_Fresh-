import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import Axios from "axios";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Stack,
  Textarea,
  Center,
  Box,
  useColorModeValue,
  Text,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";

export const AddPrice = () => {
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  const [edit2, setEdit2] = useState({});
  const [selectedCategory, setSelectedCategory] = useState();
  const inputProductName = useRef(0);
  const inputDescription = useRef("");
  const inputPrice = useRef(0);
  const inputStart = useRef("");
  const inputEnd = useRef("");
  const { id } = useSelector((state) => state.adminSlice.value);

  const onCreate = async () => {
    try {
      const addProduct = {
        ProductId: inputProductName.current.value,
        description: inputDescription.current.value,
        productPrice: inputPrice.current.value,
        startDate: inputStart.current.value,
        endDate: inputEnd.current.value,
        AdminId: id,
      };
      const res = await Axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/product/createPrice`,
        addProduct
      );
      Swal.fire({
        icon: "success",
        text: "Success",
      });
      setTimeout(() => window.location.replace("/admin/product"), 2000);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  const getProduct = async () => {
    try {
      const res = await Axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/product/list`
      );
      console.log(res.data);
      setData3(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <>
      <Box
        // p="10px"
        ml="200px"
        // mt="215px"
        mr="100px"
        // color={useColorModeValue("#285430")}
        // border="2px"
        // borderRadius="2xl"
      >
        <Box
          w={"385px"}
          ml="200px"
          m="10px"
          mb="25px"
          borderWidth="2px"
          boxShadow="xl"
          borderRadius="8px"
          borderColor="#285430"
        >
          <Box
            pt="10px"
            h="50px"
            borderTopRadius="8px"
            align="center"
            bg="#E5D9B6"
            fontSize="18px"
          >
            <Text justifyContent="center" fontWeight="bold" color="#285430">
              Add Product
            </Text>
          </Box>
          <Stack spacing={"10px"}>
            <FormControl>
              <FormLabel color="#285430">Nama Produk</FormLabel>
              <Select
                ref={inputProductName}
                color={"#285430"}
                borderColor="#285430"
                ml="5px"
                w="97%"
              >
                <option>Select Product</option>
                {data3?.map((item) => {
                  return (
                    <>
                      <option value={item.id}>{item.productName}</option>
                    </>
                  );
                })}
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel mt={"10px"} ml={"10px"} color={"#285430"}>
                Price
              </FormLabel>
              <Input
                w={"360px"}
                ml={"10px"}
                textColor="#285430"
                borderColor="#285430"
                ref={inputPrice}
              ></Input>
            </FormControl>
            <FormControl>
              <FormLabel mt={"10px"} ml={"10px"} color={"#285430"}>
                Start Date
              </FormLabel>
              <Input
                type={"date"}
                w={"360px"}
                ml={"10px"}
                textColor="#285430"
                borderColor="#285430"
                ref={inputStart}
              ></Input>
            </FormControl>
            <FormControl>
              <FormLabel mt={"10px"} ml={"10px"} color={"#285430"}>
                End Date
              </FormLabel>
              <Input
                type={"date"}
                w={"360px"}
                ml={"10px"}
                textColor="#285430"
                borderColor="#285430"
                ref={inputEnd}
              ></Input>
            </FormControl>
            <Center>
              <Button
                mt={"20px"}
                mb={"20px"}
                w={"360px"}
                bgColor={"#A4BE7B"}
                borderColor="#285430"
                border="2px"
                fontSize="16px"
                color="gray.800"
                justifyContent="center"
                onClick={onCreate}
              >
                Add Price
              </Button>
            </Center>
          </Stack>
        </Box>
      </Box>
    </>
  );
};
