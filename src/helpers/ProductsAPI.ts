import { Category } from '../@types/helpers/Category';
import { Product } from '../@types/helpers/Product';

const categories: Category[] = [
  {
    id: 'Jedzenie',
    name: {
      PL: 'Jedzenie',
      UK: 'Харчування',
    },
  },
  {
    id: 'Elektronika',
    name: {
      PL: 'Elektronika',
      UK: 'Електроніка',
    },
  },
];

const products: Product[] = [
  {
    id: 'Mleko',
    name: {
      PL: 'Mleko',
      UK: 'Молоко',
    },
    categoryId: 'Jedzenie',
    unit: {
      PL: 'L',
      UK: '?',
    },
  },
  {
    id: 'Płatki',
    name: {
      PL: 'Płatki',
      UK: 'Зернові',
    },
    categoryId: 'kg',
    unit: {
      PL: 'L',
      UK: '?',
    },
  },
  {
    id: 'Chleb',
    name: {
      PL: 'Chleb',
      UK: 'Хліб',
    },
    categoryId: 'Jedzenie',
    unit: {
      PL: 'szt',
      UK: '?',
    },
  },
  {
    id: 'Bułki',
    name: {
      PL: 'Bułki',
      UK: 'Булочки',
    },
    categoryId: 'Jedzenie',
    unit: {
      PL: 'szt',
      UK: '?',
    },
  },
  {
    id: 'Telefon',
    name: {
      PL: 'Telefon',
      UK: 'Телефон',
    },
    categoryId: 'Elektronika',
    unit: {
      PL: 'szt',
      UK: '?',
    },
  },
  {
    id: 'Lodówka',
    name: {
      PL: 'Lodówka',
      UK: 'Холодильник',
    },
    categoryId: 'Elektronika',
    unit: {
      PL: 'szt',
      UK: '?',
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
