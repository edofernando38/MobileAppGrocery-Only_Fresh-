import { useNavigate, useLocation } from "react-router-dom";
import {
  IoHomeOutline,
  IoHome,
  IoGridOutline,
  IoGrid,
  IoCartOutline,
  IoCart,
  IoNewspaperOutline,
  IoNewspaper,
  IoPersonOutline,
  IoPerson,
} from "react-icons/io5";
import { Center, Flex, Icon, Text, VStack, Badge } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import "./Navbar.css";
import { useEffect } from "react";
import Axios from "axios";
import { cartSync } from "../../redux/cartSlice";
import { transSync } from "../../redux/transactionSlice";

export const NavbarComp = () => {
  const data = useSelector((state) => state.cartSlice.value);
  const data2 = useSelector((state) => state.transactionSlice.value);
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useSelector((state) => state.userSlice.value);
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      const res = await Axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/cart/findBy/${id}`
      );
      dispatch(cartSync(res.data));
    } catch (err) {
    }
  };

  useEffect(() => {
    getData();
  }, [id]);

  const getData2 = async () => {
    try {
      const result = await Axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/transaction/findById/${id}`
      );
      dispatch(transSync(result.data));
    } catch (err) {
    }
  };

  useEffect(() => {
    getData2();
  }, [id]);

  const menuBar = [
    {
      icon1: IoHomeOutline,
      icon2: IoHome,
      icon3: "",
      name: "Home",
      url: "/",
    },
    {
      icon1: IoGridOutline,
      icon2: IoGrid,
      icon3: "",
      name: "Category",
      url: "/category",
    },
    {
      icon1: IoCartOutline,
      icon2: IoCart,
      icon3: Badge,
      name: "Cart",
      url: `/carts`,
    },
    {
      icon1: IoNewspaperOutline,
      icon2: IoNewspaper,
      icon3: Badge,
      name: "Order",
      url: "/transaction",
    },
    {
      icon1: IoPersonOutline,
      icon2: IoPerson,
      icon3: "",
      name: "Account",
      url: "/account",
    },
  ];

  const toPage = (url) => {
    navigate(url);
  };

  return (
    <div>
      <Center>
        <Badge
          zIndex={2}
          borderRadius="2xl"
          mb={"10px"}
          ml="100px"
          bg="#FE0013"
          color={"gray.800"}
        >
          {data?.length}
        </Badge>
        <Badge
          zIndex={2}
          borderRadius="2xl"
          mb={"10px"}
          ml="50px"
          bg="#FE0013"
          color={"gray.800"}
        >
          {data2?.length}
        </Badge>
      </Center>
      <Center>
        <Flex
          w="390px"
          h="70px"
          bgColor="#E5D9B6"
          color="gray.800"
          dropShadow="2xl"
          position="fixed"
        >
          <Flex
            justifyContent="space-evenly"
            align="center"
            w="390px"
          >
            {menuBar.map((item, index) => {
              return (
                <VStack
                  w="50px"
                  h="70px"
                  justifyContent="center"
                  _hover={{ cursor: "pointer" }}
                  borderTop={location.pathname === item.url ? "4px" : ""}
                  onClick={() => toPage(item.url, index)}
                  key={index}
                  className={location.pathname === item.url ? "active" : ""}
                >
                  <Icon
                    className="icon"
                    w={7}
                    h={7}
                    as={
                      location.pathname === item.url ? item.icon2 : item.icon1
                    }
                  />

                  {location.pathname === item.url ? (
                    <Text
                      justifyItems="center"
                      className="name"
                      fontSize="small"
                      fontWeight="bold"
                    >
                      {item.name}
                    </Text>
                  ) : null}
                </VStack>
              );
            })}
          </Flex>
        </Flex>
      </Center>
    </div>
  );
};
