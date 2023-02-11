import { useEffect, useState } from "react";
import * as Yup from "yup";
import Axios from "axios";
import { useParams } from "react-router-dom";
import {
  Box,
  Button,
  ButtonGroup,
  Center,
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
  Table,
  TableContainer,
  TabPanel,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { useFormik } from "formik";
import { syncData } from "../../redux/productSlice";
import { BiReset, BiSearchAlt } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { BsFilterLeft } from "react-icons/bs";

export const ListProduct = () => {
  const [product, setProduct] = useState([]);
  const [edit, setEdit] = useState({});
  const [state, setState] = useState(0);
  const [image, setImage] = useState("");
  const [profile, setProfile] = useState("upload");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [sort, setSort] = useState("ASC");
  const [order, setOrder] = useState("productName");
  const [searchProduct, setSearchProduct] = useState("");
  const [totalPage, setTotalPage] = useState(0);
  const data = useSelector((state) => state.productSlice.value);
  const dispatch = useDispatch();
  const params = useParams();

  const getData = async () => {
    try {
      const res = await Axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/product/list`
      );
      console.log(res.data);
      setProduct(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, [edit]);

  const onDelete = async (id) => {
    try {
      const res = await Axios.delete(
        `${process.env.REACT_APP_API_BASE_URL}/product/remove/${id}`
      );
      console.log(res);
      getData();
    } catch (err) {
      console.log(err);
    }
  };

  const handleChoose = (e) => {
    console.log("e.target.files", e.target.files);
    setImage(e.target.files[0]);
  };

  const handleUpload = async (id) => {
    const data = new FormData();
    console.log(data);
    data.append("file", image);
    console.log(data.get("file"));

    const resultImage = await Axios.post(
      `${process.env.REACT_APP_API_BASE_URL}/product/single-uploaded/${id}`,
      data,
      {
        headers: {
          "Content-type": "multipart/form-data",
        },
      }
    );
    console.log(resultImage.data);
    setProfile(resultImage.data.picture);
    setImage({ images: "" });
    console.log(image);
    console.log(profile);
    window.location.replace("/admin");
  };

  const getProduct = async () => {
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
      console.log(res.data.result);
      setTotalPage(Math.ceil(res.data.totalRows / res.data.limit));
      setState(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getProduct();
  }, [searchProduct, page, limit, sort]);

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

  return (
    <div>
      <TabPanel>
        <Center>
          <Flex
            ml="3"
            mr="3"
            flexWrap={"wrap"}
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
                        setSearchProduct("");
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
                        fetchSort(event.target.value);
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
                        setLimit(event.target.value);
                      }}
                    >
                      <option value="10">10</option>
                      <option value="20">20</option>
                      <option value="30">30</option>
                      <option value="50">50</option>
                    </Select>
                  </FormControl>
                  <FormControl w="" m={1}>
                    <FormLabel fontSize="x-small" color="#285430">
                      Search Product & Category
                    </FormLabel>
                    <InputGroup>
                      <Input
                        placeholder="Search Product"
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
          </Flex>
        </Center>
        <TableContainer>
          <Table variant="simple" colorScheme="teal">
            <Thead alignContent={"center"}>
              <Tr>
                <Th color={"#285430"}>Product</Th>
                <Th color={"#285430"}>Actions</Th>
                <Th color={"#285430"}>Picture</Th>
                <Th color={"#285430"}>Distributor</Th>
                <Th color={"#285430"}>Description</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data?.map((item) => {
                return (
                  <Tr>
                    <Td color={"#285430"}>{item.productName}</Td>
                    <Td color={"#285430"}>
                      <Box
                        mr="28px"
                        display={"flex"}
                        justifyContent="space-evenly"
                      >
                        <Button
                          onClick={() => {
                            setEdit(item);
                            // console.log("test2")
                          }}
                        >
                          <EditIcon color={"#285430"} />
                        </Button>
                        <Button onClick={() => onDelete(item.id)}>
                          <DeleteIcon color={"#285430"} />
                        </Button>
                      </Box>
                    </Td>

                    <Td>
                      <Image
                        boxSize={"50px"}
                        src={
                          `${process.env.REACT_APP_API_BASE_URL}/` +
                          item.picture
                        }
                      />
                      <ButtonGroup size="sm">
                        <form encType="multipart/form-data">
                          <input
                            color="#285430"
                            type={"file"}
                            accept="image/*"
                            name="file"
                            size={"100px"}
                            onChange={(e) => handleChoose(e)}
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
                          onClick={handleUpload(item.id)}
                          size="sm"
                        >
                          Upload
                        </Button>
                      </ButtonGroup>
                    </Td>
                    <Td color={"#285430"}>{item.description}</Td>
                    <Td>{item.distributor}</Td>
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
                setPage(page === 1 ? 1 : page - 1);
              }
              submit();
              var pageNow = page - 1;
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
      </TabPanel>
    </div>
  );
};
