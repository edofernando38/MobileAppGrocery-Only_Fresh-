import { Image } from "@chakra-ui/react";

export const LogoComp = () => {
  return (
    <>
      <Image
        src={`${process.env.REACT_APP_API_BASE_URL}/upload/PIMG-167324294561798293.png`}
      ></Image>
    </>
  );
};
