import React, { Dispatch, ReactElement, SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import {
  Box,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@mui/material";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import RemoveCircleOutlinedIcon from "@mui/icons-material/RemoveCircleOutlined";

interface Props {
  amountInput: string;
  setAmountInput: Dispatch<SetStateAction<string>>;
  variant: "standard" | "outlined" | "filled";
  adornment?: string;
  min?: number;
}

let debounceTimer: NodeJS.Timeout;

export const AmountField = ({
  amountInput,
  setAmountInput,
  variant,
  adornment,
  min,
}: Props): ReactElement => {
  const { t } = useTranslation();

  const handleIconsClick = (operation: "add" | "subtract") => {
    setAmountInput((amount) => {
      let numberAmount = +amount;

      if (operation === "add") {
        numberAmount = numberAmount + 1;
      } else {
        numberAmount = numberAmount - 1;
      }

      if (min && numberAmount < min) {
        return amount;
      }

      return numberAmount.toString();
    });
  };

  const handleManualChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    if (!min) {
      setAmountInput(value);
      return;
    }

    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    if (+value < min || isNaN(+value)) {
      setAmountInput(value);

      debounceTimer = setTimeout(() => {
        setAmountInput(min.toString());
      }, 2000);
    } else {
      setAmountInput(value);
    }
  };

  return (
    <Grid container justifyContent="flex-end" alignItems="center">
      <Grid item xs={2}>
        <Box display="flex" justifyContent="center" alignItems="center">
          <IconButton
            aria-label={t("Odejmij")}
            size="large"
            color="primary"
            onClick={() => handleIconsClick("subtract")}
            disabled={min !== undefined && +amountInput <= min}
          >
            <RemoveCircleOutlinedIcon fontSize="large" />
          </IconButton>
        </Box>
      </Grid>
      <Grid item xs={4}>
        <FormControl variant={variant} required>
          <InputLabel htmlFor="amount-input">{t("Podaj ilość")}</InputLabel>
          <OutlinedInput
            value={amountInput}
            type="number"
            onChange={handleManualChange}
            id="amount-input"
            aria-describedby="amount-input"
            label={t("Podaj ilość")}
            inputProps={{ inputMode: "numeric", min: 1 }}
          />
        </FormControl>
      </Grid>

      <Grid item xs={2}>
        <Box display="flex" justifyContent="center" alignItems="center">
          <IconButton
            aria-label={t("Dodaj")}
            size="large"
            color="primary"
            onClick={() => handleIconsClick("add")}
          >
            <AddCircleOutlinedIcon fontSize="large" />
          </IconButton>
        </Box>
      </Grid>
      <Grid item xs={2}>
        <Typography>{adornment}</Typography>
      </Grid>
    </Grid>
  );
};
