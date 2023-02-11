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
  FormHelperText,
  Icon,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { BiSearchAlt } from "react-icons/bi";
import { FaCartArrowDown } from "react-icons/fa";
import { Link } from "react-router-dom";
import Axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";

import { useDispatch, useSelector } from "react-redux";
import { syncData } from "../../redux/productSlice";
import { useFormik } from "formik";
import * as Yup from "yup";

export const ProductList = () => {
  const [state, setState] = useState();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [sort, setSort] = useState("ASC");
  const [order, setOrder] = useState("productName");
  const [searchProduct, setSearchProduct] = useState("");
  const [totalPage, setTotalPage] = useState(0);
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.userSlice.value);
  const data = useSelector((state) => state.productSlice.value);

  const getData = async () => {
    try {
      const res = await Axios.get(
        `${
          process.env.REACT_APP_API_BASE_URL
        }/product/pagProduct?search_query=${searchProduct}&page=${
          page - 1
        }&limit=${limit}&order=${order ? order : `productName`}&sort=${
          sort ? sort : "ASC"
        }`
      );
      dispatch(syncData(res.data.result));
      console.log(res.data.result)
      setTotalPage(Math.ceil(res.data.totalRows / res.data.limit));
      setState(res.data);
    } catch (err) {
    }
  };

  useEffect(() => {
    getData();
  }, [searchProduct]);

  async function fetchSort(filter) {
    setSort(filter);
  }

  useEffect(() => {
    fetchSort();
  }, []);

  const formik = useFormik({
    initialValues: {
      searchName: ``,
    },
    validationSchema: Yup.object().shape({
      searchName: Yup.string().min(3, "Minimal 3 huruf"),
    }),
    validationOnChange: false,
    onSubmit: async () => {
      const { searchName } = formik.values;
      setSearchProduct(searchName);
    },
  });

  const onAddCart = async () => {
    try {
      if (!id) {
        return Swal.fire({
          icon: "error",
          text: "Login First",
          timer: 2000,
          width: "370px",
          customClass: {
            container: "my-swal",
          },
        });
      }
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

  const onDiscount = async () => {
    try {
      const res = await Axios.patch(
        `${process.env.REACT_APP_API_BASE_URL}/product/discItem`
      );
    } catch (err) {
    }
  };

  return (
    <div>
      <Center>
        <Stack>
          <Flex flexWrap="wrap" w={[330, 330, 380]} justifyContent="center">
            <Center>
              <Flex>
                <Box className="filter" mt={"30px"}>
                  <Flex m={2} wrap="wrap">
                    <FormControl w="" m={1}>
                      <InputGroup mt={"-30px"}>
                        <Input
                          placeholder="Only Fresh Here..."
                          _placeholder={{ color: "#5F8D4E" }}
                          bgColor={"white"}
                          w={"300px"}
                          textColor="black"
                          borderColor={"#285430"}
                          border="1px"
                          fontSize="18px"
                          color="gray.800"
                          id="search"
                          type="text"
                          onChange={(event) =>
                            formik.setFieldValue(
                              "searchName",
                              event.target.value
                            )
                          }
                          onKeyDown={(event) => {
                            if (event.key === "Enter") {
                              formik.handleSubmit();
                            }
                          }}
                        />
                        <InputRightElement>
                          <Icon
                            color={"#285430"}
                            fontSize="xl"
                            as={BiSearchAlt}
                            sx={{ _hover: { cursor: "pointer" } }}
                            onClick={() => formik.handleSubmit()}
                          />
                        </InputRightElement>
                      </InputGroup>
                      <FormHelperText color="red">
                        {formik.errors.searchName}
                      </FormHelperText>
                    </FormControl>
                  </Flex>
                </Box>
              </Flex>
            </Center>
          </Flex>
          <Box>
          <Box display="flex" justifyContent="center" alignContent="center">
              <Button
                onClick={() => {
                  async function submit() {
                    setPage(page === 1 ? 1 : page - 1);
                  }
                  submit();
                  var pageNow = page - 1;
                  pageNow = pageNow <= 0 ? 1 : pageNow;
                  document.getElementById("pagingInput").value =
                    parseInt(pageNow);
                }}
                bgColor={"#A4BE7B"}
                borderColor="#285430"
                border="2px"
                fontSize="14px"
                color="gray.800"
                width={"60px"}
                justifyContent="center"
                size="sm"
                mt="1rem"
              >
                Prev
              </Button>
              <Text color={"#285430"} alignSelf="center" mx="10px" pt="15px">
                {" "}
                {page} of {totalPage}
              </Text>
              <Button
                onClick={() => {
                  async function submit() {
                    setPage(totalPage === page ? page : page + 1);
                  }
                  submit();
                  var pageNow = page + 1;
                  pageNow = pageNow > totalPage ? page : pageNow;
                  document.getElementById("pagingInput").value =
                    parseInt(pageNow);
                }}
                bgColor={"#A4BE7B"}
                borderColor="#285430"
                border="2px"
                fontSize="14px"
                color="gray.800"
                width={"60px"}
                justifyContent="center"
                size="sm"
                mt="1rem"
              >
                Next
              </Button>
            </Box>
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
                        border={"1px"}
                        borderColor="#285430"
                        bgColor="#E5D9B6"
                        h={"320px"}
                      >
                        <Center>
                          <CardBody as={Link} to={`product/${item.id}`}>
                            <Image
                              ml="10px"
                              mb={"10px"}
                              boxSize={"100px"}
                              src={
                                `${process.env.REACT_APP_API_BASE_URL}/` +
                                item.picture
                              }
                            />
                            <Text
                              mt={"10"}
                              pb={"10px"}
                              as={"b"}
                              size="md"
                              color={"#285430"}
                            >
                              {item.productName}
                            </Text>
                            <Box>
                              {!item?.Price?.discPrice ? (
                                <Text fontSize={"xs"} color={"#285430"}>
                                  {" "}
                                  {new Intl.NumberFormat("IND", {
                                    style: "currency",
                                    currency: "IDR",
                                  }).format(item?.Price?.productPrice)}
                                </Text>
                              ) : (
                                <Text fontSize={"xs"} color={"#285430"} as="s">
                                  {" "}
                                  {new Intl.NumberFormat("IND", {
                                    style: "currency",
                                    currency: "IDR",
                                  }).format(item?.Price?.productPrice)}
                                </Text>
                              )}
                            </Box>
                            <Box>
                              {!item?.Price?.discPrice ? (
                                ""
                              ) : (
                                <Text fontSize={"xs"} color={"#285430"}>
                                  {" "}
                                  {new Intl.NumberFormat("IND", {
                                    style: "currency",
                                    currency: "IDR",
                                  }).format(item?.Price?.discPrice)}
                                  <Badge>Promo</Badge>
                                </Text>
                              )}
                            </Box>
                          </CardBody>
                        </Center>
                        <CardFooter>
                          <Button
                            onClick={() => onAddCart(item.id)}
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
        </Stack>
      </Center>
    </div>
  );
};
