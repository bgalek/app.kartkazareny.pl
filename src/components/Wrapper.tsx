import React, { ReactElement } from "react";
import styles from "./Wrapper.module.css";

interface Props {
  children: ReactElement | ReactElement[];
  className: string;
}

export const Wrapper = ({ children }: Props) => (
  <div className={styles.wrapper}>{children}</div>
);
