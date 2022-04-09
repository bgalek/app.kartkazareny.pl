import React, { ReactElement } from "react";
import styles from "./Layout.module.css";
import { Container } from "@mui/material";

interface Props {
  children: ReactElement;
}

const Layout = ({ children }: Props): ReactElement => (
  <main className={styles.layout}>{children}</main>
);

export default Layout;
