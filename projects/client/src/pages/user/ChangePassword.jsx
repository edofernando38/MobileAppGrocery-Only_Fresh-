import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { ArrowBackIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { logoutUser } from "../../redux/userSlice";

export const ChangePassword = (data) => {
  const [currentPassword, setCurrentPassword] = useState(false);
  const [newPassword, setNewPassword] = useState(false);
  const { id } = useSelector((state) => state.userSlice.value);
  const inputPass = useRef("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const updatePass = async () => {
    try {
      const user = {
        password: inputPass.current.value,
      };
      const res = await Axios.patch(
        `${process.env.REACT_APP_API_BASE_URL}/user/updatePassword/${id}`,
        user
      );
      console.log(res);
      Swal.fire({
        icon: "success",
        text: "Password Has Changed, Please Login Again",
        width: "370px",
      });
      dispatch(logoutUser());
      localStorage.removeItem("tokenUser");
      navigate("/login-user");
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
                EDIT YOUR PASSWORD
              </Text>
            </Box>
          </Box>
          <Box w={"390px"} h={"844px"} bgColor="white">
            <Box
              mt={"100px"}
              className="body"
              bgColor="white"
              h={"100vh"}
              w={"390px"}
              pos="fixed"
            >
              <Stack spacing={"20px"} mt={"20px"}>
                <FormControl isRequired>
                  <FormLabel color={"#285430"} ml={"10px"}>
                    Input Password Existing
                  </FormLabel>
                  <Flex>
                    <Input
                      type={"password"}
                      isRequired
                      placeholder="Current Password"
                      _placeholder={{ color: "#5F8D4E" }}
                      textColor={"#285430"}
                      borderColor={"#285430"}
                      border={"1px"}
                      width="370px"
                      ml={"10px"}
                      position="absolute"
                    />
                    <Button
                      color={"black"}
                      onClick={() =>
                        setCurrentPassword(
                          (currentPassword) => !currentPassword
                        )
                      }
                      pos="relative"
                      ml={"340px"}
                      zIndex="1"
                      variant={"unstyled"}
                    >
                      {currentPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </Flex>
                </FormControl>
                <FormControl isRequired>
                  <FormLabel color={"#285430"} ml={"10px"}>
                    Create New Password
                  </FormLabel>
                  <Input
                    type={"password"}
                    ref={inputPass}
                    isRequired
                    placeholder="New Password"
                    _placeholder={{ color: "#5F8D4E" }}
                    textColor={"#285430"}
                    borderColor={"#285430"}
                    border={"1px"}
                    width="370px"
                    ml={"10px"}
                    position="absolute"
                  />
                  <Button
                    color={"black"}
                    onClick={() =>
                      setNewPassword((newPassword) => !newPassword)
                    }
                    pos="relative"
                    ml={"340px"}
                    zIndex="1"
                    variant={"unstyled"}
                  >
                    {newPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </FormControl>
                <Center>
                  <Button
                    onClick={() => updatePass(data.id)}
                    mt={"15px"}
                    bgColor={"#A4BE7B"}
                    borderColor="#285430"
                    border="2px"
                    fontSize="18px"
                    color="gray.800"
                    width={"370px"}
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