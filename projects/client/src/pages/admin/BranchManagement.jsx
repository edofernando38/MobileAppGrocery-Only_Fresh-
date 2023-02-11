import React from "react";
import { Flex, Grid, GridItem } from "@chakra-ui/react";
import { RegisterAdmin } from "../../components/admin/Register";
import { ListAdmin } from "../../components/admin/ListAdmin";
import { SidebarSuper } from "../../components/admin/SidebarSuper";

export const BranchManagement = () => {
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
          <SidebarSuper />
        </GridItem>
        <Flex>
          <ListAdmin />
          <RegisterAdmin />
        </Flex>
      </Grid>
    </div>
  );
};
