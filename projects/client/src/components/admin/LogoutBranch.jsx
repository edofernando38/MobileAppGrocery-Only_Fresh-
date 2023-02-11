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
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutAdmin } from "../../redux/adminSlice";

export const LogoutBranch = () => {
  const { isOpen, onClose, onToggle } = useDisclosure();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogout = () => {
    dispatch(logoutAdmin());
    localStorage.removeItem("tokenBranch");
    navigate("/login-admin");
  };

  return (
    <div>
      <Button
        mt={"60px"}
        ml="58px"
        display={"flex"}
        bgColor={"#FF0000"}
        textColor="gray.800"
        width={"100px"}
        justifyContent={"center"}
        borderColor="#gray.800"
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
          ml="560"
          mt="280"
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
