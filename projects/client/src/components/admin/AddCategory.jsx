import { useRef } from "react";
import Swal from "sweetalert2";
import Axios from "axios";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Center,
  Box,
  useColorModeValue,
  Text,
} from "@chakra-ui/react";

export const AddCategory = () => {
  const inputCategoryName = useRef("");

  const onCreateCategory = async () => {
    try {
      const addProduct = {
        categoryName: inputCategoryName.current.value,
      };
      const res = await Axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/product/createCategory`,
        addProduct
      );
      Swal.fire({
        icon: "success",
        text: "Category Added",
        width: "370px",
      });

      setTimeout(() => {
        window.location.replace("/admin");
      }, 900);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Box
        p="10px"
        mt="215px"
        color={useColorModeValue("#285430")}
        border="2px"
        borderRadius="2xl"
      >
        <Box
          w={"385px"}
          m="10px"
          mb="25px"
          borderWidth="2px"
          boxShadow="xl"
          borderRadius="8px"
          borderColor="#285430"
        >
          <Box
            pt="10px"
            h="50px"
            borderTopRadius="8px"
            align="center"
            bg="#E5D9B6"
            fontSize="18px"
          >
            <Text justifyContent="center" fontWeight="bold" color="#285430">
              Add Category
            </Text>
          </Box>
          <Stack spacing={"10px"}>
            <FormControl>
              <FormLabel mt={"10px"} ml={"10px"} color="#285430">
                Category Name
              </FormLabel>
              <Input
                w={"360px"}
                ml={"10px"}
                ref={inputCategoryName}
                placeholder="Category"
                _placeholder={{ color: "#5F8D4E" }}
                borderColor="#285430"
                textColor="gray.800"
              ></Input>
            </FormControl>
            <Center>
              <Button
                mt={"20px"}
                mb={"20px"}
                w={"360px"}
                bgColor={"#A4BE7B"}
                borderColor="#285430"
                border="2px"
                fontSize="16px"
                color="gray.800"
                justifyContent="center"
                onClick={onCreateCategory}
              >
                Add Category
              </Button>
            </Center>
          </Stack>
        </Box>
      </Box>
    </div>
  );
};