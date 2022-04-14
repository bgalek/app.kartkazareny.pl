import React, { ReactElement, useContext } from "react";
import { NeedsContext } from "../../contexts/NeedsContext";
import { useTranslation } from "react-i18next";
import styles from "./NeedsList.module.css";
import { Typography } from "@mui/material";
import { Wrapper } from "../Wrapper";
import { NeedsListItem } from "./NeedsListItem/NeedsListItem";

export const NeedsList = (): ReactElement => {
  const { t } = useTranslation();
  const { needs, deleteNeed } = useContext(NeedsContext);

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
