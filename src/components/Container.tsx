import React, { ReactElement } from "react";
import styles from "./Container.module.css";

interface Props {
  children: ReactElement | ReactElement[];
}

export const Container = ({ children }: Props) => (
  <div className={styles.container}>{children}</div>
);
