import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Axios from "axios";
import Swal from "sweetalert2";
import {
  Button,
  Center,
  ButtonGroup,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverFooter,
  Select,
  Stack,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";

export const AddAddress = () => {
  const [province, setProvince] = useState([]);
  const [city, setCity] = useState([]);
  const [postal, setPostal] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState(0);
  const [selectedCity, setSelectedCity] = useState(0);
  const [selectedPostal, setSelectedPostal] = useState(0);
  const inputAddressLine = useRef("");
  const inputCity = useRef("");
  const inputProvince = useRef("");
  const inputDetail = useRef("");
  const inputDistrict = useRef("");
  const inputPostalCode = useRef("");
  const inputReceiverName = useRef("");
  const inputReceiverPhone = useRef("");
  const inputReceiverEmail = useRef("");
  const navigate = useNavigate();
  const params = useParams();
  const { onClose, isOpen, onToggle } = useDisclosure();

  const onCreate = async () => {
    try {
      const addAddress = {
        addressLine: inputAddressLine.current.value,
        district: inputDistrict.current.value,
        city: inputCity.current.value,
        province: inputProvince.current.value,
        postalCode: inputPostalCode.current.value,
        detail: inputDetail.current.value,
        receiverName: inputReceiverName.current.value,
        receiverPhone: inputReceiverPhone.current.value,
        receiverEmail: inputReceiverEmail.current.value,
      };

      const res = await Axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/address/create/${params.id}`,
        addAddress
      );
      Swal.fire({
        icon: "success",
        text: "Success",
        width: "370px",
      });
      navigate("/account/address");
    } catch (err) {
      Swal.fire({
        icon: "error",
        text: "Area not supported yet",
      });
      console.log(err);
    }
  };

  const fetchProvince = async () => {
    try {
      const response = await Axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/address/province`
      );
      setProvince(response.data.rajaongkir.results);
    } catch (err) {
      console.log(err);
    }
  };

  const renderProvince = () => {
    return province.map((val) => {
      return (
        <option value={val.province_id} key={val.province_id.toString()}>
          {val.province}
        </option>
      );
    });
  };

  const fetchCity = async () => {
    try {
      const response = await Axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/address/city/${selectedProvince}`
      );

      setCity(response.data.rajaongkir.results);
    } catch (err) {
      console.log(err);
    }
  };

  const renderCity = () => {
    return Array.from(city).map((val, i) => {
      return (
        <option value={val.city_id} key={i}>
          {val.type + " "} {val.city_name}
        </option>
      );
    });
  };

  const fetchPostal = async () => {
    try {
      const response = await Axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/address/city/${selectedProvince}`
      );
      setPostal(response.data.rajaongkir.results);
    } catch (err) {
      console.log(err);
    }
  };

  const renderPostal = () => {
    return Array.from(postal).map((val, i) => {
      return (
        <option value={val.postal_code} key={i}>
          {val.postal_code}
        </option>
      );
    });
  };

  const provinceHandler = ({ target }) => {
    const { value } = target;
    setSelectedProvince(value);
  };

  const cityHandler = ({ target }) => {
    const { value } = target;
    setSelectedCity(value);
  };

  const postalHandler = ({ target }) => {
    const { value } = target;
    setSelectedPostal(value);
  };

  useEffect(() => {
    fetchProvince();
  }, []);

  useEffect(() => {
    fetchCity();
  }, [selectedProvince]);

  useEffect(() => {
    fetchPostal();
  }, [selectedCity]);

  return (
    <div>
      <Stack ml="10px" spacing={"10px"} mt={"20px"} textColor="#285430">
        <FormControl>
          <FormLabel>Alamat</FormLabel>
          <Input
            ref={inputAddressLine}
            placeholder="Alamat"
            mb={"10px"}
            width="370px"
            border="1px"
            borderColor="#285430"
          ></Input>
        </FormControl>
        <FormControl>
          <FormLabel>Kecamatan</FormLabel>
          <Input
            ref={inputDistrict}
            mb={"10px"}
            width="370px"
            border="1px"
            borderColor="#285430"
          ></Input>
        </FormControl>
        <FormControl>
          <FormLabel>Province</FormLabel>
          <Select
            mb={"10px"}
            width="370px"
            border="1px"
            borderColor="#285430"
            value={province?.rajaongkir?.results?.province_id}
            placeholder="Select Province"
            onChange={provinceHandler}
            ref={inputProvince}
          >
            {renderProvince()}
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel>City</FormLabel>
          <Select
            mb={"10px"}
            width="370px"
            border="1px"
            borderColor="#285430"
            value={city?.rajaongkir?.results?.city_id}
            placeholder="Select City"
            onChange={cityHandler}
            ref={inputCity}
          >
            {renderCity()}
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel>Kode Pos</FormLabel>
          <Select
            mb={"10px"}
            width="370px"
            border="1px"
            borderColor="#285430"
            placeholder="Select Postal Code"
            onChange={postalHandler}
            ref={inputPostalCode}
          >
            {renderPostal()}
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel>Detail Alamat</FormLabel>
          <Textarea
            mb={"10px"}
            width="370px"
            border="1px"
            borderColor="#285430"
            placeholder="e.g. Blok/Lantai"
            _placeholder={{ color: "#5F8D4E" }}
            ref={inputDetail}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Nama Penerima</FormLabel>
          <Flex>
            <Input
              ref={inputReceiverName}
              placeholder="Name"
              mb={"10px"}
              width="370px"
              border="1px"
              borderColor="#285430"
              _placeholder={{ color: "#5F8D4E" }}
            ></Input>
          </Flex>
        </FormControl>
        <FormControl>
          <FormLabel>No. Telepon Penerima</FormLabel>
          <Input
            ref={inputReceiverPhone}
            placeholder="08xxx"
            mb={"10px"}
            width="370px"
            border="1px"
            borderColor="#285430"
            _placeholder={{ color: "#5F8D4E" }}
          ></Input>
        </FormControl>
        <FormControl>
          <FormLabel>Email Penerima</FormLabel>
          <Input
            ref={inputReceiverEmail}
            placeholder="yourname@example.com"
            mb={"10px"}
            width="370px"
            border="1px"
            borderColor="#285430"
            _placeholder={{ color: "#5F8D4E" }}
          ></Input>
        </FormControl>
      </Stack>
      <Center>
        <Button
          onClick={onToggle}
          mt={"15px"}
          bgColor={"#A4BE7B"}
          borderColor="#285430"
          border="2px"
          fontSize="18px"
          color="gray.800"
          width={"370px"}
        >
          Add Address
        </Button>
      </Center>
      <Popover
        returnFocusOnClose={false}
        isOpen={isOpen}
        placement="auto-end"
        closeOnBlur={false}
      >
        <PopoverContent
          ml="8"
          mt="275"
          borderColor="#285430"
          border="2px"
          bgColor={"#E5D9B6"}
        >
          <PopoverArrow />
          <PopoverBody textColor={"#285430"}>
            Data will be saved, are You sure?
          </PopoverBody>
          <PopoverFooter display="flex" justifyContent="flex-end">
            <ButtonGroup size="sm">
              <Button
                onClick={onClose}
                bgColor={"#A4BE7B"}
                borderColor="#285430"
                border="2px"
                fontSize="14px"
                color="gray.800"
              >
                No
              </Button>
              <Button
                onClick={onCreate}
                bgColor="#A4BE7B"
                borderColor="#285430"
                border="2px"
                fontSize="14px"
                color="gray.800"
              >
                Yes
              </Button>
            </ButtonGroup>
          </PopoverFooter>
        </PopoverContent>
      </Popover>
    </div>
  );
};
