import { Product } from './Product';

export interface ProductListItem extends Product {
  volunteer: string;
  amount: number;
}
