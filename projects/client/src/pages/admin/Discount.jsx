import { Grid, GridItem } from "@chakra-ui/layout";
import React from "react";
import { AddDiscount } from "../../components/admin/AddDiscount";
import { AddPicWeb } from "../../components/admin/AddPicWeb";
import { AddPrice } from "../../components/admin/AddPrice";
import { DiscountList } from "../../components/admin/Discount";
import { SidebarComp } from "../../components/admin/Sidebar";

export const Discount = () => {
  return (
    <div>
      <Grid
        templateAreas={`"header header"
                  "nav main"
                  "nav footer"`}
        gridTemplateRows={"50px 1fr 30px"}
        gridTemplateColumns={"150px 1fr"}
        h="100vh"
        gap="1"
        color="#285430"
        fontWeight="bold"
        bgColor={"white"}
      >
        <GridItem>
          <SidebarComp />
        </GridItem>
        <GridItem>
          <AddPrice />
          {/* <AddDiscount /> */}
          <DiscountList />
        </GridItem>
      </Grid>
    </div>
  );
};
