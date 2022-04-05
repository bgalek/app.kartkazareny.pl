import { Typography } from '@mui/material';
import React, {
  ReactElement,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Category } from '../../@types/helpers/Category';
import { Product } from '../../@types/helpers/Product';
import { NeedsContext } from '../../contexts/NeedsContext';
import { getCategories, getProducts } from '../../helpers/ProductsAPI';
import Form from './Form/Form';

export const NeedFormManager = (): ReactElement => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  const { needs, addNeed } = useContext(NeedsContext);

  const downloadCategories = useCallback(async () => {
    const downloadedCategories = await getCategories();
    setCategories(downloadedCategories);
  }, []);

  const downloadProducts = useCallback(async () => {
    const downloadedCategories = await getProducts();
    setProducts(downloadedCategories);
  }, []);

  useEffect(() => {
    downloadCategories();
    downloadProducts();
  }, []);

  return (
    <Form onSubmit={addNeed} categories={categories} products={products} />
  );
};
