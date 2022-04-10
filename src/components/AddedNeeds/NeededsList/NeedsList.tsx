import React, { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import styles from "./NeedsList.module.css";
import { Typography } from "@mui/material";
import { Need } from "../../../@types/helpers/Need";
import { Wrapper } from "../../Wrapper";
import { NeedsListItem } from "./NeedsListItem/NeedslistItem";

interface Props {
  needs: Need[];
  deleteNeed: (index: number) => void;
}

export const NeedsList = ({ needs, deleteNeed }: Props): ReactElement => {
  const { t } = useTranslation();

  return (
    <>
      <Wrapper sx={{ paddingBottom: "0px" }}>
        <Typography>{`${t("Lista Produktów")} (${needs.length})`}</Typography>
      </Wrapper>
      {needs.length !== 0 && (
        <ul className={styles.list}>
          {needs.map((product, index) => (
            <NeedsListItem
              key={product.id}
              product={product}
              first={index === 0}
              onDelete={() => deleteNeed(index)}
            />
          ))}
        </ul>
      )}
    </>
  );
};
