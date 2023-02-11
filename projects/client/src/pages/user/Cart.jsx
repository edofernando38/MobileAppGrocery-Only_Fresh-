import { Box, Center, Text } from "@chakra-ui/react";
import { CartComp } from "../../components/user/Cart";
import { NavbarComp } from "../../components/user/Navbar";
import { OrderNowComp } from "../../components/user/OrderNow";

export const CartPage = () => {
  const tokenLocalStorage = localStorage.getItem("tokenUser");

  return (
    <div>
       <Center>
        <Box>
          <Box
            className="header"
            w={"390px"}
            h={"80px"}
            bgColor="#E5D9B6"
            display="flex"
            justifyContent="space-between"
            pt={"10px"}
            pl={"1px"}
            position="fixed"
            zIndex="2"
          >
              <Box margin={"auto"} alignItems={"center"} textColor="#285430">
          <Text as={"b"} fontSize="xl">
            CART
          </Text>
        </Box>
          </Box>
          <Box
            mt={"80px"}
            pt={"15px"}
            pb={"80px"}
            className="body"
            bgColor="white"
            h={"100vh"}
            w={"390px"}
          >
            {tokenLocalStorage ? <CartComp /> : <OrderNowComp />}
          </Box>
            
          <Box className="footer" w={"390px"} pos="fixed" bottom={"35px"}>
            <NavbarComp />
          </Box>
        </Box>
      </Center>
    </div>
  );
};
