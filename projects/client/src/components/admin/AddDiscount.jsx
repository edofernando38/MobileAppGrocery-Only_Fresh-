import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import Axios from "axios";
import Select from "react-select";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  // Select,
  Stack,
  Textarea,
  Center,
  Box,
  useColorModeValue,
  Text,
} from "@chakra-ui/react";

export const AddDiscount = () => {
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  const [edit2, setEdit2] = useState({});
  const [selectedCategory, setSelectedCategory] = useState();
  const inputProductName = useRef("");
  const inputDescription = useRef("");
  const inputCategory = useRef(0);

  const onCreate = async () => {
    try {
      const addProduct = {
        productName: inputProductName.current.value,
        description: inputDescription.current.value,
        CategoryId: inputCategory.current.value,
      };
      const res = await Axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/product/create`,
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
      console.log(res.data)
      setData3(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  //   const getCategory = async () => {
  //     try {
  //       const res = await Axios.get(
  //         `${process.env.REACT_APP_API_BASE_URL}/product/listCategory`
  //       );
  //       setData2(res.data);
  //       console.log(res.data)
  //       const categories = res.data.map((item) => item.categoryName);
  //       console.log(categories)
  //       setData3(categories);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };

  //   const renderCategory = () => {
  //     return data2.map((val) => {
  //       return (
  //         <option value={val.id} key={val.id.toString()}>
  //           {val.categoryName}
  //         </option>
  //       );
  //     });
  //   };

  //   const categoryHandler = ({ target }) => {
  //     const { value } = target;
  //     selectedCategory(value);
  //   };

  // useEffect(() => {
  //   getBranch();
  // }, [selectedBranch]);

  //   useEffect(() => {
  //     getCategory();
  //   }, [edit2, selectedCategory]);

  //   const categoryOptions = [
  //     { value: 1, label: "Sayuran" },
  //     { value: 2, label: "Seafood" },
  //     { value: 3, label: "Buah-Buahan" },
  //     { value: 4, label: "Beli 1 Gratis 1" },
  //     { value: 5, label: "Daging" },
  //     { value: 6, label: "Protein" },
  //     { value: 8, label: "Unggas" },
  //     { value: 9, label: "Ibu dan Anak" },
  //     { value: 10, label: "Makanan Jadi" },
  //     { value: 11, label: "Paket Masak" },
  //   ];

  return (
    <>
      <Box
        p="10px"
        ml="200px"
        mt="215px"
        mr="100px"
        color={useColorModeValue("#285430")}
        border="2px"
        borderRadius="2xl"
      >
        <Box
          w={"385px"}
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
              <Input
                ref={inputProductName}
                placeholder="Produk"
                _placeholder={{ color: "#5F8D4E" }}
                borderColor="#285430"
                textColor="black"
              ></Input>
            </FormControl>
            <FormControl>
              <FormLabel mt={"10px"} ml={"10px"} color={"#285430"}>
                Price
              </FormLabel>
              <Textarea
                w={"360px"}
                ml={"10px"}
                textColor="#285430"
                borderColor="#285430"
                ref={inputDescription}
              ></Textarea>
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
                Add Product
              </Button>
            </Center>
          </Stack>
        </Box>
      </Box>
    </>
  );
};
