import { Avatar, Box, Button, Center, Image, Text, Stack, Badge } from "@chakra-ui/react";
import Axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { LogoutBranch } from "./LogoutBranch";

export const SidebarComp = () => {
  const { username, id } = useSelector((state) => state.adminSlice.value);
  const [data, setData] = useState();
  const navigate = useNavigate();

  const toDashboard = () => {
    navigate("/admin");
  };

  const toProduct = () => {
    navigate("/admin/product");
  };

  const toCategory = () => {
    navigate("/admin/category");
  };

  const toInventory = () => {
    navigate("/admin/inventory");
  };
  const toTransaction = () => {
    navigate("/admin/transaction");
  };
  const toDiscount = () => {
    navigate("/admin/discount");
  };

  const getBranch = async () => {
    try {
      const res = await Axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/branch/branchByAdmin/${id}`
      );
      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getBranch();
  }, []);

  return (
    <div>
      {" "}
      <Box
        className="sidebar"
        w={"16vw"}
        h={"100vh"}
        bgColor="#E5D9B6"
        // pt={"10px"}
        pl={"1px"}
        zIndex={"2"}
        pos="fixed"
        borderRight={"2px"}
        borderColor="#285430"
      >
        <Stack>
          {/* <Center> */}
          <Box ml={"80px"}>
            <Image
              width={"100px"}
              src={`${process.env.REACT_APP_API_BASE_URL}/upload/PIMG-167324294561798293.png`}
            />
            <Text color={"#285430"} as="b">
              BRANCH ADMIN
            </Text>
            <Avatar
              bgColor={"gray.500"}
              size={"xl"}
              pb={""}
              name={username}
              mb="20px"
            ></Avatar>

            <Text ml={"20px"}>{username}</Text>
          </Box>
          {/* </Center> */}
          <Button
            textColor={"#285430"}
            fontSize="md"
            onClick={toDashboard}
            variant="unstyled"
          >
            Dashboard
          </Button>
          <Button
            textColor={"#285430"}
            fontSize="md"
            onClick={toProduct}
            variant="unstyled"
          >
            Product
          </Button>
          <Button
            textColor={"#285430"}
            fontSize="md"
            onClick={toCategory}
            variant="unstyled"
          >
            Category
          </Button>
          <Button
            textColor={"#285430"}
            fontSize="md"
            variant="unstyled"
            onClick={toInventory}
          >
            Inventory
          </Button>
          <Button
            textColor={"#285430"}
            fontSize="md"
            variant="unstyled"
            onClick={toTransaction}
          >
            Transaction
          </Button>
          <Button
            textColor={"#285430"}
            fontSize="md"
            onClick={toDiscount}
            variant="unstyled"
          >
            Discount
            <Badge>Under Maintenance</Badge>
          </Button>
          <LogoutBranch />
        </Stack>
      </Box>
    </div>
  );
};
