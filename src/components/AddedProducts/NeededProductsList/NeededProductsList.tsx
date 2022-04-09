import React, { ReactElement } from "react";
import styles from "./NeededProductsList.module.css";
import { useTranslation } from "react-i18next";
import { Typography } from "@mui/material";
import { ProductListItem } from "../../../@types/helpers/ProductListItem";
import { Wrapper } from "../../Wrapper";
import { ProductListRow } from "./NeedsListItem/ProductListRow";

interface Props {
  needs: ProductListItem[];
  deleteNeed: (index: number) => void;
}

export const NeededProductsList = ({
  needs,
  deleteNeed,
}: Props): ReactElement => {
  const { t, i18n } = useTranslation();

  console.log("needs :>> ", needs);
  return (
    <>
      <Wrapper>
        <Typography>{`${t("Lista Produktów")} (${needs.length})`}</Typography>
      </Wrapper>
      <ul className={styles.list}>
        {needs.map((product, index) => (
          <ProductListRow
            key={product.id}
            product={product}
            first={index === 0}
            onDelete={() => deleteNeed(index)}
          />
        ))}
      </ul>
    </>
  );
};
