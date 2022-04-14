import React, { ReactElement, useReducer } from "react";
import { useTranslation } from "react-i18next";
import {
  Autocomplete,
  Button,
  FormControl,
  Paper,
  Stack,
  TextField,
} from "@mui/material";
import { Category } from "../../../@types/helpers/Category";
import { Product } from "../../../@types/helpers/Product";
import { Need } from "../../../@types/helpers/Need";
import { Language } from "../../../@types/shared/Language";
import { Wrapper } from "../../Wrapper";
import { AmountField } from "./AmountField";
import { ActionType, reducer } from "./NeedFormReducer";

interface Props {
  categories: Category[];
  products: Product[];
  onSubmit: (need: Need) => void;
}

const NeedForm = ({ categories, products, onSubmit }: Props): ReactElement => {
  const { t, i18n } = useTranslation();

  const allCategory: Category = {
    id: "all",
    name: {
      PL: t("Wszystkie", { lng: "PL" }),
      UK: t("Wszystkie", { lng: "UK" }),
    },
  };

  const initialFormState = {
    product: null,
    category: allCategory,
    amount: "1",
  };

  const [state, dispatch] = useReducer(reducer, initialFormState);

  const handleSubmit = (): void => {
    const formData: Need = {
      ...(state.product as Product),
      amount: +state.amount,
    };

    onSubmit(formData);

    dispatch({ type: ActionType.RESET, payload: initialFormState });
  };

  const availableProducts: Product[] =
    state.category.id !== "all"
      ? products.filter((product) => product.category.id === state.category.id)
      : products;

  const formValid = state.product && +state.amount > 0;

  return (
    <Paper
      elevation={0}
      sx={{ backgroundColor: "#E5EDFB", borderRadius: "8px" }}
    >
      <Wrapper>
        <Stack spacing={5} alignItems="center">
          <FormControl
            variant="outlined"
            required
            disabled={availableProducts.length === 0}
            fullWidth
          >
            <Autocomplete
              // the product needs to be null, not undefined, because value === undefined is considered in MUI as uncontrolled input
              value={state.product}
              disableClearable={true}
              onChange={(event, value) =>
                dispatch({
                  type: ActionType.PRODUCT_CHANGE,
                  payload: value as Product,
                })
              }
              noOptionsText={t("brak opcji")}
              options={availableProducts}
              groupBy={(option) =>
                option.category.name[i18n.language as Language]
              }
              getOptionLabel={(option) =>
                option.name[i18n.language as Language]
              }
              fullWidth
              id="product-input"
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label={t("Wybierz produkt")}
                  required
                  id="product-input"
                />
              )}
            />
          </FormControl>

          <FormControl required variant="outlined" fullWidth>
            <Autocomplete
              value={state.category}
              defaultValue={allCategory}
              disableClearable={true}
              onChange={(event, value) =>
                dispatch({
                  type: ActionType.CATEGORY_CHANGE,
                  payload: value as Category,
                })
              }
              noOptionsText={t("brak produktu")}
              options={[allCategory, ...categories]}
              isOptionEqualToValue={(option, value) => {
                return option.id === value.id;
              }}
              getOptionLabel={(option) =>
                option.name[i18n.language as Language]
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  id="category-input"
                  label={t("Wybierz kategorię")}
                  required
                />
              )}
            />
          </FormControl>

          <AmountField
            variant="outlined"
            value={state.amount}
            onChange={(value) =>
              dispatch({
                type: ActionType.AMOUNT_CHANGE,
                payload: value as string,
              })
            }
            adornment={state.product?.unit[i18n.language as Language]}
            min={1}
          />

          <Button
            disabled={!formValid}
            variant="contained"
            sx={{ padding: "12px" }}
            type="submit"
            onClick={handleSubmit}
          >
            {t("Dodaj produkt")}
          </Button>
        </Stack>
      </Wrapper>
    </Paper>
  );
};

export default NeedForm;
