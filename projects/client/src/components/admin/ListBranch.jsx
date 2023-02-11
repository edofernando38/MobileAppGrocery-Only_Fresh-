import { useEffect, useState } from "react";
import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Box,
} from "@chakra-ui/react";
import Axios from "axios";

export const ListBranch = () => {
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);

  const getData = async () => {
    try {
      const res = await Axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/admin/findAll`
      );
      console.log(res.data);
      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <Box>
        <TableContainer ml="78px" mt="215px" w="50vw" bgColor={"white"}>
          <Table variant="simple" colorScheme="#285430">
            <Thead alignContent={"center"}>
              <Tr>
                <Th color={"#285430"} fontSize="16px">
                  Username
                </Th>
                <Th color={"#285430"} fontSize="16px">
                  Email
                </Th>
                <Th color={"#285430"} fontSize="16px">
                  Placement
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {data?.map((item) => {
                return (
                  <Tr>
                    <Td color={"#285430"}>{item.username}</Td>
                    <Td color={"#285430"}>{item.email}</Td>
                    <Td color={"#285430"}></Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
};
