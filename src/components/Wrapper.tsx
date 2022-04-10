import React, { ReactElement } from "react";
import { Container, SxProps } from "@mui/material";

interface Props {
  children: ReactElement | ReactElement[];
  sx?: SxProps;
}

export const Wrapper = ({ sx, children }: Props) => (
  <Container sx={{ padding: "24px", ...sx }}>{children}</Container>
);
