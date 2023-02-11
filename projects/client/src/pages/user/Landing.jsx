import { Box, Center, Skeleton, VStack } from "@chakra-ui/react";
import { LogoComp } from "../../components/user/Logo";
import { NotificationComp } from "../../components/user/Notification";
import { NavbarComp } from "../../components/user/Navbar";
import { CarouselComp } from "../../components/user/Carousel";
import { MenuComp } from "../../components/user/Menu";
import { DefaultAddress } from "../../components/user/DefaultAddress";
import { BlankAddress } from "../../components/user/BlankAddress";
import { SearchComp } from "../../components/user/Search";

export const LandingPage = () => {
  const tokenLocalStorage = localStorage.getItem("tokenUser");

  return (
    <div>
      <Box>
        <Center>
          <Box>
            <Skeleton isLoaded={true}>
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
                <LogoComp />
                  <SearchComp />
                <NotificationComp />
              </Box>
            </Skeleton>
            <Skeleton isLoaded={true}>
              <Box className="body" bgColor="white" h={"2000px"} w={"390px"}>
                <VStack>
            {tokenLocalStorage ? <DefaultAddress /> : <BlankAddress />}
                  <CarouselComp />
                  <MenuComp />
                </VStack>
              </Box>
            </Skeleton>
            <Skeleton isLoaded={true}>
              <Box
                className="footer"
                w={"390px"}
                bgColor="E5D9B6"
                pos="fixed"
                bottom={"35px"}
                zIndex="2"
              >
                <NavbarComp />
              </Box>
            </Skeleton>
          </Box>
        </Center>
      </Box>
    </div>
  );
};
