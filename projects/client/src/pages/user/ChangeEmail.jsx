import Axios from "axios";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { ArrowBackIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { logoutUser } from "../../redux/userSlice";

export const ChangeEmail = (data) => {
  const inputEmail = useRef("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.userSlice.value);

  const updateEmail = async () => {
    try {
      const user = {
        email: inputEmail.current.value,
      };
      const result = await Axios.patch(
        `${process.env.REACT_APP_API_BASE_URL}/user/updateEmail/${id}`,
        user
      );
      console.log(result);
      dispatch(logoutUser());
      localStorage.removeItem("tokenUser");
      navigate("/login-user");
      navigate("/account/profile");
      Swal.fire({
        icon: "success",
        text: "Email has changed",
        width: "370px",
      });
    } catch (err) {
    }
  };

  return (
    <div>
      <Box>
        <Center>
          <Box
            className="header"
            w={"390px"}
            h={"80px"}
            bgColor="#E5D9B6"
            color="gray.800"
            display={"flex"}
            justifyContent="space-between"
            pt={"10px"}
            pl={"1px"}
            pos="fixed"
            top={"0"}
            zIndex={"2"}
          >
            <Box as={Link} to={`/account/profile/${id}`}>
              <ArrowBackIcon
                mt={"20px"}
                ml={"20px"}
                pos={"fixed"}
                color="#285430"
                fontSize={"25px"}
              />
            </Box>
            <Box margin={"auto"} alignItems={"center"} textColor="#285430">
              <Text as={"b"} fontSize="xl">
                EDIT YOUR EMAIL
              </Text>
            </Box>
          </Box>
          <Box w={"390px"} h={"844px"} bgColor="white">
            <Box
              mt={"100px"}
              className="body"
              bgColor="white"
              h={"1750px"}
              w={"390px"}
              pos="fixed"
            >
              <Stack spacing={"20px"} mt={"20px"}>
                <FormControl isRequired>
                  <FormLabel color={"#285430"} ml={"10px"}>
                    Input Email Existing
                  </FormLabel>
                  <Input
                    isRequired
                    placeholder="Current Email"
                    _placeholder={{ color: "#5F8D4E" }}
                    textColor={"#285430"}
                    borderColor={"#285430"}
                    border={"1px"}
                    width="370px"
                    ml={"10px"}
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel color={"#285430"} ml={"10px"}>
                    Create New Email
                  </FormLabel>
                  <Input
                    ref={inputEmail}
                    isRequired
                    placeholder="New Email"
                    _placeholder={{ color: "#5F8D4E" }}
                    borderColor={"#285430"}
                    textColor={"#285430"}
                    border={"1px"}
                    width="370px"
                    ml={"10px"}
                  />
                </FormControl>
                <Center>
                  <Button
                    mt={"15px"}
                    bgColor={"#A4BE7B"}
                    borderColor="#285430"
                    border="2px"
                    fontSize="18px"
                    color="gray.800"
                    width={"370px"}
                    onClick={() => updateEmail(data.id)}
                  >
                    Save
                  </Button>
                </Center>
              </Stack>
            </Box>
          </Box>
        </Center>
      </Box>
    </div>
  );
};
