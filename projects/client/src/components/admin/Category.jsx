import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Axios from "axios";
import { BsFilterLeft } from "react-icons/bs";
import { BiReset, BiSearchAlt } from "react-icons/bi";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Box,
  Button,
  ButtonGroup,
  Text,
  useDisclosure,
  Table,
  TableContainer,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Image,
  Modal,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalOverlay,
  Center,
  Flex,
  useColorModeValue,
  Icon,
  FormControl,
  FormLabel,
  Select,
  InputGroup,
  Input,
  InputRightElement,
  FormHelperText,
  Tabs,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import { UpdateCategoryComp } from "./UpdateCategory";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { syncCategory } from "../../redux/categorySlice";
import { useNavigate } from "react-router-dom";

export const Category = () => {
  const [product, setProduct] = useState([]);
  const [category, setCategory] = useState([]);
  const [edit, setEdit] = useState({});
  const [edit2, setEdit2] = useState({});
  const [image2, setImage2] = useState("");
  const [profile2, setProfile2] = useState("upload");
  const [searchProduct, setSearchProduct] = useState("");
  const [page2, setPage2] = useState(1);
  const [limit2, setLimit2] = useState(5);
  const [sort2, setSort2] = useState("ASC");
  const [order2, setOrder2] = useState("categoryName");
  const [searchCategory2, setSearchCategory2] = useState("");
  const [totalPage2, setTotalPage2] = useState(0);
  const [state2, setState2] = useState(0);
  const data2 = useSelector((state) => state.categorySlice.value);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const OverlayOne = () => (
    <ModalOverlay
      bg="blackAlpha.300"
      backdropFilter="blur(10px) hue-rotate(90deg)"
    />
  );
  const [overlay, setOverlay] = useState(<OverlayOne />);

  const getData = async () => {
    try {
      const res = await Axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/product/list`
      );

      setProduct(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, [edit]);

  const getCategory = async () => {
    try {
      const res = await Axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/product/listCategory`
      );

      setCategory(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCategory();
  }, [edit2]);

  const onDeleteCategory = async (id) => {
    try {
      const res = await Axios.delete(
        `${process.env.REACT_APP_API_BASE_URL}/product/removeCategory/${id}`
      );

      getCategory();
    } catch (err) {
      console.log(err);
    }
  };

  const handleChoose1 = (e) => {
    setImage2(e.target.files[0]);
  };

  const handleUpload1 = async (id) => {
    const data = new FormData();
    data.append("file", image2);

    const resultImage = await Axios.post(
      `${process.env.REACT_APP_API_BASE_URL}/product/single-uploaded-category/${id}`,
      data,
      {
        headers: {
          "Content-type": "multipart/form-data",
        },
      }
    );
    setProfile2(resultImage.data.categoryPicture);
    setImage2({ images: "" });
    window.location.replace("/admin");
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
        }/product/pagCategory?search_query=${searchCategory2}&page=${
          page2 - 1
        }&limit=${limit2}&order=${order2 ? order2 : `categoryName`}&sort=${
          sort2 ? sort2 : "ASC"
        }`
      );
      dispatch(syncCategory(res.data.result));
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

  const formik2 = useFormik({
    initialValues: {
      searchName: ``,
    },
    validationSchema: Yup.object().shape({
      searchName: Yup.string().min(3, "Minimal 3 huruf"),
    }),
    validationOnChange: false,
    onSubmit: async () => {
      const { searchName } = formik.values;
      setSearchCategory2(searchName);
    },
  });

  const toAddCategory = () => {
    navigate("/admin/product/add");
  };

  return (
    <>
      <Tabs isFitted variant="enclosed">
        <TabPanels>
          <TabPanel>
            <Center>
              <Flex
                color={useColorModeValue("#285430")}
                border="2px"
                borderRadius="xl"
              >
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
              </Flex>
              <Box ml={"200px"}>
                <Button
                  bgColor={"#A4BE7B"}
                  borderColor="#285430"
                  border="2px"
                  fontSize="18px"
                  color="gray.800"
                  width={"100%"}
                  justifyContent="center"
                  size="md"
                  onClick={toAddCategory}
                >
                  Add Category
                </Button>
              </Box>
            </Center>
            <TabPanel ml="46px" w="85vw" bgColor={"white"}>
              <TableContainer>
                <Table variant="simple" colorScheme="#285430">
                  <Thead>
                    <Tr>
                      <Th color={"#285430"}>Category</Th>
                      <Th color={"#285430"}>Picture</Th>
                      <Th color={"#285430"}>Actions</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {data2?.map((item) => {
                      return (
                        <Tr>
                          <Td color={"#285430"} textColor="#285430">
                            {item.categoryName}
                          </Td>
                          <Td>
                            <Image
                              boxSize={"50px"}
                              src={
                                `${process.env.REACT_APP_API_BASE_URL}/` +
                                item.categoryPicture
                              }
                            />
                            <ButtonGroup size="sm">
                              <form encType="multipart/form-data">
                                <input
                                  type={"file"}
                                  accept="image/*"
                                  name="file"
                                  size={"100px"}
                                  onChange={(e) => handleChoose1(e)}
                                ></input>
                              </form>
                              <Button
                                bgColor={"#A4BE7B"}
                                borderColor="#285430"
                                border="2px"
                                fontSize="14px"
                                color="gray.800"
                                width={"100%"}
                                justifyContent="center"
                                onClick={() => handleUpload1(item.id)}
                                size="sm"
                              >
                                Upload
                              </Button>
                            </ButtonGroup>
                          </Td>
                          <Td>
                            <Button
                              onClick={() => {
                                setEdit(item);
                                setOverlay(<OverlayOne />);
                                onOpen();
                              }}
                            >
                              <EditIcon color={"#285430"} />
                            </Button>
                            <Button onClick={() => onDeleteCategory(item.id)}>
                              <DeleteIcon color={"#285430"} />
                            </Button>
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
            </TabPanel>
          </TabPanel>
        </TabPanels>
        <Modal isCentered isOpen={isOpen} onClose={onClose}>
          {overlay}
          <ModalContent bgColor={"#E5D9B6"} color="#285430" border="2px">
            <ModalHeader textColor={"#285430"}>Edit Category</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <UpdateCategoryComp data={edit} />
            </ModalBody>
          </ModalContent>
        </Modal>
      </Tabs>
    </>
  );
};