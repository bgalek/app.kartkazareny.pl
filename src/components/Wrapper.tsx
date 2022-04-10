import { Container, SxProps } from "@mui/material";
import React, { ReactElement } from "react";
import styles from "./Wrapper.module.css";

interface Props {
  children: ReactElement | ReactElement[];
  sx?: SxProps;
}

export const Wrapper = ({ sx, children }: Props) => (
  <Container sx={{ padding: "24px", ...sx }}>{children}</Container>
);
