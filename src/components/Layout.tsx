import React, { ReactElement } from "react";
import { Container } from "@mui/material";

interface Props {
  children: ReactElement;
}

const Layout = ({ children }: Props): ReactElement => (
  <Container
    maxWidth="sm"
    component="main"
    sx={{
      height: "100%",
      overflowX: "clip",
      overflowY: "scroll",
      paddingTop: "24px",
      position: "relative",
    }}
  >
    {children}
  </Container>
);

export default Layout;
