import Axios from "axios";
import { useEffect, useState } from "react";
import { Avatar, Box, Center, Flex, Skeleton, Text } from "@chakra-ui/react";
import { NavbarComp } from "../../components/user/Navbar";
import { Link } from "react-router-dom";

export const CategoryPage = () => {
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const res = await Axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/product/listCategory`
      );
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
        <Center>
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
              zIndex="2"
            >
              <Box margin={"auto"} alignItems={"center"} textColor="#285430">
                <Text as={"b"} fontSize="xl">
                  CATEGORY
                </Text>
              </Box>
            </Box>
            <Skeleton isLoaded>
              <Box
                mt={"80px"}
                className="body"
                bgColor={"white"}
                h={"90vh"}
                w={"390px"}
              >
                <Center>
                  <Flex
                    flexWrap="wrap"
                    w={[330, 330, 380]}
                    justifyContent="center"
                  >
                    {data?.map((item) => {
                      return (
                        <div>
                          <Avatar
                            border="1px"
                            bgColor="#E5D9B6"
                            _hover={{ border: "2px" }}
                            mr={[2, 3, 4]}
                            ml={[2, 3, 4]}
                            mt="3"
                            size="md"
                            name="Grocery"
                            src={
                              `${process.env.REACT_APP_API_BASE_URL}/` +
                              item.categoryPicture
                            }
                            as={Link}
                            to={`/category/${item.id}`}
                          ></Avatar>
                          <Text textAlign="center" color="#285430">
                            {item.categoryName}
                          </Text>
                        </div>
                      );
                    })}
                  </Flex>
                </Center>
              </Box>
            </Skeleton>
            <Box className="footer" w={"390px"} pos="fixed" bottom={"35px"}>
              <NavbarComp />
            </Box>
          </Box>
        </Center>
      </Box>
    </div>
  );
};
