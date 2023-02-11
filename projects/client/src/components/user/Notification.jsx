import { useNavigate } from "react-router-dom";
import { Box, Badge } from "@chakra-ui/react";
import { IoNotifications } from "react-icons/io5";

export const NotificationComp = () => {
  const navigate = useNavigate();

  const toNotification = () => {
    navigate("/notification");
  };
  return (
    <div>
      <Box mt="20px" pr={"23px"} as="button" onClick={toNotification}>
        <Badge
          ml="1"
          mt="-2"
          bg="#FE0013"
          color={"black"}
          colorScheme={"red"}
          variant={"solid"}
          position="absolute"
          fontWeight="bold"
          borderRadius="2xl"
        >
          0
        </Badge>
        <IoNotifications size={28} color="#5F8D4E" />
      </Box>
    </div>
  );
};
