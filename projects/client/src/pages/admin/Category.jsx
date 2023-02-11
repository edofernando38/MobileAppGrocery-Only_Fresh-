import { Grid, GridItem } from "@chakra-ui/react";
import { Category } from "../../components/admin/Category";
import { SidebarComp } from "../../components/admin/Sidebar";

export const CategoryAdminPage = () => {
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
          <SidebarComp/>
        </GridItem>
        <GridItem>
          <Category />
        </GridItem>
      </Grid>
    </div>
  );
};
