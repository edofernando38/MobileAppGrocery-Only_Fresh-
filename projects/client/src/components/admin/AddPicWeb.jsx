import { useState } from "react";
import Axios from "axios";
import { Box, Button, ButtonGroup } from "@chakra-ui/react";
import Swal from "sweetalert2";

export const AddPicWeb = () => {
  const [profile3, setProfile3] = useState("upload");
  const [image3, setImage3] = useState("");

  const handleChoose2 = (e) => {
    console.log("e.target.files", e.target.files);
    setImage3(e.target.files[0]);
  };

  const handleUpload2 = async () => {
    const data = new FormData();
    data.append("file", image3);

    const resultImage = await Axios.post(
      `${process.env.REACT_APP_API_BASE_URL}/picture/single-uploaded-picture`,
      data,
      {
        headers: {
          "Content-type": "multipart/form-data",
        },
      }
    );

    setProfile3(resultImage.data.pictureName);
    setImage3({ images: "" });
    Swal.fire({
      icon: "success",
      text: "Success",
      width: "370px",
    });
    window.location.replace("/admin");
  };

  return (
    <div>
      <h2>
        <Box color="#285430" as="span" flex="1" textAlign="left">
          Add Picture
        </Box>
      </h2>

      <ButtonGroup size="sm">
        <form encType="multipart/form-data">
          <input
            type={"file"}
            accept="image/*"
            name="file"
            size={"100px"}
            onChange={(e) => handleChoose2(e)}
          ></input>
        </form>
        <Button
          mr="120px"
          bgColor={"#A4BE7B"}
          borderColor="#285430"
          border="2px"
          color="gray.800"
          onClick={handleUpload2}
          size="sm"
        >
          Upload
        </Button>
      </ButtonGroup>
    </div>
  );
};