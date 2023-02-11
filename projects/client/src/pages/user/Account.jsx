import { Box, Center } from "@chakra-ui/react";
import { AccountComp } from "../../components/user/Account";
import { NavbarComp } from "../../components/user/Navbar";
import { WindowComp } from "../../components/user/Window";

export const AccountPage = () => {
  const tokenLocalStorage = localStorage.getItem("tokenUser");

  return (
    <>
     <Center>
        <Box classsName="header" w={"390px"} h={"844px"} bgColor="white">
          {tokenLocalStorage ? <AccountComp /> : <WindowComp />}
          <Box className="footer" w={"390px"} pos="fixed" bottom={"35px"}>
            <NavbarComp />
          </Box>
        </Box>
      </Center>
    </>
  );
};
