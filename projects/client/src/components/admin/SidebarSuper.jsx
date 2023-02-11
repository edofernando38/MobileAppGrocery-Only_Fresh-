import React from "react";
import {
  Avatar,
  Box,
  Button,
  Image,
  Text,
  useDisclosure,
} from "@chakra-ui/react";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { LogoutSuper } from "./LogoutSuper";

export const SidebarSuper = () => {
  const { username } = useSelector((state) => state.adminSlice.value);
  const data = useSelector((state) => state.branchSlice.value);

  const navigate = useNavigate();

  const toDashboard = () => {
    navigate("/admin");
  };

  const toManagementBranch = () => {
    navigate("/admin/branch-management");
  };

  const toSalesBranch = () => {
    navigate("/admin/sales");
  };

  return (
    <div>
      {" "}
      <Box
        className="sidebar"
        w={"16vw"}
        h={"100vh"}
        bgColor="#E5D9B6"
        pt={"10px"}
        pl={"1px"}
        zIndex={"2"}
        pos="fixed"
        borderRight={"2px"}
        borderColor="#285430"
      >
        <Box margin={"auto"} alignItems={"center"} textColor="#285430">
          <Image
            ml={"3.5vw"}
            boxSize={"8vw"}
            src={`${process.env.REACT_APP_API_BASE_URL}/upload/PIMG-167324294561798293.png`}
          />
          <Text color={"#285430"} as="b" ml={"3vw"}>
            SUPER ADMIN
          </Text>
          <Avatar
            bgColor={"gray.500"}
            size={"lg"}
            mt="2vw"
            ml="5vw"
            pb={""}
            name={username}
          ></Avatar>
          <Text textColor={"#285430"} fontSize="md" as={"b"} ml="3.8vw">
            {username}
          </Text>
          <Text ml="5.5vw">{data?.branchName}</Text>
          <Button
            bgColor={"#E5D9B6"}
            mt={"2vw"}
            ml={"3vw"}
            textColor={"#285430"}
            fontSize="md"
            onClick={toDashboard}
          >
            Dashboard
          </Button>
          <Button
            bgColor={"#E5D9B6"}
            mt={"1vw"}
            ml={"1vw"}
            textColor={"#285430"}
            fontSize="md"
            onClick={toManagementBranch}
          >
            Management Branch
          </Button>
          <Button
            bgColor={"#E5D9B6"}
            mt={"1vw"}
            ml={"1vw"}
            textColor={"#285430"}
            fontSize="md"
            onClick={toSalesBranch}
          >
            Sales by Branch
          </Button>
          <LogoutSuper />
        </Box>
      </Box>
    </div>
  );
};
