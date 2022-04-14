import React, { ReactElement, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  Box,
  FormControl,
  Grid,
  IconButton,
  InputBaseComponentProps,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@mui/material";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import RemoveCircleOutlinedIcon from "@mui/icons-material/RemoveCircleOutlined";

interface Props {
  value: string;
  onChange: (value: string) => void;
  variant: "standard" | "outlined" | "filled";
  adornment?: string;
  min?: number;
}

let debounceTimer: NodeJS.Timeout;
let inputProps: InputBaseComponentProps = { inputMode: "numeric" };

export const AmountField = ({
  value,
  onChange,
  variant,
  adornment,
  min,
}: Props): ReactElement => {
  const { t } = useTranslation();

  useEffect(() => {
    if (min) {
      inputProps.min = min;
    } else {
      delete inputProps.min;
    }
  }, [min]);

  const handleIconsClick = (operation: "add" | "subtract") => {
    let numberAmount = +value;

    if (operation === "add") {
      numberAmount = numberAmount + 1;
    } else {
      numberAmount = numberAmount - 1;
    }

    if (min && numberAmount < min) {
      return value;
    }

    onChange(numberAmount.toString());
  };

  const handleManualChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    if (!min) {
      onChange(value);
      return;
    }

    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    if (+value < min || isNaN(+value)) {
      onChange(value);

      debounceTimer = setTimeout(() => {
        onChange(min.toString());
      }, 2000);
    } else {
      onChange(value);
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
            disabled={min !== undefined && +value <= min}
          >
            <RemoveCircleOutlinedIcon fontSize="large" />
          </IconButton>
        </Box>
      </Grid>
      <Grid item xs={4}>
        <FormControl variant={variant} required>
          <InputLabel htmlFor="amount-input">{t("Podaj ilość")}</InputLabel>
          <OutlinedInput
            value={value}
            type="number"
            onChange={handleManualChange}
            id="amount-input"
            aria-describedby="amount-input"
            label={t("Podaj ilość")}
            inputProps={inputProps}
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
