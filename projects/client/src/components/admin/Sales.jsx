import {
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
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useState } from "react";
import Axios from "axios";

export const SalesComp = () => {
  const [data, setData] = useState();
  const [data2, setData2] = useState();
  const [data3, setData3] = useState();

  const getData = async (id) => {
    try {
      const result = await Axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/transaction/salesDepok`
      );
      setData(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const getData2 = async (id) => {
    try {
      const result = await Axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/transaction/salesJaksel`
      );
      setData2(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData2();
  }, []);

  const getData3 = async (id) => {
    try {
      const result = await Axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/transaction/salesJaktim`
      );
      setData3(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData3();
  }, []);

  return (
    <div>
      <Tabs mt="50px" ml="140px">
        <TabList>
          <Tab borderRadius={"5px"}>
            <Text>Depok</Text>
          </Tab>
          <Tab>
            <Text>Jakarta Selatan</Text>
          </Tab>
          <Tab>
            <Text>Jakarta Timur</Text>
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <TableContainer mt="30px" w="60vw" bgColor={"white"}>
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
                  </Tr>
                </Thead>
                <Tbody>
                  {data?.map((item) => {
                    return (
                      <Tr>
                        <Td textAlign={"center"} color={"#285430"}>
                          {item.id_order}
                        </Td>
                        <Td textAlign={"center"} color={"#285430"}>
                          {item.totalOrder}
                        </Td>
                        <Td textAlign={"center"} color={"#285430"}>
                          {item.totalCharge}
                        </Td>
                        <Td textAlign={"center"} color={"#285430"}>
                          {item.totalWeight}
                        </Td>
                        <Td textAlign={"center"} color={"#285430"}>
                          {item.status}
                        </Td>
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>
            </TableContainer>
          </TabPanel>
          <TabPanel>
            <TableContainer mt="30px" w="60vw" bgColor={"white"}>
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
                  </Tr>
                </Thead>
                <Tbody>
                  {data2?.map((item) => {
                    return (
                      <Tr>
                        <Td textAlign={"center"} color={"#285430"}>
                          {item.id_order}
                        </Td>
                        <Td textAlign={"center"} color={"#285430"}>
                          {item.totalOrder}
                        </Td>
                        <Td textAlign={"center"} color={"#285430"}>
                          {item.totalCharge}
                        </Td>
                        <Td textAlign={"center"} color={"#285430"}>
                          {item.totalWeight}
                        </Td>
                        <Td textAlign={"center"} color={"#285430"}>
                          {item.status}
                        </Td>
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>
            </TableContainer>
          </TabPanel>
          <TabPanel>
            <TableContainer mt="30px" w="60vw" bgColor={"white"}>
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
                  </Tr>
                </Thead>

                <Tbody>
                  {data3?.map((item) => {
                    return (
                      <Tr>
                        <Td textAlign={"center"} color={"#285430"}>
                          {item.id_order}
                        </Td>
                        <Td textAlign={"center"} color={"#285430"}>
                          {item.totalOrder}
                        </Td>
                        <Td textAlign={"center"} color={"#285430"}>
                          {item.totalCharge}
                        </Td>
                        <Td textAlign={"center"} color={"#285430"}>
                          {item.totalWeight}
                        </Td>
                        <Td textAlign={"center"} color={"#285430"}>
                          {item.status}
                        </Td>
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>
            </TableContainer>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};
