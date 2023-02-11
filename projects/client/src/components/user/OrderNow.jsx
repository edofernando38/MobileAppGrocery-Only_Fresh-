import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Center,
  Image,
  Text,
} from "@chakra-ui/react";

export const OrderNowComp = () => {
  const [product, setProduct] = useState();
  const navigate = useNavigate();

  const getData = async () => {
    try {
      const res = await Axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/product/list`
      );
      setProduct(res.data.products);
    } catch (err) {
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const toLandingPage = () => {
    navigate("/");
  };

  return (
    <div>
      <Box h="70vh">
        <Image
          src={`${process.env.REACT_APP_API_BASE_URL}/upload/PIMG-167331034678635995.png`}
        ></Image>
        <Center>
          <Button
            bgColor={"#A4BE7B"}
            borderColor="#285430"
            border="2px"
            fontSize="18px"
            color="gray.800"
            onClick={toLandingPage}
          >
            Order Now
          </Button>
        </Center>
        <Box>
          {product?.map((item) => {
            return (
              <Card w={"200px"}>
                <CardHeader>
                  <Text size="sm">{item.productName}</Text>
                </CardHeader>
                <CardBody>
                  <Text fontSize={"xs"}>Price</Text>
                  <Image
                    boxSize={"50px"}
                    src={
                      `${process.env.REACT_APP_API_BASE_URL}/` + item.picture
                    }
                  />
                </CardBody>
                <CardFooter/>
              </Card>
            );
          })}
        </Box>
      </Box>
    </div>
  );
};