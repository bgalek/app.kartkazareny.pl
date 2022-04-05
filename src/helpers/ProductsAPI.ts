import { Category } from '../@types/helpers/Category';
import { Product } from '../@types/helpers/Product';

const categories: Category[] = [
  {
    id: 'Jedzenie',
    name: {
      PL: 'Jedzenie',
      UA: 'Харчування',
    },
  },
  {
    id: 'Elektronika',
    name: {
      PL: 'Elektronika',
      UA: 'Електроніка',
    },
  },
];

const products: Product[] = [
  {
    id: 'Mleko',
    name: {
      PL: 'Mleko',
      UA: 'Молоко',
    },
    categoryId: 'Jedzenie',
    unit: {
      PL: 'L',
      UA: '?',
    },
  },
  {
    id: 'Płatki',
    name: {
      PL: 'Płatki',
      UA: 'Зернові',
    },
    categoryId: 'kg',
    unit: {
      PL: 'L',
      UA: '?',
    },
  },
  {
    id: 'Chleb',
    name: {
      PL: 'Chleb',
      UA: 'Хліб',
    },
    categoryId: 'Jedzenie',
    unit: {
      PL: 'szt',
      UA: '?',
    },
  },
  {
    id: 'Bułki',
    name: {
      PL: 'Bułki',
      UA: 'Булочки',
    },
    categoryId: 'Jedzenie',
    unit: {
      PL: 'szt',
      UA: '?',
    },
  },
  {
    id: 'Telefon',
    name: {
      PL: 'Telefon',
      UA: 'Телефон',
    },
    categoryId: 'Elektronika',
    unit: {
      PL: 'szt',
      UA: '?',
    },
  },
  {
    id: 'Lodówka',
    name: {
      PL: 'Lodówka',
      UA: 'Холодильник',
    },
    categoryId: 'Elektronika',
    unit: {
      PL: 'szt',
      UA: '?',
    },
  },
];

export const getProducts = (): Promise<Product[]> => {
  return new Promise<Product[]>((resolve) => {
    setTimeout(() => {
      resolve(products);
    }, 1000);
  });
};

export const getProductByCategory = (
  categoryId: string
): Promise<Product[]> => {
  const filteredProducts = products.filter(
    (product) => product.categoryId === categoryId
  );

  return new Promise<Product[]>((resolve) => {
    setTimeout(() => {
      resolve(filteredProducts);
    }, 1000);
  });
};

export const getCategories = (): Promise<Category[]> => {
  return new Promise<Category[]>((resolve) => {
    setTimeout(() => {
      resolve(categories);
    }, 1000);
  });
};
