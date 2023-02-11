import { useRef, useState, useEffect } from "react";
import Axios from "axios";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
  Select,
  Tag,
  useDisclosure,
  Popover,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverBody,
  ButtonGroup,
} from "@chakra-ui/react";
import { ArrowBackIcon, ArrowUpIcon, EditIcon } from "@chakra-ui/icons";

export const ProfilePage = () => {
  const [data, setData] = useState([]);
  const [date, setDate] = useState("");
  const [image, setImage] = useState("");
  const [profile, setProfile] = useState("upload");
  const { isOpen, onToggle, onClose } = useDisclosure();
  const { id } = useSelector((state) => state.userSlice.value);
  const inputGender = useRef("");
  const inputBirthDate = useRef("");
  const inputProfilePic = useRef("");
  const inputName = useRef("");
  const navigate = useNavigate();
  const params = useParams();

  const updateData = async () => {
    try {
      const user = {
        name: inputName.current.value,
        gender: inputGender.current.value,
        birthDate: inputBirthDate.current.value,
        profilePic: inputProfilePic.current.value,
      };

      const result = await Axios.patch(
        `${process.env.REACT_APP_API_BASE_URL}/user/update/${id}`,
        user
      );
      Swal.fire({
        icon: "success",
        text: "Data Updated",
        width: "370px",
      });
      setTimeout(() => window.location.replace("/account"), 2000);
    } catch (err) {
    }
  };

  const getData = async () => {
    try {
      const result = await Axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/user/byId/${params.id}`
      );
      setData(result.data);
    } catch (err) {
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleChoose = (e) => {
    setImage(e.target.files[0]);
  };

  const handleUpload = async () => {
    const data = new FormData();
    data.append("file", image);

    const resultImage = await Axios.post(
      `${process.env.REACT_APP_API_BASE_URL}/user/single-uploaded/${id}`,
      data,
      {
        headers: {
          "Content-type": "multipart/form-data",
        },
      }
    );
    setProfile(resultImage.data.profilePic);
    setImage({ images: "" });
    window.location.replace("/account");
  };

  const toEmail = () => {
    navigate("/account/profile/email");
  };

  const toPass = () => {
    navigate("/account/profile/password");
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
            <Box as={Link} to={"/account"}>
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
                PROFILE
              </Text>
            </Box>
          </Box>
          <Box
            mt={"80px"}
            className="body"
            bgColor="white"
            color="#285430"
            h={"740px"}
            w={"390px"}
            overflow="-moz-hidden-unscrollable"
          >
            <Avatar
              size={"lg"}
              bg="gray.500"
              ml={"8"}
              mt="3"
              src={`${process.env.REACT_APP_API_BASE_URL}/${data.Profile?.profilePic}`}
            />
            <Tag
              mt={"30px"}
              as={"button"}
              ml={"10px"}
              size="8"
              onClick={onToggle}
            >
              <ArrowUpIcon mr={"8px"} fontSize="20" textColor={"#285430"} />{" "}
              <Text color={"#285430"}>Upload Picture</Text>
            </Tag>
            <Popover
              returnFocusOnClose={false}
              isOpen={isOpen}
              onClose={onClose}
              closeOnBlur={false}
            >
              <PopoverContent w={"380px"} ml="530px" mt="170px">
                <PopoverBody
                  backgroundColor="#E5D9B6"
                  border="1px"
                  borderRadius="xl"
                  borderColor="#285430"
                >
                  <PopoverArrow />
                  <PopoverCloseButton />
                  <ButtonGroup size="sm">
                    <Box>
                      <form encType="multipart/form-data">
                        <input
                          color="#285430"
                          type={"file"}
                          accept="image/*"
                          name="file"
                          size={"100px"}
                          onChange={(e) => handleChoose(e)}
                        ></input>
                      </form>
                      <Center>
                        <Button
                          mt="3"
                          ml="30px"
                          bgColor={"#A4BE7B"}
                          borderColor="#285430"
                          border="2px"
                          fontSize="14px"
                          color="gray.800"
                          width={"30%"}
                          onClick={() => handleUpload()}
                          size="sm"
                        >
                          Upload
                        </Button>
                      </Center>
                    </Box>
                  </ButtonGroup>
                </PopoverBody>
              </PopoverContent>
            </Popover>

            <Heading mt={"20px"} ml="10px" size={"md"} color="#285430">
              Personal Data
            </Heading>
            <Stack spacing={"20px"} mt={"20px"}>
              <FormControl>
                <FormLabel color={"#285430"} ml="10px">
                  Name
                </FormLabel>
                <Flex>
                  <Input
                    width="370px"
                    ml={"10px"}
                    borderColor="#285430"
                    border="1px"
                    ref={inputName}
                    placeholder="Name"
                    _placeholder={{ color: "#285430" }}
                    defaultValue={data.name}
                    textColor="#285430"
                  ></Input>
                </Flex>
              </FormControl>
              <FormControl>
                <FormLabel color={"#285430"} ml={"10px"}>
                  Birthdate
                </FormLabel>
                <Input
                  color={"#285430"}
                  borderColor="#285430"
                  border="1px"
                  width="370px"
                  ml="10px"
                  placeholder="Select Date and Time"
                  _placeholder={{ color: "#285430" }}
                  size="md"
                  type="date"
                  defaultValue={data.Profile?.birthDate}
                  onChange={(event) => setDate(event.target.value)}
                  ref={inputBirthDate}
                />
              </FormControl>
              <FormControl>
                <FormLabel color={"#285430"} ml="10px">
                  Gender
                </FormLabel>
                <Select
                  color={"#285430"}
                  borderColor="#285430"
                  border="1px"
                  width="370px"
                  ml="10px"
                  ref={inputGender}
                >
                  <option selected={data.Profile?.gender === ""} value="">
                    Select Gender
                  </option>
                  <option
                    selected={data.Profile?.gender === "male"}
                    value="male"
                  >
                    Male
                  </option>
                  <option
                    selected={data.Profile?.gender === "female"}
                    value="female"
                  >
                    Female
                  </option>
                </Select>
              </FormControl>
              <Center>
                <Button
                  onClick={() => updateData(data.id)}
                  mt={"10px"}
                  bgColor={"#A4BE7B"}
                  borderColor="#285430"
                  border="2px"
                  color="gray.800"
                  fontSize="18px"
                  width={"370px"}
                >
                  Save
                </Button>
              </Center>
            </Stack>
            <Heading
              ml="10px"
              mt={"20px"}
              mb={"20px"}
              size={"md"}
              color="#285430"
            >
              Account Information
            </Heading>
            <Stack spacing={"20px"}>
              <Box display={"flex"} justifyContent="space-between">
                <Text ml="10px" color={"#285430"}>
                  Phone Number
                </Text>
              </Box>
              <Text pl="10px" color={"#285430"} as={"u"}>
                {data.phoneNumber}
              </Text>
              <Box display={"flex"} justifyContent="space-between">
                <Text ml="10px" color={"#285430"}>
                  Email
                </Text>
                <Box mr="30px" color={"#285430"} as="button" onClick={toEmail}>
                  <EditIcon />
                </Box>
              </Box>
              <Text pl="10px" color={"#285430"} as={"u"}>
                {data.email}
              </Text>
              <Box display={"flex"} justifyContent="space-between">
                <Text ml="10px" color={"#285430"}>
                  Password
                </Text>
                <Box mr="30px" color={"#285430"} as="button" onClick={toPass}>
                  <EditIcon />
                </Box>
              </Box>
            </Stack>
          </Box>
        </Center>
      </Box>
    </div>
  );
};
