import React, { ReactElement, useContext, useState } from 'react';
import {
  Autocomplete,
  Button,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  Input,
  InputAdornment,
  InputLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Category } from '../../../@types/helpers/Category';
import { Product } from '../../../@types/helpers/Product';
import { ProductListItem } from '../../../@types/helpers/ProductListItem';
import { Language } from '../../../@types/shared/Language';

interface Props {
  categories: Category[];
  products: Product[];
  onSubmit: (need: ProductListItem) => void;
}

const formVariant = 'standard';

const Form = ({ categories, products, onSubmit }: Props): ReactElement => {
  const { t, i18n } = useTranslation();

  console.log(categories);

  const [nameInput, setNameInput] = useState<string>('');
  const [categoryInput, setCategoryInput] = useState<string>('all');
  const [productInput, setProductInput] = useState<Product | null>(null);
  const [amountInput, setAmountInput] = useState<string>('');

  const availableProducts: Product[] =
    categoryInput !== 'all'
      ? products.filter((product) => product.category.id === categoryInput)
      : products;

  const resetForm = (fullReset = false) => {
    setCategoryInput('all');
    setAmountInput('');
    setProductInput(null);

    if (fullReset) {
      setNameInput('');
    }
  };

  const handleSubmit = (): void => {
    const elementToAdd: ProductListItem = {
      ...(productInput as Product),
      volunteer: nameInput,
      amount: +amountInput,
    };

    onSubmit(elementToAdd);

    console.log(productInput);
    resetForm();
  };

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setProductInput(null);
    setCategoryInput(event.target.value);
  };

  const formValid = productInput && nameInput.length != 0 && +amountInput > 0;

  return (
    <FormGroup>
      <Stack spacing={3}>
        <FormControl variant={formVariant} required>
          <InputLabel htmlFor="name-input">{t('Imię')}</InputLabel>
          <Input
            value={nameInput}
            onChange={(event) => setNameInput(event.target.value)}
            id="name-input"
            aria-describedby="name-input"
            required
          />
        </FormControl>

        <FormControl variant={formVariant} required>
          <FormLabel>{t('Kategoria')}</FormLabel>
          <RadioGroup value={categoryInput} onChange={handleCategoryChange}>
            <FormControlLabel
              key="all"
              value="all"
              control={<Radio />}
              label={t('Wszystkie')}
            />
            {categories.map((category) => {
              return (
                <FormControlLabel
                  key={category.id}
                  value={category.id}
                  control={<Radio />}
                  label={category.name[i18n.language as Language]}
                />
              );
            })}
          </RadioGroup>
        </FormControl>

        <FormControl
          variant={formVariant}
          required
          disabled={availableProducts.length === 0}
        >
          <Autocomplete
            value={productInput}
            onChange={(event, value) => setProductInput(value)}
            options={availableProducts}
            groupBy={(option) =>
              option.category.name[i18n.language as Language]
            }
            getOptionLabel={(option) => option.name[i18n.language as Language]}
            fullWidth
            renderInput={(params) => (
              <TextField
                {...params}
                variant={formVariant}
                label={t('Produkt')}
                required
              />
            )}
          />
        </FormControl>

        <FormControl variant={formVariant} required>
          <InputLabel htmlFor="amount-input">{t('Ilość')}</InputLabel>
          <Input
            value={amountInput}
            type="number"
            onChange={(event) => setAmountInput(event.target.value)}
            id="amount-input"
            aria-describedby="amount-input"
            endAdornment={
              <InputAdornment position="end">
                {productInput?.unit[i18n.language as Language]}
              </InputAdornment>
            }
          />
        </FormControl>
        <Grid container justifyContent="flex-end">
          <Grid
            item
            xs={6}
            md={2}
            sx={{ display: 'flex', justifyContent: 'center' }}
          >
            <Button
              variant="text"
              color="error"
              onClick={() => resetForm(true)}
            >
              {t('Wyczyść')}
            </Button>
          </Grid>

          <Grid
            item
            xs={6}
            md={2}
            sx={{ display: 'flex', justifyContent: 'center' }}
          >
            <Button
              variant="contained"
              onClick={handleSubmit}
              type="submit"
              disabled={!formValid}
            >
              {t('Dodaj')}
            </Button>
          </Grid>
        </Grid>
      </Stack>
    </FormGroup>
  );
};

export default Form;
