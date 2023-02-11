import Axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Stack,
  Button,
  Text,
  Box,
  StackDivider,
  Avatar,
  Badge,
  Grid,
  GridItem,
  Tag,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import { LogoutUser } from "./Logout";

export const AccountComp = () => {
  const { name, id } = useSelector((state) => state.userSlice.value);
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const navigate = useNavigate();

  const getData = async () => {
    try {
      const result = await Axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/user/byId/${id}`
      );
      setData(result.data);
      setData2(result.data.isVerified);
    } catch (err) {
    }
  };

  useEffect(() => {
    getData();
  }, [id]);

  const toProfile = () => {
    navigate(`/account/profile/${id}`);
  };
  const toAddress = () => {
    navigate(`/account/address/${id}`);
  };

  return (
    <div>
      <Box>
        <Box
          className="header"
          w={"390px"}
          h={"80px"}
          bgColor="#E5D9B6"
          display={"flex"}
          justifyContent="space-between"
          pt={"10px"}
          pl={"1px"}
          pos="fixed"
          top={"0"}
          zIndex={"2"}
        >
          <Box margin={"auto"} alignItems={"center"} textColor="#285430">
            <Text as={"b"} fontSize="xl">
              ACCOUNT
            </Text>
          </Box>
        </Box>

        <Box
          mt={"100px"}
          className="body"
          bgColor="white"
          w={"390px"}
          pos="fixed"
        >
          <Grid
            h="100px"
            templateRows="repeat(2, 1fr)"
            templateColumns="repeat(5, 1fr)"
            gap={"10px"}
          >
            <GridItem m={"auto"} rowSpan={2} colSpan={1}>
              <Avatar
                bgColor={"gray.500"}
                display={"flex"}
                size={"lg"}
                src={`${process.env.REACT_APP_API_BASE_URL}/${data.Profile?.profilePic}`}
                ml="8"
              ></Avatar>
            </GridItem>
            <GridItem colSpan={1}>
              <Badge textColor={"#285430"} fontSize="md" ml={"10px"} as="b">
                {name}
              </Badge>
            </GridItem>
            <GridItem rowSpan={7} colSpan={4}>
              <Tag
                textColor={"#285430"}
                as={"button"}
                ml={"10px"}
                onClick={toProfile}
              >
                <EditIcon textColor={"#285430"} mr={"5px"} /> Edit Profile
              </Tag>
            </GridItem>
          </Grid>
          <Stack
            mt={"30px"}
            divider={<StackDivider borderColor="transparent" />}
            spacing={"10px"}
            align="stretch"
          >
            <Button
              textAlign={"left"}
              variant={"unstyled"}
              ml={"38px"}
              textColor={"#285430"}
              fontSize="sm"
              onClick={toAddress}
            >
              MY ADDRESS
            </Button>
            {data2 === true ? (
              ""
            ) : (
              <Button
                textAlign={"left"}
                variant={"unstyled"}
                ml={"38px"}
                textColor={"#285430"}
                // onClick={toAddress}
                fontSize="sm"
              >
                VERIFY MY ACCOUNT
              </Button>
            )}
            <LogoutUser />
          </Stack>
        </Box>
        <Box className="footer" w={"390px"} pos="fixed" bottom={"35px"}></Box>
      </Box>
    </div>
  );
};