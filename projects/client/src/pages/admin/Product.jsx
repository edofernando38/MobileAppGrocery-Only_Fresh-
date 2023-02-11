import { Grid, GridItem } from "@chakra-ui/react";
import { Product } from "../../components/admin/Product";
import { SidebarComp } from "../../components/admin/Sidebar";

export const ProductAdminPage = () => {
  return (
    <div>
      <Grid
        templateAreas={`"header header"
                "nav main"
                "nav footer"`}
        gridTemplateRows={"50px 1fr 30px"}
        gridTemplateColumns={"150px 1fr"}
        h="200px"
        gap="1"
        color="#285430"
        fontWeight="bold"
        bgColor={"white"}
      >
        <GridItem>
          <SidebarComp />
        </GridItem>
        <GridItem>
          <Product />
        </GridItem>
      </Grid>
    </div>
  );
};
