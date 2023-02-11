import { Button, ButtonGroup } from "@chakra-ui/button";
import React, { useEffect } from "react";
import Axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverFooter,
} from "@chakra-ui/popover";
import { useDisclosure } from "@chakra-ui/hooks";

export const CompleteButton = () => {
  const [data, setData] = useState();
  const [data2, setData2] = useState();
  const [data5, setData5] = useState();
  const [data6, setData6] = useState();
  const { isOpen, onClose, onToggle } = useDisclosure();
  const params = useParams();
  const navigate = useNavigate();

  const getData = async () => {
    try {
      const result = await Axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/transaction/list/${params.id}`
      );
      setData(result.data);
      setData6(result.data.id);
      const selectedItem = result.data.totalOrder;
      const selectedCharge = result.data.totalCharge;

      let totalOrder = selectedItem + selectedCharge;
      setData2(totalOrder);

      const statusDone = result.data.status;
      setData5(statusDone);
    } catch (err) {}
  };

  useEffect(() => {
    getData();
  }, []);

  const setDone = async () => {
    try {
      const result = await Axios.patch(
        `${process.env.REACT_APP_API_BASE_URL}/transaction/setDone/${params.id}`
      );
      navigate("/transaction");
    } catch (err) {}
  };

  return (
    <div>
      <Button
        mt={"30px"}
        ml="10px"
        w={"370px"}
        bgColor={"#A4BE7B"}
        borderColor="#285430"
        border="2px"
        fontSize="16px"
        color="gray.800"
        justifyContent="center"
        onClick={onToggle}
      >
        Complete Order
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
                onClick={() => setDone()}
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
