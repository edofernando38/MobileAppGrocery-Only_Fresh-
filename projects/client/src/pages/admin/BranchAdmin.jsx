import { Grid, GridItem } from "@chakra-ui/react";
import { DashboardComp } from "../../components/admin/Dashboard";
import { SidebarBranch } from "../../components/admin/SidebarBranch";

export const BranchComp = () => {
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
          <SidebarBranch />
        </GridItem>
        <GridItem>
          <DashboardComp />
        </GridItem>
      </Grid>
    </div>
  );
};