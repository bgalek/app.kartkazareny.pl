import { ReactElement } from "react";
import styles from "./NeedsListItem.module.css";
import { useTranslation } from "react-i18next";
import { Box, Grid, IconButton } from "@mui/material";
import RemoveCircleOutlinedIcon from "@mui/icons-material/RemoveCircleOutlined";
import { Need } from "../../../@types/helpers/Need";
import { Language } from "../../../@types/shared/Language";

interface Props {
  product: Need;
  first?: boolean;
  onDelete: () => void;
}

export const NeedsListItem = ({
  product,
  first,
  onDelete,
}: Props): ReactElement => {
  const { t, i18n } = useTranslation();

  return (
    <li className={`${styles.item} ${first ? styles["item-first"] : ""}`}>
      <Grid container alignItems="center" spacing={2}>
        <Grid item xs={1}>
          <Box display="flex" justifyContent="center" alignItems="center">
            <IconButton
              aria-label={t("Usuń")}
              color="primary"
              onClick={onDelete}
            >
              <RemoveCircleOutlinedIcon />
            </IconButton>
          </Box>
        </Grid>

        <Grid item xs={8}>
          <Box textOverflow="ellipsis" whiteSpace="nowrap" overflow="hidden">
            {product.name[i18n.language as Language]}
          </Box>
        </Grid>

        <Grid item xs={3}>
          <Box display="flex" justifyContent="end">
            {`${product.amount} ${product.unit[i18n.language as Language]}`}
          </Box>
        </Grid>
      </Grid>
    </li>
  );
};
