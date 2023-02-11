import React, { useRef } from "react";
import Axios from "axios";
import Swal from "sweetalert2";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Textarea,
  Center,
  useDisclosure,
  ModalOverlay,
} from "@chakra-ui/react";

export const UpdateProductComp = ({ data }) => {
  const inputProductName = useRef("");
  const inputDescription = useRef("");
  const inputDistributor = useRef("");

  const onUpdate = async (id) => {
    try {
      const updateProduct = {
        productName: inputProductName.current.value,
        description: inputDescription.current.value,
        distributor: inputDistributor.current.value,
      };

      const res = await Axios.patch(
        `${process.env.REACT_APP_API_BASE_URL}/product/update/${id}`,
        updateProduct
      );

      Swal.fire({
        icon: "success",
        text: "Product Updated",
        width: "370px",
      });
      setTimeout(() => window.location.replace("/admin/product"), 900);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Stack spacing={"10px"}>
        <FormControl>
          <FormLabel color="#285430">Nama Produk</FormLabel>
          <Input
            _placeholder={{ color: "#5F8D4E" }}
            borderColor="#285430"
            textColor="black"
            ref={inputProductName}
            defaultValue={data?.productName}
          ></Input>
        </FormControl>
        <FormLabel color="#285430">Distributor</FormLabel>
        <Input
          _placeholder={{ color: "#5F8D4E" }}
          borderColor="#285430"
          textColor="black"
          ref={inputDistributor}
          defaultValue={data?.distributor}
        ></Input>
        <FormControl>
          <FormLabel color="#285430">Description</FormLabel>
          <Textarea
            _placeholder={{ color: "#5F8D4E" }}
            borderColor="#285430"
            textColor="black"
            ref={inputDescription}
            defaultValue={data?.description}
          ></Textarea>
        </FormControl>
        <Center>
          <Button
            bgColor={"#A4BE7B"}
            borderColor="#285430"
            border="2px"
            fontSize="18px"
            color="gray.800"
            width={"100%"}
            justifyContent="center"
            onClick={() => {
              onUpdate(data.id);
            }}
          >
            Edit Product
          </Button>
        </Center>
      </Stack>
    </div>
  );
};
