import { Grid, GridItem } from "@chakra-ui/react";
import { SidebarComp } from "../../components/admin/Sidebar";
import { TransactionComp } from "../../components/admin/Transaction";

export const TransactionAdminPage = () => {
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
          <TransactionComp />
        </GridItem>
      </Grid>
    </div>
  );
};