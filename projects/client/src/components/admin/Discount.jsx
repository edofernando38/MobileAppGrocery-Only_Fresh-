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
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  MdOutlineCancel,
  MdOutlinePayment,
  MdOutlinePayments,
  MdDoneOutline,
} from "react-icons/md";
import React from "react";
import Axios from "axios";
import { useState, useEffect } from "react";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { BsFillCheckSquareFill, BsFilterLeft } from "react-icons/bs";
import { FaWindowClose } from "react-icons/fa";
import { GoPackage } from "react-icons/go";
import { TbTruckDelivery } from "react-icons/tb";
import { BiReset, BiSearchAlt } from "react-icons/bi";
import { useFormik } from "formik";
import * as Yup from "yup";
import { transSync } from "../../redux/transactionSlice";

export const DiscountList = () => {
  const [data, setData] = useState();
  const [data2, setData2] = useState();
  const [data3, setData3] = useState();
  const [data4, setData4] = useState();
  const [data5, setData5] = useState();
  const [data6, setData6] = useState();
  const [data7, setData7] = useState();
  const [data8, setData8] = useState();
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
        `${process.env.REACT_APP_API_BASE_URL}/product/listAllDiscount`
      );
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
      // dispatch(transSync(res.data.result));
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
      <TableContainer mt="30px" w="60vw" ml={"120px"} bgColor={"white"}>
        <Table variant="simple" colorScheme="#285430">
          <Thead alignContent={"center"}>
            <Tr>
              <Th textAlign={"center"} color={"#285430"}>
                Nominal
              </Th>
              <Th textAlign={"center"} color={"#285430"}>
                Status
              </Th>
              <Th textAlign={"center"} color={"#285430"}>
                Action
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {data7?.map((item) => {
              return (
                <Tr>
                  <Td textAlign={"center"} color={"#285430"}>
                    {" "}
                    {new Intl.NumberFormat("IND", {
                      style: "currency",
                      currency: "IDR",
                    }).format(item.nominal)}
                  </Td>
                  <Td textAlign={"center"} color={"#285430"}>
                    {item.isActive === true ? "Active" : "Inactive"}
                  </Td>

                  <Td textAlign={"center"} color={"#285430"}>
                    {item.isActive === false ? (
                      <Button onClick={() => setCancelled(item.id)}>
                        <BsFillCheckSquareFill color={"green"} size="22" />
                      </Button>
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
    </div>
  );
};
