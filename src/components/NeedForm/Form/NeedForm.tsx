import React, { ReactElement, useState } from "react";
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

  const [categoryInput, setCategoryInput] = useState<Category>(allCategory);
  const [productInput, setProductInput] = useState<Product | null>(null);
  const [amountInput, setAmountInput] = useState<string>("1");

  const resetForm = () => {
    setCategoryInput(allCategory);
    setAmountInput("1");
    setProductInput(null);
  };

  const handleSubmit = (): void => {
    const formData: Need = {
      ...(productInput as Product),
      amount: +amountInput,
    };

    onSubmit(formData);

    resetForm();
  };

  const handleProductChange = (value: Product): void => {
    setProductInput(value);
    setCategoryInput(value.category);
  };

  const handleCategoryChange = (value: Category): void => {
    // handling autocomplete clearing
    if (!value) {
      value = allCategory;
    } else if (value.id !== productInput?.category.id) {
      setProductInput(null);
    }

    setCategoryInput(value);
  };

  const availableProducts: Product[] =
    categoryInput.id !== "all"
      ? products.filter((product) => product.category.id === categoryInput.id)
      : products;

  const formValid = productInput && +amountInput > 0;

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
              value={productInput}
              onChange={(event, value) => handleProductChange(value as Product)}
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
              value={categoryInput}
              defaultValue={allCategory}
              onChange={(event, value) =>
                handleCategoryChange(value as Category)
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
            amountInput={amountInput}
            setAmountInput={setAmountInput}
            adornment={productInput?.unit[i18n.language as Language]}
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
