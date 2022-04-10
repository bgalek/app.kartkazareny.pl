import React, { ReactElement, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Autocomplete,
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Category } from "../../../@types/helpers/Category";
import { Product } from "../../../@types/helpers/Product";
import { ProductListItem } from "../../../@types/helpers/ProductListItem";
import { Language } from "../../../@types/shared/Language";
import { Wrapper } from "../../Wrapper";
import { AmountField } from "./AmountInput/AmountField";

interface Props {
  categories: Category[];
  products: Product[];
  onSubmit: (need: ProductListItem) => void;
}

const formVariant = "outlined";

const namePlaceholder = {
  PL: "Jan Kowalski",
  // TODO ask for placeholder
  UK: "Jan Kowalski",
};

const Form = ({ categories, products, onSubmit }: Props): ReactElement => {
  const { t, i18n } = useTranslation();

  const allCategory: Category = {
    id: "all",
    name: {
      PL: t("Wszystkie", { lng: "PL" }),
      UK: t("Wszystkie", { lng: "UK" }),
    },
  };

  const [nameInput, setNameInput] = useState<string>("");
  const [categoryInput, setCategoryInput] = useState<Category>(allCategory);
  const [productInput, setProductInput] = useState<Product | null>(null);
  const [amountInput, setAmountInput] = useState<string>("");

  const resetForm = (fullReset = false) => {
    setCategoryInput(allCategory);
    setAmountInput("");
    setProductInput(null);

    if (fullReset) {
      setNameInput("");
    }
  };

  const handleSubmit = (): void => {
    const elementToAdd: ProductListItem = {
      ...(productInput as Product),
      volunteer: nameInput,
      amount: +amountInput,
    };

    onSubmit(elementToAdd);

    resetForm();
  };

  const handleCategoryChange = (
    event: React.SyntheticEvent<Element, Event>,
    value: Category
  ): void => {
    // handling autocomplete clearing
    if (!value) {
      value = allCategory;
    }

    setProductInput(null);
    setCategoryInput(value);
  };

  const availableProducts: Product[] =
    categoryInput.id !== "all"
      ? products.filter((product) => product.category.id === categoryInput.id)
      : products;

  const formValid = productInput && nameInput.length != 0 && +amountInput > 0;

  return (
    <>
      <Wrapper sx={{ paddingTop: "0px" }}>
        <Stack spacing={5}>
          <Typography variant="subtitle1">
            {t("Formularz do zgłaszania zapotrzebowania na produkty")}
          </Typography>

          <FormControl required variant={formVariant} fullWidth>
            <InputLabel htmlFor="name-input">{t("Imię i Nazwisko")}</InputLabel>
            <OutlinedInput
              value={nameInput}
              onChange={(event) => setNameInput(event.target.value)}
              id="name-input"
              aria-describedby="name-input"
              label={t("Imię i Nazwisko")}
              placeholder={namePlaceholder[i18n.language as Language]}
            />
          </FormControl>
        </Stack>
      </Wrapper>

      <Paper
        elevation={0}
        sx={{ backgroundColor: "#E5EDFB", borderRadius: "8px" }}
      >
        <Wrapper>
          <Stack spacing={5} alignItems="center">
            <FormControl required variant={formVariant} fullWidth>
              <Autocomplete
                value={categoryInput}
                defaultValue={allCategory}
                onChange={handleCategoryChange}
                noOptionsText={t("brak opcji")}
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

            <FormControl
              variant={formVariant}
              required
              disabled={availableProducts.length === 0}
              fullWidth
            >
              <Autocomplete
                value={productInput}
                onChange={(event, value) => setProductInput(value)}
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
                    variant={formVariant}
                    label={t("Wybierz produkt")}
                    required
                    id="product-input"
                  />
                )}
              />
            </FormControl>

            <AmountField
              variant={formVariant}
              amountInput={amountInput}
              setAmountInput={setAmountInput}
              adornment={productInput?.unit[i18n.language as Language]}
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
    </>
  );
};

export default Form;
