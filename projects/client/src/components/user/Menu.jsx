import { useEffect, useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import { Center, Text, Flex, Avatar, Box } from "@chakra-ui/react";
import { useSelector } from "react-redux";

import { InventoryList } from "./InventoryList";
import { ProductList } from "./ProductList";

export const MenuComp = () => {
  const [category, setCategory] = useState();
  const [state3, setState3] = useState();

  const { id } = useSelector((state) => state.userSlice.value);
  const tokenLocalStorage = localStorage.getItem("tokenUser");

  const getCategory = async () => {
    try {
      const res = await Axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/product/listCategory`
      );
      setCategory(res.data);
    } catch (err) {
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  const getData2 = async () => {
    try {
      const result = await Axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/address/findDefault/${id}`
      );
      setState3(result.data.defaultAdd);
    } catch (err) {
    }
  };

  useEffect(() => {
    getData2();
  }, [id]);

  return (
    <div>
      <Center>
        <Flex
          flexWrap="wrap"
          mt="-150px"
          w={"380px"}
          justifyContent="center"
        >
          {category?.map((item) => {
            return (
              <div>
                <Box>
                  <Avatar
                    border="1px"
                    bgColor="#E5D9B6"
                    _hover={{ border: "2px" }}
                    mr={[2, 3, 4]}
                    ml={[2, 3, 4]}
                    mt="20px"
                    size="md"
                    name="Grocery"
                    src={
                      `${process.env.REACT_APP_API_BASE_URL}/` +
                      item.categoryPicture
                    }
                    as={Link}
                    to={`/category/${item.id}`}
                  ></Avatar>
                  <Text textAlign="center" fontSize="x-small" color={"#285430"}>
                    {item.categoryName}
                  </Text>
                </Box>
              </div>
            );
          })}
        </Flex>
      </Center>
      {tokenLocalStorage ? <InventoryList /> : <ProductList />}
    </div>
  );
};
