import {
  Button,
  ButtonGroup,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverFooter,
  useDisclosure,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../redux/userSlice";

export const LogoutUser = () => {
  const { isOpen, onToggle, onClose } = useDisclosure();
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(logoutUser());
    localStorage.removeItem("tokenUser");
    window.location.replace("/", 2000);
  };

  return (
    <div>
      <Button
        display={"flex"}
        bgColor={"#FF0000"}
        textColor="gray.800"
        width={"330px"}
        m="auto"
        justifyContent={"center"}
        borderColor="#285430"
        border="2px"
        onClick={onToggle}
      >
        LogOut
      </Button>
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
            Are you sure you want to logout?
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
                onClick={onLogout}
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
