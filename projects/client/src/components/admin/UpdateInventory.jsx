import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Input,
  Select,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import Axios from "axios";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

export const UpdateInventory = ({ data }) => {
  const [branch, setBranch] = useState();
  const [data2, setData2] = useState();
  const [data4, setData4] = useState();
  const inputProductName = useRef("");
  const inputQty = useRef(0);
  const inputEntryDate = useRef("");
  const { id } = useSelector((state) => state.adminSlice.value);

  const getBranch = async () => {
    try {
      const res = await Axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/branch/adminByBranch/${id}`
      );
      setBranch(res.data);

      setData4(res.data.id);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getBranch();
  }, [id]);

  const onUpdate = async (id) => {
    try {
      const updateProduct = {
        productName: inputProductName.current.value,
        entryDate: inputEntryDate.current.value,
        stockQty: inputQty.current.value,
      };

      const res = await Axios.patch(
        `${process.env.REACT_APP_API_BASE_URL}/inventory/update/${id}`,
        updateProduct
      );

      Swal.fire({
        icon: "success",
        text: "Product Updated",
        width: "370px",
      });
      setTimeout(() => window.location.replace("/admin"), 900);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Box
        // ml="120px"
        color={useColorModeValue("#285430")}
        border="2px"
        borderRadius="2xl"
      ></Box>
      <Stack spacing={"10px"}>
        <FormControl>
          <FormLabel
            color="#285430"
            mt="10px"
            ml="8px"
            fontSize="18px"
            as={"b"}
          >
            Branch
          </FormLabel>
          <Input
            // ref={inputBranch}
            color={"#285430"}
            borderColor="#285430"
            ml="5px"
            w="97%"
            defaultValue={branch?.branchName}
          ></Input>
        </FormControl>
        <FormControl>
          <FormLabel
            color="#285430"
            mt="10px"
            ml="8px"
            fontSize="18px"
            as={"b"}
          >
            Product Name
          </FormLabel>
          <Input
            ref={inputProductName}
            color={"#285430"}
            borderColor="#285430"
            ml="5px"
            w="97%"
            defaultValue={data?.Product?.productName}
          ></Input>
        </FormControl>
        <FormControl>
          <FormLabel
            color="#285430"
            mt="10px"
            ml="8px"
            fontSize="18px"
            as={"b"}
          >
            Entry Date
          </FormLabel>
          <Input
            textColor="gray.800"
            borderColor="#285430"
            ml="5px"
            w="97%"
            defaultValue={data?.entryDate}
            ref={inputEntryDate}
          ></Input>
        </FormControl>
        <FormControl>
          <FormLabel
            color="#285430"
            mt="10px"
            ml="8px"
            fontSize="18px"
            as={"b"}
          >
            Quantity
          </FormLabel>
          <Input
            textColor="gray.800"
            borderColor="#285430"
            ml="5px"
            w="97%"
            ref={inputQty}
            defaultValue={data?.stockQty}
          ></Input>
        </FormControl>
        <Center>
          <Button
            mb="20px"
            bgColor={"#A4BE7B"}
            borderColor="#285430"
            border="2px"
            fontSize="18px"
            color="gray.800"
            width={"50%"}
            justifyContent="center"
            onClick={() => onUpdate(data.id)}
          >
            Confirm
          </Button>
        </Center>
      </Stack>
      {/* </Box> */}
      {/* </Box> */}
    </div>
  );
};
