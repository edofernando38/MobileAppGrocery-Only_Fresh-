import { useState } from "react";
import { Box, IconButton, useBreakpointValue } from "@chakra-ui/react";
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
import Slider from "react-slick";

export const CarouselComp = () => {
  const [slider, setSlider] = useState(null);

  const top = useBreakpointValue({ base: "90%", md: "50%" });
  const side = useBreakpointValue({ base: "30%", md: "10px" });

  const cards = [
    `${process.env.REACT_APP_API_BASE_URL}/upload/PIMG-167323961309566900.webp`,
    `${process.env.REACT_APP_API_BASE_URL}/upload/PIMG-167323967203666499.webp`,
  ];

  return (
    <div>
      <Box
        position={"relative"}
        height={"300px"}
        width={"375px"}
        overflow={"hidden"}

        mt={"15px"}
      >
        <link
          rel="stylesheet"
          type="text/css"
          charSet="UTF-8"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
        />
        <IconButton
          aria-label="left-arrow"
          position="absolute"
          background={"transparent"}
          left={side}
          top={top}

          transform={"translate(0%, -220%)"}

          zIndex={1}
          onClick={() => slider?.slickPrev()}
          variant="unstyled"
        >
          <BiLeftArrowAlt />
        </IconButton>
        <IconButton
          aria-label="right-arrow"
          backgroundColor={"transparent"}
          position="absolute"
          right={side}
          top={top}

          transform={"translate(50%, -220%)"}
          zIndex={1}
          onClick={() => slider?.slickNext()}
          variant="unstyled"
        >
          <BiRightArrowAlt />
        </IconButton>

        <Slider {...settings} ref={(slider) => setSlider(slider)}>
          {cards.map((url, index) => (
            <Box
              key={index}
              height={"160px"}
              borderRadius="2xl"
              position="relative"
              backgroundPosition="center"
              backgroundRepeat="no-repeat"
              backgroundSize="cover"
              backgroundImage={`url(${url})`}
            />
          ))}
        </Slider>
      </Box>
    </div>
  );
};

const settings = {
  arrows: false,
  infinite: true,
  autoplay: true,
  speed: 500,
  autoplaySpeed: 5000,
  slidesToShow: 1,
  slidesToScroll: 1,
};
