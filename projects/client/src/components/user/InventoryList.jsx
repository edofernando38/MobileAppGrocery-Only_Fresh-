import {
  Badge,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Center,
  Flex,
  FormControl,
  Icon,
  Image,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import React, { useEffect } from "react";

import Axios from "axios";
import { syncInventory } from "../../redux/inventorySlice";
import Swal from "sweetalert2";
import { cartSync } from "../../redux/cartSlice";
import { addCart } from "../../redux/userSlice";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import { FaCartArrowDown } from "react-icons/fa";

export const InventoryList = () => {
  const [state, setState] = useState();
  const [state2, setState2] = useState();
  const [state3, setState3] = useState();
  const [state4, setState4] = useState();
  const [state5, setState5] = useState();
  const dispatch = useDispatch();
  const { id, cart } = useSelector((state) => state.userSlice.value);
  const data = useSelector((state) => state.inventorySlice.value);

  const getData2 = async () => {
    try {
      const result = await Axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/address/findDefault/${id}`
      );
      setState2(result.data.defaultAdd);
      setState3(result.data.defaultAdd["Branch.id"]);
    } catch (err) {}
  };

  useEffect(() => {
    getData2();
  }, [id]);

  const getProduct = async () => {
    try {
      const res = await Axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/inventory/findByBranch/${Number(
          state2["Branch.longitude"]
        )}/${Number(state2.longitude)}`
      );
      dispatch(syncInventory(res.data));
      setState5(res.data?.Product?.Price?.productPrice);
    } catch (err) {}
  };

  useEffect(() => {
    getProduct();
  }, [state2]);

  const onAddCart = async (ProductId, BranchId) => {
    try {
      const result = await Axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/cart/create`,
        {
          UserId: id,
          ProductId,
          BranchId,
        }
      );
      setState(result.data);
      const res = await Axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/cart/findBy/${id}`
      );
      dispatch(cartSync(res.data));
      dispatch(addCart(res.data));
      getProduct();
      Swal.fire({
        icon: "success",
        text: `Add to Cart Success`,
        timer: 2000,
        width: "370px",
        customClass: {
          container: "my-swal",
        },
      });
    } catch (err) {
      console.log(err);
      Swal.fire({
        icon: "error",
        text: `Add Cart Failed`,
        width: "370px",
        customClass: {
          container: "my-swal",
        },
      });
    }
  };

  const getDiscount = async () => {
    try {
      const res = await Axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/product/listDiscount`
      );
      setState4(res.data.nominal);
      const discNominal = res.data.nominal;
    } catch (err) {}
  };

  useEffect(() => {
    getDiscount();
  }, []);

  return (
    <div>
      <Box>
        <Center>
          <SimpleGrid
            mt={"10px"}
            spacing={3}
            templateColumns="repeat(auto-fill, minmax(150px, 1fr))"
            w={"350px"}
          >
            {data?.map((item) => {
              return (
                <div>
                  <Card
                    justify={"center"}
                    border={"1px"}
                    borderColor="#285430"
                    bgColor="#E5D9B6"
                    h={"330px"}
                  >
                    <CardBody as={Link} to={`product/${item.Product?.id}`}>
                      <Image
                        ml="10px"
                        mb={"10px"}
                        boxSize={"100px"}
                        src={
                          `${process.env.REACT_APP_API_BASE_URL}/` +
                          item.Product.picture
                        }
                      />
                      <Text
                        mt={"10"}
                        pb={"10px"}
                        as={"b"}
                        size="md"
                        color={"#285430"}
                      >
                        {item.Product.productName}
                      </Text>
                      <Box>
                        {!item.Product.Price.discPrice ? (
                          <Text fontSize={"xs"} color={"#285430"}>
                            {" "}
                            {new Intl.NumberFormat("IND", {
                              style: "currency",
                              currency: "IDR",
                            }).format(item.Product.Price.productPrice)}
                          </Text>
                        ) : (
                          <Text fontSize={"xs"} as="s" color={"#285430"}>
                            {" "}
                            {new Intl.NumberFormat("IND", {
                              style: "currency",
                              currency: "IDR",
                            }).format(item.Product.Price.productPrice)}
                          </Text>
                        )}
                      </Box>
                      <Box>
                        {!item.Product.Price.discPrice ? (
                          ""
                        ) : (
                          <Text fontSize={"xs"} color={"#285430"}>
                            {" "}
                            {new Intl.NumberFormat("IND", {
                              style: "currency",
                              currency: "IDR",
                            }).format(item.Product.Price.discPrice)}
                            <Badge>Promo</Badge>
                          </Text>
                        )}
                      </Box>
                      <Text fontSize={"sm"} color={"#285430"}>
                        {item.stockQty} pcs
                      </Text>
                    </CardBody>
                    <CardFooter>
                      <Button
                        onClick={() =>
                          onAddCart(item.Product.id, item.Branch.id)
                        }
                        bgColor={"#A4BE7B"}
                        borderColor="#285430"
                        border="2px"
                        fontSize="14px"
                        color="gray.800"
                        width={"180px"}
                        justifyContent="center"
                      >
                        <Icon as={FaCartArrowDown} w="5" h="5" m="2" />
                        to Cart
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              );
            })}
          </SimpleGrid>
        </Center>
      </Box>
    </div>
  );
};
