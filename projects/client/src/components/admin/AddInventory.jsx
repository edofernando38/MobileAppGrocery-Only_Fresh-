import React, { useRef, useState, useEffect } from "react";
import Swal from "sweetalert2";
import Axios from "axios";
import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { UpdateInventory } from "./UpdateInventory";
import { BsFilterLeft } from "react-icons/bs";
import { BiReset, BiSearchAlt } from "react-icons/bi";
import { useFormik } from "formik";
import * as Yup from "yup";
import { syncInventory } from "../../redux/inventorySlice";

export const InventoryAdminComp = () => {
  const [branch, setBranch] = useState();
  const inputBranch = useRef("");
  const inputProductName = useRef("");
  const inputEntryDate = useRef("");
  const inputQty = useRef("");
  const [limit2, setLimit2] = useState();
  const [sort2, setSort2] = useState();
  const [order2, setOrder2] = useState();
  const [searchProduct, setSearchProduct] = useState();
  const [state2, setState2] = useState();
  const [searchCategory2, setSearchCategory2] = useState();
  const [page2, setPage2] = useState();
  const [totalPage2, setTotalPage2] = useState();
  const [data, setData] = useState();
  const [data2, setData2] = useState();
  const [data3, setData3] = useState([]);
  const [data4, setData4] = useState();
  const [edit, setEdit] = useState({});
  const { id } = useSelector((state) => state.adminSlice.value);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const OverlayOne = () => (
    <ModalOverlay
      bg="blackAlpha.300"
      backdropFilter="blur(10px) hue-rotate(90deg)"
    />
  );
  const [overlay, setOverlay] = useState(<OverlayOne />);

  const getBranch = async () => {
    try {
      const res = await Axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/branch/adminByBranch/${id}`
      );
      setBranch(res.data);
      setData4(res.data.id);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getBranch();
  }, [id]);

  const getData = async () => {
    try {
      const res = await Axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/inventory/findAllByBranch/${data4}`
      );
      setData2(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, [data4, edit]);

  const getProduct = async () => {
    try {
      const res = await Axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/product/list`
      );
      setData3(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  const onCreate = async () => {
    try {
      const addProduct = {
        AdminId: id,
        ProductId: inputProductName.current.value,
        stockQty: inputQty.current.value,
        entryDate: inputEntryDate.current.value,
        BranchId: data4,
      };
      const res = await Axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/inventory/create`,
        addProduct
      );
      Swal.fire({
        icon: "success",
        text: "Stock Updated",
      });
      setTimeout(() => window.location.replace("/admin"), 2000);
    } catch (err) {
      console.log(err);
    }
  };

  const findStock = async () => {
    try {
      const stock = await Axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/inventory/find/${data4}`
      );
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    findStock();
  }, [data4]);

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
        }/inventory/pagInventory?search_query=${searchCategory2}&page=${
          page2 - 1
        }&limit=${limit2}&order=${order2 ? order2 : `categoryName`}&sort=${
          sort2 ? sort2 : "ASC"
        }`
      );
      setData(res.data)
      // dispatch(syncInventory(res.data.result));
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
      <Flex mt={"80px"} ml={"150px"}>
        <Box>
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
                    Search Product & Category
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
          <TableContainer mt={"50px"} w="45vw" bgColor={"white"}>
            <Table variant="simple" colorScheme="#285430">
              <Thead alignContent={"center"}>
                <Tr>
                  <Th color={"#285430"}>Product</Th>
                  <Th color={"#285430"}>Entry Date</Th>
                  <Th color={"#285430"}>Quantity</Th>
                  <Th color={"#285430"}>Final Stock</Th>
                  <Th color={"#285430"}>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data2?.map((item) => {
                  return (
                    <Tr>
                      <Td color={"#285430"}>{item.Product.productName}</Td>
                      <Td>{item.entryDate}</Td>
                      <Td textAlign={"center"} color={"#285430"}>
                        {item.stockQty}
                      </Td>
                      {/* {data5?.map((item) => {
                        return (
                          <> */}
                      <Td textAlign={"center"} color={"#285430"}>
                        {item?.totalQty}
                      </Td>
                      {/* </>
                        );
                      })} */}
                      <Td>
                        <Box
                          mr="28px"
                          display={"flex"}
                          justifyContent="space-evenly"
                        >
                          <Button
                            onClick={() => {
                              setEdit(item);
                              setOverlay(<OverlayOne />);
                              onOpen();
                            }}
                          >
                            <EditIcon color={"#285430"} />
                          </Button>
                          <Button
                            onClick={() => {
                              // onDelete(item.id)
                            }}
                          >
                            <DeleteIcon color={"#285430"} />
                          </Button>
                        </Box>
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
        </Box>
        <Modal isCentered isOpen={isOpen} onClose={onClose}>
          {overlay}
          <ModalContent bgColor={"#E5D9B6"} color="#285430" border="2px">
            <ModalHeader textColor={"#285430"}>Edit Category</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <UpdateInventory data={edit} />
            </ModalBody>
          </ModalContent>
        </Modal>

        <Box
          ml="120px"
          mt="100px"
          color={useColorModeValue("#285430")}
          border="2px"
          borderRadius="2xl"
        >
          <Box
            w={"300px"}
            m="20px"
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
              <Text
                mx="10px"
                justifyContent="center"
                fontWeight="bold"
                color="#285430"
              >
                Add Stock
              </Text>
            </Box>
            <Stack spacing={"10px"}>
              <FormControl>
                <FormLabel
                  color="#285430"
                  mt="10px"
                  ml="8px"
                  fontSize="18px"
                  as={"b"}
                >
                  Branch
                </FormLabel>
                <Input
                  ref={inputBranch}
                  color={"#285430"}
                  borderColor="#285430"
                  ml="5px"
                  w="97%"
                  defaultValue={branch?.branchName}
                ></Input>
              </FormControl>
              <FormControl>
                <FormLabel
                  color="#285430"
                  mt="10px"
                  ml="8px"
                  fontSize="18px"
                  as={"b"}
                >
                  Product{" "}
                </FormLabel>

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
                <FormLabel
                  color="#285430"
                  mt="10px"
                  ml="8px"
                  fontSize="18px"
                  as={"b"}
                >
                  Entry Date
                </FormLabel>
                <Input
                  textColor="gray.800"
                  borderColor="#285430"
                  ml="5px"
                  w="97%"
                  ref={inputEntryDate}
                ></Input>
              </FormControl>
              <FormControl>
                <FormLabel
                  color="#285430"
                  mt="10px"
                  ml="8px"
                  fontSize="18px"
                  as={"b"}
                >
                  Quantity
                </FormLabel>
                <Input
                  textColor="gray.800"
                  borderColor="#285430"
                  ml="5px"
                  w="97%"
                  ref={inputQty}
                ></Input>
              </FormControl>
              <Center>
                <Button
                  mb="20px"
                  bgColor={"#A4BE7B"}
                  borderColor="#285430"
                  border="2px"
                  fontSize="18px"
                  color="gray.800"
                  width={"50%"}
                  justifyContent="center"
                  onClick={onCreate}
                >
                  Add Stock
                </Button>
              </Center>
            </Stack>
          </Box>
        </Box>
      </Flex>
    </div>
  );
};