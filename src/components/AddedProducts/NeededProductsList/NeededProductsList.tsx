import React, { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import styles from "./NeededProductsList.module.css";
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
  const { t } = useTranslation();

  return (
    <>
      <Wrapper sx={{ paddingBottom: "0px" }}>
        <Typography>{`${t("Lista Produktów")} (${needs.length})`}</Typography>
      </Wrapper>
      {needs.length !== 0 && (
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
      )}
    </>
  );
};
