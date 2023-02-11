import {
  Box,
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Icon,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Select,
  Stat,
  StatLabel,
  StatNumber,
  Tab,
  Table,
  TableContainer,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  useDisclosure,
  Text,
} from "@chakra-ui/react";
import { BsFillCheckSquareFill } from "react-icons/bs";
import { FaWindowClose } from "react-icons/fa";
import { GoPackage } from "react-icons/go";
import { TbTruckDelivery } from "react-icons/tb";

import React from "react";
import Axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  MdOutlineCancel,
  MdOutlinePayment,
  MdOutlinePayments,
  MdDoneOutline,
} from "react-icons/md";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { useDispatch } from "react-redux";
import { BsFilterLeft } from "react-icons/bs";
import { BiReset, BiSearchAlt } from "react-icons/bi";
import { useFormik } from "formik";
import * as Yup from "yup";
import { transSync } from "../../redux/transactionSlice";

export const TransactionComp = () => {
  const [data, setData] = useState();
  const [data2, setData2] = useState();
  const [data3, setData3] = useState();
  const [data4, setData4] = useState();
  const [data5, setData5] = useState();
  const [data6, setData6] = useState();
  const [data7, setData7] = useState();
  const [data8, setData8] = useState();
  const [data9, setData9] = useState();
  const [limit2, setLimit2] = useState();
  const [sort2, setSort2] = useState();
  const [order2, setOrder2] = useState();
  const [searchProduct, setSearchProduct] = useState();
  const [state2, setState2] = useState();
  const [searchCategory2, setSearchCategory2] = useState();
  const [page2, setPage2] = useState();
  const [totalPage2, setTotalPage2] = useState();
  const { id } = useSelector((state) => state.adminSlice.value);
  const dispatch = useDispatch();
  // const data = useSelector((state) => state.transactionSlice.value)

  const getData7 = async () => {
    try {
      const result = await Axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/transaction/listAll/${id}`
      );
      console.log(result.data)
      setData7(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData7();
  }, [id]);

  const getData = async () => {
    try {
      const result = await Axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/transaction/listWaitingPayment/${id}`
      );
      setData8(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, [id]);

  const getData2 = async () => {
    try {
      const result = await Axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/transaction/listConfirmPayment/${id}`
      );
      setData2(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData2();
  }, [id]);

  const getData3 = async () => {
    try {
      const result = await Axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/transaction/listOnProcess/${id}`
      );
      setData3(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData3();
  }, [id]);

  const getData4 = async () => {
    try {
      const result = await Axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/transaction/listDelivery/${id}`
      );
      setData4(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData4();
  }, [id]);

  const getData5 = async () => {
    try {
      const result = await Axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/transaction/listDone/${id}`
      );
      setData5(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData5();
  }, [id]);

  const getData6 = async () => {
    try {
      const result = await Axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/transaction/listCancelled/${id}`
      );
      setData6(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData6();
  }, [id]);

  const setOrder = async (id) => {
    try {
      const result = await Axios.patch(
        `${process.env.REACT_APP_API_BASE_URL}/transaction/setOrder/${id}`
      );

      getData3();
    } catch (err) {
      console.log(err);
    }
  };

  const setDelivery = async (id) => {
    try {
      const result = await Axios.patch(
        `${process.env.REACT_APP_API_BASE_URL}/transaction/setDelivery/${id}`
      );

      getData4();
    } catch (err) {
      console.log(err);
    }
  };

  const setCancelled = async (id) => {
    try {
      const result = await Axios.patch(
        `${process.env.REACT_APP_API_BASE_URL}/transaction/setCancelled/${id}`
      );

      getData();
    } catch (err) {
      console.log(err);
    }
  };

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

  const getCategory2 = async () => {
    try {
      const res = await Axios.get(
        `${
          process.env.REACT_APP_API_BASE_URL
        }/transaction/pagTransaction?search_query=${searchCategory2}&page=${
          page2 - 1
        }&limit=${limit2}&order=${order2 ? order2 : `id_order`}&sort=${
          sort2 ? sort2 : "ASC"
        }`
      );
      // setData9(res.data)
      dispatch(transSync(res.data));
      console.log(res.data);
      setTotalPage2(Math.ceil(res.data.totalRows / res.data.limit));
      setState2(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCategory2();
  }, [searchCategory2, page2, limit2, sort2]);

  async function fetchSort2(filter) {
    setSort2(filter);
  }

  useEffect(() => {
    fetchSort2();
  }, []);

  return (
    <div>
      <Box className="filter">
        <Box
          m="10px"
          mb="20px"
          borderWidth="2px"
          boxShadow="md"
          borderRadius="8px"
          borderColor="#285430"
        >
          <Box
            alignItems={"center"}
            h="50px"
            borderTopRadius="8px"
            align="center"
            bg="#E5D9B6"
            display="flex"
          >
            <Box h="25px" ml="10px">
              <Icon color="#285430" boxSize="6" as={BsFilterLeft} />
            </Box>
            <Box h="25px">
              <Text mx="10px" fontWeight="bold" color="#285430">
                Filter & Search
              </Text>
            </Box>
            <Icon
              color="#285430"
              sx={{ _hover: { cursor: "pointer" } }}
              boxSize="6"
              as={BiReset}
              onClick={() => {
                async function submit() {
                  setSearchCategory2("");
                  document.getElementById("search").value = "";
                  formik.values.searchName = "";
                }
                submit();
              }}
            />
          </Box>
          <Flex m={2} wrap="wrap">
            <FormControl w="" m={1}>
              <FormLabel fontSize="x-small" color="#285430">
                Format Sort
              </FormLabel>
              <Select
                color={"#285430"}
                borderColor="#285430"
                onChange={(event) => {
                  fetchSort2(event.target.value);
                }}
              >
                <option value="ASC">A-Z</option>
                <option value="DESC">Z-A</option>
              </Select>
            </FormControl>
            <FormControl w="" m={1}>
              <FormLabel fontSize="x-small" color="#285430">
                Show
              </FormLabel>
              <Select
                color={"#285430"}
                borderColor="#285430"
                onChange={(event) => {
                  setLimit2(event.target.value);
                }}
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
              </Select>
            </FormControl>
            <FormControl w="" m={1}>
              <FormLabel fontSize="x-small" color="#285430">
                Search Transaction
              </FormLabel>
              <InputGroup>
                <Input
                  placeholder="Search Category"
                  _placeholder={{ color: "#5F8D4E" }}
                  borderColor="#285430"
                  border="1px"
                  fontSize="18px"
                  color="gray.800"
                  id="search"
                  type="text"
                  onChange={(event) =>
                    formik.setFieldValue("searchName", event.target.value)
                  }
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      formik.handleSubmit();
                    }
                  }}
                />
                <InputRightElement>
                  <Icon
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
      </Box>
      <TableContainer mt="30px" w="60vw" ml={"120px"} bgColor={"white"}>
        <Table variant="simple" colorScheme="#285430">
          <Thead alignContent={"center"}>
            <Tr>
              <Th textAlign={"center"} color={"#285430"}>
                Invoice
              </Th>
              <Th textAlign={"center"} color={"#285430"}>
                Total Product
              </Th>
              <Th textAlign={"center"} color={"#285430"}>
                Delivery Cost
              </Th>
              <Th textAlign={"center"} color={"#285430"}>
                Weight
              </Th>
              <Th textAlign={"center"} color={"#285430"}>
                Status
              </Th>
              <Th textAlign={"center"} color={"#285430"}>
                Payment Proof
              </Th>
              <Th textAlign={"center"} color={"#285430"}>
                Actions
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {data7?.map((item) => {
              return (
                <Tr>
                  <Td textAlign={"center"} color={"#285430"}>
                    {item.id_order}
                  </Td>
                  <Td textAlign={"center"} color={"#285430"}>
                    {" "}
                    {new Intl.NumberFormat("IND", {
                      style: "currency",
                      currency: "IDR",
                    }).format(item.totalOrder)}
                  </Td>
                  <Td textAlign={"center"} color={"#285430"}>
                  {" "}
                    {new Intl.NumberFormat("IND", {
                      style: "currency",
                      currency: "IDR",
                    }).format(item.totalCharge)}
                  </Td>
                  <Td textAlign={"center"} color={"#285430"}>
                    {item.totalWeight}
                  </Td>
                  <Td textAlign={"center"} color={"#285430"}>
                    {item.status}
                  </Td>
                  <Td>
                    <Image
                      boxSize={"50px"}
                      src={
                        `${process.env.REACT_APP_API_BASE_URL}/` + item.picture
                      }
                    ></Image>
                  </Td>
                  <Td textAlign={"center"} color={"#285430"}>
                    {item.status === "Waiting Confirm Payment" ? (
                      <>
                        <Button onClick={() => setOrder(item.id)}>
                          <BsFillCheckSquareFill color={"green"} size="22" />
                        </Button>
                        <Button onClick={() => setCancelled(item.id)}>
                          <FaWindowClose color={"red"} size="25" />
                        </Button>
                      </>
                    ) : (
                      ""
                    )}
                    {item.status === "On Process" ? (
                      <>
                        <Button onClick={() => setDelivery(item.id)}>
                          <BsFillCheckSquareFill color={"green"} size="22" />
                        </Button>
                        <Button onClick={() => setCancelled(item.id)}>
                          <FaWindowClose color={"red"} size="25" />
                        </Button>
                      </>
                    ) : (
                      ""
                    )}
                    {item.status === "Waiting Payment" ? (
                      <>
                        {/* <Button onClick={() => setCancelled(item.id)}>
                          <BsFillCheckSquareFill color={"green"} size="22" />
                        </Button> */}
                        <Button onClick={() => setCancelled(item.id)}>
                          <FaWindowClose color={"red"} size="25" />
                        </Button>
                      </>
                    ) : (
                      ""
                    )}
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
      <Box display="flex" justifyContent="center" alignContent="center">
        <Button
          onClick={() => {
            async function submit() {
              setPage2(page2 === 1 ? 1 : page2 - 1);
            }
            submit();
            var pageNow = page2 - 1;
            pageNow = pageNow <= 0 ? 1 : pageNow;
            document.getElementById("pagingInput").value = parseInt(pageNow);
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
        <Text alignSelf="center" mx="10px" pt="15px">
          {" "}
          {page2} of {totalPage2}
        </Text>
        <Button
          onClick={() => {
            async function submit() {
              setPage2(totalPage2 === page2 ? page2 : page2 + 1);
            }
            submit();
            var pageNow = page2 + 1;
            pageNow = pageNow > totalPage2 ? page2 : pageNow;
            document.getElementById("pagingInput").value = parseInt(pageNow);
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
    </div>
  );
};
